import { useSelector } from "react-redux";


const Cart = () => {
    const cartItems = useSelector((store) => store.cart.items);

    return(
        <div className="text-center m-3 p-3">
            <h1 className="text-2xl font-bold">Cart</h1>
        </div>
    )
};

export default Cart;