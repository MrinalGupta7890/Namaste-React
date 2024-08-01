import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Body = () => {

    // State Variable = Super Powerful Variable
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [filteredRestaurant, setFilteredRestaurant] = useState([]);

    const [searchText, setSearchText] = useState("");

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

    // Whenever state variables update, react trigger a reconciliation cycle(re-render the component)
    // console.log("Body Rendered", listOfRestaurants)


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.5502182&lng=78.3358612&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"

        );

        const json = await data.json();
        // console.log(json);
        // Optional Chaining
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    };


    const onlineStatus = useOnlineStatus();

    if(onlineStatus === false) 
        return (
            <h1>
                Looks like you're offline!! Please check your internet connection.
            </h1>
        );


        const {loggedInUser, setUserName} = useContext(UserContext);




    return listOfRestaurants.length === 0 ? (<Shimmer/>) : (
        <div className="body">
            <div className="filter flex">

                <div className="m-4 p-4">
                    <input 
                        type="text" 
                        placeholder="Search a restaurant you want..." 
                        className="px-4 py-2 border-0 border-transparent shadow-md font-medium bg-gray-100 rounded-md focus:border-0 focus:outline-0 w-[300px] placeholder:font-medium focus:border-b-2 focus:border-green-500" 
                        value={searchText} 
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }} 
                    />
                    <button 
                        className="px-4 py-1 bg-green-300 m-4 rounded-lg shadow-md hover:bg-green-300 duration-[.3s] font-medium"
                        onClick={() => {
                            // Filter the restaurant card and update the UI
                            // SearchText
                            // console.log(searchText);

                            const filteredRestaurant = listOfRestaurants.filter((res) => 
                                res.info.name.toLowerCase().includes(searchText.toLowerCase())
                            );

                            setListOfRestaurants(filteredRestaurant);

                        }}
                    >
                        Search
                    </button>
                </div>

                <div className="m-4 p-4 flex items-center">
                    <button 
                        className="px-4 py-1 bg-gray-300 rounded-lg" 
                        onClick={() => {
                            // filter logic here
                            const filteredList = listOfRestaurants.filter(
                                (res) => res.info.avgRating > 4
                            );
                            setFilteredRestaurant(filteredList);
                            console.log(filteredList);
                        }}
                    >
                        Top Rated Restaurants
                    </button>
                </div>

                <div className="m-4 p-4 flex items-center">
                    <label>UserName </label>
                    <input 
                        className="border border-black p-1" 
                        value={loggedInUser}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

            </div>
            <div className="flex flex-wrap">
                {
                  filteredRestaurant.map((restaurant) => (
                    <Link 
                        key={restaurant?.info.id} 
                        to={"/restaurant/" + restaurant?.info.id}>

                            {/**If the restaurant is promoted then add a promoted label to it */
                            restaurant?.info.Promoted ? (
                                <RestaurantCardPromoted resData={restaurant}/>
                            ) : (
                                <RestaurantCard resData={restaurant}/>
                            )}
                    </Link>
                  ))}
            </div>
        </div>
    )
}

export default Body;