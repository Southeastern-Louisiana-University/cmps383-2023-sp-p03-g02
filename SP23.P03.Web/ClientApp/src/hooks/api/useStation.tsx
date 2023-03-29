import axios from 'axios';
import { useEffect, useState } from 'react';
import { TrainStationDto } from '../../types/types';

const useStation = (stationId?: string | number) => {
    const [station, setStation] = useState<TrainStationDto>();

    useEffect(() => {
        if(stationId){
            axios.get<TrainStationDto>(`/api/stations/${stationId}`)
                .then((response) => setStation(response.data))
                .catch(console.error);
        }
    }, [stationId]);

    return station;
}

export default useStation;