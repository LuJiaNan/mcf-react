export function validateFrequency(rule, value, callback){
    if(value === 1){
        callback('不能输入1!');
    }
    callback();
}