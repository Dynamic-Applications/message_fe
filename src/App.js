import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
    Navigate,
} from "react-router-dom";
import MobileMenu from "./components/MobileMenu";
import ChatPage from "./components/ChatPage";
import Profile from "./components/Profile";
import EditProfile from "./components/ProfileEdit";
import Connect from "./components/Connect";
import Calls from "./components/Calls";
import SignIn from "./components/SignIn";
import SignUp from "./components/Signup";
import SignInGoogle from "./components/SignInGoogle";
import "./App.css";
import Messages from "./components/Messages";

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/signin" replace />;
    }
    return children;
};

// Layout for protected routes
const ProtectedLayout = ({ children }) => {
    return (
        <div>
            {children}
            <MobileMenu /> {/* MobileMenu is always visible */}
        </div>
    );
};

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Navigate to="/signin" replace />,
        },
        {
            path: "/signin",
            element: <SignIn />,
        },
        {
            path: "/signup",
            element: <SignUp />,
        },
        {
            path: "/auth/google/callback",
            element: <SignInGoogle />,
        },
        {
            path: "/messages",
            element: (
                <ProtectedRoute>
                    <ProtectedLayout>
                        <Messages />
                    </ProtectedLayout>
                </ProtectedRoute>
            ),
        },
        {
            path: "/profile",
            element: (
                <ProtectedRoute>
                    <ProtectedLayout>
                        <Profile />
                    </ProtectedLayout>
                </ProtectedRoute>
            ),
        },
        {
            path: "/profile/edit",
            element: (
                <ProtectedRoute>
                    <ProtectedLayout>
                        <EditProfile />
                    </ProtectedLayout>
                </ProtectedRoute>
            ),
        },

        {
            path: "/connect",
            element: (
                <ProtectedRoute>
                    <ProtectedLayout>
                        <Connect />
                    </ProtectedLayout>
                </ProtectedRoute>
            ),
        },
        {
            path: "/calls",
            element: (
                <ProtectedRoute>
                    <ProtectedLayout>
                        <Calls />
                    </ProtectedLayout>
                </ProtectedRoute>
            ),
        },
    ],
    {
        future: {
            v7_startTransition: true,
            v7_relativeSplatPath: true,
        },
    }
);

function App() {
    return <RouterProvider router={router} />;
}

export default App;