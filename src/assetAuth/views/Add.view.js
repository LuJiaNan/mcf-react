import React from 'react'
import {Select,TreeSelect, Checkbox,Button,Table,Modal} from 'antd'
import {FormPage} from 'mcf-crud'
import {Panel,BaseForm,FormItem,ButtonGroups} from 'mcf-components'

export default class FormView extends FormPage{
	state = {
		visible: false
	}
	componentDidMount(){
		const {actions,match:{params}}=this.props
		if(params.id){
			actions.fetchItem({id:params.id})
		}
	}
	handlerMenu(rowkeys, actionType) {
		const { actions } = this.props
		if (actionType === 'delete') {
		  console.log('删除')
		} else if (actionType === 'edit') {
			console.log('编辑')
		}
	}
	handleSubmit(values){
		const { actions,match: {params}} = this.props
		console.log(Object.assign({id:params.id},values))
		actions.fetchSave(Object.assign({id:params.id},values))
	}
	handleCancel(values){
		this.goBack()
	}
	handleAdd(form,value){
		console.log(value)
		console.log(form)
	}
	renderOptionItem(item,idx){
		return <Select.Option key={idx} value={item.value}>{item.label}</Select.Option>
	}
	renderDataTable() {
		const { reducer: { page }, items, actions, spins, locale } = this.props
		let tableConf = {
		  rowKey: "id",
		  dataSource: items,
		  columns: [{
			title: '身份名称',
			key: "identityName",
			dataIndex: "identityName",
		  }, {
			title: '身份类型',
			key: "identityType",
			dataIndex: "identityType",
		  }, {
			title: '权限',
			key: "permission",
			dataIndex: "permission",
			width: 200,
			render: (text) => (
				<span>{text && text.join('、')}</span>
			)
		  }, {
			title: locale('GLOBAL.COLUMNS.OPTIONS'),
			key: "options",
			dataIndex: "options",
			width: 190,
			render: (text, row, index) => (
			  	<ButtonGroups handleClick={this.handlerMenu.bind(this,row.id)} size="small">
						<Button actionkey="delete">删除</Button>
					</ButtonGroups>
			)
		  }]
		}
		return (<Table dataSource={tableConf.dataSource} columns={tableConf.columns} page={page}/>)
	}
	render(){
		const {actions,locale,spins}= this.props
		const saveSpin = spins(actions.fetchSave)
		const itemSpin = spins(actions.fetchItem)
		const testOptions = [
			{value:1,label:'test1'},
			{value:2,label:'test2'},
			{value:3,label:'test3'},
			{value:4,label:'test4'},
			{value:5,label:'test5'},
		]
		const treeData = [{
			title: 'Node1',
			value: '0-0',
			key: '0-0',
			children: [{
			  title: 'Child Node1',
			  value: '0-0-1',
			  key: '0-0-1',
			}, {
			  title: 'Child Node2',
			  value: '0-0-2',
			  key: '0-0-2',
			}],
		}, {
			title: 'Node2',
			value: '0-1',
			key: '0-1',
		}];
		return (
			<Modal visible={true} width='1000px' title='添加拒绝身份' confirmLoading={saveSpin} loading={itemSpin} onOk={this.onSubmit.bind(this,"handleSubmit")} onCancel={this.handleCancel.bind(this,"handleCancel")}>
				<BaseForm onSubmit={this.onSubmit.bind(this)} ref={this.saveFormRef.bind(this)}>
					<FormItem>
						<TreeSelect
							defaultValue={this.state.value}
							treeData={treeData}
							placeholder="请选择身份类型"
							treeDefaultExpandAll
							onChange={this.onChange}
							label="身份类型"
							name="identityType"
						/>
					</FormItem>	
					<FormItem>
						<Select label="身份名称"
							name='identityName' 
							placeholder={locale('GLOBAL.ALL')} 
							options={testOptions}
							renderItem={this.renderOptionItem}
						/>
					</FormItem>	
					<FormItem>
						<Checkbox.Group label="操作权限"
							name='permission' 
							options={testOptions}
						/>
					</FormItem>
					<Button onClick={this.onSubmit.bind(this,"handleSubmit")}>添加</Button>
				</BaseForm>
				{this.renderDataTable()}
			</Modal>
		)
	}
}
