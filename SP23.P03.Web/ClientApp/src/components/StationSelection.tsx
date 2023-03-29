import React from "react";
import { Select } from "semantic-ui-react";
import useFindStation from "../hooks/api/useFindStation";

export function StationSelection(): React.ReactElement {

    const findStation = useFindStation();
    const data = findStation.map((station) => {
        return {
            value: station.name,
            text: `${station.name} | ${station.address}`,
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
                search
                clearable
                />
        </>
    );
}
