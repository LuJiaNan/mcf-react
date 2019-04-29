import React from 'react'
import { Route,Switch } from 'react-router'
import * as Containers from './container'

export default function(props) {
  const {match:{path}} =props
  return (
    <div>
      <Route path={`${path}`}  component={Containers.ListContainer} />
      <Route path={`${path}/add`} exact={true}  component={Containers.FormContainer} />
      <Route path={`${path}/:id/edit`} exact={true} component={Containers.FormContainer} />
    </div>
  )
}
