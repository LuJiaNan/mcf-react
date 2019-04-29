import React from 'react'
import { Route,Switch } from 'react-router'
import * as Containers from './container'

export default function(props) {
  const {match:{path}} =props
  return (
    <div>
      <Route path={`${path}`} exact={true} component={Containers.ListContainer} />
      <Route path={`${path}/add`}  component={Containers.FormContainer} />
      <Route path={`${path}/:id/edit`} component={Containers.FormContainer} />
      <Route path={`${path}/auth`} component={Containers.AuthorizeContainer} />
      <Route path={`${path}/:id/auth`} component={Containers.AuthorizeContainer} />
      <Route path={`${path}/:id`} component={Containers.DetailContainer} />
    </div>
  )
}
