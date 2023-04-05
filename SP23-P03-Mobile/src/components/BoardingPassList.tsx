import React, { useState } from 'react';
import { ActivityIndicator, FlatList, GestureResponderEvent, Modal, Pressable, Text, View, ViewProps } from 'react-native';
import QRCode from 'react-qr-code';
import { BoardingPassDto } from '../types/boardingpasses';
import styles from '../style/styles';



type BoardingPassProps = ViewProps & { boardingPasses: BoardingPassDto[] };

const BoardingPassList: React.FC<BoardingPassProps> = (props) => {
    const [selectedBoardingPass, setSelectedBoardingPass] = useState<BoardingPassDto>(null);
    const { boardingPasses } = props;

    return (
        <View style={[styles.borderedView, { flex: 1, alignSelf: "stretch", margin: 5 }]} {...props}>
            <Modal
                visible={!!selectedBoardingPass}
                onRequestClose={() => setSelectedBoardingPass(null)}
                transparent
            >
                {selectedBoardingPass && (
                    <View style={[styles.container, styles.center]}>
                        <Pressable
                            style={[styles.absoluteFill, { backgroundColor: "#00000099" }]}
                            onPress={() => setSelectedBoardingPass(null)}
                        />
                        <View style={[styles.background, styles.borderedView, styles.center, { alignItems: "center" }]}>
                        <View style={{ borderColor: "#FFFFFF", borderWidth: 8}}>
                            <QRCode value={selectedBoardingPass.code} />
                        </View>
                        {/* TODO: Put extra trip info here */}
                        </View>
                    </View>
                )}
            </Modal>
            {boardingPasses ? (
                <FlatList
                    data={boardingPasses}
                    keyExtractor={item => `${item.id}`}
                    renderItem={
                        ({ item: boardingPass }) => 
                            <BoardingPassEntry
                                boardingPass={boardingPass}
                                onPress={() => setSelectedBoardingPass(boardingPass)}
                            />
                    }
                />
            ) : (
                <ActivityIndicator size="large" />
            )}
        </View>
    );
}

type BoardingPassEntryProps = {
    boardingPass: BoardingPassDto;
    onPress?: (event: GestureResponderEvent) => void;
}

const BoardingPassEntry: React.FC<BoardingPassEntryProps> = ({ boardingPass, onPress }) => {
    const firstTrip = boardingPass.trips[0];
    const lastTrip = boardingPass.trips[boardingPass.trips.length - 1];
    const departure = new Date(firstTrip.departure);
    const arrival = new Date(firstTrip.arrival);
    return (
        <Pressable onPress={onPress}>
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
        </Pressable>
    )
}

export default BoardingPassList;