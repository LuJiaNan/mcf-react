import {ModuleSaga,ModuleMiddleware,ModuleRouter,ModuleAction} from 'mcf-module'
import {reducerActions} from './reducer'
import {namespace} from './model'
import * as Api  from './api'

const {showSuccess,showError} =ModuleMiddleware
const {effects:{call,put},defaultSaga,takeSagas} = ModuleSaga
const { goBack } = ModuleRouter
const {createDefineActions} = ModuleAction

export const saga = Object.assign(defaultSaga(reducerActions,Api,namespace),{
  fetchSave:function* (action) {
    let result={};
    if(action.payload.id){
      result = yield call(Api.fetchUpdate, action.payload);
    }else{
      result = yield call(Api.fetchSave, action.payload);
    }
    if (result.code === 0) {
      yield put(reducerActions.saveItem(result.data));
      yield put(showSuccess())
      yield put(goBack())
    } else {
      yield put(showError(result.message))
    }
  }
})

export const sagaActions =createDefineActions(saga,namespace)
export default function* () {
  yield takeSagas(sagaActions,saga)
}
