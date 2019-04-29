import React from 'react'
import { Button, Input, Select } from 'antd'
import { ListPage } from 'mcf-crud'
import { ButtonGroups, AdvancedSearch, DataTable,Panel, DetailTable } from 'mcf-components'

export default class ListView extends ListPage {
  componentWillMount() {
    this.handleFilter(this.searchParams())
  }
  handleFilter(params) {
    const { actions } = this.props
    this.clearSelectRows()
    actions.fetchList(params)
  }
  searchParams() {
    const { actions, querys } = this.props
    return querys(actions.fetchList)
  }
  handlerMenu(rowkeys, actionType) {
    const { actions } = this.props
    if (actionType === 'add') {
      this.goAdd()
    } else if (actionType === 'detail') {
      this.goDetail(rowkeys)
    }
    this.clearSelectRows()
  }
  renderSearchForm() {
    const { item,actions,spins,locale } = this.props
    const query = this.searchParams()
    return (
        <AdvancedSearch loading={spins(actions.fetchList)} filterSubmitHandler={this.handleFilter.bind(this)}>
            <Select label={locale("dbname.label")} name='dbname' placeholder={locale('GLOBAL.ALL')}/>
            <Select label={locale("assetType.label")} name='assetType' placeholder={locale('GLOBAL.ALL')}/>
        </AdvancedSearch>
    )
  }
  renderDataTable() {
    const { reducer: { page }, items, actions, spins, locale } = this.props
    let tableConf = {
      rowKey: "id",
      dataSource: items,
      onChange: this.onChange.bind(this),
      loading: spins(actions.fetchList),
      columns: [{
        title: locale("column.title.index"),
        key: "index",
        dataIndex: "index",
      }, {
        title: locale("column.title.assetName"),
        key: "assetName",
        dataIndex: "assetName",
      }, {
        title: locale("column.title.assetType"),
        key: "assetType",
        dataIndex: "assetType",
      }, {
        title: locale("column.title.dbName"),
        key: "dbName",
        dataIndex: "dbName",
        width: 100,
      }, {
        title: locale("column.title.status"),
        key: "status",
        dataIndex: "status",
        width: 100,
      }, {
        title: locale("column.title.createTime"),
        key: "createTime",
        dataIndex: "createTime",
        width: 150,
      }, {
        title: locale('GLOBAL.COLUMNS.OPTIONS'),
        key: "options",
        dataIndex: "options",
        width: 190,
        render: (text, row, index) => (
          <ButtonGroups handleClick={this.handlerMenu.bind(this,row.id)} size="small">
            <Button actionkey="detail">{locale("button.authSetting")}</Button>
					</ButtonGroups>
        )
      }]
    }
    return (<DataTable  {...this.mergeTableConfig(tableConf)} page={page}/>)
  }
  render() {
    return (
      <Panel footer={false}>
        {this.renderSearchForm()}
        {this.renderDataTable()}
      </Panel>
    )
  }
}
