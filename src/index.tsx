import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
} from "@apollo/client";
import {Auth0Provider} from "@auth0/auth0-react";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const client = new ApolloClient({
    uri: "https://improved-doe-53.hasura.app/v1/graphql",
    cache: new InMemoryCache(),
});

root.render(
    <React.StrictMode>
        <Auth0Provider
            domain={process.env.REACT_APP_AUTH0_DOMAIN ?? ''}
            clientId={process.env.REACT_APP_AUTH0_CLIENT_ID ?? ''}
            authorizationParams={{
                redirect_uri: window.location.origin
            }}
        >
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </Auth0Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();