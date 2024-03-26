import React from "react";
import MapView from "./map/MapView";
import "../assets/styles/main.css"
import SideInfo from "./sidebar/SideInfo";

const Main = () => {

    return (
        <React.Fragment>

            <div id="main">
                <div id="side-bar-view">
                    <SideInfo/>
                </div>
                <div id="map-view">
                    <MapView/>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Main;