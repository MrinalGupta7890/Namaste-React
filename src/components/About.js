import UserContext from "../utils/UserContext";
import User from "./User";
import UserClass from "./UserClass";
import { Component } from "react";


class About extends Component {
    constructor(props){
        super(props);

        // console.log("parent constructor");
    }


    componentDidMount() {
        // console.log("parent component did mount");
    }



    render() {
        // console.log("Parent Render");

        return (
            <div>
                <h1>About class component</h1>
                <div>
                    LoggedIn User
                    <UserContext.Consumer>
                        {({loggedInUser}) => (
                            <h1 className="text-xl font-bold">{loggedInUser}</h1>
                        )}
                    </UserContext.Consumer>
                </div>
                <h2>This is the about page</h2>
                <UserClass name={"Mrunal Gupta {classes}"} location={"Hyderabad classes"}/>
            </div>
        )
    }
}


// const About = () => {
//     return (
//         <div>
//             <h1>About</h1>
//             <h2>This is the about page</h2>
//             <UserClass name={"Mrunal Gupta {classes}"} location={"Hyderabad classes"}/>
//         </div>
//     )
// }

export default About;