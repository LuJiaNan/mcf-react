import React from 'react'
import {createStore,applyMiddleware, combineReducers} from 'redux'
import {createHashHistory} from 'history'
import createSagaMiddleware from 'redux-saga'
import {createLogger} from 'redux-logger'
import {ModuleMiddleware,ModuleRouter,ModuleModel} from 'mcf-module'
import {message} from 'antd'
import Loadable from 'react-loadable'
import {persistReducer,persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const {createFetching,createMessage,fetchingReducer,globalReducer,createSagaMonitor} = ModuleMiddleware
const  {createReducer,orm} = ModuleModel
const history = createHashHistory()
const allReducers=Object.assign({}, {
  appReducer:globalReducer,
  fetchingReducer,
})

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    ...asyncReducers
  })
}
let sagaMiddleware;
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['appReducer']
}
const reducers = makeRootReducer(allReducers);

const loggerMiddleware = createLogger()
const messageMiddleware = createMessage(message)
const createStoreWithMiddleware = applyMiddleware(
  ({ getState, dispatch })=>{
      sagaMiddleware = createSagaMiddleware({sagaMonitor: createSagaMonitor({rootReducer:reducers,storeDispatch:dispatch})})
      return sagaMiddleware({ getState, dispatch })
  },
  messageMiddleware,
  loggerMiddleware, // 一个很便捷的 middleware，用来打印 action 日志
)(createStore)

const store = createStoreWithMiddleware(reducers,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export const  persistor = persistStore(store)
store.asyncReducers =allReducers
store.registerModule=[]

const injectSaga = (saga)=>{
  sagaMiddleware.run(saga)
}
const injectReducer = (store,{key,reducer}) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
  store.dispatch({ type: '@@redux/REPLACE '})
}

const injectModel = (orm,model)=>{
  //重复模块不注册 ，会引起重复注册问题
  // model && orm.registry.indexOf(model)<0 && orm.register(model)
  Object.values(model).filter(m=>typeof(m)==="function").map(m=>orm.register(m))
  injectReducer(store,{key:"ORMReducer",reducer:createReducer(orm)})

}
function importModule(modulePath){
  modulePath.then(function(loaded){
    let Component = loaded.default
    let moduleName = loaded.model.default.modelName
    if(store.registerModule.indexOf(moduleName)<0){
      store.dispatch({type:"@@ModuleMiddleware/register",payload:{name:moduleName}})
      injectReducer(store,{key:moduleName,reducer:loaded.reducer})
      injectModel(orm,loaded.model)
      injectSaga(loaded.saga)
      store.registerModule=store.registerModule.concat([moduleName])
    }
  })
}

function registerModule(modulePath){
  return Loadable({
    loader:()=> modulePath,
    loading:()=><div className="app-loading">模块加载中....</div>,
    timeout: 10000,
    render(loaded,props){
      let Component = loaded.default
      let moduleName = loaded.model.default.modelName
      if(store.registerModule.indexOf(moduleName)<0){
        store.dispatch({type:"@@ModuleMiddleware/register",payload:{name:moduleName}})
        injectReducer(store,{key:moduleName,reducer:loaded.reducer})
        injectModel(orm,loaded.model)
        injectSaga(loaded.saga)
        store.registerModule=store.registerModule.concat([moduleName])
      }
      return <Component {...props} />
     }
  })
}

export {injectReducer,injectSaga,registerModule,importModule,history}

export default store
