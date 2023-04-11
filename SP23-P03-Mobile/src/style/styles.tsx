import { StyleSheet } from "react-native";
import EnTrackColors from "./colors";

const styles = StyleSheet.create({
    absoluteFill: {
        position: "absolute",
        left: 0, right: 0, bottom: 0, top: 0
    },
    background: {
        backgroundColor: EnTrackColors.darkBackground
    },
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
    },
    center: {
        justifyContent: "center",
    },
    divider: {
        width: "100%",
        borderTopColor: EnTrackColors.mainColor,
        borderTopWidth: 3,
        marginBottom: 1,
    },
    topDivider: {
        borderTopColor: EnTrackColors.mainColor,
        borderTopWidth: 2,
    },
    bottomDivider: {
        borderBottomColor: EnTrackColors.mainColor,
        borderBottomWidth: 2,
    },
    borderedView: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: EnTrackColors.mainColor,
    },
    text: {
        color: "#FFFFFF",
    },
    hugeText: {
        color: "#FFFFFF",
        fontSize: 50,
    },
    largeText: {
        color: "#FFFFFF",
        fontSize: 32,
    },
    bigText: {
        color: "#FFFFFF",
        fontSize: 20,
    },
    menuItem : {
        margin: 10,
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
    }
});

export default styles;