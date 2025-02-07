import "leaflet/dist/leaflet.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/core/layout";
import Cancel from "./components/stripe/cancel";
import SubscriptionPlans from "./components/stripe/subscriptions";
import Success from "./components/stripe/success";
import HomePage from "./pages/home";
import LeasesPage from "./pages/leases";
import LoginPage from "./pages/login";
import OilGasDetail from "./pages/oil_gas";
import OperatorPage from "./pages/operator";
import PermitsPage from "./pages/permits";
import PricingPage from "./pages/pricing";
import ProducingOperatorDetails from "./pages/producing_operator_details";
import Profile from "./pages/profile";
import RegisterPage from "./pages/register";
import SearchPage from "./pages/search";

function App() {
  const userId = localStorage.getItem("user");
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/home"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          exact
          path="/"
          element={
            <Layout>
              <HomePage />
            </Layout>
          }
        />
        <Route
          exact
          path="/permits"
          element={
            <Layout>
              <PermitsPage />
            </Layout>
          }
        />
        <Route
          exact
          path="/leases"
          element={
            <Layout>
              <LeasesPage />
            </Layout>
          }
        />
        <Route
          exact
          path="/operator"
          element={
            <Layout>
              <OperatorPage />
            </Layout>
          }
        />
        <Route
          exact
          path="/pricing"
          element={
            <Layout>
              <PricingPage />
            </Layout>
          }
        />
        <Route
          exact
          path="/counties/oil-gas"
          element={
            <Layout>
              <OilGasDetail />
            </Layout>
          }
        />

        <Route
          exact
          path="/counties/oil-gas/operator"
          element={
            <Layout>
              <ProducingOperatorDetails />
            </Layout>
          }
        />
        <Route
          exact
          path="/search"
          element={
            <Layout>
              <SearchPage />
            </Layout>
          }
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />

        {/* Stripe routes */}
        <Route
          path="/checkout"
          element={<SubscriptionPlans userId={userId} />}
        />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
