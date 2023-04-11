import { NavigateFunction } from "react-router-dom";
import { routes } from "../constants/routeconfig";

export type RoutePlanningQuery = {
    fromStationId: string | number;
    toStationId: string | number;
    departure: string;
    arrival: string;
    travelClass?: string;
}

export const navigateToRoutePlanning = (navigate: NavigateFunction, { fromStationId, toStationId, departure, arrival, travelClass }: RoutePlanningQuery) => {
    navigate(`${routes.route_planning}?fromStation=${fromStationId}&toStation=${toStationId}&departure=${departure}&arrival=${arrival}&travelClass=${travelClass ?? "Coach"}`);
}