import React from 'react'
import {Button} from 'antd'
import {DetailTable,Panel} from 'mcf-components'
import {ViewPage} from 'mcf-crud'

export default class DetailView extends ViewPage{
  componentDidMount(){
		const {actions,match:{params}}=this.props
    actions.fetchItem({id:params.id})
  }
  handleCancel(values){
    this.goBack()
  }
  getSearchParams(){
    const {location:{search}} = this.props
    return new URLSearchParams(search.substring(1))
  }

  render(){
    const {item,locale,dicts} = this.props
    const basic= item.basic ||{}
    const baseinfo=[{
      name:locale('form.baseinfo.name'),
      value:basic.name
    },{
      name:locale('form.baseinfo.dbName'),
      value:basic.dbName
    },{
      name:locale('form.baseinfo.owner'),
      value:basic.owner
    },{
      name:locale('form.baseinfo.riskScope'),
      value:basic.riskScope
    },{
      name:locale('form.baseinfo.blockingMode'),
      value:basic.blockingMode
    },{
      name:locale('form.baseinfo.sensitive'),
      value:basic.sensitive
    },{
      name:locale('form.baseinfo.auditLevel'),
      value:basic.auditLevel
    }]
    const czinfo=[{
      name:locale('form.cz.czAdd'),
      value:basic.czAdd
    },{
      name:locale('form.cz.czDelete'),
      value:basic.czDelete
    },{
      name:locale('form.cz.czEdit'),
      value:basic.czEdit
    },{
      name:locale('form.cz.czSelect'),
      value:basic.czSelect
    },{
      name:locale('form.cz.czMerge'),
      value:basic.czMerge
    }]
    const advancedSetinfo=[{
      name:locale('form.advancedSet.accessRate.status'),
      value:basic.status
    },{
      name:locale('form.advancedSet.accessRate.num'),
      value:basic.num
    },{
      name:locale('form.advancedSet.accessRate.cyc'),
      value:basic.cyc
    },{
      name:locale('form.advancedSet.accessRate.action'),
      value:basic.action
    },{
      name:locale('form.advancedSet.returnCount.status'),
      value:basic.status
    },{
      name:locale('form.advancedSet.returnCount.num'),
      value:basic.num
    }]
    return(
      <Panel title="详情页" footer={()=><Button type="primary" onClick={this.handleCancel.bind(this,"handleCancel")}>返回</Button>}>
        <DetailTable title={locale('form.baseinfo.title')} dataSource={baseinfo} columnNumber={2} />
        <DetailTable title={locale('form.cz.title')} dataSource={czinfo} columnNumber={2} />
        <DetailTable title={locale('form.advancedSet.title')} dataSource={advancedSetinfo} columnNumber={2}/>
      </Panel>
    )
  }
}
