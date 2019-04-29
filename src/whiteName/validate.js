
function isSingleIP(str) {//like 172.16.4.4
    if (str == null || str == "") {
        return false;
    }
    
    var regExp = /^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])(\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])){3}$/;
    if(regExp.test(str)) {
        return true;
    }
    
    return false;
}

function isSectionIP(str) {//like 172.16.4.*
    if (str == null || str == "") {
        return false;
    }
    
    var regExp = /^(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\*)$/;
    if(regExp.test(str)) {
      if (RegExp.$1<256 && RegExp.$2<256 && RegExp.$3<256 && RegExp.$4=='*')
        return true;
    }
    
    return false;
}

function isIntervalIP(str) {//like 172.16.4.5-172.16.4.10
    if (str == null || str == "") {
        return false;
    }
    
    var beginAndEnd = str.split("-");
    if (beginAndEnd.length != 2) {
        return false;
    }
    
    var begin = beginAndEnd[0];
var end = beginAndEnd[1];
if (!isSingleIP(begin) || !isSingleIP(end)) {
    return false;
}

var suffixBegin = begin.substring(0, begin.lastIndexOf("."));
var suffixEnd = end.substring(0, end.lastIndexOf("."));
if (suffixBegin != suffixEnd) {
    return false;
}

var beginSingleIP = new SingleIP(begin);
var endSingleIP = new SingleIP(end);
var type = beginSingleIP.compareTo(endSingleIP);
if (type != -1) {
    return false;
}

return true;
}

function SectionIP(ipStr) {
    this.ipStr = ipStr;
    
    if (typeof SectionIP._initialized == "undefined") { 
        SectionIP.prototype.conflictWith = function(other) {
    if (other instanceof SingleIP) {
        return other.conflictWith(this);
    } else if (other instanceof SectionIP) {
        var suffixSingle = this.ipStr.substring(0, this.ipStr.lastIndexOf("."));
        var suffixSection = other.ipStr.substring(0, other.ipStr.lastIndexOf("."));
        
        if (suffixSingle == suffixSection) {
            return true;
        }
        return false;
    } else if (other instanceof IntervalIP) {
        var suffixThis= this.ipStr.substring(0, this.ipStr.lastIndexOf("."));
        var suffixOther = other.begin.ipStr.substring(0, other.begin.ipStr.lastIndexOf("."));
        
        if (suffixThis == suffixOther) {
            return true;
        }
        return false;
    }
  }
        
        SectionIP._initialized = true;
    }
}

function IntervalIP(ipStr) {
    var begin = ipStr.split("-")[0];
    var end = ipStr.split("-")[1];
    this.begin = new SingleIP(begin);
    this.end = new SingleIP(end);
    
    if (typeof IntervalIP._initialized == "undefined") {    
        IntervalIP.prototype.conflictWith = function(other) {
    if (other instanceof SingleIP) {
        return other.conflictWith(this);
    } else if (other instanceof SectionIP) {
        return other.conflictWith(this);
    } else if (other instanceof IntervalIP) {
        if ((this.begin.compareTo(other.begin) == 1 && this.begin.compareTo(other.end) == -1) 
                  || this.begin.compareTo(other.begin) == 0 || this.begin.compareTo(other.end) == 0) {
                  return true;
                } else if (this.begin.compareTo(other.begin) == -1 
                    && (this.end.compareTo(other.begin) == 1 || this.end.compareTo(other.begin) == 0)) {
                    return true;
                }
                return false;
    }
  }
        
        IntervalIP._initialized = true;
    }
}

function SingleIP(ipStr) {
    this.ipStr = ipStr;
    
    if (typeof SingleIP._initialized == "undefined") {
      SingleIP.prototype.compareTo = function(other) {
        if (other instanceof SingleIP) {
            var oneToken = this.ipStr.split('.');
              var anotherToken = other.ipStr.split('.');
              if (parseInt(oneToken[0],10) > parseInt(anotherToken[0],10)) {
                        return 1;
                    } else if (parseInt(oneToken[0],10) == parseInt(anotherToken[0],10)) {
                        if (parseInt(oneToken[1],10) > parseInt(anotherToken[1],10)) {
                            return 1;
                        } else if (parseInt(oneToken[1],10) == parseInt(anotherToken[1],10)) {
                            if (parseInt(oneToken[2],10) > parseInt(anotherToken[2],10)) {
                                return 1;
                            } else if (parseInt(oneToken[2],10) == parseInt(anotherToken[2],10)) {
                                if (parseInt(oneToken[3],10) > parseInt(anotherToken[3],10)) {
                                    return 1;
                                } else if (parseInt(oneToken[3],10) == parseInt(anotherToken[3],10)) {
                                    return 0;
                                }
                                
                                return -1;
                            }
                            
                            return -1;
                        }
                        
                        return -1; 
                    }
                    
                    return -1;
        }
      };
      
      SingleIP.prototype.isInSectionIP = function(sectionIp) {
        if (sectionIp instanceof SectionIP) {
            var suffixSingle = this.ipStr.substring(0, this.ipStr.lastIndexOf("."));
            var suffixSection = sectionIp.ipStr.substring(0, sectionIp.ipStr.lastIndexOf("."));
            
            if (suffixSingle == suffixSection) {
                return true;
            }
            return false;
        }
      };
      
      SingleIP.prototype.isInIntervalIP = function(intervalIP) {
        if (intervalIP instanceof IntervalIP) {
            var intervalBegin = intervalIP.begin;
            var intervalEnd = intervalIP.end;
            
            if ((this.compareTo(intervalBegin) == 1 || this.compareTo(intervalBegin) == 0)
              && (this.compareTo(intervalEnd) == -1 || this.compareTo(intervalEnd) == 0)) {
              return true;
            }
            return false;
        }
      };
      
      SingleIP.prototype.conflictWith = function(other) {
        if (other instanceof SingleIP) {
            if (this.compareTo(other) == 0) {
                return true;
            }
            return false;
        } else if (other instanceof SectionIP) {
            var suffixSingle = this.ipStr.substring(0, this.ipStr.lastIndexOf("."));
            var suffixSection = other.ipStr.substring(0, other.ipStr.lastIndexOf("."));
            
            if (suffixSingle == suffixSection) {
                return true;
            }
            return false;
        } else if (other instanceof IntervalIP) {
            var intervalBegin = other.begin;
            var intervalEnd = other.end;
            
            if ((this.compareTo(intervalBegin) == 1 || this.compareTo(intervalBegin) == 0)
              && (this.compareTo(intervalEnd) == -1 || this.compareTo(intervalEnd) == 0)) {
              return true;
            }
            return false;
        }
      }
    
      SingleIP._initialized = true;
    }
}

// ip白名单验证
export function validateIPFormat(rule, ipText, callback) {
    var ipTokens = ipText.split(",");
    for (var i=0; i<ipTokens.length; i++) {
        var ipToken = ipTokens[i];
        if (!isSingleIP(ipToken) && !isSectionIP(ipToken) && !isIntervalIP(ipToken)) {
            callback('IP输入有误！')
        }
    }
    callback()
}

// test
export function validateOne(i) {
    if(i === 1) {
        return '输入的是1'
    }else{
        return '输入的不是1'
    }
}