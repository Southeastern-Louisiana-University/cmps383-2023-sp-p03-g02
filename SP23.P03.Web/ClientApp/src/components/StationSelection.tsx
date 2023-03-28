import axios from "axios";
import React, { useEffect, useState } from "react";
import { Select } from "semantic-ui-react";
import { TrainStationDto } from "../types/types";

interface StationSelectProps {
    label: string;
    placeholder: string;
    value: string | null;
    setValue: (value: string | null) => void;
};

export function StationSelection({ label, placeholder, value, setValue }: StationSelectProps): React.ReactElement {
    const [stations, setStations] = useState<TrainStationDto[]>([]);

    useEffect (() => {
        axios
            .get<TrainStationDto>(`/stations`)
            .then((response) => {
                setStations([response.data]);
                console.log(response.data);
            });
    }, []);

    const data = stations.map((option: { name: any; address: any;}) => {
        return {
            label: `${option.name} | ${option.address}`,
            value: option.name,
        };
    });

    return (
        <>
            <Select
                style={{
                    width: '75%',
                }}
                placeholder="Enter City"
                label={label}
                options={data}
                search
                clearable
            />
        </>
    );
}
