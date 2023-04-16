import React from "react"
import { Grid, Header, Icon, Segment } from "semantic-ui-react";
import useTripRoutes from "../../hooks/api/useTripRoutes";
import { TripWithCapacityDto } from "../../types/types";
import { DateTime } from "luxon";
import useStation from "../../hooks/api/useStation";
import { formatUSD } from "../../helpers/money";
import { getTravelClassCapacity, getTravelClassPrice } from "../../helpers/travelClass";
import PurchaseBoardingPassModal from "./PurchaseBoardingPassModal";


type RouteListingProps = { searchParams: URLSearchParams };

const RouteListing: React.FC<RouteListingProps> = (props) => {
    const { searchParams } = props;

    const fromStationId = searchParams.get("fromStation");
    const toStationId = searchParams.get("toStation");
    const departure = searchParams.get("departure");
    const arrival = searchParams.get("arrival");
    const travelClass = searchParams.get("travelClass") ?? "Coach";

    const tripRoutes = useTripRoutes(fromStationId ?? "", toStationId ?? "", departure ?? "", arrival ?? "", travelClass ?? "");

    const fromStation = useStation(fromStationId);
    const toStation = useStation(toStationId);

    return (
        <>
            <Segment attached="top" className="route-listing-segment">
                    <Header style={{ display: "flex" }}>
                        <Icon name='map marker alternate' />
                        {fromStation?.name ?? <Icon name="question" />}
                        <Icon name="arrow right" style={{ margin: "auto 10px" }} />
                        {toStation?.name ?? <Icon name="question" />}
                    </Header>
            </Segment>
            <Segment attached="bottom" style={{ marginTop: "0px" }} className="route-listing-segment">
                {tripRoutes && (tripRoutes.length > 0 ? (
                    tripRoutes.map((trips) => 
                        <TripRoute key={trips.map(trip => trip.id).toString()} trips={trips} travelClass={travelClass ?? ""} />
                    )
                ) : (
                    <Header>No trips match the specified stations and date range.</Header>
                ))

                }
            </Segment>
        </>
    );
}

type TripRouteProps = {
    trips: TripWithCapacityDto[],
    travelClass: string,
}

const TripRoute: React.FC<TripRouteProps> = (props) => {
    const { trips, travelClass } = props;

    const initialDeparture = trips[0].departure;
    const finalArrival = trips[trips.length - 1].arrival;

    return (
        <Segment padded>
            <Grid verticalAlign="middle" divided className="trip-route-grid">
                <Grid.Column>
                    <Header>
                        {DateTime.fromISO(initialDeparture).toFormat('MMM dd t')}
                        <Icon name="arrow right" style={{ margin: "auto 10px" }} />
                        {DateTime.fromISO(finalArrival).toFormat('MMM dd t')}
                    </Header>
                </Grid.Column>
                <Grid.Column>
                    <Header>
                        {DateTime.fromISO(finalArrival).diff(DateTime.fromISO(initialDeparture)).toFormat("h'h' m'm'")} total
                    </Header>
                </Grid.Column>
                <Grid.Column>
                    <Header>{trips.length} Segment</Header>
                </Grid.Column>
                <Grid.Column>
                    <Header>
                        {travelClass} Fare: {formatUSD(trips.reduce((sum, curr) => sum + getTravelClassPrice(curr, travelClass), 0))}
                    </Header>
                </Grid.Column>
                <Grid.Column>
                    <Header>
                        {travelClass} Capacity: {trips.reduce((min, curr) => Math.min(min, getTravelClassCapacity(curr, travelClass)), 9999)}
                    </Header>
                </Grid.Column>
                <Grid.Column floated="right">
                    <PurchaseBoardingPassModal travelClass={travelClass} trips={trips} />
                </Grid.Column>
            </Grid>
        </Segment>
    )
}

export default RouteListing;