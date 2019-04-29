import React,{Component} from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { NavLink } from 'react-router-dom'
import {InnerComponent} from 'mcf-decorators'
import {Menu,Icon,Breadcrumb,Dropdown,LocaleProvider} from 'antd'
import {IntlProvider, addLocaleData} from 'react-intl'
import zh_CN_antd from 'antd/lib/locale-provider/zh_CN';
import zh_TW_antd from 'antd/lib/locale-provider/zh_TW';
import en_US_antd from 'antd/lib/locale-provider/en_US';
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import logo from "./assets/logo.png"
import './locales'
import zh_CN from '../locales/zh-CN.json'
import en_US from '../locales/en-US.json'
import zh_CHT from '../locales/zh-CHT.json'
import AppRouter from './AppRouter'
const messages={
  'zh-CN':zh_CN,
  'zh-TW':zh_CHT,
  'zh-HK':zh_CHT,
  'en-US':en_US
}
const antdLocal={
  'zh-CN':zh_CN_antd,
  'zh-TW':zh_TW_antd,
  'zh-HK':zh_TW_antd,
  'en-US':en_US_antd
}

addLocaleData([...en,...zh]);

const SubMenu = Menu.SubMenu

class SideMenu extends React.PureComponent{

  render(){
    let {collapsed,toggleCollapsed} = this.props
    return (
      <div className="app-side">
        <img alt="logo" src={logo} style={{width:'120px',height:'30px',margin:'10px 30px'}} />
        <Menu
           defaultSelectedKeys={['1']}
           defaultOpenKeys={['sub1']}
           mode="inline"
           theme="dark"
           inlineCollapsed={collapsed}
         >
          {/* <Menu.Item key="13">
             <Icon type="pie-chart" />
             <span>
               <NavLink to={{ pathname: '/businessAsset' }} >
               业务数据管理
              </NavLink>
            </span>
           </Menu.Item> */}
           <SubMenu key="111" title={<span><Icon type="pie-chart" /><span>数据资产</span></span>}>
            <Menu.Item key="1111">
              <Icon type="pie-chart" />
              <span>
                <NavLink to={{ pathname: '/businessAsset/bus' }} >
                业务数据
                </NavLink>
              </span>
            </Menu.Item>
            <Menu.Item key="1112">
            <Icon type="pie-chart" />
              <span>
                <NavLink to={{ pathname: '/businessAsset/sen' }} >
                敏感数据
                </NavLink>
              </span>
            </Menu.Item>
            <Menu.Item key="1113">
            <Icon type="pie-chart" />
              <span>
                <NavLink to={{ pathname: '/businessAsset/sys' }} >
                系统数据
                </NavLink>
              </span>
            </Menu.Item>
          </SubMenu>
           <Menu.Item key="14">
             <Icon type="pie-chart" />
             <span>
               <NavLink to={{ pathname: '/assetMember' }} >
               成员管理
              </NavLink>
            </span>
           </Menu.Item>
           <Menu.Item key="15">
             <Icon type="pie-chart" />
             <span>
               <NavLink to={{ pathname: '/sensitiveData' }} >
               敏感数据
              </NavLink>
            </span>
           </Menu.Item>
           <SubMenu key="auth" title={<span><Icon type="pie-chart" /><span>访问授权</span></span>}>
            <Menu.Item key="17">
              <Icon type="pie-chart" />
              <span>
                <NavLink to={{ pathname: '/identityAuth' }} >
                身份授权
                </NavLink>
              </span>
            </Menu.Item>
            <Menu.Item key="18">
              <Icon type="pie-chart" />
              <span>
                <NavLink to={{ pathname: '/assetAuth' }} >
                资产授权
                </NavLink>
              </span>
            </Menu.Item>
           </SubMenu>
           <Menu.Item key="16">
             <Icon type="pie-chart" />
             <span>
               <NavLink to={{ pathname: '/switch/identityAuth' }} >
               权限管理
              </NavLink>
            </span>
           </Menu.Item>
           <Menu.Item key="17">
             <Icon type="pie-chart" />
             <span>
               <NavLink to={{ pathname: '/whiteName' }} >
               白名单
              </NavLink>
            </span>
           </Menu.Item>
           <Menu.Item key="18">
             <Icon type="pie-chart" />
             <span>
               <NavLink to={{ pathname: '/svcmgr' }} >
               服务管理
              </NavLink>
            </span>
           </Menu.Item>
           <Menu.Item key="1">
             <Icon type="pie-chart" />
             <span>
               <NavLink to={{ pathname: '/ftpmng', }} >
               FTP管理
              </NavLink>
            </span>
           </Menu.Item>

           {/* <Menu.Item key="2">
             <Icon type="desktop" />
             <span>审计查询</span>
           </Menu.Item>
           <Menu.Item key="9">
             <Icon type="inbox" />
             <span>身份管理</span>
           </Menu.Item>
           <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>数据库服务</span></span>}>
             <Menu.Item key="9">数据库管理</Menu.Item>
             <Menu.Item key="10">分组管理</Menu.Item>
           </SubMenu>
           <SubMenu key="sub3" title={<span><Icon type="appstore" /><span>策略管理</span></span>}>
             <SubMenu key="sub3" title="安全策略">
               <Menu.Item key="11">数据库安全防御</Menu.Item>
               <Menu.Item key="12">敏感SQL</Menu.Item>
             </SubMenu>
             <SubMenu key="sub3" title="脱敏策略">
               <Menu.Item key="11">脱敏规则配置</Menu.Item>
             </SubMenu>
           </SubMenu>
           <Menu.Item key="3">
             <Icon type="inbox" />
             <span>数据库访问</span>
           </Menu.Item>
           <Menu.Item key="4">
             <Icon type="inbox" />
             <span>表格访问</span>
           </Menu.Item>
           <Menu.Item key="5">
             <Icon type="inbox" />
             <span>报表管理</span>
           </Menu.Item>
           <Menu.Item key="6">
             <Icon type="inbox" />
             <span>订阅告警</span>
           </Menu.Item>
           <Menu.Item key="7">
             <Icon type="inbox" />
             <span>设备配置</span>
           </Menu.Item>
           <Menu.Item key="8">
             <Icon type="inbox" />
             <span>系统管理</span>
           </Menu.Item> */}
         </Menu>
         <div className="app-side-footer" style={{width:collapsed?"80px":"180px"}}>
           <Icon onClick={toggleCollapsed} type={collapsed ? 'menu-unfold' : 'menu-fold'} />
         </div>
        </div>
    )
  }
}

// @InnerComponent(AppRouter)



 class AppLayout extends Component{
  state = {
    collapsed: false,
  }
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  toggleLanguage=({ item, key, selectedKeys })=>{
    // console.log(key)
    const {dispatch}= this.props
    dispatch({
      type:"@@MIDDLEWARE/UPGRADE_CONFIG",
      payload:{
        lang:key
      }
    })
  }
  render(){
    const {children,appReducer} = this.props
    const {collapsed} = this.state
    const lang=appReducer.config.lang || navigator.language
    return (
      <LocaleProvider locale={zh_CN_antd}>
      <IntlProvider locale={lang} messages={messages[lang]} onError={function(err){}}>
        <div className="primary-layout app-container" style={{paddingLeft:collapsed?"80px":"180px"}}>
          <SideMenu collapsed={collapsed} toggleCollapsed={this.toggleCollapsed.bind(this)}  />
          <div className="app-nav" >
            <Breadcrumb style={{float:'left',paddingTop:'15px'}}>
              <Breadcrumb.Item href="">
                <Icon type="home" />
              </Breadcrumb.Item>
              <Breadcrumb.Item href="">
                <span>Application List</span>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                Application
              </Breadcrumb.Item>
            </Breadcrumb>
            <div className="app-info" style={{float:'right'}}>
              <Dropdown overlay={<Menu>
                  <Menu.Item>
                    <Icon type="key" />修改密码
                  </Menu.Item>
                  <Menu.Item>
                    <Icon type="reload" />重启服务
                  </Menu.Item>
                  <Menu.Item>
                    <Icon type="exclamation-circle" />关于
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item>
                    <Icon type="logout" />退出
                  </Menu.Item>
                </Menu>}>
                <a className="ant-dropdown-link" href="#">
                  <Icon type="user" /> jaxchow <Icon type="down" />
                </a>
              </Dropdown>
              <Dropdown overlay={<Menu onClick={this.toggleLanguage.bind(this)}>
                  <Menu.Item key="zh-CN">
                  <span role="img">🇨🇳 </span>简体中文
                  </Menu.Item>
                  <Menu.Item key="zh-TW">
                  <span role="img">🇭🇰 </span>繁体中文
                  </Menu.Item>
                  <Menu.Item key="en-US">
                  <span role="img">🇬🇧 </span>English
                  </Menu.Item>
                </Menu>}>
                <Icon type="global" />
              </Dropdown>
            </div>
          </div>
          <div className="app-context">
            {children}
          </div>
        </div>
      </IntlProvider>
    </LocaleProvider>
    )
  }
}

const mapStateToProps = (state,props) => {
  return {
    appReducer:state.appReducer,
  }
}


export default InnerComponent(AppRouter)(connect(mapStateToProps)(AppLayout))
