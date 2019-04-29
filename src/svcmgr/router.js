import React from 'react'
import { Route,Switch } from 'react-router'
import * as Containers from './container'

export default function(props) {
  const {match:{path}} =props
  return (
    <Switch>
      <Route path={`${path}`} exact={true} component={Containers.ListContainer} />
    </Switch>
  )
}
