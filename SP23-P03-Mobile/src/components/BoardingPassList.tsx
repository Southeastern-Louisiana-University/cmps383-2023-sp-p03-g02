import React from 'react';
import { ActivityIndicator, FlatList, Text, View, ViewProps } from 'react-native';
import QRCode from 'react-qr-code';
import { BoardingPassDto } from '../types/boardingpasses';
import styles from '../style/styles';



type BoardingPassProps = ViewProps & { boardingPasses: BoardingPassDto[] };

const BoardingPassList: React.FC<BoardingPassProps> = (props) => {
    const { boardingPasses } = props;

    return (
        <View style={[styles.borderedView, { flex: 1, alignSelf: "stretch", margin: 5 }]} {...props}>
            {boardingPasses ? (
                <FlatList
                    data={boardingPasses}
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