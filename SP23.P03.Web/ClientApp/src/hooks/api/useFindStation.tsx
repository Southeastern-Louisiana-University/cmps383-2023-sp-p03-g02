import axios from 'axios';
import { useEffect, useState } from 'react';
import { TrainStationDto } from '../../types/types';

const useFindStation = () => {
    const [station, setStation] = useState<TrainStationDto[]>([]);

    useEffect (() => {
        axios
            .get<TrainStationDto[]>(`/api/stations`)
            .then((response) => {
                setStation(response.data);
                console.log(response.data);
            });
        }, []);

    return station;
}

export default useFindStation;