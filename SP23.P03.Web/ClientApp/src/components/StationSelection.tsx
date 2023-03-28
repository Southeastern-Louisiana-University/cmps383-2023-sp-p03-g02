import React from "react";
import { Select } from "semantic-ui-react";

interface StationSelectProps {
    label: string;
    placeholder: string;
    value: string | null;
    setValue: (value: string | null) => void;
};

export function StationSelection({ label, placeholder, value, setValue }: StationSelectProps): React.ReactElement {

    return (
        <>
            <Select
                style={{
                    width: '75%',
                }}
                placeholder="Enter City"
                label={label}
                search
                clearable 
                options={[]}
                />
        </>
    );
}
