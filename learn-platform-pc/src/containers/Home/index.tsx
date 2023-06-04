import { useUserContext } from "@/hooks/useHooks";

const Home = () => {
  const { store } = useUserContext();
  console.log(store)
  return (
    <div>首页</div>
  )
}

export default Home;
