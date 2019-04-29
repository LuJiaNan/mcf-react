import React from 'react'
import {Tooltip} from 'antd'

  /**
   * 超出截断
   */
  class McEllipsis extends React.Component{

    render(){
      let {text,tooltipText} =  this.props;
      if(typeof tooltipText === 'undefined'){
        tooltipText = text
      }
      return(
        <Tooltip placement="top" title={tooltipText} arrowPointAtCenter>
            <div className="td-ellipsis" {...Object.assign({},this.props)}>
                {text}
            </div>
        </Tooltip>
      )          
    }
  }


  export default McEllipsis