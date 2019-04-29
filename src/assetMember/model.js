import {ModuleModel} from 'mcf-module'

const {attr,BaseModel} = ModuleModel
export const namespace = "assetMember"
export default class AssetMember extends BaseModel {
  static modelName=namespace
  static fields={}
  static options={
  }

}


Object.assign(AssetMember.fields,BaseModel.fields,{
  id: attr(),
  schema: attr(),
  dbName: attr(),
  dbType: attr(),
  size: attr(),
  returnCount: attr(),
  accessCount: attr(),
  columnList:attr(),
  children:attr(),

  name:attr(),
  type:attr(),
  busnissType:attr(),
  columnSensitiveFlag:attr(),
  sensitive:attr(),
  
  assetType:attr(),
  columnCount:attr(),
  sensitiveColumnCount:attr(),
  accessRow:attr(),
  updateRow:attr(),
  updateCount:attr(),
  deleteRow:attr(),
  deleteCount:attr(),
  insertRow:attr(),
  insertCount:attr(),
  selectRow:attr(),
  selectCount:attr()


})
