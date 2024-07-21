import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
    const{resData} = props;

    const {
      cloudinaryImageId,
      name,
      cuisines,
      avgRating,
      costForTwo,
      sla,
    } = resData?.info;

    return(
        <div className="m-4 p-4 w-[240px] rounded-lg bg-gray-100 hover:bg-gray-200">

            <img 
            className="rounded-lg"
            alt="res-logo"
            src={CDN_URL + resData.info.cloudinaryImageId}
            />
            <h3 className="font-bold py-4 text-lg">{name}</h3>
            <h4 className="py-1">{cuisines.join(", ")}</h4>
            <h4 className="py-1">{avgRating} stars</h4>
            <h4 className="py-1">{costForTwo}</h4>
            <h4 className="py-1">{sla?.slaString}</h4>
        </div>
    )
};

//  Higher Order Component
// Input - RestaurantCard => RestaurantCardPromoted

export const withPromotedLabel = (RestaurantCard) => {
    return (props) => {
        return(
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-lg">
                    Promoted
                </label>
                <RestaurantCard {...props}/>
            </div>
        );
    };
};


export default RestaurantCard;