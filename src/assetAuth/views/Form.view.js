import React from 'react'
import {Checkbox,Input,Modal} from 'antd'
import {FormPage} from 'mcf-crud'
import {BaseForm,FormItem,Panel} from 'mcf-components'

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

	handleSubmit(values){
		const { actions } = this.props
		actions.fetchSave(values)
		// this.goBack()
	}
	handleCancel(values){
		this.goBack()
	}
	render(){
		const {actions,spins,item}= this.props
		const saveSpin = spins(actions.fetchSave)
		const itemSpin = spins(actions.fetchItem)
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
						<Input type="hidden" name="id"  defaultValue={item.id}/>
					</FormItem>
					<FormItem>
						<Checkbox.Group options={testOptions} name="permission" label='权限' defaultValue={defaultOptions}/>
					</FormItem>
				</BaseForm>
			</Modal>
		)
	}
}
