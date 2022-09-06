import { Admin } from "./pages/Admin";
import { Auth } from "./pages/Auth";
import { Cart } from "./pages/Cart";
import { Catalog } from "./pages/Catalog";
import { Home } from "./pages/Home";
import { ProductDetail } from "./pages/ProductDetail";
import { Profile } from "./pages/Profile";
import { ADMIN_ROUTE, CART_ROUTE, CATALOG_ROUTE, HOME_ROUTE, LOGIN_ROUTE, PRODUCT_ROUTE, PROFILE_ROUTE, REGISTRATION_ROUTE } from "./utils/consts";

export const authRoutes = [
  {
    path: CART_ROUTE,
    Component: Cart
  },
  {
    path: ADMIN_ROUTE,
    Component: Admin
  },
  {
    path: PROFILE_ROUTE + '/:id',
    Component: Profile
  }
];

export const publicRoutes = [
  {
    path: HOME_ROUTE,
    Component: Home
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: CATALOG_ROUTE,
    Component: Catalog
  },
  {
    path: PRODUCT_ROUTE + '/:id',
    Component: ProductDetail
  }
];