import { FetchUtils } from 'mcf-utils'

export function fetchList(params){
  return  FetchUtils.fetchList(`/assetManage/dataAssets`,{
     body: params
  })
}

export function fetchItem(params){
  return  FetchUtils.fetchGet(`/assetManage/dataAssets/:id`,{
     body: params
  })
}

export function fetchSave(params){
  return  FetchUtils.fetchPost(`/assetManage/dataAssets/save`,{
     body: params
  })
}

export function fetchUpdate(params){
  return  FetchUtils.fetchPost(`/assetManage/dataAssets/update`,{
     body: params
  })
}

export function fetchDelete(params){
  return  FetchUtils.fetchPost(`/assetManage/dataAssets/delete`,{
     body: params
  })
}
