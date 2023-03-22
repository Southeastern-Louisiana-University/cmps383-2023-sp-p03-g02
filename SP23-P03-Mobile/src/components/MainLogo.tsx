import React from 'react';
import { Image } from "react-native";
import homeLogo from '../../assets/EnTrack_HomeLogo.png';
import EnTrackColors from '../style/colors';


const MainLogo: React.FC = (props) => {
    return (
        <Image
            source={homeLogo}
            style={
                {
                    width: 300,
                    resizeMode: "contain",
                    tintColor: EnTrackColors.mainColor,
                }
            }
        />
    );
}

export default MainLogo;