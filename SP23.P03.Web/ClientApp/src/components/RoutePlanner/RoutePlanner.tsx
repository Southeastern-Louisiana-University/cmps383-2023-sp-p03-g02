import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Segment, Grid, Divider, Icon, Input } from 'semantic-ui-react';
import { routes } from '../../constants/routeconfig';
import './RoutePlanner.css';
import { StationSelection } from '../StationSelection';

const RoutePlanner: React.FC = () => {
    const navigate = useNavigate();

    const navigateToRoutePlanning = () => {
        navigate(routes.route_planning);
    };
    return (
        <div className="route-planner">
            <Segment padded raised className="resizing">
                <Grid columns={2} stackable container textAlign='center'>

                    <Grid.Row>
                        <Grid.Column>
                            <h1 className="box-header"> Starting From: </h1>

                            <StationSelection />

                        </Grid.Column>

                        <Divider vertical>
                            <Icon name="arrow right"/>
                        </Divider>

                        <Grid.Column>
                            <h1 className="box-header"> Going To: </h1>

                            <StationSelection />

                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <h1 className="box-header"> Departure: </h1>
                            <Input />
                        </Grid.Column>

                        <Divider vertical>
                            <Icon name="arrow right"/>
                        </Divider>

                        <Grid.Column>
                            <h1 className="box-header"> Arrival: </h1>
                            <Input />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <h1 className="box-header"> Class Type: </h1>
                            <Input />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <div className="btn-center">
                            <button className="btn-styling" onClick={navigateToRoutePlanning}>
                                Book Now!
                            </button>
                        </div>
                    </Grid.Row>
                </Grid>
            </Segment>
        </div>
    );
}

export default RoutePlanner;