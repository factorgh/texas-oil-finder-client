import "leaflet/dist/leaflet.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/core/layout";
import ProtectedRoute from "./components/core/protectedRoute";
import Cancel from "./components/stripe/cancel";
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
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route
            path="permits"
            element={
              <ProtectedRoute>
                <PermitsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="leases"
            element={
              <ProtectedRoute>
                <LeasesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="operator"
            element={
              <ProtectedRoute>
                <OperatorPage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="pricing"
            element={
              <ProtectedRoute>
                <PricingPage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="counties/oil-gas"
            element={
              <ProtectedRoute>
                <OilGasDetail />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="counties/oil-gas/operator"
            element={
              <ProtectedRoute>
                <ProducingOperatorDetails />
              </ProtectedRoute>
            }
          />
          <Route
            path="search"
            element={
              <ProtectedRoute>
                <SearchPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* No Layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />

        {/* Stripe routes */}
        {/* <Route path="/checkout" element={<SubscriptionPlans />} /> */}
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route
          path="*"
          element={
            <div className="text-3xl h-screen flex items-center justify-center">
              404 Page Not Found
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
