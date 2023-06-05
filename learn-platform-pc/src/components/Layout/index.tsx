import { ROUTE_CONFIG } from "@/routes";
import { PageContainer, ProLayout } from "@ant-design/pro-components";
import { useOutlet } from "react-router-dom";
import style from './index.module.less'

const Layout = () => {
  const outlet = useOutlet()
  return (
    <div className={style['layout-container']}>
      <ProLayout
        layout="mix"
        siderWidth={130}
        avatarProps={{
          src: '',
          title: '张无忌',
          size: 'small'
        }}
        route={{
          path: '/',
          routes: ROUTE_CONFIG
        }}
        logo={<img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" />}
      >
        <PageContainer>
          {outlet}
        </PageContainer>
      </ProLayout>
    </div>
  )
}

export default Layout;
