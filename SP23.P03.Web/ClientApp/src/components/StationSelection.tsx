import React from "react";
import { Select } from "semantic-ui-react";
import useFindStation from "../hooks/api/useFindStation";

interface StationSelectProps {
    value: string | null;
    setValue: (value: string | null) => void;
};

export function StationSelection({ value, setValue }: StationSelectProps): React.ReactElement {

    const findStation = useFindStation();
    const data = findStation.map((station) => {
        return {
            value: station.name,
            label: `${station.name} | ${station.address}`,
        };
    });

    return (
        <>
            <Select
                style={{
                    width: '75%',
                }}
                placeholder="Enter City"
                options={data}
                value
                setValue
                search
                clearable
                />
        </>
    );
}
