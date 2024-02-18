import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MsgProvider } from "./Context/messageContext";
import { AuthProvider } from "./Context/authContext";
import { UrlsProvider } from "./Context/urlContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Header from "./Components/Header";
import Snackbar_ from "./Components/Snackbar";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer.jsx";
import MyUrls from "./Components/MyUrls";
import RedirectShort from "./Components/RedirectShort";
import Resume from "./Components/Resume";
import { Auth } from "./hooks/state/Auth";
import useFadeIn from "./hooks/state/useFadeIn.jsx";

const [Section] = useFadeIn();

const App = () => {
  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId='909316839836-f6ig 5si1ab9qo7u8jtddt4or98rlhoju.apps.googleusercontent.com'>
        <AuthProvider>
          <UrlsProvider>
            <MsgProvider>
              <div className="w-full min-w-[350px]">
                <Router basename="/">
                  <Auth />
                  <Header />
                  <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/:key/:code" element={<RedirectShort />} />
                    <Route
                      exact
                      path="/login"
                      element={
                        <Section>
                          <Resume />
                          <Login />
                        </Section>
                      }
                    />
                    <Route
                      exact
                      path="/register"
                      element={
                        <Section>
                          <Resume />
                          <Register />
                        </Section>
                      }
                    />
                    <Route
                      exact
                      path="/dashboard"
                      element={
                        <Section>
                          <Dashboard />
                        </Section>
                      }
                    />
                    <Route exact path="/dashboard/profile" element={<MyUrls />} />
                  </Routes>
                  <Section>
                    <Footer />
                  </Section>
                  <Snackbar_ />
                </Router>
              </div>
            </MsgProvider>
          </UrlsProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
};

const Home = () => {
  return null; // Replace with your home component
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />); 
