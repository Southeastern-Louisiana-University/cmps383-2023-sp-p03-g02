import React, { useEffect, useRef } from "react"
import { Animated, Easing, View } from "react-native"
import EnTrackColors from "../style/colors";

const AnimatedBar: React.FC = () => {
    const animWidth = useRef(new Animated.Value(0)).current;

    useEffect(() => {
            Animated.timing(animWidth, {
                toValue: 1,
                duration: 1000,
                easing: Easing.out(Easing.ease),
                useNativeDriver: true
            }).start();
    }, [animWidth]);

    return (
        <Animated.View
            style={{
                marginBottom: 20,
                backgroundColor: EnTrackColors.mainColor,
                height: 3,
                width: 300,
                borderRadius: 1.5,
                transform: [{scaleX: animWidth}],
            }}
        />
    );
}

export default AnimatedBar;