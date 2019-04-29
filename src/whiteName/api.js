import { FetchUtils } from 'mcf-utils'

export function fetchList(params){
  return  FetchUtils.fetchList(`/capaa/v1/probe/ipwhitelist`,{
     body: params
  })
}

export function fetchItem(params){
  return  FetchUtils.fetchGet(`/capaa/v1/probe/ipwhitelist/:id`,{
     body: params
  })
}

export function fetchSave(params){
  return  FetchUtils.fetchPost(`/capaa/v1/probe/ipwhitelist`,{
     body: params
  })
}

export function fetchUpdate(params){
  return  FetchUtils.fetchPost(`/capaa/v1/probe/ipwhitelist/:id?cmd=update`,{
     body: params
  })
}


export function fetchDelete(params){
  return  FetchUtils.fetchPost(`/capaa/v1/probe/ipwhitelist/:id?cmd=delete`,{
     body: params
  })
}

export function fetchIpList(params){
  return  FetchUtils.fetchGet(`/capaa/v1/probe/list`,{
    body: params
 })
}


