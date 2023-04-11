import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Segment, Grid, Divider, Icon } from 'semantic-ui-react';
import './RoutePlanner.css';
import { StationSelection } from '../StationSelection';
import { RoutePlanningQuery, navigateToRoutePlanning } from '../../helpers/navigation';

const RoutePlanner: React.FC = () => {
    const navigate = useNavigate();

    const onSubmit = (query: RoutePlanningQuery) => {
        navigateToRoutePlanning(navigate, query);
    };

    const EXAMPLE_ROUTE_PLANNING_QUERY = { 
        fromStationId: 1,
        toStationId: 2,
        departure: "2023-04-01",
        arrival: "2023-07-01",
        travelClass: "Coach",
    }; // This is an example route planning query since we don't have a Form for this component yet

    return (
        <div className="route-planner">
            <Segment padded raised className="resizing">
                <Grid columns={2} stackable container textAlign='center'>

                    <Grid.Row>
                        <Grid.Column>
                            <h1 className="box-header"> Starting From: </h1>

                            <StationSelection
                                
                            />

                        </Grid.Column>

                        <Divider vertical>
                            <Icon name="arrow right"/>
                        </Divider>

                        <Grid.Column>
                            <h1 className="box-header"> Going To: </h1>

                            <StationSelection
                                
                                
                            />

                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <div className="btn-center">
                            <button className="btn-styling" onClick={
                                () => onSubmit(EXAMPLE_ROUTE_PLANNING_QUERY)
                            }>
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