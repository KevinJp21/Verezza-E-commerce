import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    remix({
      routes(defineRoutes) {
        return defineRoutes((route) => {
          route("/api/products/getInventoryById/:id", "routes/api/products/getInventoryById.ts");
          route("/api/registerCustomer", "routes/api/registerCustomer.ts");
          route("/api/loginCustomer", "routes/api/loginCustomer.ts");
          route("/api/logOutCustomer", "routes/api/logOutCustomer.ts");
          route("/api/authStatus", "routes/api/authStatus.ts");
          route("/api/getCustomerOrders", "routes/api/getCustomerOrders.ts");
          route("/api/cart/addToCart", "routes/api/cart/addToCart.ts");
          route("/api/cart/getCartItems", "routes/api/cart/getCartItems.ts");
          route("/api/cart/updateCartItem", "routes/api/cart/updateCartItem.ts");
          route("/api/cart/removeCartItem", "routes/api/cart/removeCartItem.ts");
          route("/api/getAvailableCountries", "routes/api/getAvailableCountries.ts");
        });
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
    }),
    tsconfigPaths(),
  ],
  define: {
    'process.env': process.env
  }
});
