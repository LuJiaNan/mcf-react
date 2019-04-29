import React from 'react'
import { call,put } from 'redux-saga/effects'
import { cloneableGenerator } from 'redux-saga/utils'
import {ModuleSaga,ModuleMiddleware,ModuleRouter} from 'mcf-module'
import SagaRoot,{saga,sagaActions } from '../saga'
import {reducerActions} from '../reducer'
import * as Api  from '../api'

// const {showSuccess,showError} =ModuleMiddleware
// const { goBack } = ModuleRouter

describe('saga 单元测试', () => {
  // case1
  // 通过查找存在 Input,测试组件正常渲染

  it('saga 单元测试',(done)=>{
    const gen = cloneableGenerator(SagaRoot)()
    gen.next()
    expect(gen.next().done).toBe(true)
    done()
  })


})
