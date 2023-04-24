import axios from 'axios';
import { useEffect, useState } from 'react';
import { TrainRouteDto } from '../../types/types';

const useTrainRoutes = () => {
    const [trainRoutes, setTrainRoutes] = useState<TrainRouteDto[]>([]);
    
    useEffect (() => {
        axios
            .get<TrainRouteDto[]>(`/api/trainroutes`)
            .then((response) => {
                setTrainRoutes(response.data);
                console.log(response.data);
            });
        }, []);

    return trainRoutes;
}

export default useTrainRoutes;