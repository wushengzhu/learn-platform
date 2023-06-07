import { useUserContext } from "@/hooks/useHooks";
import { routes } from "@/routes/menu";
import {
  MenuDataItem,
  PageContainer,
  ProLayout,
} from "@ant-design/pro-components";
import * as React from "react";
import { Link, useNavigate, useOutlet } from "react-router-dom";
// import style from "./index.module.less";

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path || "/"}>{dom}</Link>
);

const Layout = () => {
  const outlet = useOutlet();
  const { store } = useUserContext();
  const nav = useNavigate();

  return (
    <div>
      <ProLayout
        layout="mix"
        siderWidth={150}
        token={{
          header: {
            colorBgHeader: "#292f33",
            colorHeaderTitle: "#fff",
            colorTextMenu: "#dfdfdf",
            colorTextMenuSecondary: "#dfdfdf",
            colorTextMenuSelected: "#fff",
            colorBgMenuItemSelected: "#fff",
            colorTextMenuActive: "#fff",
            colorTextRightActionsItem: "#fff",
          }
        }}
        avatarProps={{
          src: "",
          title: "张无忌",
          size: "small",
        }}
        route={{
          path: "/",
          routes,
        }}
        onMenuHeaderClick={() => nav("/")}
        logo={
          <img src="https://github.githubassets.com/images/modules/logos_page/Octocat.png" />
        }
        menuItemRender={menuItemRender}
      >
        <PageContainer>{outlet}</PageContainer>
      </ProLayout>
    </div>
  );
};

export default Layout;
