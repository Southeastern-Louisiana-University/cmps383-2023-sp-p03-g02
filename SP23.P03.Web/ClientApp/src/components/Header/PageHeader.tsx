import React from "react";
import './HeaderStyling.css';
import TitleLogo from '../../assets/EnTrack.png';

export function PageHeader() {
    return (
        <div className="header-container">

            { /*  
            <img src={TitleLogo} alt="Entrack" sizes="small"/>
            */}

            { /* EnTrack title */}
            <div className="title">
                EnTrack
            </div>

        </div>
    );
}