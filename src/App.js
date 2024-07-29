import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
// import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
// import Grocery from "./components/Grocery";


/**
 * Chunking             |
 * Code Splitting       |
 * Lazy Loading         | {Different words for same thing}
 * Dyanamic Bundling    |
 * On Demand Loading    |
 * Dyanamic Import      |
 */

const Grocery = lazy(() => import("./components/Grocery"));
const About = lazy(() => import("./components/About"));


const AppLayout = () => {

    const [userName, setUserName] = useState();

    // authentication
    useEffect(() => {
        // Make an API call and send username and password
        const data = {
            name: "Mrinal Gupta",
        };
        setUserName(data.name);
    }, [])

    return (
        <Provider store={appStore}>
        <UserContext.Provider value={{loggedInUser: userName, setUserName}}>
            <div className="app">
                <Header/>
                <Outlet/>
            </div>
        </UserContext.Provider>
        </Provider>
    )
}

const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout/>,
        children: [
            {
                path: "/",
                element: <Body/>,
            },
            {
                path: "/about",
                element: <Suspense fallback={<h1>Loading.....</h1>}>
                            <About/>
                        </Suspense>,
            },
            {
                path: "/contact",
                element: <Contact/>,
            },
            {
                path: "/grocery",
                element: <Suspense fallback={<h1>Loading.....</h1>}>
                            <Grocery/>
                        </Suspense>,
            },
            {
                path: "/restaurant/:resId",
                element: <RestaurantMenu/>,
            },
        ],
        errorElement: <Error/>,
    },
    
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={appRouter} />);
