import {fk,many} from 'redux-orm'
import {ModuleModel} from 'mcf-module'

const  {orm,createReducer,BaseModel,Attr,attr,session} =ModuleModel

describe('ORM initial', () => {
  //此处MOCK fetch  可以考虑与api  共用
  class TestModel extends BaseModel{
    static modelName="TestModel"
    static fields={}
  }

  Object.assign(TestModel.fields,BaseModel.fields,{
      id: attr(),
      serverName:attr(),
      serverStatus:attr(),
      serverIp:attr({
        get:function(val){
          return "http://"+val
        }
      }),
      serverPort:attr(),
      serverAddress:attr({
        get:function(val,row){
          return [row.serverIp,row.serverPort].join(":")
        }
      }),
      port:attr('serverPort'),
      serverStatusStr:attr({
        fieldName:'serverStatus',
        get:function(val){
          return val==="1"?"启用":"禁用"
        }
      }),
      // columns:many('TestPropModel','tableId')
  })


  class TestPropModel extends BaseModel{
    static modelName="TestPropModel"
    static fields={}
  }
  Object.assign(TestPropModel.fields,BaseModel.fields,{
      id: attr(),
      // tableId:attr(),
      // testModels:attr(),
      props2:attr(),
      props1:attr(),
  })

  orm.register(TestModel,TestPropModel)

  let session = orm.session({
    TestModel:{
      items:[],
      itemsById:{},
      meta:{}
    },
    TestPropModel:{
      items:[],
      itemsById:{},
      meta:{}
    }
  })
  const Test = session.TestModel
  const TestProp = session.TestModel
  var testModel=Test.create({
    id:"abc",
    serverName:"abd",
    serverStatus:"1",
    serverIp:"127.0.0.1",
    serverPort:"8080",
    ip:"address",
  })

  it('testModel createModel',(done)=>{

    expect(testModel.serverName).toBe("abd")
    done()
  })

  it("testModel serverStatusStr",(done)=>{
    expect(testModel.serverStatusStr).toBe("启用")
    done()
  })

  it('testModel serverIp has value ',(done)=>{
    // console.log(testModel.serverIp)
    expect(testModel.serverIp).toBe("http://127.0.0.1")
    done()
  })

  it('testModel port <-serverPort ',(done)=>{
    expect(testModel.port).toBe("8080")
    done()
  })

  it('testModel serverAddress = {serverIp}:{serverPort}',(done)=>{
    expect(testModel.serverAddress).toBe("127.0.0.1:8080")
    done()
  })
  it('testModel serverName set',(done)=>{
    testModel.serverName="abc"
    let t1=Test.all().toModelArray()[0]
    // console.log(t1['serverAddress'])
    expect(t1.serverAddress).toBe("127.0.0.1:8080")
    done()
  })

  it('testModel update column',(done)=>{
    let t1=Test.withId("abc")

    t1.update({
      id:"abc",
      serverName:"变大了"
    })
    done()
    // console.log(t1.toData())
  })

  it('testModel fk',(done)=>{

    let t1=Test.withId("abc")
    let t2 = TestProp.create({
      id:1,
      tableId:"abc",
      props1:"aa",
      props2:"bb"
    })
    console.log(t1,t2)

    done()
  })
})
