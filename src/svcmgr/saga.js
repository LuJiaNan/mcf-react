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
  fetchOperate: function* (action){
    const payload = action.payload
    const result = yield call(Api.fetchOperate, payload);
    if(result.code === 0){
      yield effects.put(showSuccess())
      yield saga.refreshPage(action)
    }else{
      yield effects.put(showError(result.message))
    }
  },
  fetchRestartAll: function* (){
    const result = yield call(Api.fetchRestartAll);
    if(result.code === 0){
      yield effects.put(showSuccess())
      yield saga.refreshPage()
    }else{
      yield effects.put(showError(result.message))
    }
  },
})

export const sagaActions =createDefineActions(saga,namespace)
export default function* () {
  yield takeSagas(sagaActions,saga)
}
