import React, { useState } from 'react';
import { Button, Confirm, Header, Icon, Input, List, ListProps, Popup } from 'semantic-ui-react';
import { CreateStationDto, TrainStationDto } from '../types/types';
import StationDataService from '../hooks/api/StationDataService';
import { useUser } from './AuthProvider';
import { Field, Form, Formik } from 'formik';

type StationListProps = ListProps & {
    stations: TrainStationDto[];
}

type StationActionProps = {
    stations: TrainStationDto[];
    station: TrainStationDto;
}

const StationListingPage: React.FC<StationListProps> = (props) => {
    const { stations } = props;

    return (
        <List>
            {stations.map(station => (
                <List.Item key={station.id}>
                    <List.Icon>
                        <i className="map signs icon"/>
                    </List.Icon>

                    <List.Content>
                        <Header>
                            {station.name}
                        </Header>

                        {station.address}
                    </List.Content>

                    <StationDelete stations={stations} station={station} key={station.id} />
                    <StationEdit stations={stations} station={station} key={station.id} />
                </List.Item>
            ))}
        </List>
    );
}

const StationDelete: React.FC<StationActionProps> = ({station}) => {
    const user = useUser();
    const trainStation = StationDataService(user);
    const [open, setOpen] = useState(false);

    const onDelete = async () => {
        await trainStation.deleteStation(station.id);
        setOpen(false);
    }

    return (
        <Confirm
            open={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            trigger={
                <Button negative>
                    <Icon name="trash" /> Delete
                </Button>
            }
            onConfirm={onDelete}
            content={`Are you sure?`}
        />
    )
}

const StationEdit: React.FC<StationActionProps> = ({station}) => {
    const user = useUser();
    const trainStation = StationDataService(user);

    const onEdit = async (values: CreateStationDto) => {
        await trainStation.updateStation(station.id, values);
    }

    const initialValues: CreateStationDto = {
        name: station.name,
        address: station.address
    }

    return (
        <Formik initialValues={initialValues} onSubmit={onEdit} >
            <Popup
                as={Form}
                trigger={
                    <Button color="yellow">
                        <Icon name="edit" /> Edit
                    </Button>
                }
                on='click'     
            >
                <div>
                    <h2> Edit Station </h2>
                    <label htmlFor="station"><b> Station </b></label>
                    <Field as={Input} id="name" name="name" />

                    <label htmlFor="address"><b> Address </b></label>
                    <Field as={Input} id="address" name="address" />

                    <Button type="submit" positive> Submit </Button>
                </div>
            </Popup>
        </Formik>
    )
}

export default StationListingPage;