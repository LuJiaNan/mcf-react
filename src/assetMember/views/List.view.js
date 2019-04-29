import React from 'react'
import { Button, Input } from 'antd'
import { ListPage } from 'mcf-crud'
import { ButtonGroups, AdvancedSearch, DataTable,Panel } from 'mcf-components'

export default class ListView extends ListPage {
  componentWillMount() {
     this.handleFilter(this.searchParams())
  }
  handleFilter(value) {
    const {actions,match:{params}} = this.props
    this.clearSelectRows()
    actions.fetchPage(Object.assign({},value,params))
  }
  searchParams() {
    const { actions, querys } = this.props
    return querys(actions.fetchPage)
  }
  handlerMenu(rowkeys, actionType) {
    const { actions } = this.props
    if (actionType === 'add') {
      this.goAdd()
    } else if (actionType === 'move') {
      // this.goEdit(rowkeys)
      this.goMove(rowkeys);
    } else if (actionType === 'detail') {
      this.goDetail(rowkeys)
    } else if (actionType === 'delete') {
      actions.fetchDelete(rowkeys)
    }
    this.clearSelectRows()
  }
  renderSearchForm() {
    const { actions,spins,locale } = this.props
    const query = this.searchParams()
    return (
      <AdvancedSearch loading={spins(actions.fetchPage)} filterSubmitHandler={this.handleFilter.bind(this)} >
				<Input label={locale('schema.label')} name="schema" defaultValue={query.schema} />
        <Input label={locale('dbName.label')} name="dbName" defaultValue={query.dbName} />
			</AdvancedSearch>
    )
  }
  renderToolbar() {
    const { selectedRowKeys } = this.state
    const { spins,actions,locale } = this.props
    return (
      <ButtonGroups handleClick={this.handlerMenu.bind(this,selectedRowKeys)}>
				<Button actionkey="add" type="primary" >{locale("GLOBAL.NEW")} </Button>
        <Button actionkey="move" loading={spins(actions.fetchDelete)} disabled={this.selectMultiple()}>
          迁移
				</Button>
        <Button actionkey="delete" loading={spins(actions.fetchDelete)} confirm={locale('delete.confirm')} disabled={this.selectMultiple()}>
          {locale("GLOBAL.REMOVE")}
				</Button>
		  </ButtonGroups>)
  }
  renderDataTable() {
    const { reducer: { page }, items, actions, spins, locale } = this.props
    console.log(items)
    let tableConf = {
      rowKey: "id",
      dataSource: items,
      onChange: this.onChange.bind(this),
      loading: spins(actions.fetchPage),
      columns: [{
        title: locale('schema.label'),
        key: "schema",
        dataIndex: "schema",
      }, {
        title: locale('dbName.label'),
        key: "dbName",
        dataIndex: "dbName",
        width: 200
      }, {
        title: locale('dbType.label'),
        key: "dbType",
        dataIndex: "dbType",
        width: 100,
      }, {
        title: locale('size.label'),
        key: "size",
        dataIndex: "size",
        width: 80
      }, {
        title: locale('returnCount.label'),
        key: "returnCount",
        dataIndex: "returnCount",
        width: 80
      }, {
        title: locale('accessCount.label'),
        key: "accessCount",
        dataIndex: "accessCount",
        width: 80
      }, {
        title: locale('GLOBAL.COLUMNS.OPTIONS'),
        key: "type",
        dataIndex: "type",
        width: 250,
        render: (text, row, index) => {
          return (
          text === 'table' ? 
          <ButtonGroups handleClick={this.handlerMenu.bind(this,row.id)} size="small">
            <Button actionkey="detail">{locale("GLOBAL.DETAIL")}</Button>
          </ButtonGroups>
          :
          <ButtonGroups handleClick={this.handlerMenu.bind(this,row.id)} size="small">
            <Button actionkey="delete" confirm={locale('delete.confirm')}>{locale("GLOBAL.REMOVE")}</Button>
          </ButtonGroups>
          )
        }
      }]
    }    
    return (<DataTable  {...this.mergeTableConfig(tableConf)} page={page} />)
  }
  render() {
    return (
      <Panel footer={()=><Button type="primary" onClick={this.goBack.bind(this)}>返回</Button>}>
        {this.renderSearchForm()}
        {this.renderToolbar()}
        {this.renderDataTable()}
      </Panel>
    )
  }
}
