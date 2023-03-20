export type StationGetDto = {
    id: number;
    Name: string;
}

export type TripDto = {
    id: number;
    trainId: number;
    fromStationId: number;
    toStationId: number;
    departure: Date;
    arrival: Date;
    basePrice: number;
}