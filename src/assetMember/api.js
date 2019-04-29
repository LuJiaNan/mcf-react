import { FetchUtils } from 'mcf-utils'

export function fetchList(params){
  return  FetchUtils.fetchList(`/assetManage/assetMember`,{
     body: params
  })
}

export function fetchItem(params){
  return  FetchUtils.fetchGet(`/assetManage/assetMember/:id`,{
     body: params
  })
}

export function fetchSave(params){
  return  FetchUtils.fetchPost(`/assetManage/assetMember/save`,{
     body: params
  })
}

export function fetchUpdate(params){
  // return  FetchUtils.fetchPost(`/assetManage/assetMember/update`,{
  //    body: params
  // })
}

export function fetchDelete(params){
  return  FetchUtils.fetchPost(`/assetManage/assetMember/delete`,{
     body: params
  })
}
