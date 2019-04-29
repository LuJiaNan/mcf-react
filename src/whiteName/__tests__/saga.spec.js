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
  // case1
  // 通过查找存在 Input,测试组件正常渲染
  const id = 1
  const actionUpdate={
    payload:{
        id: 1,
        ipWhiteListStr: '1'  
    }
  }
  const actionSave={
    payload: {}
  }

  const actionDelete={
    payload: 1
  }

  const actionList={payload:{}}

  it('saga fetchUpdate success',(done)=>{
    const gen = cloneableGenerator(saga.fetchSaveOrUpdate)(actionUpdate)
    expect(gen.next().value).toEqual(call(Api.fetchUpdate,actionUpdate.payload))
    let clone =gen.clone()
    expect(clone.next({code:'0'}).value).toEqual(put(showSuccess()))
    
    done()
  })

  it('saga fetchUpdate error',(done)=>{
    const gen = cloneableGenerator(saga.fetchSaveOrUpdate)(actionUpdate)
    expect(gen.next().value).toEqual(call(Api.fetchUpdate,actionUpdate.payload))
    let clone =gen.clone()
    expect(clone.next({code:500,message:undefined}).value).toEqual(put(showError()))
    done()
  })

  it('saga fetchSave success',(done)=>{
    const gen = cloneableGenerator(saga.fetchSaveOrUpdate)(actionSave)
    expect(gen.next().value).toEqual(call(Api.fetchSave,actionSave.payload))
    let clone = gen.clone()
    expect(clone.next({code:500,message:undefined}).value).toEqual(put(showError()))
    done()
  })

  it('saga fetchSave error',(done)=>{
    const gen = cloneableGenerator(saga.fetchSaveOrUpdate)(actionSave)
    expect(gen.next().value).toEqual(call(Api.fetchSave,actionSave.payload))
    let clone = gen.clone()
    expect(clone.next({code:500,message:undefined}).value).toEqual(put(showError()))
    done()
  })

  it('saga fetchDelete error',(done)=>{
    const gen = cloneableGenerator(saga.fetchDelete)(actionDelete)
    expect(gen.next().value).toEqual(call(Api.fetchDelete,actionDelete.payload))
    let clone = gen.clone()
    expect(clone.next({code:500,message:undefined}).value).toEqual(put(showError()))
    done()
  })

  it('saga fetchList error',(done)=>{
    const gen = cloneableGenerator(saga.fetchList)(actionList)
    expect(gen.next().value).toEqual(call(Api.fetchList,actionList.payload))
    let clone = gen.clone()
    expect(clone.next({code:500,message:undefined}).value).toEqual(put(showError()))
    done()
  })
  
})
