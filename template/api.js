import { FetchUtils } from 'mcf-utils'

export function fetchList(params){
  return  FetchUtils.fetchList(`{@& api_prefix@}`,{
     body: params
  })
}

export function fetchItem(params){
  return  FetchUtils.fetchGet(`{@& api_prefix@}/:id`,{
     body: params
  })
}

export function fetchSave(params){
  return  FetchUtils.fetchPost(`{@& api_prefix@}/:id`,{
     body: params
  })
}

export function fetchUpdate(params){
  return  FetchUtils.fetchPost(`{@& api_prefix@}/:id`,{
     body: params
  })
}


export function fetchDelete(params){
  return  FetchUtils.fetchPost(`{@& api_prefix@}/:id`,{
     body: params
  })
}
