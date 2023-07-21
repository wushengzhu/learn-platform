import { useGoTo } from "@/hooks";
import { useUserContext } from "@/hooks/useHooks";
import { Button, Result } from "antd";
import { useEffect } from "react";


const NoShop = () => {
  const { store } = useUserContext()
  const { go } = useGoTo()
  useEffect(() => {
    if (store.currentShop) {
      go()
    }
     
  }, [store.currentShop])
  return (
    <Result
      status="404"
      title="请选择门店"
      subTitle="您访问的页面不存在"
      extra={
        <Button type="primary" href="/">返回首页</Button>
      }
    >
    </Result>
  )
}

export default NoShop;
