import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";
import {useAuth} from "@clerk/clerk-react";
import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import OrdersPage from "./pages/OrdersPage.jsx";
import CustomersPage from "./pages/CustomersPage.jsx";
import DashboardLayout from "./layout/DashboardLayout.jsx";
import PageLoader from "./components/PageLoader.jsx";

const App = () => {
    const {isSignedIn,isLoaded}=useAuth();

    if(!isLoaded) return <PageLoader/>
    return (
        <div>
            <Routes>
                {/* Public route */}
                <Route
                    path="/login"
                    element={!isSignedIn ? <LoginPage /> : <Navigate to="/" replace />}
                />

                {/* Protected routes */}
                <Route
                    path="/"
                    element={isSignedIn ? <DashboardLayout /> : <Navigate to="/login" replace />}
                >
                    <Route index element={<DashboardPage />} />
                    <Route path="products" element={<ProductsPage />} />
                    <Route path="orders" element={<OrdersPage />} />
                    <Route path="customers" element={<CustomersPage />} />
                </Route>

                {/* Fallback */}
                {/*<Route path="*" element={<Navigate to="/" replace />} />*/}
            </Routes>
        </div>
    )
}
export default App
