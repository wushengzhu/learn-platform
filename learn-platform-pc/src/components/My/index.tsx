import { useUserContext } from "@/hooks/useHooks";
import { useTitle } from "@/hooks/useTitle";

const My = () => {
  useTitle('个人信息');
  const { store } = useUserContext();
  console.log(store)
  return (
    <div>个人信息</div>
  )
}

export default My;
