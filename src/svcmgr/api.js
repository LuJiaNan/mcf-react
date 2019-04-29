import { FetchUtils } from 'mcf-utils'

export function fetchList(params){
  return  FetchUtils.fetchList(`/soc/sysmgr/svcmgr/services`,{
     body: params
  })
}

export function fetchOperate(params){
  return  FetchUtils.fetchPost(`/soc/sysmgr/svcmgr/service/:serviceName/execute/:actionType`,{
     body: params
  })
}

export function fetchRestartAll(params){
  return  FetchUtils.fetchPost(`/soc/sysmgr/svcmgr/services/execute/restart`,{
     body: params
  })
}
