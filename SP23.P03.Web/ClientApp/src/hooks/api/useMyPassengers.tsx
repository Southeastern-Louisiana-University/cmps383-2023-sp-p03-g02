import axios from 'axios';
import { useEffect, useState } from 'react';
import { CreatePassengerDto, PassengerDto } from '../../types/types';
import { User } from '../../types/authentication';

const useMyPassengers = (user: User | null) => {
    const [passengers, setPassengers] = useState<PassengerDto[]>([]);

    const fetchPassengers = async () => axios.get<PassengerDto[]>(`/api/passengers/me`)
        .then(response => setPassengers(response.data))
        .catch(console.error);

    const createPassenger = async (createPassengerDto: CreatePassengerDto) => axios.post<PassengerDto>(`/api/passengers`, createPassengerDto)
        .then(() => fetchPassengers())
        .catch(error => {
            alert("There was a problem with creating the passenger.")
            console.error(error);
        });

    const updatePassenger = async (id: number, createPassengerDto: CreatePassengerDto) => axios.put<PassengerDto>(`/api/passengers/${id}`, createPassengerDto)
        .then(() => fetchPassengers())
        .catch(error => {
            alert("There was a problem with updating the passenger.")
            console.error(error);
        });
    
    const deletePassenger = async (id: number) => axios.delete(`/api/passengers/${id}`)
        .then(() => fetchPassengers())
        .catch(error => {
            alert("There was a problem with deleting the passenger.")
            console.error(error);
        });

    useEffect(() => {
        fetchPassengers();
    }, [user]);

    return { passengers, createPassenger, updatePassenger, deletePassenger };
}

export type MyPassengers = ReturnType<typeof useMyPassengers>;

export default useMyPassengers;