import { FetchUtils } from 'mcf-utils'

export function fetchList(params){
  return  FetchUtils.fetchList(`/asset/list`,{
     body: params
  })
}

export function fetchItem(params){
  return  FetchUtils.fetchGet(`/asset/list/:id`,{
     body: params
  })
}

export function fetchSave(params){
  return  FetchUtils.fetchPost(`/asset/list/:id`,{
     body: params
  })
}

export function fetchUpdate(params){
  return  FetchUtils.fetchPost(`/asset/list/update`,{
     body: params
  })
}


export function fetchDelete(params){
  return  FetchUtils.fetchPost(`/asset/:id/delete`,{
     body: params
  })
}

