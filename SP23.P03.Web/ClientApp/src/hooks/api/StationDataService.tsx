import axios from "axios";
import { CreateStationDto, TrainStationDto } from "../../types/types";
import { useEffect, useState } from "react";

const useStations = () => {
    const [stations, setStations] = useState<TrainStationDto[]>([]);

    const fetchStations = async () => axios.get<TrainStationDto[]>(`/api/stations`)
        .then(response => setStations(response.data))
        .catch(console.error);
    
    const createStation = async (createStationDto: CreateStationDto) =>
        axios.post<TrainStationDto>(`/api/stations`, createStationDto)
         .then(() => fetchStations())
         .catch(error => {
            alert("There was a problem creating the Train Station (You need to be an admin)")
            console.error(error);
         });

    const updateStation = async (id: number, createStationDto: CreateStationDto) =>
         axios.put(`/api/stations/${id}`, createStationDto)
              .then(() => fetchStations())
              .catch(error => {
                alert("There was a problem with updating the Train Station (admin)")
                console.error(error);
        })

    const deleteStation = async (id: number) =>
         axios.delete(`/api/stations/${id}`)
              .then(() => fetchStations())
              .catch(error => {
                alert("There was a problem deleting the Train Station(admin)")
                console.error(error);
        });

    useEffect (() => {
        axios.get<TrainStationDto[]>(`/api/stations`)
             .then((response) => {
                setStations(response.data);
                console.log(response.data);
        });
    }, []);
     
    return { stations, createStation, updateStation, deleteStation };
}

export type TrainStationsService = ReturnType<typeof useStations>;

export default useStations;