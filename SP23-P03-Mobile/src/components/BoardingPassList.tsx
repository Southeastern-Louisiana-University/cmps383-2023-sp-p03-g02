import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View, ViewProps } from 'react-native';
import QRCode from 'react-qr-code';
import { deployedAppURL } from '../constants/api';
import EnTrackColors from '../style/colors';
import { BoardingPassDto } from '../types/boardingpasses';
import { DateTime } from 'luxon';



type BoardingPassProps = ViewProps;

const BoardingPassList: React.FC<BoardingPassProps> = (props) => {
    const [myBoardingPasses, setMyBoardingPasses] = useState<BoardingPassDto[]>();


    useEffect(() => {
        axios.get<BoardingPassDto[]>(`${deployedAppURL}/api/boardingpasses/me`).then((response) => {
            setMyBoardingPasses(response.data);
        });
    }, []);

    return (
        <View style={[styles.borderedView, { flex: 1, alignSelf: "stretch", margin: 5 }]}>
            
            {myBoardingPasses ? (
                <FlatList
                    data={myBoardingPasses}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item: boardingPass }) => {
                            const firstTrip = boardingPass.trips[0];
                            const lastTrip = boardingPass.trips[boardingPass.trips.length - 1];
                            const departure = new Date(firstTrip.departure);
                            const arrival = new Date(firstTrip.arrival);
                            return (
                            <View style={[styles.borderedView, { display: "flex", flexDirection: "row" }]}>
                                <View style={{ borderColor: "#FFFFFF", borderWidth: 3, marginRight: 10 }}>
                                    <QRCode value={boardingPass.code} size={96} />
                                </View>
                                <View>
                                    <Text style={styles.text}>{firstTrip.fromStation.name} {"->"} {lastTrip.toStation.name}</Text>
                                    <Text style={styles.text}>{departure.toLocaleDateString()} {departure.toLocaleTimeString()} {"->"} {arrival.toLocaleDateString()} {arrival.toLocaleTimeString()}</Text>
                                    <Text style={styles.text}>{boardingPass.travelClass}</Text>
                                    <Text style={styles.text}>{boardingPass.passengers.length} passengers</Text>
                                </View>
                            </View>
                    )}}
                />
            ) : (
                <ActivityIndicator size="large" />
            )}
        </View>
    );
}

export default BoardingPassList;

const styles = StyleSheet.create({
    borderedView: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: EnTrackColors.mainColor,
    },
    text: {
        color: "#FFFFFF"
    }
});