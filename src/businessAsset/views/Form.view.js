import React from 'react'
import {Input,InputNumber,Select,Radio,Switch} from 'antd'
import {FormPage} from 'mcf-crud'
import {BaseForm,FormItem,Panel} from 'mcf-components'
import {ValidatorUtils} from 'mcf-utils'
const RadioGroup = Radio.Group;

export default class FormView extends FormPage{

	componentDidMount(){

    console.log(this.props)
		const {actions,match:{params}}=this.props
		if(params.id){
			console.log(params.id)
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
	renderDbOptionItem(item,idx){
		return <Select.Option key={idx} value={item.dbserverId}>{item.dbserverDisplayName}</Select.Option>
	}
	ownerCallback(result){
		return result.items
	}

	render(){
		const {item,actions,locale,spins,dicts}= this.props
		console.log(item);
		const saveSpin = spins(actions.fetchSave)
		const itemSpin = spins(actions.fetchItem)
		const itemLayout={
			labelCol:{
				span:3
			},
			wrapperCol:{
				span:9
			}
		}
		return (
			<Panel confirmLoading={saveSpin} loading={itemSpin} onOk={this.onSubmit.bind(this,"handleSubmit")} onCancel={this.handleCancel.bind(this,"handleCancel")}>
				<BaseForm itemLayout={itemLayout} onSubmit={this.onSubmit.bind(this)} ref={this.saveFormRef.bind(this)}>
						<FormItem>
							<Input type="hidden"  name="id"  defaultValue={item.id}/>
						</FormItem>
						<FormItem>
							<Input label={locale('form.baseinfo.name')} name="serverName" defaultValue={item.serverName}
								placeholder={locale('form.baseinfo.name')}
								rules={[{required:true,message:'资产集合名称必填'}]} />
						</FormItem>
						<FormItem>
							<Select label={locale('form.baseinfo.dbName')} placeholder={locale('form.baseinfo.dbName')} name="dbName"
								fetch="/assetProtectObject"
								renderItem={this.renderDbOptionItem} defaultValue={item.ftpType || 0}
								rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')}]} />
						</FormItem>
						<FormItem>
							<Select label={locale('form.baseinfo.owner')} placeholder={locale('form.baseinfo.owner')} name="owner"
								fetch="/identityOptions" fetchCallback={this.ownerCallback}
								renderItem={this.renderOptionItem} defaultValue={item.ftpType || 0}
								rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')}]} />
						</FormItem>
						<FormItem>
							<Select label={locale('form.baseinfo.blockingMode')} placeholder={locale('form.baseinfo.blockingMode')} name="blockingMode"
								options={dicts("svc_search_biz_FtpType")}
								renderItem={this.renderOptionItem} defaultValue={item.ftpType || 0}
								rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')}]} />
						</FormItem>
						<FormItem>
							<RadioGroup label={locale('form.baseinfo.sensitive')} placeholder={locale('form.baseinfo.sensitive')} name="sensitive"
							 defaultValue={1}>
								<Radio value={1}>高</Radio>
								<Radio value={2}>中</Radio>
								<Radio value={3}>低</Radio>
							</RadioGroup>
						</FormItem>
						<FormItem>
							<RadioGroup label={locale('form.baseinfo.auditLevel')} placeholder={locale('form.baseinfo.auditLevel')} name="auditLevel"
								defaultValue={1}>
									<Radio value={1}>高</Radio>
									<Radio value={2}>中</Radio>
									<Radio value={3}>低</Radio>
								</RadioGroup>
						</FormItem>

						<FormItem>
							<RadioGroup label={locale('form.baseinfo.auditLevel')} placeholder={locale('form.baseinfo.auditLevel')} name="auditLevel"
								defaultValue={1}>
									<Radio value={1}>高</Radio>
									<Radio value={2}>中</Radio>
									<Radio value={3}>低</Radio>
								</RadioGroup>
						</FormItem>
						<FormItem>
							<RadioGroup label={locale('form.cz.czAdd')} placeholder={locale('form.cz.czAdd')} name="czAdd"
								defaultValue={1}>
									<Radio value={1}>启用</Radio>
									<Radio value={2}>禁用</Radio>
									<Radio value={3}>忽略</Radio>
								</RadioGroup>
						</FormItem>
						<FormItem>
							<RadioGroup label={locale('form.cz.czDelete')} placeholder={locale('form.cz.czDelete')} name="czDelete"
								defaultValue={1}>
									<Radio value={1}>启用</Radio>
									<Radio value={2}>禁用</Radio>
									<Radio value={3}>忽略</Radio>
								</RadioGroup>
						</FormItem>
						<FormItem>
							<RadioGroup label={locale('form.cz.czEdit')} placeholder={locale('form.cz.czEdit')} name="czEdit"
								defaultValue={1}>
									<Radio value={1}>启用</Radio>
									<Radio value={2}>禁用</Radio>
									<Radio value={3}>忽略</Radio>
								</RadioGroup>
						</FormItem>
						<FormItem>
							<RadioGroup label={locale('form.cz.czSelect')} placeholder={locale('form.cz.czSelect')} name="czSelect"
								defaultValue={1}>
									<Radio value={1}>启用</Radio>
									<Radio value={2}>禁用</Radio>
									<Radio value={3}>忽略</Radio>
								</RadioGroup>
						</FormItem>
						<FormItem>
							<RadioGroup label={locale('form.cz.czMerge')} placeholder={locale('form.cz.czMerge')} name="czMerge"
								defaultValue={1}>
									<Radio value={1}>启用</Radio>
									<Radio value={2}>禁用</Radio>
									<Radio value={3}>忽略</Radio>
								</RadioGroup>
						</FormItem>

						<FormItem>
							<Switch label={locale('form.advancedSet.accessRate.status')} placeholder={locale('form.advancedSet.accessRate.status')} name="accessRate.status"
							checkedChildren="开" unCheckedChildren="关" defaultChecked />
						</FormItem>
						<FormItem render={true}>
							<Input label={locale('form.advancedSet.accessRate.num')} name="accessRate.num" defaultValue={item.accessRate && item.accessRate.num}
								placeholder={locale('form.advancedSet.accessRate.num')}
								rules={[{required:true,message:'频次必填'}]} />
						</FormItem>
						<FormItem>
							<Input label={locale('form.advancedSet.accessRate.cyc')} name="serverName" defaultValue={item.serverName}
								placeholder={locale('form.advancedSet.accessRate.cyc')}
								rules={[{required:true,message:'周期必填'}]} />
						</FormItem>
						<FormItem>
							<Switch label={locale('form.advancedSet.returnCount.status')} placeholder={locale('form.advancedSet.returnCount.status')} name="returnCount.status"
							checkedChildren="开" unCheckedChildren="关" defaultChecked />
						</FormItem>
						<FormItem>
							<Input label={locale('form.advancedSet.returnCount.num')} name="returnCount.num" defaultValue={item.returnCount}
								placeholder={locale('form.advancedSet.returnCount.num')}
								rules={[{required:true,message:'返回行数必填'}]} />
						</FormItem>
				</BaseForm>
			</Panel>
		)
	}
}
