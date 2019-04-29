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

const action = {
  payload:{
    serviceName: 'serviceName',
    actionType: 'actionType'
  }
}

describe('saga 单元测试', () => {
  // case1
  // 通过查找存在 Input,测试组件正常渲染

  it('saga fetchRestartAll success',(done)=>{
    const gen = cloneableGenerator(saga.fetchRestartAll)()
    expect(gen.next().value).toEqual(call(Api.fetchRestartAll))
    let clone = gen.clone()
    expect(clone.next({code:0}).value).toEqual(put(showSuccess()))
    done()
  })

  it('saga fetchRestartAll error',(done)=>{
    const gen = cloneableGenerator(saga.fetchRestartAll)()
    expect(gen.next().value).toEqual(call(Api.fetchRestartAll))
    let clone = gen.clone()
    expect(clone.next({code:500,message:undefined}).value).toEqual(put(showError()))
    done()
  })

  it('saga fetchOperate success',(done)=>{
    const gen = cloneableGenerator(saga.fetchOperate)(action)
    expect(gen.next().value).toEqual(call(Api.fetchOperate,action.payload))
    let clone = gen.clone()
    expect(clone.next({code:0}).value).toEqual(put(showSuccess()))
    done()
  })

  it('saga fetchOperate error',(done)=>{
    const gen = cloneableGenerator(saga.fetchOperate)(action)
    expect(gen.next().value).toEqual(call(Api.fetchOperate,action.payload))
    let clone = gen.clone()
    expect(clone.next({code:500,message:undefined}).value).toEqual(put(showError()))
    done()
  })

})
