import React from "react";
import { Select } from "semantic-ui-react";
import useFindStation from "../hooks/api/useFindStation";

interface StationSelectProps {
    label: string;
    placeholder: string;
    value: string | null;
    setValue: (value: string | null) => void;
};

export function StationSelection({ label, value }: StationSelectProps): React.ReactElement {

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
                label={label}
                options={data}
                search
                clearable
                />
        </>
    );
}
