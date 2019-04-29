import {ModuleModel} from 'mcf-module'

const {attr,BaseModel} = ModuleModel
export const namespace = "asset"

export default class asset extends BaseModel {
  static modelName = namespace
  static fields={}
  static options={
    // idAttribute: 'serverId',
  }
}


  // console.log(Schedule.fields)
Object.assign(asset.fields,BaseModel.fields,{
    assetName:attr(),
    assetType:attr(),
    dbName:attr(),
    status:attr(),
    createTime:attr(),
})
