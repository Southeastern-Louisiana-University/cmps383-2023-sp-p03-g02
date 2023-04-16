import React from 'react';
import { Header, Icon, List, ListProps } from 'semantic-ui-react';
import { TrainStationDto } from '../types/types';

type StationListProps = ListProps & {
    station: TrainStationDto[];
}

const StationListingPage: React.FC<StationListProps> = (props) => {
    const { station } = props; 

    return (
        <>
        <List {...props}>
            {station.map(station => (
                <List.Item key={station.id}>
                    <List.Icon>
                        <Icon>
                            icon
                        </Icon>
                    </List.Icon>

                    <List.Content>
                        <Header>
                            {station.name} {station.address}
                        </Header>
                    </List.Content>
                </List.Item>
            ))}
        </List>
        </>
    );
}

export default StationListingPage;