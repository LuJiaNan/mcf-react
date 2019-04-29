import reducer,{initialState,reducerActions as actions} from '../reducer'

describe("reducerActionCreator", () => {
  const action={
    saveParams:"saveParams",
    saveList:"saveList",
    saveItem:"saveItem",
    deleteItem:"deleteItem",
    saveIpList: "saveIpList"
  }
  const defaultState = {
    items: [],
    item: {},
    //page meta
    page:{
      total: 0,
      current: 1
    }
  }
  console.log(actions)
  it("reducerActionCreator", (done) => {
    expect(initialState).toEqual(defaultState)
    done()
  });

  it("reducerActionCreator", (done) => {
    expect(actions).toHaveProperty('saveIpList')
    done()
  });
});