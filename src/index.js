import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { UserProvider } from "./context/user_context";
import { Auth0Provider, User } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

// dev-seb57rfii6e3ld4w.us.auth0.com domain
// 5Kq9GYqAcDoTCoybV6ORVXqMyAXeU7LV id

root.render(
  <Auth0Provider
    domain="dev-seb57rfii6e3ld4w.us.auth0.com"
    clientId="BtDKyEdvE2ps7jThqactZiR9JSgSXFKi"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <UserProvider>
      <ProductsProvider>
        <FilterProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </FilterProvider>
      </ProductsProvider>
    </UserProvider>
  </Auth0Provider>
);
