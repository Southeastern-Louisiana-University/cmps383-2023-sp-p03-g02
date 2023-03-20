import axios from "axios";
import React, { useEffect, useState } from "react";

export function RoutePlanning(): React.ReactElement {
    const [trips, setTrips] = useState<any[]>([]);

    useEffect(() => {
        axios
            .get(`/api/trips`)
            .then((response) => {
                setTrips(response.data);
                console.log(response);
            });
    }, []);

    return (
        <div>
            <h1>Routes</h1>
            {trips.map((trip) => {
                return (
                    <div>
                        {trip.id}
                    </div>
                )
            })}
        </div>
    );
}
