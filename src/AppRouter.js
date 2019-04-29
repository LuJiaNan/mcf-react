import React,{PureComponent} from 'react'
import { Route, Switch } from 'react-router'
import {Redirect } from 'react-router-dom'
import {Panel,TabsPanel} from 'mcf-components'
import {registerModule,importModule} from './store'

const HomePage =() => <div>Home Page</div>

// importModule(import("./assetMember"))

function swtchTabsPanel(props){
  return (
    <TabsPanel {...props}>
     <Panel title="身份授权" path="identityAuth">
       {
        registerModule(import("./identityAuth"))
       }
     </Panel>
     <Panel title="资产授权" path="assetAuth">
       { registerModule(import("./assetAuth"))}
     </Panel>
     <Panel title="assetMember" path="assetMember">
       { registerModule(import("./assetMember"))}
     </Panel>
    </TabsPanel>
  )
}


export default class AppRouter extends PureComponent{
  render(){
    return (
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/businessAsset/:type" component={registerModule(import("./businessAsset"))} />
        <Route path="/assetMember" component={registerModule(import("./assetMember"))} />
        <Route path="/sensitiveData" component={registerModule(import("./sensitiveData"))} />
        <Route path="/identityAuth" component={registerModule(import("./identityAuth"))} />
        <Route path="/asset" component={registerModule(import("./asset"))} />
        <Route path="/whiteName" component={registerModule(import("./whiteName"))} />
        <Route path="/svcmgr" component={registerModule(import("./svcmgr"))} />
        <Route path="/switch/:type" component={swtchTabsPanel}/>
        <Redirect to="/" />
      </Switch>
    )
  }
}
