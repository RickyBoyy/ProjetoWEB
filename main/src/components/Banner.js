import React, { useEffect } from "react";
import "../App.css";

function Banner ({gameBanner}){
    useEffect(()=>{
        console.log("gameBanner", gameBanner); // Check the value of gameBanner
    }, [gameBanner]);

    // Check if gameBanner is not null or empty before rendering
    if (!gameBanner) {
        return <div>No banner image available</div>;
    }

    return(
        <div className="banner-home">
            <div className="banner-case">
            <h2 className="banner-title">{gameBanner.name}</h2>
            </div>
            
            <img className="banner" src={gameBanner} alt="Game Banner" />
        </div>
    )
}

export default Banner;
