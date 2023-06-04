import { Toast } from "antd-mobile"

const InfoType ={
 success:'success',
 fail:'fail',
 load:'loading',
 cuscom:''
}
  const msg = (type:string,info:string)=>{
    Toast.show({
      icon:type,
      content:info,
    })
  }

  const success = (info:string)=>{
    msg(InfoType.success,info)
  }

  const fail = (info:string)=>{
    msg(InfoType.fail,info)
  }

  const load = (info:string)=>{
    msg(InfoType.load,info)
  }

  const cuscom = (info:string)=>{
    msg(InfoType.cuscom,info)
  }
const toast = {success,fail,load,cuscom}
export default toast
