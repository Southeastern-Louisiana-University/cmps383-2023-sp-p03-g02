import React, { useState } from 'react';
import { ActivityIndicator, FlatList, GestureResponderEvent, Modal, Pressable, ScrollView, Text, View, ViewProps } from 'react-native';
import QRCode from 'react-qr-code';
import { BoardingPassDto } from '../types/boardingpasses';
import styles from '../style/styles';
import { formatTripDate } from '../helpers/formatters';



type BoardingPassProps = ViewProps & { boardingPasses: BoardingPassDto[] };

const BoardingPassList: React.FC<BoardingPassProps> = (props) => {
    const [selectedBoardingPass, setSelectedBoardingPass] = useState<BoardingPassDto>(null);
    const { boardingPasses } = props;

    const selectedFirstTrip = selectedBoardingPass?.trips[0];
    const selectedLastTrip = selectedBoardingPass?.trips[selectedBoardingPass.trips.length - 1];
    const selectedDeparture = new Date(selectedFirstTrip?.departure);
    const selectedArrival = new Date(selectedLastTrip?.arrival);

    return (
        <View style={[styles.borderedView, { flex: 1, alignSelf: "stretch", margin: 5 }]} {...props}>
            <Modal
                visible={!!selectedBoardingPass}
                onRequestClose={() => setSelectedBoardingPass(null)}
                transparent
                animationType='slide'
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
                            <ScrollView>
                                <View style={[styles.borderedView, { marginTop: 8 }]}>
                                    <Text style={[styles.bigText, styles.bottomDivider, { marginBottom: 5, paddingBottom: 5 }]}>
                                        {formatTripDate(selectedDeparture)} {"->"} {formatTripDate(selectedArrival)}
                                    </Text>
                                    {selectedBoardingPass.trips.map((trip, index) => (
                                        <View style={[styles.bottomDivider, { marginBottom: 5, paddingBottom: 5 }]} key={trip.id}>
                                            <Text style={styles.text}>Trip {index+1} - {trip.train.name}</Text>
                                            <Text style={[styles.text]}>{trip.fromStation.name} {"->"} {trip.toStation.name}</Text>
                                            <Text style={[styles.text]}>{formatTripDate(trip.departure)} {"->"} {formatTripDate(trip.arrival)}</Text>
                                        </View>
                                    ))}
                                </View>
                                <View style={[styles.borderedView, { marginTop: 5, alignSelf: "stretch" }]}>
                                    <Text style={[styles.bigText, styles.bottomDivider, { marginBottom: 5, paddingBottom: 5 }]}>Passengers</Text>
                                    {selectedBoardingPass.passengers.map(passenger => (
                                        <Text style={styles.text} key={passenger.id}>{passenger.firstName} {passenger.lastName}</Text>
                                    ))}
                                </View>
                            </ScrollView>
                            <Pressable
                                style={[styles.borderedView, styles.center]}
                                onPress={() => setSelectedBoardingPass(null)}
                            >
                                <Text style={styles.bigText}>Close</Text>
                            </Pressable>
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

    return (
        <Pressable onPress={onPress}>
            <View style={[styles.borderedView, { display: "flex", flexDirection: "row" }]}>
                <View style={{ borderColor: "#FFFFFF", borderWidth: 3, marginRight: 10 }}>
                    <QRCode value={boardingPass.code} size={96} />
                </View>
                <View>
                    <Text style={styles.text}>{firstTrip.fromStation.name} {"->"} {lastTrip.toStation.name}</Text>
                    <Text style={styles.text}>{formatTripDate(firstTrip.departure)} {"->"} {formatTripDate(lastTrip.arrival)}</Text>
                    <Text style={styles.text}>{boardingPass.travelClass}</Text>
                    <Text style={styles.text}>{boardingPass.passengers.length} passengers</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default BoardingPassList;