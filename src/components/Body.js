import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";

const Body = () => {

    // State Variable = Super Powerful Variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    // Whenever state variables update, react trigger a reconciliation cycle(re-render the component)
    console.log("Body Rendered")


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.5502182&lng=78.3358612&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"

        );

        const json = await data.json();
        console.log(json);
        // Optional Chaining
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    };




    return listOfRestaurants.length === 0 ? (<Shimmer/>) : (
        <div className="body">
            <div className="filter">

                <div className="search">
                    <input 
                        type="text" 
                        placeholder="Search" 
                        className="search-box" 
                        value={searchText} 
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }} 
                    />
                    <button 
                        onClick={() => {
                            // Filter the restaurant card and update the UI
                            // SearchText
                            console.log(searchText);

                            const filteredRestaurant = listOfRestaurants.filter(
                                (res) => res.data.name.toLowerCase().includes(searchText.toLowerCase())
                            );

                            setListOfRestaurants(filteredRestaurant);

                        }}
                    >
                        Search
                    </button>
                </div>

                <button 
                    className="filter-btn" 
                    onClick={() => {
                        // filter logic here
                        const filteredList = listOfRestaurants.filter(
                            (res) => res.data.avgRating > 4
                        );
                        setFilteredRestaurant(filteredList);
                    }}
                >
                    Top Rated Restaurants
                </button>
            </div>
            <div className="res-container">
                {
                  filteredRestaurant.map((restaurant) => (
                    <Link 
                        key={restaurant.info.id} 
                        to={"/restaurant/" + restaurant.info.id}>
                            <RestaurantCard resData={restaurant}/>
                    </Link>
                  ))
                }
            </div>
        </div>
    )
}

export default Body;