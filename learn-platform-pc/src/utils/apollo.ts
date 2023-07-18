import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { AUTH_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { currentShop } from ".";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

let uri = `http://${window.location.hostname}:1024/graphql`;
// uri: 'http://192.168.1.174:1024/graphql', // 可手机上调试的本地ip后端地址
if (process.env.NODE_ENV === "production") {
    uri = "";
}

/**
 * 统一处理接口报错
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
    const nav = useNavigate();
    if (graphQLErrors) {
        // message.info("请求参数或者返回的数据格式不对");
        graphQLErrors.forEach((item) => {
            if (item.message === "Unauthorized") {
                message.destroy();
                message.error("登录失效，请登录");
                nav("/login");
            }
        });
    }
    if (networkError) {
        message.destroy();
        message.error(networkError.message);
    }
});

const httpLink = createHttpLink({
    uri,
});
const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : "",
            shopId: currentShop()?.value,
        },
    };
});
export const client = new ApolloClient({
    link: errorLink.concat(authLink.concat(httpLink)),
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "no-cache",
        },
    },
    cache: new InMemoryCache({
        addTypename: false,
    }),
});
