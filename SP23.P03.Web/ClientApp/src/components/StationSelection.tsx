import React from "react";
import { Select } from "semantic-ui-react";
import useFindStation from "../hooks/api/useFindStation";
import { FieldProps } from "formik";

const StationSelection: React.FC<FieldProps> = ({ field, form }) => {

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

                //these may need to be added in later -- will delete if not
                // name={field.name}
                // value={field.value}
                // onChange={option => form.setFieldValue(field.name, (option as any).value)}
                // onBlur={field.onBlur}
                
                />
        </>
    );
}

export default StationSelection;
