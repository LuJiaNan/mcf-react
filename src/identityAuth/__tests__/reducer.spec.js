import reducer,{initialState,reducerActions as actions} from '../reducer'

describe("reducerActions", () => {
  const initialState = {
      item: {},
      items: [],
      page: {
        current: 1,
        total: 0
      }
  }

  it("查看reducer是否包含两个方法", (done) => {
    expect(actions).toHaveProperty('saveListType')
    done()
  });


  it('验证reducer的初始化state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        ...initialState,
        type: 'allow'
      }
    )
  })

  it('验证saveListType方法', () => {
    const payload = {
      type:'prohibit'
    }
    const action = actions.saveListType(payload.type);
    expect(reducer(initialState,action)).toEqual(Object.assign({},initialState,payload))
  })
});
