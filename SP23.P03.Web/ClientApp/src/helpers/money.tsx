import { PassengerDto } from "../types/types";

export const formatUSD = (cents: number) => `$${(cents/100).toFixed(2)}`;

export const getTotalPassengerCostMultiplier = (passengers: PassengerDto[]) => passengers.reduce((mul, passenger) =>
    mul + getPassengerCostMultiplier(passenger), 0);

export const getPassengerCostMultiplier = (passenger: PassengerDto) => {
    if(passenger.ageGroup === "Child" || passenger.ageGroup === "Senior")
            return 0.8;
        else
            return 1;
}