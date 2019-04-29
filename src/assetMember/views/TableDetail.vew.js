import React from 'react'
import {DetailTable} from 'mcf-components'
import {ViewPage} from 'mcf-crud'

export default class TableView extends ViewPage{
  componentDidMount(){
		const {actions,match:{params}}=this.props
    actions.fetchItem({id:params.id})
  }

  render(){
    const {locale,items} = this.props
    const table = items.basic ||{}
    const tableinfo=[{
      name:locale('dbName.label'),
      value:table.name
    },{
      name:locale('assetType.label'),
      value:table.assetType
    },{
      name:locale('columnCount.label'),
      value:table.columnCount
    },{
      name:locale('sensitiveColumnCount.label'),
      value:table.sensitiveColumnCount
    },{
      name:locale('size.label'),
      value:table.size
    },{
      name:locale('returnCount.label'),
      value:table.returnCount
    },{
      name:locale('accessRow.label'),
      value:table.accessRowCount
    },{
      name:locale('accessCount.label'),
      value:table.accessCount
    },{
      name:locale('updateRow.label'),
      value:table.updateRow
    },{
      name:locale('updateCount.label'),
      value:table.updateCount
    },{
      name:locale('deleteRow.label'),
      value:table.deleteRow
    },{
      name:locale('deleteCount.label'),
      value:table.deleteCount
    },{
      name:locale('insertRow.label'),
      value:table.insertRow
    },{
      name:locale('insertCount.label'),
      value:table.insertCount
    },{
      name:locale('selectRow.label'),
      value:table.selectRow
    },{
      name:locale('selectCount.label'),
      value:table.selectCount
    }]
    
    return(
      <DetailTable title={locale('detail.tableTitel.title')} dataSource={tableinfo} columnNumber={2} />  
    )
  }
}
