import axios from 'axios';
import { useEffect, useState } from 'react';
import { CreateTripDto, TripDto } from '../../types/types';

const useTrips = () => {
    const [trips, setTrips] = useState<TripDto[]>([]);

    const fetchTrips = async () => axios.get<TripDto[]>(`/api/trips`)
        .then(response => setTrips(response.data))
        .catch(console.error);

    const createTrip = async (createTripDto: CreateTripDto) => axios.post<TripDto>(`/api/trips`, createTripDto)
        .then(() => fetchTrips())
        .catch(error => {
            alert("There was a problem with creating the trip.")
            console.error(error);
        });
        
    const createTrips = async (createTripDtos: CreateTripDto[], onSuccess?: () => any) => axios.post(`/api/trips/batch`, createTripDtos)
        .then(() => {
            if(onSuccess) onSuccess();
            fetchTrips()
        })
        .catch(error => {
            alert("There was a problem with creating the trips.");
        });

    const updateTrip = async (id: number, createTripDto: CreateTripDto) => axios.put<TripDto>(`/api/trips/${id}`, createTripDto)
        .then(() => fetchTrips())
        .catch(error => {
            alert("There was a problem with updating the trip.")
            console.error(error);
        });
    
    const deleteTrip = async (id: number) => axios.delete(`/api/trips/${id}`)
        .then(() => fetchTrips())
        .catch(error => {
            alert("There was a problem with deleting the trip.")
            console.error(error);
        });

    useEffect(() => {
        fetchTrips();
    }, []);

    return { trips, createTrip, createTrips, updateTrip, deleteTrip };
}

export type TripsService = ReturnType<typeof useTrips>;

export default useTrips;