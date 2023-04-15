import React from "react";
import { Select } from "semantic-ui-react";
import useFindStation from "../hooks/api/useFindStation";
import { FieldProps } from "formik";

const StationSelection: React.FC<FieldProps> = ({ field, form }) => {

    const findStation = useFindStation();
    const data = findStation.map((station) => {
        return {
            value: station.id,
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
