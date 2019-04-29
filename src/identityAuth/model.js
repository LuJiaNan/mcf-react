import {ModuleModel} from 'mcf-module'

const {attr,BaseModel} = ModuleModel
// console.log(BaseModel,ModuleModel.BaseModel)
export const namespace = "identityAuth"
export default class IdentityAuth extends BaseModel {
  static modelName=namespace
  static fields={}
  static options={
    idAttribute: 'id',
  }
}


  // console.log(Schedule.fields)
Object.assign(IdentityAuth.fields,BaseModel.fields,{
  identityName: attr(),
  identityType: attr(),
  sensitiveRank: attr(),
  auditRank: attr(),
  createTime: attr({
    get: function(val){
      return '' + val 
    }
  }),
  assetName: attr(),
  assetType: attr(),
  dbName: attr(),
  status: attr(),
  permission: attr({
    get: function(arr){
      return arr&&arr.join('、') 
    }
  }),
  authNode: attr()
})
