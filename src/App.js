import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChatApp from "./components/ChatApp";
import SignIn from "./views/SignIn";
import SignUp from "./views/Signup";
import SignInGoogle from "./views/SignInGoogle";

function App() {
    return (
        <Router>
            {/* <NavBar /> */}
            <div className="App">
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/auth/google" element={<SignInGoogle />} />

                    <Route path="/" element={<ChatApp />} />

                    {/* <Route
                        path="/reset-password/:token"
                        element={<ResetPassword />}
                    />
                    {/* Protect the Movies route */}
                    {/* <Route
                        path="/movies"
                        element={
                            <RequireAuth>
                                <Movies />
                            </RequireAuth>
                        }
                    />
                    {/* Default redirect or homepage */}
                    {/* <Route path="/" element={<SignIn />} /> */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
