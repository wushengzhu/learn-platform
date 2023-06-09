import { useUserContext } from "@/hooks/useHooks";
import { useTitle } from "@/hooks/useTitle";

const ImageUpload = () => {
  useTitle('个人信息');
  const { store } = useUserContext();
  console.log(store)
  return (
    <div>个人信息</div>
  )
}

export default ImageUpload;
