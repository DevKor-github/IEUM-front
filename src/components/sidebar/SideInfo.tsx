import React from "react";
import Profile from "./Profile";
import SpotList from "./SpotList";
import "../../assets/styles/sideinfo.css"
const SideInfo = () => {

    return (
        <div>
            <Profile/>
            <hr/>
            <SpotList/>
        </div>
    )
}

export default SideInfo;