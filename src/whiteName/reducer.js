import {ModuleReducer,ModuleAction} from 'mcf-module'
import {namespace} from './model'

const {defaultReducer,defaultState,reducerCreator,megerActionReducer} = ModuleReducer
const {createDefineActions} = ModuleAction

const reduces = Object.assign(defaultReducer(),{
  saveIpList:(state,{payload})=>{
    return {
      ...state,
      pluginList: payload
    }
  }
})

export const reducerActions =createDefineActions(reduces,namespace)
export const initialState = Object.assign(defaultState)
export default reducerCreator(megerActionReducer(reduces,reducerActions),initialState)
