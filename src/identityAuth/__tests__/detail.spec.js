import Detail from "../views/Detail.view";
import React from "react";
import { shallow, mount, render } from "enzyme";
import locale from "../locales";
import globalLocale from "../../../locales/zh-CN";
import Nav from "../views/Nav";
import PropTypes from "prop-types";
import renderer from "react-test-renderer"

function setup() {
  const props = {
    actions: {
      fetchItem: jest.fn(),
      saveListType: jest.fn(),
      changeAuthType: jest.fn(),
      changeListType: jest.fn(),
      handleFilter: jest.fn(),
      getFetchItem: jest.fn(),
      fetchDelete: jest.fn(),
      handlerMenu: jest.fn()
    },
    match: {
      params: {}
    },
    items:[],
    reducer: {
      type: ""
    },
    querys: jest.fn(),
    spins: jest.fn(),
    locale: function(key) {
      return locale[key] ? locale[key].defaultMessage : globalLocale[key];
    }
  };

  // const enzymeWrapper = shallow(<Detail {...props}/>,{disableLifecycleMethods: true})
  const shallowWrapper = shallow(<Detail {...props} a={1} />);
  const mountWrapper = mount(<Detail {...props} a={1} />);
  const renderWrapper = render(<Detail {...props} a={1} />);

  return {
    props,
    shallowWrapper,
    mountWrapper,
    renderWrapper
  };
}

describe("简单测试", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  it.skip("综合测试", done => {
    let { shallowWrapper, props } = setup();

    // console.log(shallowWrapper.debug());
    // console.log(mountWrapper.debug());
    // console.dir(renderWrapper.find('button[actionKey="delete"]').prop("type"));
    // console.log(shallowWrapper.instance().props)
    // expect(shallowWrapper.instance().props.a).toEqual(1);

    // shallowWrapper.instance().changeAuthType()
    // expect(props.actions.changeListType.mock.calls.length).toEqual(1)
    // expect(props.actions.fetchItem.mock.calls.length).toBe(3)

    done();
  });

  it.skip("测试 shallow 1000次", () => {
    for(var i=0;i<1000;i++){
      const nav = shallow(<Nav />);
      expect(nav.text()).toBe("首页");
    }
  });
  it.skip("测试 mount 1000次", () => {
    for(var i=0;i<1000;i++){
      const nav = mount(<Nav />);
      expect(nav.text()).toBe("首页");
    }
  });
  it.skip("测试 render 1000次", () => {
    for(var i=0;i<1000;i++){
      const nav = render(<Nav />);
      expect(nav.text()).toBe("首页");
    }
  });

  // it("测试三种比较方式", () => {
  //   const o = "a";
  //   const p = "a";
  //   const x = { a: { b: 3 } };
  //   const y = { a: { b: 3, c: undefined } };
  //   const m = [, 1];
  //   const n = [undefined, 1];

  //   expect(o).toBe(p);
  //   expect(o).toEqual(p);
  //   expect(o).toStrictEqual(p);
  //   expect(x).not.toBe(y);
  //   expect(x).toEqual(y);
  //   expect(x).not.toStrictEqual(y);
  //   expect(m).not.toBe(n);
  //   expect(m).toEqual(n);
  //   expect(m).toStrictEqual(n);
  // })

  it("renders correctly", () => {
    let { props } = setup();
    const tree = renderer.create(<Detail {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  })
  it('',()=>{
    console.log('')
  })
});

