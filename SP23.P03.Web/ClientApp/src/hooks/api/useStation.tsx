import axios from 'axios';
import { useEffect, useState } from 'react';
import { StationGetDto } from '../../types/types';

const useStation = (stationId?: string | number) => {
    const [station, setStation] = useState<StationGetDto>();

    useEffect(() => {
        if(stationId){
            axios.get<StationGetDto>(`/api/stations/${stationId}`)
                .then((response) => setStation(response.data))
                .catch(console.error);
        }
    }, [stationId]);

    return station;
}

export default useStation;