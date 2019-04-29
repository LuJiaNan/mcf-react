import React from 'react'
import {Input,Select,Checkbox,Transfer} from 'antd'
import {FormPage} from 'mcf-crud'
import {BaseForm,FormItem,Panel} from 'mcf-components'
const CheckboxGroup = Checkbox.Group;

export default class FormView extends FormPage{

	state = {
		mockData: [],
		targetKeys: [],
	  }

	componentDidMount(){
		const {actions,match:{params}}=this.props
		if(params.id){
			actions.fetchItem({id:params.id})
		}
		this.getMock()
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

	handleChange = (values) => {
		this.setState({ targetKeys:values });
		console.log(values)
	}
	renderItem = (item) =>{
		const customLabel = (
			<span className="custom-item">
			  {item.title} - {item.description}
			</span>
		  );
	  
		  return {
			label: customLabel, // for displayed item
			value: item.title, // for title and filter matching
		  };
	}
	getMock = () => {
		const targetKeys = [];
		const mockData = [];
		for (let i = 0; i < 10; i++) {
		  const data = {
			uid: i.toString(),
			title: `列名${i + 1}`,
			description: `列类型${i + 1}`,			
			chosen: Math.random() * 2 > 1,
		  };
		  if (data.chosen) {
			targetKeys.push(data.uid);
		  }
		  mockData.push(data);
		}
		this.setState({ mockData, targetKeys });
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
							<Select label={locale('assetType.label')} placeholder={locale('assetType.label')} name="assetType"
								options={[]} 
								renderItem={this.renderOptionItem} defaultValue={item.assetType || 0} />
						</FormItem>
						<FormItem>
							<Select label={locale('schema.label')} placeholder={locale('schema.label')} name="schema"
								options={[]}
								renderItem={this.renderOptionItem} defaultValue={item.schema || 0} />
						</FormItem>
						<FormItem>
							<CheckboxGroup label={locale('objectType.label')} placeholder={locale('objectType.label')} name="objectType"
								options={[{"value":"table","label":"表"}]} defaultValue={item.objectType || ['table']} />							
						</FormItem>
						<FormItem>
							<Select label={locale('object.label')} placeholder={locale('object.label')} name="object"
								options={[]}
								renderItem={this.renderOptionItem} defaultValue={item.object || 0} />
						</FormItem>
						<FormItem>
							<Select label={locale('table.label')} placeholder={locale('table.label')} name="table"
								options={[]}
								renderItem={this.renderOptionItem} defaultValue={item.table || 0} />
						</FormItem>
						<FormItem>
							<Transfer name="tableList" label="" rowKey={record => record.uid}
								dataSource={this.state.mockData}
								showSearch
								titles={['可选', '已选']}
								onSearch={this.handleSearch}
								targetKeys={this.state.targetKeys}
								onChange={this.handleChange}
								render={this.renderItem.bind(this)}
							/>							
						</FormItem>
											
				</BaseForm>
			</Panel>
		)
	}
}
