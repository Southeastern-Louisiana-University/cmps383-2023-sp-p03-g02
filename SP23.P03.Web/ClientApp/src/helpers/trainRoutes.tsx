import { TrainRouteDto, TrainStationDto } from "../types/types";

export const findTrainRoute = (trainRoutes: TrainRouteDto[], stationA: TrainStationDto | number, stationB: TrainStationDto | number) => {
    if (typeof stationA === "object") stationA = stationA.id; 
    if (typeof stationB === "object") stationB = stationB.id; 
    return trainRoutes.find(
        trainRoute => (trainRoute.stationA.id === stationA && trainRoute.stationB.id === stationB)
        || (trainRoute.stationA.id === stationB && trainRoute.stationB.id === stationA)
    );
}
