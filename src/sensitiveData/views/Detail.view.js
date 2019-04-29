import React from 'react'
import {Button} from 'antd'
import {DetailTable,Panel} from 'mcf-components'
import {ViewPage} from 'mcf-crud'
import filesize from 'filesize'

export default class DetailView extends ViewPage{
  componentDidMount(){
		const {actions,match:{params}}=this.props
    actions.fetchItem({id:params.id})
    // actions.itemAction({id:match.params.id)
  }
  handleCancel(values){
    // const {history} = this.props
    // history.goBack()
    this.goBack()
  }
  getSearchParams(){
    const {location:{search}} = this.props
    return new URLSearchParams(search.substring(1))
  }

  render(){
    const {item,locale,dicts} = this.props
    const basic= item.basic ||{}
    const source=[{
      name:locale('serverName.label'),
      value:basic.serverName
    },{
      name:locale('serverStatus.label'),
      value:dicts("svc_search_biz_ServerStatus", basic.serverStatus)
    },{
      name:locale('serverIp.label'),
      value:basic.serverIp
    },{
      name:locale('serverPort.label'),
      value:basic.serverPort
    },{
      name:locale('capacity.label'),
      value:basic.capacity
    },{
      name:locale('usedcapacity.label'),
      value:filesize(basic.usedcapacity||0)
    }]
    return(
      <Panel title="详情页" footer={()=><Button type="primary" onClick={this.handleCancel.bind(this,"handleCancel")}>返回</Button>}>
        <DetailTable title={locale('baseInfo.title')} dataSource={source} columnNumber={2} />
      </Panel>
    )
  }
}
