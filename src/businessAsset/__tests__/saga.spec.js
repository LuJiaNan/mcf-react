import React from 'react'
import { call,put } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import {ModuleSaga,ModuleMiddleware,ModuleRouter} from 'mcf-module'
import {saga,sagaActions } from '../saga'
import {reducerActions} from '../reducer'
import * as Api  from '../api'

const {showSuccess,showError} =ModuleMiddleware
const { goBack } = ModuleRouter
const {fetch} = ModuleSaga

describe('saga 单元测试', () => {

    it('saga 单元测试 fetchSave -> fetchSave code==0', () => {
        const gen = cloneableGenerator(saga.fetchSave)(sagaActions.fetchSave({payload:{}}))
        expect(gen.next().value).toEqual(call(Api.fetchSave,{payload:{}}))
        let clone =gen.clone()
        expect(clone.next({code:0,data:{}}).value).toEqual(put(reducerActions.saveItem({})))
        expect(clone.next().value).toEqual(put(showSuccess()))
        expect(clone.next().value).toEqual(put(goBack()))
      })
    
      it('saga 单元测试 fetchSave -> fetchSave code!=0', () => {
        const gen = cloneableGenerator(saga.fetchSave)(sagaActions.fetchSave({payload:{}}))
        expect(gen.next().value).toEqual(call(Api.fetchSave,{payload:{}}))
        let clone =gen.clone()
        expect(clone.next({code:500,message:undefined}).value).toEqual(put(showError()))
      })
    

})
