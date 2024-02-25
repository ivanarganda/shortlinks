import React, { lazy , Suspense } from "react";
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
import RedirectShort from "./Components/RedirectShort";
import Resume from "./Components/Resume";
import { Auth } from "./hooks/state/Auth";
import useFadeIn from "./hooks/state/useFadeIn.jsx";

const LazyLogin = lazy(()=>import('./Components/Login.jsx'))
const LazyRegister = lazy(()=>import('./Components/Register.jsx'))
const LazyHeader = lazy(()=>import('./Components/Header.jsx'))
const LazyDashboard = lazy(()=>import('./Components/Dashboard.jsx'))
const LazyFooter = lazy(()=>import('./Components/Footer.jsx'))
const LazyResume = lazy(()=>import('./Components/Resume.jsx'))

const [Section] = useFadeIn();

ReactDOM.createRoot(document.getElementById('root')).render( 
    <React.StrictMode>
      <GoogleOAuthProvider clientId='909316839836-f6ig5si1ab9qo7u8jtddt4or98rlhoju.apps.googleusercontent.com'>
        <AuthProvider>
          <UrlsProvider>
            <MsgProvider>
              <div className="w-full min-w-[350px]">
                <Router basename="/">
                  <Auth />
                  <Suspense fallback={null}>
                  <LazyHeader />
                  <Routes>
                    <Route exact path="/" element={()=>{return}} />
                    <Route exact path="/:key/:code" element={<RedirectShort />} />
                    <Route
                      exact
                      path="/login"
                      element={
                        <Section>
                          <LazyResume />
                          <LazyLogin />
                        </Section>
                      }
                    />
                    <Route
                      exact
                      path="/register"
                      element={
                        <Section>
                          <LazyResume />
                          <LazyRegister />
                        </Section>
                      }
                    />
                    <Route
                      exact
                      path="/dashboard"
                      element={
                        <Section>
                          <LazyDashboard />
                        </Section>
                      }
                    />
                  </Routes>
                  <Section>
                    <LazyFooter />
                  </Section>
                  </Suspense>
                  <Snackbar_ />
                </Router>
              </div>
            </MsgProvider>
          </UrlsProvider>
        </AuthProvider>
      </GoogleOAuthProvider>
    </React.StrictMode>
);