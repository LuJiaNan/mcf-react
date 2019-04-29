import React from 'react'
import { Button, Input } from 'antd'
import { ListPage } from 'mcf-crud'
import { ButtonGroups, AdvancedSearch, DataTable,Panel } from 'mcf-components'
import { TimeoutError } from 'rxjs';

export default class ListView extends ListPage {
  componentWillMount() {
    console.log(this.props)
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
    } else if (actionType === 'edit') {
      this.goEdit(rowkeys)
    } else if (actionType === 'detail') {
      this.goDetail(rowkeys)
    } else if (actionType === 'delete') {
      actions.fetchDelete(rowkeys)
    } else if (actionType === 'assetMember') {
        this.goRoutes(`${rowkeys}/assetMember`)
    }
    this.clearSelectRows()
  }
  renderSearchForm() {
    const { actions,spins,locale,match:{params} } = this.props
    const query = this.searchParams()
    return (
      <AdvancedSearch loading={spins(actions.fetchPage)} filterSubmitHandler={this.handleFilter.bind(this)} >
        <Input label={locale('dbName.label')} name="dbName" defaultValue={query.dbName} />
				<Input label={locale('riskScope.label')} name="riskScope" defaultValue={query.riskScope} />
        <Input label={locale('assetMembers.label')} name="assetMembers" defaultValue={query.assetMembers} />
        <Input renderable={()=>params.type === "sen"} label={locale('sensitiveLevel.label')} name="sensitiveLevel" defaultValue={query.sensitiveLevel} />
			</AdvancedSearch>
    )
  }
  renderToolbar() {
    const { selectedRowKeys } = this.state
    const { spins,actions,locale } = this.props
    return (
      <ButtonGroups handleClick={this.handlerMenu.bind(this,selectedRowKeys)}>
				<Button actionkey="add" type="primary">{locale("GLOBAL.NEW")} </Button>
				<Button actionkey="delete" loading={spins(actions.fetchDelete)} confirm={locale('delete.confirm')} disabled={this.selectMultiple()}>
          {locale("GLOBAL.REMOVE")}
				</Button>
		  </ButtonGroups>)
  }
  renderDataTable() {
    const { reducer: { page }, items, actions, spins, locale,match:{params} } = this.props
    let tableConf = {
      rowKey: "id",
      dataSource: items,
      onChange: this.onChange.bind(this),
      loading: spins(actions.fetchPage),
      showConfig: true,
      columns: [{
        title: locale('name.label'),
        key: "name",
        dataIndex: "name"
      }, {
        title: locale('owner.label'),
        key: "owner",
        dataIndex: "owner",
        width: 100
      }, {
        title: locale('dbName.label'),
        key: "dbName",
        dataIndex: "dbName",
        width: 150,
      }, {
        title: locale('count.label'),
        key: "count",
        dataIndex: "count",
        width: 80
      },{
        title: locale('type.label'),
        key: "type",
        dataIndex: "type",
        width: 80,
        visible: params.type === "sen"
      },{
        title: locale('sensitiveLevel.label'),
        key: "sensitiveLevel",
        dataIndex: "sensitiveLevel",
        width: 80,
        visible: params.type === "sen"
      },{
        title: locale('auditLevel.label'),
        key: "auditLevel",
        dataIndex: "auditLevel",
        width: 80
      }, {
        title: locale('riskScope.label'),
        key: "riskScope",
        dataIndex: "riskScope",
        width: 80
      }, {
        title: locale('createTime.label'),
        key: "createTime",
        dataIndex: "createTime",
        width: 130
      }, {
        title: locale('GLOBAL.COLUMNS.OPTIONS'),
        key: "options",
        dataIndex: "options",
        width: 120,
        render: (text, row, index) => (
          <ButtonGroups handleClick={this.handlerMenu.bind(this,row.id)} size="small" viewMode='icon'>
            <Button actionkey="edit" icon="edit">{locale("GLOBAL.MODIFY")}</Button>
            <Button actionkey="detail" icon="bars">{locale("GLOBAL.DETAIL")}</Button>
            <Button actionkey="delete" icon="delete" confirm={locale('delete.confirm')}>{locale("cz.delete")}</Button>
            <Button actionkey="assetMember" icon="usergroup-add">{locale("cz.assetSet")}</Button>
          </ButtonGroups>
        )
      }]
    }
    return (<DataTable  {...this.mergeTableConfig(tableConf)} page={page} />)
  }
  render() {
    return (
      <Panel footer={false}>
        {this.renderSearchForm()}
        {this.renderToolbar()}
        {this.renderDataTable()}
      </Panel>
    )
  }
}
