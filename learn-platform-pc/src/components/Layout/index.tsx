import { useGoTo } from "@/hooks";
import { useUserContext } from "@/hooks/useHooks";
import { routes, ROUTE_KEY } from "@/routes/menu";
import { AUTH_TOKEN } from "@/utils/constants";
import { DownOutlined, GithubFilled, InfoCircleFilled, LogoutOutlined, PlusCircleFilled, QuestionCircleFilled, SearchOutlined } from "@ant-design/icons";
import {
  MenuDataItem,
  PageContainer,
  ProCard,
  ProLayout,
} from "@ant-design/pro-components";
import { Button, Card, Dropdown, Input, MenuProps, Space } from "antd";
import * as React from "react";
import { Link, useNavigate, useOutlet } from "react-router-dom";
import style from "./index.module.less";

const menuItemRender = (item: MenuDataItem, dom: React.ReactNode) => (
  <Link to={item.path || "/"}>{dom}</Link>
);

const Layout = () => {
  const outlet = useOutlet();
  const { store } = useUserContext();
  const nav = useNavigate();
  const logoutHandler = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };
  const { go } = useGoTo();
  const items: MenuProps['items'] = [
    {
      label: '个人信息',
      key: '0',
      onClick: () => go(ROUTE_KEY.MY)
    },
    {
      label: '退出登录',
      key: '1',
      onClick: logoutHandler
    },
  ];

  return (
    <div className={style['login-container']}>
      <ProLayout
        layout="mix"
        siderWidth={150}
        token={{
          header: {
            colorBgHeader: '#292f33',
            colorHeaderTitle: '#fff',
            colorTextMenu: '#dfdfdf',
            colorTextMenuSecondary: '#dfdfdf',
            colorTextMenuSelected: '#fff',
            colorBgMenuItemSelected: '#22272b',
            colorTextMenuActive: 'rgba(255,255,255,0.85)',
            colorTextRightActionsItem: '#dfdfdf',
          },
          colorTextAppListIconHover: '#fff',
          colorTextAppListIcon: '#dfdfdf',
          sider: {
            colorMenuBackground: '#fff',
            colorMenuItemDivider: '#dfdfdf',
            colorBgMenuItemHover: '#f6f6f6',
            colorTextMenu: '#595959',
            colorTextMenuSelected: '#242424',
            colorTextMenuActive: '#242424',
          },
        }}
        actionsRender={(props: { isMobile: any; layout: string; }) => {
          if (props.isMobile) return [];
          return [
            props.layout !== 'side' && document.body.clientWidth > 1400 ? (
              <div
                key="SearchOutlined"
                aria-hidden
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginInlineEnd: 24,
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
              >
                <Input
                  style={{
                    borderRadius: 4,
                    marginInlineEnd: 12,
                    backgroundColor: 'rgba(57,62,67,1)',
                    color: '#fff',
                  }}
                  prefix={
                    <SearchOutlined
                      style={{
                        color: '#dfdfdf',
                      }} rev={undefined} />
                  }
                  placeholder="搜索方案"
                  bordered={false}
                />
                <PlusCircleFilled
                  style={{
                    color: 'var(--ant-primary-color)',
                    fontSize: 24,
                  }} rev={undefined} />
              </div>
            ) : undefined,
            <InfoCircleFilled key="InfoCircleFilled" rev={undefined} />,
            <QuestionCircleFilled key="QuestionCircleFilled" rev={undefined} />,
            <GithubFilled key="GithubFilled" rev={undefined} />,
          ];
        }}
        avatarProps={{
          src: store.avatar,
          title:
            (
              <div
                style={{
                  color: '#dfdfdf',
                }}
              >
                <Dropdown menu={{ items }} trigger={['click']}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Space>
                      {store.name}
                      <DownOutlined rev={undefined} />
                    </Space>
                  </a>
                </Dropdown>
              </div>
            ),
          size: "small",
        }}
        links={[
          <Space size={20} onClick={logoutHandler}>
            <LogoutOutlined rev={undefined} />
            退出登录
          </Space>,
        ]}
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
        <PageContainer>
          <Card
            style={{
              // marginTop: 56,
              minHeight: '100vh',
            }}
          >
            {outlet}
          </Card>
        </PageContainer>
      </ProLayout>
    </div>
  );
};

export default Layout;
