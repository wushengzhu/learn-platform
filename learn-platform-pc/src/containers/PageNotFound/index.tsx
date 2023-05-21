import { Button, Result } from "antd";

const PageNotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary" href="/">返回首页</Button>}
    />
  )
}

export default PageNotFound;
