import {ModuleModel} from 'mcf-module'

const {attr,BaseModel} = ModuleModel
export const namespace = "svcmgr"

export default class svcmgr extends BaseModel {
  static modelName = namespace
  static fields={}
  static options={
    // idAttribute: 'serverId',
  }
}


Object.assign(svcmgr.fields,BaseModel.fields,{
    displayName:attr(),
    status:attr(),
    runTime:attr(),
})
