import axios from 'axios';
import { useEffect, useState } from 'react';
import { TrainDto } from '../../types/types';

const useFindTrain = () => {
    const [train, setTrain] = useState<TrainDto[]>([]);

    useEffect (() => {
        axios
            .get<TrainDto[]>(`/api/trains`)
            .then((response) => {
                setTrain(response.data);
                console.log(response.data);
            });
        }, []);

    return train;
}

export default useFindTrain;