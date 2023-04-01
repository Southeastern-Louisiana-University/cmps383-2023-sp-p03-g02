import React from 'react';
import { Image, View } from "react-native";
import homeLogo from '../../assets/EnTrack_Logo_white.png';
import EnTrackColors from '../style/colors';


const MainLogo: React.FC = (props) => {
    return (
        <View style={{ paddingTop: 30, alignSelf: "stretch", alignItems: "center" }}>
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
        </View>
    );
}

export default MainLogo;