import React from 'react'
import { Button, Input, Select } from 'antd'
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
    if (actionType === 'restartAll') {
      actions.fetchRestartAll()
    } else {
      actions.fetchOperate({serviceName:rowkeys,actionType:actionType})
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
				<Input label={locale('advancedsearch.input.label')} name="keyword" defaultValue={query.keyword} placeholder={locale('advancedsearch.input.placeholder')}/>
			</AdvancedSearch>
    )
  }
  renderToolbar() {
    const { selectedRowKeys } = this.state
    const { spins,actions,locale } = this.props
    return (
      <ButtonGroups handleClick={this.handlerMenu.bind(this,selectedRowKeys)}>
				<Button actionkey="restartAll" type="primary" loading={spins(actions.fetchRestartAll)} confirmTitle={locale('restartall.confirmtitle')} confirm={locale('restartall.confirm')}>{locale('restartall.text')}</Button>
		  </ButtonGroups>)
  }
  renderDataTable() {
    const { reducer: { page }, items, actions, spins, locale } = this.props
    let tableConf = {
      rowKey: "displayName",
      dataSource: items,
      // title: () => this.renderToolbar(),
      onChange: this.onChange.bind(this),
      loading: spins(actions.fetchList),
      columns: [{
        title: locale('table.column.displayname'),
        key: "displayName",
        dataIndex: "displayName",
      }, {
        title: locale('table.column.status'),
        key: "status",
        dataIndex: "status",
      }, {
        title: locale('table.column.runtime'),
        key: "runTime",
        dataIndex: "runTime",
      }, {
        title: locale('GLOBAL.COLUMNS.OPTIONS'),
        key: "options",
        dataIndex: "options",
        width: 190,
        render: (text, row, index) => (
          <ButtonGroups handleClick={this.handlerMenu.bind(this,row.displayName)} size="small">
						<Button actionkey="restart" permission={row.status===1}>{locale('operate.button.restart')}</Button>
						<Button actionkey="stop" permission={row.status===1}>{locale('operate.button.stop')}</Button>
						<Button actionkey="start" permission={row.status===2}>{locale('operate.button.start')}</Button>
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
