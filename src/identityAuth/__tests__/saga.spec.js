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
  beforeEach(() => {

  })

  it('saga fetchDelete success',(done)=>{
    const action={
      payload:{
          id: ['1','2'],
          parentId: '3' 
      },
    }
    const gen = cloneableGenerator(saga.fetchDelete)(action)
    const payload = {ids:[].concat(action.payload.id),parentId:action.payload.parentId}
    expect(gen.next().value).toEqual(call(Api.fetchDelete,payload))
    let clone =gen.clone()

    expect(clone.next({code:0}).value).toEqual(put(showSuccess()))
    // console.dir(typeof(clone.next({code:0}).value))
    // console.dir(typeof(put(showSuccess())))
    // console.log(clone.next({code:0}).value)
    // console.log(put(showSuccess()))
    done()
  })

  it('saga fetchDelete error',(done)=>{
    const action={
      payload:{
          id: ['1','2'],
          parentId: '3' 
      },
    }
    const gen = cloneableGenerator(saga.fetchDelete)(action)
    const payload = {ids:[].concat(action.payload.id),parentId:action.payload.parentId}
    expect(gen.next().value).toEqual(call(Api.fetchDelete,payload))
    let clone =gen.clone()
    expect(clone.next({code:500,message:undefined}).value).toEqual(put(showError()))
    done()
  })

  it('saga fetchPermission success',(done)=>{
    const action={
      payload:{
          id: 1
      }
    }
    const gen = cloneableGenerator(saga.fetchPermission)(action)
    expect(gen.next().value).toEqual(call(Api.fetchPermission,action.payload))
    let clone =gen.clone()
    expect(JSON.stringify(clone.next({code:0}).value)).toEqual(JSON.stringify(saga.refreshPage(action)))
    // console.log(typeof(clone.next({code:0}).value))
    // console.log(typeof(saga.refreshPage(action)))
    done()
  })

  it('saga fetchPermission error',(done)=>{
    const action={
      payload:{
          id: 1
      }
    }
    const gen = cloneableGenerator(saga.fetchPermission)(action)
    expect(gen.next().value).toEqual(call(Api.fetchPermission,action.payload))
    let clone =gen.clone()
    expect(clone.next({code:500,message:undefined}).value).toEqual(put(showError()))
    done()
  })

  it('saga changeListType',(done)=>{
    const action={
      payload:'a'
    }
    const gen = cloneableGenerator(saga.changeListType)(action)
    expect(gen.next().value).toEqual(put(reducerActions.saveListType(action.payload)))
    done()
  })

})
