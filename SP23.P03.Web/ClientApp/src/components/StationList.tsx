import React from 'react';
import { Grid, Header, List, ListProps } from 'semantic-ui-react';
import { TrainStationDto } from '../types/types';

type StationListProps = ListProps & {
    stations: TrainStationDto[];
}

const StationListingPage: React.FC<StationListProps> = (props) => {
    const { stations } = props;

    return (
        <Grid>
            <Grid.Column>
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
                        </List.Item>
                    ))}
                </List>
            </Grid.Column>
        </Grid>
    );
}

export default StationListingPage;