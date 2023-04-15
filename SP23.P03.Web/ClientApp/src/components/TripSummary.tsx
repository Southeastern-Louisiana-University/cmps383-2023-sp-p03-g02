import { DateTime } from 'luxon';
import React from 'react';
import { Header, Segment, List, Icon } from 'semantic-ui-react';
import { formatUSD } from '../helpers/money';
import { getTravelClassPrice, getTravelClassCapacity } from '../helpers/travelClass';
import { TripDto, TripWithCapacityDto } from "../types/types"
import ExtraIcon from './ExtraIcon';

type TripSummaryProps = {
    trips: TripWithCapacityDto[] | TripDto[];
    travelClass: string;
}

const TripSummary: React.FC<TripSummaryProps> = (props) => {
    const { trips, travelClass } = props;

    return (
        <>
            <Header attached="top">Trip Summary</Header>
            <Segment attached="bottom">
                <List divided>
                    {trips.map((trip, index) => (
                        <List.Item key={trip.id}>
                            <i className='icon'><ExtraIcon name="train" size='2x' /></i>
                            <List.Content>
                                <List.Header>
                                    ({index+1}/{trips.length}) {trip.train.name}
                                </List.Header>
                                <List.Description>
                                    <div>{trip.fromStation.name} <Icon name='arrow right' /> {trip.toStation.name}</div>
                                    <div>{DateTime.fromISO(trip.departure).toFormat('MMM dd t')} - {DateTime.fromISO(trip.arrival).toFormat('MMM dd t')} ({DateTime.fromISO(trip.arrival).diff(DateTime.fromISO(trip.departure)).toFormat("h'h' m'm'")})</div>
                                    <div>{travelClass} | Fare: {formatUSD(getTravelClassPrice(trip, travelClass))}{"coachCapacity" in trip && ` | Remaining Capacity: ${getTravelClassCapacity(trip, travelClass)}`}</div>
                                </List.Description>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </Segment>
        </>
    );
}

export default TripSummary;