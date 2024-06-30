import React from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
// import LoginPage from "./pages/LoginPage";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import { AuthProvider } from "./context/authContext";
import Home from "./components/home";
// import Header from "./components/header";
// import Header from "./components/Header";

function App() {
  const RoutesComponent = () => {
    const routesArray = [
      {
        path: "*",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/home",
        element: <Home />,
      },
    ];
    return useRoutes(routesArray);
  };

  return (
    <AuthProvider>
      <BrowserRouter>
        {/* <Header /> */}
        <div>
          <RoutesComponent />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
