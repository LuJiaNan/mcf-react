import {ModuleModel} from 'mcf-module'

const {attr,BaseModel} = ModuleModel
export const namespace = "whiteName"

export default class WhiteName extends BaseModel {
  static modelName = namespace
  static fields={}
  static options={
    // idAttribute: 'serverId',
  }
}


Object.assign(WhiteName.fields,BaseModel.fields,{
    ip:attr(),
    ipWhiteListStr:attr(),
})
