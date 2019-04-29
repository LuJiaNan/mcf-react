import {ModuleSaga,ModuleMiddleware,ModuleRouter,ModuleAction} from 'mcf-module'
import {reducerActions} from './reducer'
import {namespace} from './model'
import * as Api  from './api'
import * as effects from 'redux-saga/effects'
import { changeListType } from './actions'

const {showSuccess,showError} =ModuleMiddleware
const {effects:{call,put},defaultSaga,takeSagas} = ModuleSaga
const { goBack } = ModuleRouter
const {createDefineActions} = ModuleAction
export const saga = Object.assign(defaultSaga(reducerActions,Api,namespace),{
  fetchDelete: function* (action){
    const payload = {ids:[].concat(action.payload.id),parentId:action.payload.parentId}
    const result = yield call(Api.fetchDelete, payload);
    if(result.code === 0){
      yield effects.put(showSuccess())
      yield saga.fetchList(action)
    }else{
      yield effects.put(showError(result.message))
    }
  },
  fetchSave: function* (action){
    const result = yield call(Api.fetchSave,action.payload);
    if(result.code === 0){
      yield effects.put(showSuccess())
      yield saga.refreshPage(action)
    }else{
      yield effects.put(showError(result.message))
    }
  },
  changeListType: function* (){
    yield effects.put(changeListType())
  }
})

export const sagaActions =createDefineActions(saga,namespace)
export default function* () {
  yield takeSagas(sagaActions,saga)
}
