import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({data}) => {
    // console.log(data)
    const [showItems, setShowItems] = useState(false);

    const handleClick = () => {
        // console.log("clicked");
        setShowItems(!showItems);
    }


    return (
        <div>
            {/**Accordian Header */}
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
                <div 
                    className="flex justify-between cursor-pointer" 
                    onClick={handleClick}>
                    <span className="font-bold text-lg">
                        {data.title} ({data.itemCards.length})
                    </span>
                    <span>⬇️</span>
                </div>

                {/**Accordian Body */}
                {showItems && <ItemList items={data.itemCards}/>}
            </div>
        </div>
    );
};

export default RestaurantCategory;