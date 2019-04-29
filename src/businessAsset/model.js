import {ModuleModel} from 'mcf-module'

const {attr,BaseModel} = ModuleModel
export const namespace = "businessAsset"
export default class BusinessAsset extends BaseModel {
  static modelName=namespace
  static fields={}
  static options={
  }
}


Object.assign(BusinessAsset.fields,BaseModel.fields,{
  createTime: attr(),
  id: attr(),
  name: attr(),
  dbName:attr(),
  owner: attr(),
  type:attr(),
  sensitiveLevel:attr(),
  riskScope: attr(),
  count:attr(),
  
  blockingMode: attr(),
  sensitive: attr(),
  auditLevel: attr(),
  czAdd: attr(),
  czDelete: attr(),
  czEdit: attr(),
  czSelect: attr(),
  czMerge: attr(),
  accessRate: attr(),
  returnCount: attr(),
  // props:fk('BusinessAssetProp',"propid")
})

export class BusinessAssetProp extends BaseModel{
  static modelName="businessAssetProp"
  static fields={}
  static options={
  }
}
Object.assign(BusinessAssetProp.fields,BaseModel.fields,{
  id: attr(),
  prop1:attr(),
  prop2:attr(),
  prop3:attr()
})
