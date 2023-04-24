import { useEffect, useState } from "react";
import { TrainDto, CreateTrainDto } from "../../types/types";
import axios from "axios";

const useTrains = () => {
    const [trains, setTrains] = useState<TrainDto[]>([]);

    const fetchTrain = async () =>
        axios.get<TrainDto[]>(`/api/trains`)
             .then(response => setTrains(response.data))
             .catch(console.error);

    const createTrain = async (createTrainDto: CreateTrainDto) =>
        axios.post<TrainDto>(`/api/trains`, createTrainDto)
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
        axios.get<TrainDto[]>(`/api/trains`)
             .then((response) => {
                setTrains(response.data);
                console.log(response.data);
             })
    }, []);

    return { trains, createTrain, updateTrain, deleteTrain };
}

export type TrainsService = ReturnType<typeof useTrains>

export default useTrains;
