import React from 'react'
import { Button, Input, Select } from 'antd'
import { ListPage } from 'mcf-crud'
import { ButtonGroups, AdvancedSearch, DataTable,Panel } from 'mcf-components'

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
    } else if (actionType === 'authorizeMuti') {
      this.goRoutes('auth')
      // actions.fetchAuth(rowkeys)
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
        <AdvancedSearch loading={spins(actions.fetchList)} filterSubmitHandler={this.handleFilter.bind(this)}>
            <Select label='身份名称' name='identityName' placeholder={locale('GLOBAL.ALL')}/>
            <Select label='身份类型' name='identityType' placeholder={locale('GLOBAL.ALL')}/>
        </AdvancedSearch>
    )
  }
  renderToolbar() {
    const { selectedRowKeys } = this.state
    const { spins,actions,locale } = this.props
    return (
      <ButtonGroups handleClick={this.handlerMenu.bind(this,selectedRowKeys)}>
				<Button actionkey="authorizeMuti" disabled={this.selectMultiple()}>
          批量授权
				</Button>
		  </ButtonGroups>)
  }
  renderDataTable() {
    const { reducer: { page }, items, actions, spins, locale,dicts } = this.props
    let tableConf = {
      rowKey: "id",
      dataSource: items,
      onChange: this.onChange.bind(this),
      loading: spins(actions.fetchList),
      columns: [{
        title: '身份名称',
        key: "identityName",
        dataIndex: "identityName",
      }, {
        title: '身份类型',
        key: "identityType",
        dataIndex: "identityType",
      }, {
        title: '敏感标签',
        key: "sensitiveRank",
        dataIndex: "sensitiveRank",
        width: 100,
      }, {
        title: '审计级别',
        key: "auditRank",
        dataIndex: "auditRank",
        width: 100,
      }, {
        title: '创建时间',
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
            <Button actionkey="detail">权限设置</Button>
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
