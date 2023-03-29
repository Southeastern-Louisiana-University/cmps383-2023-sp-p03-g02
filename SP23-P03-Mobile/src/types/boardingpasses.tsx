export type BoardingPassDto = {
    id: number;
    code: string;
    ownerId: number;
    travelClass: string;
    trips: TripDto[];
    passengers: PassengerDto[];
}