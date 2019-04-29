import React from 'react'
import {Button,Tabs} from 'antd'
import {Panel} from 'mcf-components'
import {ViewPage} from 'mcf-crud'
import ColumnDetail from './ColumnDetail.vew'
import TableDetail from './TableDetail.vew'

const TabPane = Tabs.TabPane;

export default class DetailView extends ViewPage{
  componentDidMount(){
		const {actions,match:{params}}=this.props
    actions.fetchItem({id:params.id})
  }
  handleCancel(values){
    this.goBack()
  }
  callback(key) {
    console.log(key);
  } 

  render(){
    const {locale} = this.props
    console.log(this.props);
    return(
      <Panel footer={()=><Button type="primary" onClick={this.handleCancel.bind(this,"handleCancel")}>返回</Button>}>
        <Tabs defaultActiveKey="tbale" onChange={this.callback}>
          <TabPane tab={locale('detail.tableTitel.title')} key="table">
            <TableDetail {...this.props} title={locale('detail.tableTitel.title')} columnNumber={2} />  
          </TabPane>
          <TabPane tab={locale('detail.columnTitle.title')} key="column">
            <ColumnDetail {...this.props} />
          </TabPane>
        </Tabs>
      </Panel>
    )
  }
}
