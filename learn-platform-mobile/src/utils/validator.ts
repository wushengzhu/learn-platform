import { Util } from "./util"

export interface Validator{
  required?:boolean
  message?:string
  pattern?:RegExp
}


export const validator = (ruleArr: Array<Validator>, value: any) => {
  if (!Util.IsNullOrEmpty(ruleArr)) {
    for(const item of ruleArr){
      if(Util.isNullOrWhiteSpace(value.trim())&&item.required){
        return item.message?item.message:''
      }else{
        const msg = item.message?item.message:''
        return !value.trim().match(item.pattern)?msg:''
      }
    }
    return ''
  }
}

export const validateMobile = (value:string,msg:string)=>{
  const regExp = new RegExp(
    /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    'g',
  );
  return !value.trim().match(regExp)?msg:'';
}
