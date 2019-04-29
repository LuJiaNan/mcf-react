import React from 'react'
import { Button, Select } from 'antd'
import { ListPage } from 'mcf-crud'
import { ButtonGroups, AdvancedSearch, DataTable,Panel } from 'mcf-components'

export default class ListView extends ListPage {
  componentWillMount() {
    this.handleFilter(this.searchParams())
  }
  handleFilter(params) {
    const { actions } = this.props
    this.clearSelectRows()
    actions.fetchPage(params)
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
    } else if (actionType === 'delete') {
      console.error('delete'+rowkeys)
      actions.fetchDelete(rowkeys)
    }
    this.clearSelectRows()
  }

  
  renderOptionItem(item, idx) {
    return <Select.Option key={idx} value={item.value}>{item.label}</Select.Option>
  }
  renderOptionComponyItem(item, idx) {
    return <Select.Option key={idx} value={item.id}>{item.serverName}</Select.Option>
  }
  renderSearchForm() {
    const { item,actions,spins,locale } = this.props
    const query = this.searchParams()
    return (
        <AdvancedSearch loading={spins(actions.fetchPage)} filterSubmitHandler={this.handleFilter.bind(this)}>
            <Select label={locale("dbname.label")} name='dbname' placeholder={locale('GLOBAL.ALL')}/>
            <Select label={locale("sensitiverank.label")} name='sensitiveRank' placeholder={locale('GLOBAL.ALL')}/>
            <Select label={locale("strategy.label")} name='strategy' placeholder={locale('GLOBAL.ALL')}/>
            <Select label={locale("assetmember.label")} name='strategy' placeholder={locale('GLOBAL.ALL')}/>
        </AdvancedSearch>
    )
  }
  renderToolbar() {
    const { selectedRowKeys } = this.state
    const { spins,actions,locale } = this.props
    return (
      <ButtonGroups handleClick={this.handlerMenu.bind(this,selectedRowKeys)}>
				<Button actionkey="add" type="primary" >{locale("GLOBAL.NEW")} </Button>
				<Button actionkey="delete" loading={spins(actions.fetchDelete)} confirm={locale('delete.confirm')} disabled={this.selectMultiple()}>
          {locale("GLOBAL.REMOVE")}
				</Button>
		  </ButtonGroups>)
  }
  renderDataTable() {
    const { reducer: { page }, items, actions, spins, locale,dicts } = this.props
    let tableConf = {
      rowKey: "id",
      dataSource: items,
      onChange: this.onChange.bind(this),
      loading: spins(actions.fetchPage),
      columns: [{
        title: locale('column.assetName'),
        key: "assetName",
        dataIndex: "assetName",
      }, {
        title: locale('column.owner'),
        key: "owner",
        dataIndex: "owner",
        width: 120,
        // render: (text, row) => dicts("svc_search_biz_ServerStatus", text)
      }, {
        title: locale('column.assetType'),
        key: "assetType",
        dataIndex: "assetType",
        width: 140,
      }, {
        title: locale('column.memberNum'),
        key: "memberNum",
        dataIndex: "memberNum",
        width: 100,
      }, {
        title: locale('dbname.label'),
        key: "dbName",
        dataIndex: "dbName",
        width: 100,
      }, {
        title: locale('sensitiverank.label'),
        key: "sensitiveRank",
        dataIndex: "sensitiveRank",
        width: 100,
      }, {
        title: locale('column.auditRank'),
        key: "auditRank",
        dataIndex: "auditRank",
        width: 100,
      }, {
        title: locale('column.strategy'),
        key: "strategy",
        dataIndex: "strategy",
        width: 100,
      }, {
        title: locale('column.createTime'),
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
						<Button actionkey="edit">{locale("GLOBAL.MODIFY")}</Button>
						<Button actionkey="delete" confirm={locale('delete.confirm')}>
              {locale("GLOBAL.REMOVE")}</Button>
            <Button actionkey="assetMember">{locale("member.manage")}</Button>
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
        {this.renderToolbar()}
        {this.renderDataTable()}
      </Panel>
    )
  }
}
