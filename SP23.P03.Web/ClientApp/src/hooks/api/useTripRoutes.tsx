import axios from 'axios';
import { useEffect, useState } from 'react';
import { TripWithCapacityDto } from '../../types/types';

const fetchTripRoutes = (cb: (tripRoutes: TripWithCapacityDto[][]) => void, fromStationId: string, toStationId: string, departure: string, arrival: string, travelClass: string) =>
    axios.get<TripWithCapacityDto[][]>(`/api/trips/search?fromStationId=${fromStationId}&toStationId=${toStationId}&departure=${departure}&arrival=${arrival}&travelClass=${travelClass}`)
        .then((response) => cb(response.data))
        .catch((error) => {
            if(axios.isAxiosError(error) && error.response?.status === 404){
                return cb([]);
            }
            console.error(error);
        });

const useTripRoutes = (fromStationId: string, toStationId: string, departure: string, arrival: string, travelClass: string) => {
    const [tripRoutes, setTripRoutes] = useState<TripWithCapacityDto[][]>();

    useEffect(() => {
        fetchTripRoutes(setTripRoutes, fromStationId, toStationId, departure, arrival, travelClass);
    }, [fromStationId, toStationId, departure, arrival, travelClass]);

    return tripRoutes;
}

export default useTripRoutes;