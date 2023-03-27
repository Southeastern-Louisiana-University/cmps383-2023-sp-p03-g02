import axios from 'axios';
import { useEffect, useState } from 'react';
import { PassengerDto } from '../../types/types';

const useMyPassengers = (dep: any) => {
    const [passengers, setPassengers] = useState<PassengerDto[]>();

    useEffect(() => {
        axios.get<PassengerDto[]>(`/api/passengers/me`, { validateStatus: (status) => ((status >= 200 && status < 300) || status === 401) })
            .then((response) => setPassengers(response.data))
            .catch(console.error);
    }, [dep]);

    return passengers;
}

export default useMyPassengers;