import React from "react";
import { Select } from "semantic-ui-react";
import { FieldProps } from "formik";
import { TrainStationDto } from "../types/types";

type StationSelectionProps = FieldProps & {
    stations: TrainStationDto[],
    error: boolean,
};

const StationSelection: React.FC<StationSelectionProps> = ({ field, form, stations, ...rest }) => {

    const data = stations.map((station) => {
        return {
            value: station.id,
            text: `${station.name} | ${station.address}`,
        };
    });

    return (
        <>
            <Select
                className="station-selection"
                placeholder="Enter City"
                options={data}
                search
                clearable
                {...rest}
                {...field}
                onChange={(_, { name, value }) =>
                    form.setFieldValue(name, value)
                }
                onBlur={(_, { name, value}) =>
                    form.setFieldValue(name, value)
                }
            />
        </>
    );
}

export default StationSelection;
