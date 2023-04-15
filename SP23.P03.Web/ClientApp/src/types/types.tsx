
export type TrainStationDto = {
    id: number;
    name: string;
    address: string;
    managerId?: number;
}

export type TrainDto = {
    id: number,
    name: string,
    status: string,
    coachCapacity: string,
    firstClassCapacity: string,
    roomletCapacity: string,
    sleeperCapacity: string,
}

export type TripDto = {
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

export type TripWithCapacityDto = TripDto & {
    coachCapacity: number;
    firstClassCapacity: number;
    roomletCapacity: number;
    sleeperCapacity: number;
}

export type CreateBoardingPassDto = {
    travelClass: string;
    tripIds: number[];
    passengerIds: number[];
}

export type PassengerDto = {
    id: number;
    ownerId: number;
    firstName: string;
    lastName: string;
    birthday: string;
    age: number;
    ageGroup: string;
    managerId: number;
}

export type CreatePassengerDto = {
    firstName: string;
    lastName: string;
    birthday: string;
}