import { useEffect, useState } from "react";
import { User } from "../../types/authentication";
import { TrainDto, CreateTrainDto } from "../../types/types";
import axios from "axios";

const TrainDataService = (user: User | null) => {
    const [train, setTrain] = useState<TrainDto[]>([]);

    const fetchTrain = async () =>
        axios.get<TrainDto[]>(`/api/trains`)
             .then(response => setTrain(response.data))
             .catch(console.error);

    const createTrain = async (createTrainDto: CreateTrainDto) =>
        axios.post<TrainDto>(`/api/stations`, createTrainDto)
             .then(() => fetchTrain())
             .catch(error => {
                alert("There was a problem creating the train");
                console.error(error);
             });

    const updateTrain = async (id: number, createTrainDto: CreateTrainDto) =>
        axios.put(`/api/trains/${id}`, createTrainDto)
             .then(() => fetchTrain())
             .catch(error => {
                alert("There was a problem updating the train");
                console.error(error);
             })

    const deleteTrain = async (id: number) =>
        axios.delete(`/api/trains/${id}`)
             .then(() => fetchTrain())
             .catch(error => {
                alert("There was a problem deleting the train");
                console.error(error);
             })

    useEffect (() => {
        axios.get<TrainDto[]>(`/api/strains`)
             .then((response) => {
                setTrain(response.data);
                console.log(response.data);
             })
    }, [user]);

    return { train, createTrain, updateTrain, deleteTrain };
}

export type train = ReturnType<typeof TrainDataService>

export default TrainDataService;
