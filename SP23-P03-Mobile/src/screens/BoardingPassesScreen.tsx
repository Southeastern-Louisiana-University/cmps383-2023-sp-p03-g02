import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Link } from 'react-router-native';
import BoardingPassList from '../components/BoardingPassList';
import { deployedAppURL } from '../constants/api';
import styles from '../style/styles';
import { BoardingPassDto } from '../types/boardingpasses';

const BoardingPassesScreen: React.FC = () => {
    const [myBoardingPasses, setMyBoardingPasses] = useState<BoardingPassDto[]>();


    useEffect(() => {
        axios.get<BoardingPassDto[]>(`${deployedAppURL}/api/boardingpasses/me`).then((response) => {
            setMyBoardingPasses(response.data);
        });
    }, []);

    return (
        <>
            <Link style={[styles.borderedView, styles.center, { marginTop: 4 }]} to="/">
                <Text style={styles.bigText}>Back</Text>
            </Link>
            <BoardingPassList boardingPasses={myBoardingPasses} />
        </>
    );
}

export default BoardingPassesScreen;