import React from 'react'
import {Input,Select,Switch,Button,Radio,InputNumber} from 'antd'
import {FormPage} from 'mcf-crud'
import {BaseForm,FormItem,Panel,FieldSet} from 'mcf-components'
import '../index.less'
import * as Validate from '../validate'
const RadioGroup = Radio.Group

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
		console.log(values)
		actions.fetchSave(values)
		this.goBack()
	}
	handleConnect(values){
		console.log(values)
	}
	handleCancel(values){
		this.goBack()
	}
	gotoAdd(){
		console.log('gotoXXX')
	}

	renderOptionItem(item,idx){
			return <Select.Option key={idx} value={item.value}>{item.label}</Select.Option>
	}

	render(){
		const {actions,locale,spins,dicts,item,reducer}= this.props
		const saveSpin = spins(actions.fetchSave)
		const itemSpin = spins(actions.fetchItem)
		console.log(this.props)
		const testOptions = [
			{value:1,label:'test1'},
			{value:2,label:'test2'},
			{value:3,label:'test3'},
			{value:4,label:'test4'},
			{value:5,label:'test5'},
		]
		console.log(item)
		return (
			<Panel confirmLoading={saveSpin} loading={itemSpin} onOk={this.onSubmit.bind(this,"handleSubmit")} onCancel={this.handleCancel.bind(this,"handleCancel")}>
				<BaseForm onSubmit={this.onSubmit.bind(this)} ref={this.saveFormRef.bind(this)}>
					<FormItem>
						<Input type="hidden" name="id"  defaultValue={item.id}/>
					</FormItem>
					<FieldSet title='基本属性'>
						<FormItem>
							<Select label='资产集合名称' placeholder='请选择资产集合名称' name="assetName"
								options={testOptions}
								renderItem={this.renderOptionItem} defaultValue={item.assetName}
								rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')}]} 
								// getPopupContainer={triggerNode => triggerNode.parentNode}
								/>
						</FormItem>
						<FormItem>
							<Input label='资产类型' name="assetType" defaultValue={item.assetType} disabled/>
						</FormItem>
						<FormItem>
							<Input label='数据库名' name="dbName" defaultValue={item.dbName} disabled/>
						</FormItem>
						<FormItem>
							<Input label='所有者' name="owner" defaultValue={item.owner}
							placeholder='请选择所有者'
							rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')}]}
							addonAfter={(
								<Button onClick={this.gotoAdd.bind(this)}>附加属性</Button>
							)}/>
						</FormItem>
						<FormItem>
							<RadioGroup label="安全策略" name="strategy" defaultValue={item.strategy} options={testOptions}/>
						</FormItem>
						<FormItem>
							<Select label='阻断方式' placeholder='请选择阻断方式' name="blockType"
								options={testOptions}
								renderItem={this.renderOptionItem} defaultValue={item.blockType}
								rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')}]} />
						</FormItem>
						<FormItem>
							<Switch label='脱敏策略' name='desensitizationStrategy'/>
						</FormItem>
						<FormItem>
							<RadioGroup label="敏感标签" name="sensitiveLabel" defaultValue={item.sensitiveRank || 1} options={testOptions}/>
						</FormItem>
						<FormItem>
							<RadioGroup label="审计级别" name="auditRank" defaultValue={item.auditRank || 2} options={testOptions}/>
						</FormItem>
					</FieldSet>
					<FieldSet title='操作属性'>
						<FormItem>
							<RadioGroup label="增加（insert）" name="insert" defaultValue={item.insert || 3} options={testOptions}/>
						</FormItem>
						<FormItem>
							<RadioGroup label="删除（delete）" name="delete" defaultValue={item.delete || 4} options={testOptions}/>
						</FormItem>
						<FormItem>
							<RadioGroup label="修改（update）" name="update" defaultValue={item.update || 5} options={testOptions}/>
						</FormItem>
						<FormItem>
							<RadioGroup label="查询（select）" name="select" defaultValue={item.select || 1} options={testOptions}/>
						</FormItem>
						<FormItem>
							<RadioGroup label="合并（merge）" name="merge" defaultValue={item.merge || 2} options={testOptions}/>
						</FormItem>
					</FieldSet>
					<FieldSet title='高级配置' display='show'>
						<FormItem>
							<Switch label='操作频次控制' name='operationFrequency' defaultValue={true} defaultChecked={true}/>
						</FormItem>
						<FormItem>
							<InputNumber label='频次' name="frequency" defaultValue={item.frequency}
							placeholder='请填写频次'
							renderable={(form)=>form.getFieldValue('operationFrequency')===true}
							rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')},{validator: Validate.validateFrequency}]}/>
						</FormItem>
						<FormItem>
							<InputNumber label='周期' name="cycle" defaultValue={item.cycle}
							placeholder='请填写周期'
							renderable={(form)=>form.getFieldValue('operationFrequency')===true}
							rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')}]}/>
						</FormItem>
						<FormItem>
							<Select label=' ' name="unit"
								options={testOptions}
								renderable={(form)=>form.getFieldValue('operationFrequency')===true}
								renderItem={this.renderOptionItem} defaultValue={item.unit}
								rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')}]} />
						</FormItem>
						<FormItem>
							<Select label='响应行为' name="responseBehavior"
								options={testOptions}
								renderable={(form)=>form.getFieldValue('operationFrequency')===true}
								renderItem={this.renderOptionItem} defaultValue={item.responseBehavior}
								rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')}]} />
						</FormItem>
						<FormItem>
							<Switch label='返回行控制' name='returnLineManagement' defaultValue={true} defaultChecked={true}/>
						</FormItem>
						<FormItem>
						<Input label='返回行数' name="returnLineNumber" defaultValue={item.returnLineNumber}
								placeholder='请填写返回行数'
								renderable={(form)=>form.getFieldValue('returnLineManagement')===true}
								rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')}]}/>
						</FormItem>
					</FieldSet>
				</BaseForm>
			</Panel>
		)
	}
}
