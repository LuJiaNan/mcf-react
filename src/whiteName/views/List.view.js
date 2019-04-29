import React from 'react'
import { Button, Input, Select } from 'antd'
import { ListPage } from 'mcf-crud'
import { ButtonGroups, AdvancedSearch, DataTable,Panel } from 'mcf-components'
import McEllipsis from '../../../utils/mcEllipsis'

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
    } else if (actionType === 'edit') {
      this.goEdit(rowkeys)
    } else if (actionType === 'delete') {
      actions.fetchDelete({id:rowkeys})
    }
    this.clearSelectRows()
  }
  renderOptionItem(item, idx) {
    return <Select.Option key={idx} value={item.value}>{item.label}</Select.Option>
  }
  renderSearchForm() {
    const { actions,spins,locale } = this.props
    const query = this.searchParams()
    return (
      <AdvancedSearch loading={spins(actions.fetchList)} filterSubmitHandler={this.handleFilter.bind(this)} >
				<Input label={locale('ip.label')} name="ip" defaultValue={query.ipAddress} />
			</AdvancedSearch>
    )
  }
  renderToolbar() {
    const { selectedRowKeys } = this.state
    const { spins,actions,locale } = this.props
    return (
      <ButtonGroups handleClick={this.handlerMenu.bind(this,selectedRowKeys)}>
				<Button actionkey="add" type="primary" >{locale("GLOBAL.NEW")} </Button>
		  </ButtonGroups>)
  }
  renderDataTable() {
    const { reducer: { page }, items, actions, spins, locale } = this.props
    let tableConf = {
      rowKey: "id",
      dataSource: items,
      // title: () => this.renderToolbar(),
      onChange: this.onChange.bind(this),
      loading: spins(actions.fetchList),
      columns: [{
        title: locale('ip.label'),
        key: "ip",
        dataIndex: "ip",
      }, {
        title: locale('ipWhiteListStr.label'),
        key: "ipWhiteListStr",
        dataIndex: "ipWhiteListStr",
        render: (text) =>{
          return <McEllipsis text={text}></McEllipsis>
        }
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
