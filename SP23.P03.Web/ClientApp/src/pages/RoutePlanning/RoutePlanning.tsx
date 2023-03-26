import axios from "axios";
import React, { useEffect, useState } from "react";
import { Divider, Header, Icon, Tab, Table } from "semantic-ui-react";
import { TripDto } from "../../types/types";
import './RoutePlanning.css';

export function RoutePlanning(): React.ReactElement {
    const [trips, setTrips] = useState<TripDto[]>([]);

    useEffect(() => {
        axios
            .get<TripDto[]>(`/api/trips`)
            .then((response) => {
                setTrips(response.data);
                console.log(response.data);
            });
    }, []);

    const tripsToShow = trips;

    return (
        <div>
            <div>
                <Header className="route-planning-header" as='h2' block>
                    <Icon name='map marker alternate' />
                    <Header.Content>
                        All Routes
                        <Header.Subheader>List of all routes, sorted by earliest departure date</Header.Subheader>
                    </Header.Content>
                </Header>
                <Divider />
            </div>
            <div>
                <Table className="route-planning-table" celled padded>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>Base Price</Table.HeaderCell>
                            <Table.HeaderCell>Departure Station</Table.HeaderCell>
                            <Table.HeaderCell>Arrival Station</Table.HeaderCell>
                            <Table.HeaderCell>Departure Time</Table.HeaderCell>
                            <Table.HeaderCell>Arrival Time</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                {tripsToShow && tripsToShow.map((trip) => (
                    <Table.Body>
                        <Table.Row key={trip.id}>
                            <Table.Cell>${trip.basePrice}</Table.Cell>
                            <Table.Cell>{trip.fromStationId}</Table.Cell>
                            <Table.Cell>{trip.toStationId}</Table.Cell>
                            <Table.Cell>{trip.departure.toString()}</Table.Cell>
                            <Table.Cell>{trip.arrival.toString()}</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                ))}
                </Table>
            </div>
        </div>
    );
}
