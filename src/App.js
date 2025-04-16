import "./App.css";
import "./i18n";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import NotFound from "./components/common/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import Orders from "./pages/Orders";
import ProtectedRoute from "./components/common/ProtectedRoute";
import ProductsPage from "./pages/ProductsPage";
import Cart from "./pages/Cart";
import Fav from "./pages/Fav";
import ProductDetails from "./components/products/ProductDetails";
import ProductManagement from "./components/admin/ProductManagement";
import OrderMangment from "./components/admin/OrderMangment";
import UserManagement from "./components/admin/UserManagement";

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/products"
            element={
              <Layout>
                <ProductsPage />
              </Layout>
            }
          />
          <Route
            path="/details/:id"
            element={
              <Layout>
                <ProductDetails />
              </Layout>
            }
          />
          <Route
            path="/mycart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
          <Route
            path="/myfavarite"
            element={
              <Layout>
                <Fav />
              </Layout>
            }
          />

          {/* Protected Routes for Customer */}
          <Route element={<ProtectedRoute allowedRoles={["customer"]} />}>
            <Route
              path="/orders"
              element={
                <Layout>
                  <Orders />
                </Layout>
              }
            />
          </Route>

          {/* Protected Routes for Admin */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route
              path="/dashboard"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />
            <Route
              path="/mangment-products"
              element={
                <Layout>
                  <ProductManagement />
                </Layout>
              }
            />
            <Route
              path="/mangment-orders"
              element={
                <Layout>
                  <OrderMangment />
                </Layout>
              }
            />
            <Route
              path="/mangment-users"
              element={
                <Layout>
                  <UserManagement />
                </Layout>
              }
            />
          </Route>

          {/* Catch-all */}
          <Route
            path="*"
            element={
              <Layout>
                <NotFound />
              </Layout>
            }
          />
        </Routes>
      </HashRouter>
      <ToastContainer position="top-center" autoClose={3000} />
    </>
  );
}

export default App;
