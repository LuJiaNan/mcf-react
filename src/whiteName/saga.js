import {ModuleSaga,ModuleMiddleware,ModuleRouter,ModuleAction} from 'mcf-module'
import {reducerActions} from './reducer'
import {namespace} from './model'
import * as Api  from './api'
import * as effects from 'redux-saga/effects'

const {showSuccess,showError} =ModuleMiddleware
const {effects:{call,put},defaultSaga,takeSagas} = ModuleSaga
const { goBack } = ModuleRouter
const {createDefineActions} = ModuleAction

export const saga = Object.assign(defaultSaga(reducerActions,Api,namespace),{
  fetchPage: function* (action) {
    const result = yield effects.call(Api.fetchList, action.payload);
    if(result.code === '0'){
      yield effects.put(reducerActions.savePage(result.data));
    }else{
      yield effects.put(showError(result.message))
    }
  },
  fetchItem: function* (action){
    const result = yield effects.call(Api.fetchItem, action.payload);
    if(result.code === '0'){
      yield effects.put(reducerActions.saveItem(result.data));
    } else {
      yield effects.put(showError(result.message))
    }
  },
  fetchSave: function* (action){
    const result = yield effects.call(Api.fetchSave, action.payload);
    if(result.code === '0'){
      yield effects.put(reducerActions.saveItem(result.data));
      yield effects.put(showSuccess())
      yield effects.put(goBack())
    }else{
      yield effects.put(showError(result.message))
    }
  },
  fetchDelete: function* (action){
    const result = yield call(Api.fetchDelete, action.payload);
    if(result.code === '0'){
      yield effects.put(showSuccess())
      yield saga.refreshPage(action)
    }else{
      yield effects.put(showError(result.message))
    }
  },
  // fetchIpList: function* (){
  //   let result = yield call(Api.fetchIpList);
  //   if(result.code === 0){
  //     yield effects.put(reducerActions.saveIpList(result.data.pluginList))
  //   }else{
  //     yield effects.put(showError(result.message))
  //   }
  // },
  fetchSaveOrUpdate: function* (action){
    let result
    const { ipList, ...otherValue} = action.payload
    if(action.payload.id){
      result = yield call(Api.fetchUpdate, otherValue)
    }else{
      result = yield call(Api.fetchSave, action.payload)
    }

    if(result.code === '0'){
      yield effects.put(showSuccess())
      yield effects.put(goBack())
    }else{
      yield effects.put(showError(result.message))
    }
  }
})

export const sagaActions =createDefineActions(saga,namespace)
export default function* () {
  yield takeSagas(sagaActions,saga)
}
