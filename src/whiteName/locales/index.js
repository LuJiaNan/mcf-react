import {defineMessages} from 'react-intl';

export default defineMessages({
  'title': {
        id: 'whiteName.title',
        defaultMessage: 'whiteName.title',
  },
  'whiteName.setting': {
        id: 'whiteName.fileSet.setting',
        defaultMessage: '直连白名单配置'
  },
  'delete.confirm': {
        id: 'whiteName.buttons.delete.confirm',
        defaultMessage: '确定删除该白名单吗？',
  },
  'ip.label': {
        id: 'whiteName.field.ip.label',
        defaultMessage: '主机IP',
  },
  'ip.placeholder': {
        id: 'whiteName.field.ip.placeholder',
        defaultMessage: '请选择主机IP',
  },
  'ipWhiteListStr.label': {
        id: 'whiteName.field.ipWhiteListStr.label',
        defaultMessage: '应用白名单',
  },
  'ipWhiteListStr.placeholder': {
        id: 'whiteName.field.ipWhiteListStr.placeholder',
        defaultMessage: '请输入IP,IP段或区间IP'
  }
})
