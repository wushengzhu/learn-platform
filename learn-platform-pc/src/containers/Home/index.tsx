import { useUserContext } from "@/hooks/useHooks";
import { useTitle } from "@/hooks/useTitle";

const Home = () => {
  useTitle('首页');
  const { store } = useUserContext();

  return (
    <div>首页</div>
  )
}

export default Home;
