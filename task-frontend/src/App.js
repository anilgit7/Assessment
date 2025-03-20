import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PageNotFound from "./components/PageNotFound";
import SignUp from "./components/SignUp";
import ValidateRoute from "./components/ValidateRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' 
          element={
            <ValidateRoute>
              <Login />
            </ValidateRoute>
          } 
        />
        <Route path="/signup"
          element={
            <ValidateRoute>
              <SignUp />
            </ValidateRoute>
          }
        />
        <Route path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* For routes that doesn't exist */}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
