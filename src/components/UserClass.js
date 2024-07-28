import React from "react";

class UserClass extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            userInfo: {
                name: "John",
                location: "default",
            },
        };
        // console.log("child constructor");
    }


    async componentDidMount() {
        // console.log("child component did mount");
        // API Call

        const data = await fetch("https://api.github.com/users/MrinalGupta7890");
        const json = await data.json();

        this.setState({
            userInfo: json,
        });

        // console.log(json);
    }

    componentDidUpdate(){
        // console.log("component did update");
    }

    componentWillUnmount(){
        // console.log("component will unmount");
    }


    render() {


        // console.log("child Render");

        const {name, location, avatar_url} = this.state.userInfo;
        
        return (
            <div className="user-card">  
                <img src={avatar_url} alt="avatar" />
                <h2>Name : {name}</h2>
                <h3>Location : {location}</h3>
                <h4>Contact : @MrinalGupta7890</h4>
            </div>
        );
    }
}

export default UserClass;