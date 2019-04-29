import * as Validators from '../validate'

function testReturn(a){
    console.log(a)
    if(a){
        return 
    }
    return "yes"
}

describe('验证ip白名单',()=>{
    describe('Function: validateOne', () => {
        it('测试输入数不是1', () => {
            expect(Validators.validateOne(2)).toEqual('输入的不是1')
        })
        it('测试输入数是1', () => {
            expect(Validators.validateOne(1)).toEqual('输入的是1')
        })
        it('ip白名单通过测试.', () => {
            expect(Validators.validateIPFormat('','192.168.1.1',testReturn)).toEqual(undefined)
        })
        it('ip白名单不通过测试.', () => {
            expect(Validators.validateIPFormat('','192',testReturn)).toEqual(undefined)
        })
    })
})