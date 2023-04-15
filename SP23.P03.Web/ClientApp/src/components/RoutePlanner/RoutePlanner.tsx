import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Segment, Grid, Divider, Icon, Dropdown, Input } from 'semantic-ui-react';
import './RoutePlanner.css';
import StationSelection from '../StationSelection';
import { RoutePlanningQuery, navigateToRoutePlanning } from '../../helpers/navigation';
import { Field, FieldProps, Form, Formik } from 'formik';
import { toSimpleISO } from '../../helpers/time';

const RoutePlanner: React.FC = () => {
    const navigate = useNavigate();

    const onSubmit = (query: RoutePlanningQuery) => {
        navigateToRoutePlanning(navigate, query);
    };

    const fareType = [
        { text: "Coach", value: "Coach"},
        { text: "First Class", value: "FirstClass" },
        { text: "Roomlet", value: "Roomlet" },
        { text: "Sleeper", value: "Sleeper" },
    ];

    const initialValues: RoutePlanningQuery = {
        fromStationId: 0,
        toStationId: 0,
        departure: "",
        arrival: "",
        travelClass: "Coach",
    };

    return (
        <div className="route-planner">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
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
                                    <Field name="departure" id="departure">
                                        {({ field, form }: FieldProps<string, typeof initialValues>) => (
                                            <Input
                                                {...field}
                                                type="date"
                                                min={toSimpleISO(new Date())}
                                                max={form.values.arrival}
                                            />
                                        )}
                                    </Field>
                                </Grid.Column>

                                <Divider vertical>
                                    <Icon name="arrow right"/>
                                </Divider>

                                <Grid.Column>
                                    <h1 className="box-header"> Arrival: </h1>
                                    <Field name="arrival" id="arrival">
                                        {({ field, form }: FieldProps<string, typeof initialValues>) => (
                                            <Input
                                                {...field}
                                                type="date"
                                                min={form.values.departure}
                                            />
                                        )}
                                    </Field>
                                </Grid.Column>
                            </Grid.Row>

                            <Grid.Row>
                                <Grid.Column>
                                    <h1 className="box-header"> Travel Class: </h1>

                                    {/* unfortunately, the dropdown has to look this way */}
                                    <Field name="travelClass" id="travelClass">
                                        {({ field, form}: FieldProps) => (
                                        <Dropdown
                                            selection
                                            placeholder='Select Fare'
                                            options={fareType}
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
                                    <button className="btn-styling" type="submit">
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
