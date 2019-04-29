import {ModuleModel} from 'mcf-module'

const {attr,BaseModel} = ModuleModel
// console.log(BaseModel,ModuleModel.BaseModel)
export const namespace = "sensitivedata"
export default class SensitiveData extends BaseModel {
  static modelName=namespace
  static fields={}
  static options={
    idAttribute: 'id',
  }
}


  // console.log(Schedule.fields)
Object.assign(SensitiveData.fields,BaseModel.fields,{
  id: attr(),
  assetName: attr(),
  owner: attr(),
  assetType: attr(),
  memberNum: attr(),
  dbName: attr(),
  sensitiveRank: attr(),
  auditRank: attr(),
  strategy: attr(),
  createTime: attr()
})
