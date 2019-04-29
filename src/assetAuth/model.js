import {ModuleModel} from 'mcf-module'

const {attr,BaseModel} = ModuleModel
// console.log(BaseModel,ModuleModel.BaseModel)
export const namespace = "assetAuth"
export default class AssetAuth extends BaseModel {
  static modelName=namespace
  static fields={}
  static options={
    idAttribute: 'id',
  }
}


  // console.log(Schedule.fields)
Object.assign(AssetAuth.fields,BaseModel.fields,{
  index: attr(),
  assetName: attr(),
  assetType: attr(),
  dbName: attr(),
  status: attr(),
  createTime: attr(),
  identityName: attr(),
  identityType: attr(),
  permission: attr()
})
