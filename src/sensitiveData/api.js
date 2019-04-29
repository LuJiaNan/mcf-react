import { FetchUtils } from 'mcf-utils'

export function fetchList(params){
  return  FetchUtils.fetchList(`/sensitive/list`,{
     body: params
  })
}

export function fetchItem(params){
  return  FetchUtils.fetchGet(`/sensitive/list/:id`,{
     body: params
  })
}

export function fetchSave(params){
  return  FetchUtils.fetchPost(`/sensitive/list/update`,{
     body: params
  })
}


export function fetchDelete(params){
  return  FetchUtils.fetchPost(`/sensitive/list/delete`,{
     body: params
  })
}