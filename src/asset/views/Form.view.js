import React from 'react'
import {Input,Select} from 'antd'
import {FormPage} from 'mcf-crud'
import {BaseForm,FormItem,Panel} from 'mcf-components'

export default class FormView extends FormPage{

	componentDidMount(){
		const {actions,match:{params}}=this.props
		if(params.id){
			actions.fetchItem({id:params.id})
		}
	}

	handleSubmit(values){
		const { actions } = this.props
		actions.fetchSave(values)
	}
	handleConnect(values){
		console.log(values)
	}
	handleCancel(values){
		this.goBack()
	}
	renderOptionItem(item,idx){
			return <Select.Option key={idx} value={item.value}>{item.label}</Select.Option>
	}

	render(){
		const {item,actions,locale,spins}= this.props
		const saveSpin = spins(actions.fetchSave)
		const itemSpin = spins(actions.fetchItem)
		return (
			<Panel confirmLoading={saveSpin} loading={itemSpin} onOk={this.onSubmit.bind(this,"handleSubmit")} onCancel={this.handleCancel.bind(this,"handleCancel")}>
				<BaseForm onSubmit={this.onSubmit.bind(this)} ref={this.saveFormRef.bind(this)}>
					<FormItem>
						<Input type="hidden"  name="id"  defaultValue={item.id}/>
					</FormItem>
						<FormItem>
							<Input label={locale('name.label')}  name="name"  defaultValue={item.name}/>
						</FormItem>
						<FormItem>
							<Input label={locale('type.label')}  name="type"  defaultValue={item.type}/>
						</FormItem>
						<FormItem>
							<Input label={locale('dbName.label')}  name="dbName"  defaultValue={item.dbName}/>
						</FormItem>
						<FormItem>
							<Input label={locale('status.label')}  name="status"  defaultValue={item.status}/>
						</FormItem>
						<FormItem>
							<Input label={locale('createTime.label')}  name="createTime"  defaultValue={item.createTime}/>
						</FormItem>
				</BaseForm>
			</Panel>
		)
	}
}
