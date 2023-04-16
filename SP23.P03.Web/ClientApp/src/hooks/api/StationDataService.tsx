import axios from "axios";
import { CreateStationDto, TrainStationDto } from "../../types/types";
import useFindStation from "./useFindStation";
import { useEffect, useState } from "react";
import { User } from "../../types/authentication";

const StationDataService = (user: User | null) => {
    const [station, setStation] = useState<TrainStationDto[]>([]);
    
    const createStation = async (createStationDto: CreateStationDto) =>
        axios.post<TrainStationDto>(`/api/stations`, createStationDto)
         .then(() => useFindStation)
         .catch(error => {
            alert("There was a problem creating the Train Station")
            console.error(error);
         });

    const updateStation = async (id: number, createStationDto: CreateStationDto) =>
         axios.put(`/api/stations/${id}`, createStationDto)
              .then(() => useFindStation)
              .catch(error => {
                alert("There was a problem with updating the Train Station")
                console.error(error);
        })

    const deleteStation = async (id: number) =>
         axios.delete(`/api/stations/${id}`)
              .then(() => useFindStation)
              .catch(error => {
                alert("There was a problem deleting the Train Station")
                console.error(error);
        });

    useEffect (() => {
        axios.get<TrainStationDto[]>(`/api/stations`)
             .then((response) => {
                setStation(response.data);
                console.log(response.data);
        });
    }, [user]);
     
    return { station, createStation, updateStation, deleteStation };
}

export type trainStation = ReturnType<typeof StationDataService>;

export default StationDataService;