import React from 'react'
import {Input,Select,Modal} from 'antd'
import {FormPage} from 'mcf-crud'
import {BaseForm,FormItem,Panel} from 'mcf-components'
import * as Validate from '../validate'

export default class FormView extends FormPage{

	componentDidMount(){
		const {actions,match:{params}}=this.props
		if(params.id){
			actions.fetchItem({id:params.id})
		}
		// actions.fetchIpList();
	}

	handleSubmit(values){
		const { actions,match:{params} } = this.props
		actions.fetchSaveOrUpdate(values)
	}
	handleCancel(values){
		this.goBack()
	}
	renderOptionItem(item,idx){
		return <Select.Option key={idx} value={item.ip}>{item.ip}</Select.Option>
	}

	render(){
		const {item,actions,locale,spins,match:{params}}= this.props
		const saveSpin = spins(actions.fetchSaveOrUpdate)
		const itemSpin = spins(actions.fetchItem)
		return (
			<Modal visible={true} title={locale('whiteName.setting')} confirmLoading={saveSpin} loading={itemSpin} onOk={this.onSubmit.bind(this,"handleSubmit")} onCancel={this.handleCancel.bind(this,"handleCancel")}>
				<BaseForm onSubmit={this.onSubmit.bind(this)} ref={this.saveFormRef.bind(this)}>
					<FormItem>
						<Input type="hidden" name="id"  defaultValue={params.id}/>
					</FormItem>
					<FormItem>
						<Select label={locale('ip.label')} placeholder={locale('ip.placeholder')} name="ipList"
							mode="multiple"
							fetch='/capaa/v1/probe/list'
							fetchCallback={(result)=>result.data.probeList}
							renderItem={this.renderOptionItem}
							defaultValue={item.ip}
							rules={[{required:true,message:locale('ip.placeholder')}]}
							disabled={!!params.id}
							/>
					</FormItem>
					<FormItem>
						<Input.TextArea label={locale('ipWhiteListStr.label')} name="ipWhiteListStr" defaultValue={item.ipWhiteListStr || ''} placeholder={locale('ipWhiteListStr.placeholder')}
							rules={[{required:true,message:locale('ipWhiteListStr.placeholder')},{validator: Validate.validateIPFormat}]}
						/>
					</FormItem>
				</BaseForm>
			</Modal>
		)
	}
}
