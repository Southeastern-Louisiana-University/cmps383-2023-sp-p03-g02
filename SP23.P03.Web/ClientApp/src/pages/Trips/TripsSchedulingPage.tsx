import React, { useState } from "react";
import { Accordion, Button, Container, Dimmer, Grid, Header, Icon, Image, Input, Loader, Message, Segment, Table } from "semantic-ui-react";
import "./Trips.css";
import { useUser } from "../../components/AuthProvider";
import { isUserAdmin } from "../../helpers/user";
import { NotFoundPage } from "../NotFound/NotFoundPage";
import useTrips from "../../hooks/api/useTrips";
import { Field, FieldArray, Form, Formik, FormikHelpers } from "formik";
import useFindTrain from "../../hooks/api/useFindTrain";
import TrainSelection from "../../components/TrainSelection";
import useFindStation from "../../hooks/api/useFindStation";
import StationSelection from "../../components/StationSelection";
import useTrainRoutes from "../../hooks/api/useTrainRoutes";
import { addMinutes, format } from "date-fns";
import { findTrainRoute } from "../../helpers/trainRoutes";
import { CreateTripDto, TrainRouteDto } from "../../types/types";

const TripsSchedulingPage: React.FC = () => {
    const user = useUser();
    const isAdmin = isUserAdmin(user);

    return isAdmin ? (
        <TripScheduler />
    ) : (
        <NotFoundPage />
    );
}

type TripStop = {
    stationId: number;
    delay: number;
}

const tripStopsToTrips = (tripStops: TripStop[], trainId: number, trainRoutes: TrainRouteDto[], initialDeparture: Date | string) => {
    const createTripDtos: CreateTripDto[] = [];
    let departure = typeof initialDeparture === "string" ? new Date(initialDeparture) : initialDeparture;
    for(let index = 1; index < tripStops.length; index++) {
        if (index > 0) {
            const prevStop = tripStops[index - 1];
            const tripStop = tripStops[index];
            const route = findTrainRoute(trainRoutes, prevStop.stationId, tripStop.stationId);
            if (route) {
                departure = addMinutes(departure, prevStop.delay);
                createTripDtos.push({
                    trainId,
                    fromStationId: prevStop.stationId,
                    toStationId: tripStop.stationId,
                    departure: departure.toISOString(),
                });
                departure = addMinutes(departure, route.estimatedMinutes);
            }
            else {
                return alert("Failed to generate trips from the schedule.");
            }
        }
    }
    return createTripDtos;
}

type TripSchedulerValues = {
    initialDeparture: string;
    trainIds: number[];
    tripStops: TripStop[];
}

const getErrorString = (errors: string[]) => {
    const errorIndex = errors.findIndex(value => value);
    return `[${errorIndex + 1}] ${errors[errorIndex]}`;
}

const TripScheduler: React.FC = () => {
    const tripsBag = useTrips();

    const [loading, setLoading] = useState(false);

    // const trips = (tripsBag.trips.slice()).sort((a, b) => (new Date(a.departure)).getTime() - (new Date(b.departure)).getTime())
    // const tripGroups = [] as TripDto[][];

    // trips.forEach(trip => {
    //     const groupIndex = tripGroups.findIndex(group =>
    //         group[0].train.id === trip.train.id
    //     );
    //     if(groupIndex > -1) {
    //         tripGroups[groupIndex].push(trip);
    //     }
    //     else {
    //         tripGroups.push([trip]);
    //     }
    // });

    const trains = useFindTrain();

    const stations = useFindStation();

    const trainRoutes = useTrainRoutes();

    const initialValues: TripSchedulerValues = {
        initialDeparture: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
        trainIds: [-1],
        tripStops: [
            {
                stationId: -1,
                delay: 0,
            },
            {
                stationId: -1,
                delay: 0,
            }
        ]
    }

    const validate = (values: TripSchedulerValues) => {
        const { trainIds, tripStops } = values;
        const errors = {
            trainIds: [] as string[] | undefined,
            tripStops: [] as string[] | undefined,
        };

        for (let i = 0; i < trainIds.length; i++) {
            const trainId = trainIds[i];
            const train = trains.find(train => train.id === trainId);
            if (!train) {
                errors.trainIds![i] = "Invalid Train";
            }
        }

        if (tripStops.length > 1) {
            for (let i = 0; i < tripStops.length; i++) {
                const tripStop = tripStops[i];
                const station = stations.find(station => station.id === tripStop.stationId);
                if(!station) {
                    errors.tripStops![i] = "Invalid Station"
                }
                else if (i > 0) {
                    const prevStop = tripStops[i - 1];
                    const route = findTrainRoute(trainRoutes, prevStop.stationId, tripStop.stationId);
                    if (!route) {
                        errors.tripStops![i] = "No Route From Previous Station";
                    }
                }
            }
        }
        else {
            errors.tripStops![0] = "Less Than Two Stops";
        }
        
        if(errors.trainIds!.length <= 0) delete errors.trainIds;
        if(errors.tripStops!.length <= 0) delete errors.tripStops;

        return errors;
    }

    const onSubmit = async (values: TripSchedulerValues, helpers: FormikHelpers<TripSchedulerValues>) => {
        let createTripDtos: CreateTripDto[] = [];
        for (const trainId of values.trainIds){
            const train = trains.find(train => train.id === trainId);
            const tripsForThisTrain = tripStopsToTrips(values.tripStops, trainId, trainRoutes, values.initialDeparture);
            if (tripsForThisTrain) {
                createTripDtos = createTripDtos.concat(tripsForThisTrain);
            }
            else if (train) {
                return alert(`Failed to make trips for ${train?.name}.`);
            }
        };
        if (createTripDtos.length > 0) {
            setLoading(true);
            await tripsBag.createTrips(createTripDtos, () => {
                alert("Trips scheduled successfully.");
                helpers.resetForm();
            });
            setLoading(false);
        }
    }

    return (
        <Container className="trips-scheduling">
            <Segment>
                <Dimmer active={loading}>
                    <Loader size="massive" />
                </Dimmer>
                <Formik initialValues={initialValues} onSubmit={onSubmit} validate={validate} validateOnMount>
                    {({ values, errors, isValid }) => (
                        <Form>
                            <Grid>
                                <Grid.Row columns={2} stretched>
                                    <Grid.Column>
                                        <Header block attached="top">Trip Details</Header>
                                        <Segment attached="bottom">
                                            <div>
                                                <label htmlFor="initialDeparture">
                                                    <b>Initial Departure</b>
                                                </label>
                                            </div>
                                            <Field
                                                name="initialDeparture"
                                                id="initialDeparture"
                                                as={Input}
                                                type="datetime-local"
                                                min={format(new Date(), "yyyy-MM-dd'T'HH:mm")}
                                            />
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column>
                                        <Header block attached="top">Trains</Header>
                                        <Segment attached="bottom">
                                            <FieldArray name="trainIds">
                                                {({ push, remove }) => (
                                                    <div>    
                                                        {values.trainIds.map((train, index) => (
                                                            <div key={index}>
                                                                <Button negative icon="x" onClick={() => remove(index)} type="button" />
                                                                <Field name={`trainIds.${index}`} trains={trains} component={TrainSelection} error={!!errors.trainIds?.[index]} />
                                                            </div>
                                                        ))}
                                                        <Button positive icon="plus" onClick={() => push(-1)} type="button" />
                                                    </div>
                                                )}
                                            </FieldArray>
                                            {errors.trainIds && (
                                                <Message error>
                                                    Error: {getErrorString(errors.trainIds as string[])}
                                                </Message>
                                            )}
                                        </Segment>
                                    </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column>
                                        <FieldArray name="tripStops">
                                            {({ push, remove }) => (
                                                <Table celled>
                                                    <Table.Header>
                                                        <Table.Row>
                                                            <Table.HeaderCell />
                                                            <Table.HeaderCell>
                                                                Station
                                                            </Table.HeaderCell>
                                                            <Table.HeaderCell>
                                                                Time Before Departure
                                                            </Table.HeaderCell>
                                                            <Table.HeaderCell>
                                                                Arrival
                                                            </Table.HeaderCell>
                                                            <Table.HeaderCell>
                                                                Departure
                                                            </Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Header>
                                                    <Table.Body>
                                                        {values.tripStops.map((tripStop, index) => {
                                                            const arrival = addMinutes(new Date(values.initialDeparture),
                                                                values.tripStops.slice(0, index).reduce((prev, tripStop) => prev + tripStop.delay, 0)
                                                                + values.tripStops.slice(0, index + 1).reduce((prev, tripStop, index) =>
                                                                    prev + (findTrainRoute(trainRoutes, values.tripStops[index - 1]?.stationId ?? -1,
                                                                        tripStop.stationId)?.estimatedMinutes ?? 0), 0)
                                                            );
                                                            const departure = addMinutes(arrival, tripStop.delay);
                                                            const isFirstTrip = index === 0;
                                                            const isLastTrip = index === values.tripStops.length - 1;
                                                            return (
                                                                <Table.Row key={index} error={!!errors.tripStops?.[index]}>
                                                                    <Table.Cell>
                                                                        <Button negative icon="x" onClick={() => remove(index)} type="button" />
                                                                    </Table.Cell>
                                                                    <Table.Cell>
                                                                        <Field
                                                                            name={`tripStops.${index}.stationId`}
                                                                            id={`tripStops.${index}.stationId`}
                                                                            stations={stations}
                                                                            component={StationSelection}
                                                                            error={!!errors.tripStops?.[index]}
                                                                        />
                                                                    </Table.Cell>
                                                                    <Table.Cell disabled={isFirstTrip || isLastTrip}>
                                                                        <Field
                                                                            name={`tripStops.${index}.delay`}
                                                                            as={Input}
                                                                            type="number"
                                                                            min={0}
                                                                            step="any"
                                                                            label="min"
                                                                            labelPosition="right"
                                                                            disabled={isFirstTrip || isLastTrip}
                                                                        />
                                                                    </Table.Cell>
                                                                    <Table.Cell>
                                                                        {isFirstTrip || format(arrival, "MMM do hh:mm a")}
                                                                    </Table.Cell>
                                                                    <Table.Cell>
                                                                        {isLastTrip || format(departure, "MMM do hh:mm a")}
                                                                    </Table.Cell>
                                                                </Table.Row>
                                                            )
                                                        })}
                                                        
                                                    </Table.Body>
                                                    <Table.Footer>
                                                        <Table.Row>
                                                            <Table.HeaderCell>
                                                                <Button positive icon="plus" onClick={() => push({ stationId: -1, delay: 0 })} type="button" />
                                                            </Table.HeaderCell>
                                                            <Table.HeaderCell>
                                                                <Button positive type="submit" disabled={!isValid}>
                                                                    <Icon name="calendar check outline" /> Submit Trip Schedule
                                                                </Button>
                                                            </Table.HeaderCell>
                                                            <Table.HeaderCell colSpan={3}>
                                                                {errors.tripStops && (
                                                                    <Message error>
                                                                        Error: {getErrorString(errors.tripStops as string[])}
                                                                    </Message>
                                                                )}
                                                            </Table.HeaderCell>
                                                        </Table.Row>
                                                    </Table.Footer>
                                                </Table>
                                            )}
                                        </FieldArray>
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Form>
                    )}
                </Formik>
                <Accordion panels={
                    [
                        {
                            key: "route-map",
                            title: "Route Map",
                            content: {
                                content: (
                                    <Image src="https://i.imgur.com/BfkwlOY.png" />
                                )
                            },
                        }
                    ]
                } />
            </Segment>
        </Container>
        
    );
}

export default TripsSchedulingPage;