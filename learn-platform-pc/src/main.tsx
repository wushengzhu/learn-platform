import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import { ApolloProvider } from "@apollo/client";
import * as dayjs from "dayjs";
import { client } from "./utils/apollo";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { routes } from "./routes/menu";
import UserInfo from "./components/UserInfo";
import Layout from "./components/Layout";
import Login from "./containers/Login";
import { ROUTE_COMPONENT } from "./routes/index";

import "dayjs/locale/zh-cn";
import zhCN from "antd/locale/zh_CN";
import "antd/dist/reset.css";
import "./index.css";
import "virtual:windi.css";

dayjs.locale("zh-cn");
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ConfigProvider locale={zhCN}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UserInfo>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
              {routes.map((item: any) => {
                const Component = ROUTE_COMPONENT[item.key];
                return (
                  <Route
                    key={item.key}
                    path={item.path}
                    element={<Component />}
                  />
                );
              })}
            </Route>
          </Routes>
        </UserInfo>
      </BrowserRouter>
    </ApolloProvider>
  </ConfigProvider>
);
