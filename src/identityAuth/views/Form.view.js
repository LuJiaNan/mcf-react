import React from 'react'
import {Checkbox,Input,Modal} from 'antd'
import {FormPage} from 'mcf-crud'
import {BaseForm,FormItem} from 'mcf-components'

export default class FormView extends FormPage{
	state = {
		visible: false
	}
	componentDidMount(){
		const {actions,match:{params}}=this.props
		if(params.id){
			actions.fetchPermission({id:params.id})
		}
	}

	handleSubmit(values){
		const {actions,match:{params}}=this.props
		actions.fetchUpdatePermission({id:params.id,permission:values})
		this.goBack()
	}
	handleCancel(values){
		this.goBack()
	}
	render(){
		const {actions,spins,item}= this.props
		const saveSpin = spins(actions.fetchUpdatePermission)
		const itemSpin = spins(actions.fetchPermission)
		const testOptions = [
			{value:1,label:'test1'},
			{value:2,label:'test2'},
			{value:3,label:'test3'},
			{value:4,label:'test4'},
			{value:5,label:'test5'},
		]
		const defaultOptions = [1,2,3]
		return (
			<Modal visible={true} title='权限' confirmLoading={saveSpin} loading={itemSpin} onOk={this.onSubmit.bind(this,"handleSubmit")} onCancel={this.handleCancel.bind(this,"handleCancel")}>
				<BaseForm onSubmit={this.onSubmit.bind(this)} ref={this.saveFormRef.bind(this)}>
					<FormItem>
						<Checkbox.Group options={testOptions} name="permission" label='权限' defaultValue={defaultOptions}/>
					</FormItem>
				</BaseForm>
			</Modal>
		)
	}
}
