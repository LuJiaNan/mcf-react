import { FetchUtils } from 'mcf-utils'

export function fetchList(params){
  return  FetchUtils.fetchList(`/identity/list`,{
     body: params
  })
}

export function fetchItem(params){
  return  FetchUtils.fetchGet(`/identity/list/:id`,{
     body: params
  })
}

export function fetchSave(params){
  return  FetchUtils.fetchPost(`/identity/list/:id`,{
     body: params
  })
}


export function fetchDelete(params){
  return  FetchUtils.fetchPost(`/identity/:parentId/delete`,{
     body: params
  })
}

export function fetchUpdateStatus(params){
  return  FetchUtils.fetchPost(`/identity/list/update`,{
     body: params
  })
}

//获取权限
export function fetchPermission(params){
  return  FetchUtils.fetchGet(`/identity/:id/permission`,{
     body: params
  })
}

// 编辑保存权限
export function fetchUpdatePermission(params){
  return  FetchUtils.fetchPost(`/identity/:id/permission`,{
     body: params
  })
}