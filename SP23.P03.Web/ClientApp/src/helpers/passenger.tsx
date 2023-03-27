import { PassengerDto } from "../types/types";

export const getPassengerIcon = (passenger: PassengerDto) => {
    switch(passenger.ageGroup){
        case "Child": return "child";
        case "Senior": return "senior";
        default: return "person";
    }
}