import React from 'react'
import {Select,Tree,Modal} from 'antd'
import {FormPage} from 'mcf-crud'
import {BaseForm,FormItem,Panel,TreeView} from 'mcf-components'
const McTreeView = TreeView.default
const {TreeNode} = Tree
export default class FormView extends FormPage{
	state = {
        visible: false,
        expandedKeys: [],
        autoExpandParent: true,
        checkedKeys: [],
        selectedKeys: [],
        treeData:[]
	}

	handleSubmit(values){
    const { actions,match:{params} } = this.props
		actions.fetchSave({params:values,id:params.id})
		this.goBack()
	}
	handleCancel(values){
		this.goBack()
  }
  renderOptionItem(item,idx){
      return <Select.Option key={idx} value={item}>{item}</Select.Option>
  }

	render(){
		const {actions,spins,item,locale,match:{params}}= this.props
		const saveSpin = spins(actions.fetchSave)
    const itemSpin = spins(actions.fetchItem)
    const treeConfig = {
      checkable: true,
      defaultSelectedKeys: [],
      // defaultCheckedKeys: ['0']
    }
		return (
			<Modal visible={true} title='允许访问资产' confirmLoading={saveSpin} loading={itemSpin} onOk={this.onSubmit.bind(this,"handleSubmit")} onCancel={this.handleCancel.bind(this,"handleCancel")}>
				<BaseForm onSubmit={this.onSubmit.bind(this)} ref={this.saveFormRef.bind(this)}>
          <FormItem>
              <Select label="数据库" name="dbName"
                  defaultValue={item.dbName}
                  placeholder="请选择数据库"
                  fetch={`/identity/${params.id}/dbList`}
                  fetchCallback={(result)=>result.data.dbList}
                  renderItem={this.renderOptionItem}
                  rules={[{required:true,message:locale('GLOBAL.RULES.REQUIRED')}]} />
          </FormItem>
          <FormItem>
              <McTreeView
                  label="权限选择"
                  name="permission"
                  treeConfig={treeConfig}
                  fetch={`/identity/auth`}
                  fetchCallback={(result)=>result.data.items}
                  rules={[{required: true, message:'请选择角色'}]}
                  renderItem ={(item)=> <TreeNode title={item.name} key={item.id} dataRef={item}></TreeNode>}
              />
          </FormItem>
				</BaseForm>
			</Modal>
		)
	}
}
