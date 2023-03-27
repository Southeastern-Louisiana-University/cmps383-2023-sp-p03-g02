import { TripDto, TripWithCapacityDto } from "../types/types";

export const getTravelClassPrice = (trip: TripDto, travelClass: string) => {
    switch (travelClass) {
        case "Coach": return trip.coachPrice;
        case "FirstClass": return trip.firstClassPrice;
        case "Roomlet": return trip.roomletPrice;
        case "Sleeper": return trip.sleeperPrice;
        default: return 0;
    }
};

export const getTravelClassCapacity = (trip: TripWithCapacityDto, travelClass: string) => {
    switch (travelClass) {
        case "Coach": return trip.coachCapacity;
        case "FirstClass": return trip.firstClassCapacity;
        case "Roomlet": return trip.roomletCapacity;
        case "Sleeper": return trip.sleeperCapacity;
        default: return 0;
    }
};