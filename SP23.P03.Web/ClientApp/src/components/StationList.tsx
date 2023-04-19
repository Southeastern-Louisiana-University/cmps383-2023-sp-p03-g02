import React, { useState } from 'react';
import { Button, Confirm, Header, Icon, List, ListProps } from 'semantic-ui-react';
import { TrainStationDto } from '../types/types';
import StationDataService from '../hooks/api/StationDataService';
import { useUser } from './AuthProvider';

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
                </List.Item>
            ))}
        </List>
    );
}

const StationDelete: React.FC<StationActionProps> = ({stations, station}) => {
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

export default StationListingPage;