import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Segment, Grid, Divider, Icon, Dropdown } from 'semantic-ui-react';
import './RoutePlanner.css';
import StationSelection from '../StationSelection';
import { RoutePlanningQuery, navigateToRoutePlanning } from '../../helpers/navigation';
import { DateSelection } from '../DateSelection';
import { Field, FieldProps, Form, Formik } from 'formik';

const RoutePlanner: React.FC = () => {
    const navigate = useNavigate();

    const onSubmit = (query: RoutePlanningQuery) => {
        navigateToRoutePlanning(navigate, query);
    };

    const fareType = [
        { text: "Coach", value: "Coach"},
        { text: "First Class", value: "First Class" },
        { text: "Roomlet", value: "Roomlet" },
        { text: "Sleeper", value: "Sleeper" },
    ];

    const initialValues = {
        fromStationId: 1,
        toStationId: 2,
        departure: "2023-04-01",
        arrival: "2023-07-01",
        travelClass: "Coach",
    };

    return (
        <div className="route-planner">
            <Formik initialValues={initialValues}

                    onSubmit={(values, actions) => {
                        console.log({ values, actions });
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
            }}>
            
            <Form>

            <Segment padded raised className="resizing">
                <Grid columns={2} stackable container textAlign='center'>

                    <Grid.Row>
                        <Grid.Column>
                            <h1 className="box-header"> Starting From: </h1>
                            <Field name="fromStationId" id="fromStationId" component={StationSelection} />
                        </Grid.Column>

                        <Divider vertical>
                            <Icon name="arrow right"/>
                        </Divider>

                        <Grid.Column>
                            <h1 className="box-header"> Going To: </h1>
                            <Field name="toStationId" id="toStationId" component={StationSelection} />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <h1 className="box-header"> Departure: </h1>
                            <DateSelection />
                        </Grid.Column>

                        <Divider vertical>
                            <Icon name="arrow right"/>
                        </Divider>

                        <Grid.Column>
                            <h1 className="box-header"> Arrival: </h1>
                            <DateSelection />
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <Grid.Column>
                            <h1 className="box-header"> Travel Class: </h1>

                            <Field name="travelClass" id="travelClass">
                                {({ field, form}: FieldProps) => (
                                <Dropdown
                                    selection
                                    clearable
                                    placeholder='Select Fare'
                                    options={fareType}
                                    search
                                    style={{
                                        width: '75%'
                                    }}
                                    {...field}
                                    onChange={(_, { name, value }) =>
                                        form.setFieldValue(name, value)
                                    }
                                    onBlur={(_, { name, value}) =>
                                        form.setFieldValue(name, value)
                                    }
                                />
                                )}
                            </Field>
                            
                        </Grid.Column>
                    </Grid.Row>

                    <Grid.Row>
                        <div className="btn-center">
                            <button className="btn-styling" onClick={
                                () => onSubmit(initialValues)
                            }>
                                Book Now!
                            </button>
                        </div>
                    </Grid.Row>
                </Grid>
            </Segment>

            </Form>
            </Formik>
        </div>
    );
}

export default RoutePlanner;
