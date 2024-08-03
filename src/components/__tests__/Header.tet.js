import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux";
import Header from "../Header"
import appStore from "../../utils/appStore";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom"


it("Should render Header Component with a login button", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );  

    const loginButton = screen.getByRole("button", {name: "Login" });

    expect(loginButton).toBeInTheDocument();

});


it("Should render Header Component with Cart items 0", () => {
    render(
        <BrowserRouter>
            <Provider store={appStore}>
                <Header/>
            </Provider>
        </BrowserRouter>
    );  

    const cartItems = screen.getByText("Cart - (0 items)");

    expect(cartItems).toBeInTheDocument();

})