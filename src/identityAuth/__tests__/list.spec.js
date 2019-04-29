import List from '../views/List.view'
import React from 'react'
import { shallow } from 'enzyme'
import  locale  from '../locales'
import globalLocale from '../../../locales/zh-CN'

function setup() {
    const props = {
        items:[],
        actions: {
            fetchList: jest.fn()
        },
        querys: jest.fn(),
        spins: jest.fn(),
        dicts: jest.fn(),
        locale: function(key){
            return locale[key]?locale[key].defaultMessage:globalLocale[key]
        },
        reducer: {
            page: ''
        }
    }
  
    const enzymeWrapper = shallow(<List {...props}/>)
  
    return {
      props,
      enzymeWrapper,
    }
  }
  
  const { enzymeWrapper, props } = setup({ handleClick: jest.fn()});
  
  describe('各表单组件是否渲染', () => {
      it('身份名称和身份类型下拉是否存在', () => {
          expect(enzymeWrapper.find('Select[name="identityName"]').exists()).toEqual(true);
          expect(enzymeWrapper.find('Select[name="identityType"]').exists()).toEqual(true);
      })
      it('批量授权按钮是否存在', () => {
          expect(enzymeWrapper.find('Button[actionkey="authorizeMuti"]').exists()).toEqual(true)
          expect(enzymeWrapper.find('Button[actionkey="authorizeMuti"]').props().disabled).toEqual(true)
      })
  })