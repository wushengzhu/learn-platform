import { useUserContext } from "@/hooks/useHooks";
import { useTitle } from "@/hooks/useTitle";
import { Card } from "antd";

const Teacher = () => {
  useTitle('首页');
  const { store } = useUserContext();

  return (
    <Card
      style={{ minHeight: '100vh' }}
    >
      <div>教师管理</div>
    </Card>
  )
}

export default Teacher;
