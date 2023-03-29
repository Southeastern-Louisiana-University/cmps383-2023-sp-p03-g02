type TripDto = {
    id: number;
    train: TrainDto;
    fromStation: TrainStationDto;
    toStation: TrainStationDto;
    departure: string;
    arrival: string;
    coachPrice: number;
    firstClassPrice: number;
    roomletPrice: number;
    sleeperPrice: number;
}