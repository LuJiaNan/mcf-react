import React from 'react'
import { Button, Input, Select, Tabs } from 'antd'
import { ListPage } from 'mcf-crud'
import { ButtonGroups, AdvancedSearch, DataTable,Panel } from 'mcf-components'
const TabPane = Tabs.TabPane;
export default class ListView extends ListPage {
  componentDidMount() {
    const {actions,match:{params},reducer:{ type }}=this.props
    actions.fetchItem({id:params.id,type:'allow'})
  }
  handleFilter(param) {
    const {actions,match:{params},reducer:{ type }}=this.props
    actions.fetchItem()
  }
  getFetchItem(){
    const {actions,match:{params},reducer:{ type }}=this.props
    actions.fetchItem();
  }
  searchParams() {
    const { actions, querys } = this.props
    return querys(actions.fetchItem)
  }
  handlerMenu(rowkeys, actionType) {
    const {actions,match:{params}}=this.props
    if (actionType === 'add') {
      this.goRoutes('auth')
    } else if (actionType === 'edit') {
      this.goRoutes('edit')
    } else if (actionType === 'delete') {
      actions.fetchDelete({id:rowkeys,parentId:params.id})
    } else if (actionType === 'deleteAll') {
      console.log(actionType)
      actions.fetchDelete({id:[],parentId:params.id})
    }
    this.clearSelectRows()
  }
  changeAuthType (value) {
    const {actions,match:{params}}=this.props
    actions.changeListType(value);
    actions.fetchItem({id:params.id,type:value})
  }
  renderHeader() {
    const {reducer:{ type }}=this.props
    return(
      <div>
        <Tabs defaultActiveKey={type} onChange={this.changeAuthType.bind(this)}>
          <TabPane tab="允许列表" key="allow"></TabPane>
          <TabPane tab="禁止列表" key="prohibit"></TabPane>
        </Tabs>
      </div>
    )
  }
  renderSearchForm() {
    const { item,actions,spins,locale } = this.props
    const query = this.searchParams()
    return (
        <AdvancedSearch loading={spins(actions.fetchList)} filterSubmitHandler={this.handleFilter.bind(this)}>
            <Select label='数据库名' name='dbName' placeholder={locale('GLOBAL.ALL')} defaultValue="1"/>
            <Select label='资产集合类型' name='assetType' placeholder={locale('GLOBAL.ALL')} defaultValue="1"/>
        </AdvancedSearch>
    )
  }
  renderToolbar() {
    const { selectedRowKeys } = this.state
    const { spins,actions,locale } = this.props
    return (
        <ButtonGroups handleClick={this.handlerMenu.bind(this,selectedRowKeys)}>
          <Button actionkey="add" type="primary">
            {locale("GLOBAL.NEW")}
          </Button>
          <Button actionkey="delete" loading={spins(actions.fetchDelete)} confirm={locale('delete.confirm')} disabled={this.selectMultiple()}>
            {locale("GLOBAL.REMOVE")}
          </Button>
          <Button actionkey="deleteAll" loading={spins(actions.fetchDelete)} confirm={locale('deleteAll.confirm')}>
            清空
          </Button>
        </ButtonGroups>
      )
  }
  renderDataTable() {
    const { reducer: { page,type }, items, actions, spins, locale,dicts } = this.props
    let tableConf = {
      rowKey: "id",
      dataSource: items,
      onChange: this.onChange.bind(this),
      loading: spins(actions.fetchList),
      columns: [{
        title: '资产集合名称',
        key: "assetName",
        dataIndex: "assetName",
      }, {
        title: '资产集合类型',
        key: "assetType",
        dataIndex: "assetType",
      }, {
        title: '数据库名',
        key: "dbName",
        dataIndex: "dbName",
        width: 100,
      }, {
        title: '状态',
        key: "status",
        dataIndex: "status",
        width: 100,
      }, {
        title: '权限',
        key: "permission",
        dataIndex: "permission",
        width: 150,
        visible: type==="allow"
      }, {
        title: locale('GLOBAL.COLUMNS.OPTIONS'),
        key: "options",
        dataIndex: "options",
        width: 190,
        render: (text, row, index) => (
          <ButtonGroups handleClick={this.handlerMenu.bind(this,row.id)} size="small">
            {type==="allow"?<Button actionkey="edit">编辑</Button>:undefined}
            <Button actionkey="delete" loading={spins(actions.fetchDelete)} confirm={locale('asset.delete.confirm')}>删除</Button>
					</ButtonGroups>
        )
      }]
    }
    return (<DataTable  {...this.mergeTableConfig(tableConf)} page={page} showConfig={true}/>)
  }
  render() {
    return (
      <Panel footer={false}>
        {/* {this.renderHeader()} */}
        {this.renderSearchForm()}
        {this.renderToolbar()}
        {this.renderDataTable()}
      </Panel>
    )
  }
}
