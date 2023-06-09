import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { AUTH_TOKEN } from "./constants";
import { setContext } from "@apollo/client/link/context";
import { currentShop } from ".";

const httpLink = createHttpLink({
    uri: "http://localhost:1024/graphql",
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
    // uri: `http://${window.location.hostname}:3000/graphql`,
    // uri: "http://localhost:3002/graphql",
    link: authLink.concat(httpLink),
    cache: new InMemoryCache({
        addTypename: false,
    }),
});
