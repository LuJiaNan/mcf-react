import React from 'react'
import { Button } from 'antd'
import { ListPage } from 'mcf-crud'
import { ButtonGroups,  DataTable} from 'mcf-components'

export default class  extends ListPage {
  renderDataTable = () =>{
    const { item,actions,spins,locale } = this.props
    const columns = item.columnList || []  
    let tableConf = {
      rowKey: "id",
      dataSource: columns,
      loading: spins(actions.fetchPage),
      columns: [{
        title: locale('columnId.label'),
        key: "id",
        dataIndex: "id",
      }, {
        title: locale('columnName.label'),
        key: "name",
        dataIndex: "name",
        width: 200
      }, {
        title: locale('columnType.label'),
        key: "type",
        dataIndex: "type",
        width: 100,
      }, {
        title: locale('busnissType.label'),
        key: "busnissType",
        dataIndex: "busnissType",
        width: 80
      }, {
        title: locale('columnSensitiveFlag.label'),
        key: "columnSensitiveFlag",
        dataIndex: "columnSensitiveFlag",
        width: 80
      }, {
        title: locale('sensitive.label'),
        key: "sensitive",
        dataIndex: "sensitive",
        width: 80
      }, {
        title: locale('GLOBAL.COLUMNS.OPTIONS'),
        key: "type",
        dataIndex: "type",
        width: 250,
        render: (text, row, index) => {
          return (
          <ButtonGroups handleClick={this.handlerMenu.bind(this,row.id)} size="small">
            <Button actionkey="detail">{locale("GLOBAL.DETAIL")}</Button>
          </ButtonGroups>          
          )
        }
      }]
    }    
    return (<DataTable  {...this.mergeTableConfig(tableConf)}/>)
  }
  render() {
    return(
        this.renderDataTable()
    )
    
  }
}
