import Shimmer from "./shimmer";
import { useParams } from "react-router-dom";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import { useEffect, useState } from "react";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {

    const {resId} = useParams();

    const resInfo = useRestaurantMenu(resId);

    const [showIndex, setShowIndex] = useState(1);


    if(resInfo === null) return <Shimmer/>;

    const { name, cuisines, costForTwoMessage} = 
        resInfo?.cards[2]?.card?.card?.info;

    const {itemCards} = 
        resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

        console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

        // console.log(itemCards);

        const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
            (c) => 
                c.card?.card?.["@type"] === 
                "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        );

        // console.log(categories)


    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold text-lg">
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            {/**categories accordian */}
            {categories.map((category, index) => (
                // controlled component
                <RestaurantCategory 
                    key={category?.card?.card.title} 
                    data={category?.card?.card} 
                    showItems={index === showIndex ? true : false}
                />
            ))}
        </div>
    );
};

export default RestaurantMenu;