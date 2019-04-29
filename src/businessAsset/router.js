import React from 'react'
import { Route,Switch } from 'react-router'
import {Redirect } from 'react-router-dom'
import * as Containers from './container'
import * as assetMember from '../assetMember'
import {TabsPanel,Panel} from 'mcf-components'

function editTabsPanel(props){
  // console.log(Containers.FormContainer)
  return (
    <TabsPanel {...props} paramName="editType">
     <Panel title="身份授权1" path="step1">
       {React.createElement(Containers.FormContainer,props)}
     </Panel>
     <Panel title="资产授权2" path="step2">
       {React.createElement(assetMember.container.FormContainer,props)}
     </Panel>
    </TabsPanel>
  )
}

function detailTabsPanel(props){
  // console.log(Containers.FormContainer)
  return (
    <TabsPanel {...props} paramName="detailType">
     <Panel title="详情页" path="detail" >
       {React.createElement(Containers.DetailContainer,props)}
     </Panel>
     <Panel title="成员列表" path="assetMember">
       {React.createElement(assetMember.default,props)}
     </Panel>
    </TabsPanel>
  )
}


export default function(props) {
  const {match:{path}} =props
  return (
    <Switch>
      <Route path={`${path}`} exact={true} component={Containers.ListContainer} />
      <Route path={`${path}/add`}  component={Containers.FormContainer} />
      <Route path={`${path}/:id/edit`} component={Containers.FormContainer} />
    {/*  <Route path={`${path}/:pid/assetMember`} component={assetMember.default} /> */}
      <Route path={`${path}/:id/edit/:editType`} component={editTabsPanel} />      
      {/* <Redirect from={`${path}/:id/edit`}  to={`${path}/:id/edit/step1`} /> */}
      <Route path={`${path}/:id/:detailType`} component={detailTabsPanel} />
      <Redirect from={`${path}/:id`}  to={`${path}/:id/detail`} />
    </Switch>
  )
}
