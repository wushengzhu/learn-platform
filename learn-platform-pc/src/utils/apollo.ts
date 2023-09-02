import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { AUTH_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { currentShop } from ".";
import { message } from "antd";
// import { useNavigate } from "react-router-dom";

const uri = `/graphql`;
/**
 * 统一处理接口报错
 */
const errorLink = onError(({ graphQLErrors, networkError }) => {
    // const nav = useNavigate();
    if (graphQLErrors) {
        // message.info("请求参数或者返回的数据格式不对");
        graphQLErrors.forEach((item) => {
            // 保证已存在token但是过期了才显示这个tip
            if (
                item.message === "Unauthorized" &&
                localStorage.getItem(AUTH_TOKEN)
            ) {
                message.destroy();
                message.error("登录失效，请登录");
                // nav("/login");
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
