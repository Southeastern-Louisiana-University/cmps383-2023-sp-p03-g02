import React from "react";
import { Select } from "semantic-ui-react";
import { FieldProps } from "formik";
import { TrainDto } from "../types/types";

type TrainSelectionProps = FieldProps & {
    trains: TrainDto[],
    error: boolean,
};

const TrainSelection: React.FC<TrainSelectionProps> = ({ field, form, trains, error }) => {

    const data = trains.map((train) => {
        return {
            value: train.id,
            text: `${train.name}`,
        };
    });

    return (
        <Select
            className="train-selection"
            placeholder="Select Train"
            options={data}
            search
            error={error}
            {...field}
            onChange={(_, { name, value }) =>
                form.setFieldValue(name, value)
            }
            onBlur={(_, { name, value}) =>
                form.setFieldValue(name, value)
            }
        />
    );
}

export default TrainSelection;
