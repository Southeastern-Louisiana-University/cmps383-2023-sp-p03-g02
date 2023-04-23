import React from "react";
import { Button, Card, Container, Divider, Grid, Header, Icon, Message, Modal, Segment } from "semantic-ui-react";
import "./BoardingPassesPage.css";
import useMyBoardingPasses from "../../hooks/api/useMyBoardingPasses";
import { useUser } from "../../components/AuthProvider";
import { QRCodeSVG } from "qrcode.react";
import { format } from "date-fns";
import { BoardingPassDto } from "../../types/types";
import TripSummary from "../../components/TripSummary";
import PassengerList from "../../components/PassengerList";

const BoardingPassesPage: React.FC = () => {
    const user = useUser();
    const boardingPasses = useMyBoardingPasses(user);

    return (
        <Container className="boardingpasses">
            <Segment>
                {user ? (
                    boardingPasses.length > 0 ? (
                        boardingPasses.map(boardingPass => (
                           <BoardingPassDisplay boardingPass={boardingPass} key={boardingPass.id} /> 
                        ))
                    ) : (
                        <Message>
                            You don't have any boarding passes yet!
                        </Message>
                    )
                ) : (
                  <Header>
                    Please log in to see your boarding passes!
                  </Header>  
                )}
            </Segment>
        </Container>
    );
}

const BoardingPassDisplay: React.FC<{ boardingPass: BoardingPassDto }> = ({ boardingPass }) => {
    const firstTrip = boardingPass.trips[0];
    const lastTrip = boardingPass.trips[boardingPass.trips.length - 1];
    const initialDeparture = new Date(firstTrip.departure);
    const finalArrival = new Date(lastTrip.arrival);

    return (
        <Modal
            className="my-boarding-pass-modal"
            closeIcon
            trigger={
                <Card fluid className="boardingpass-card">
                    <Card.Content>
                        <Grid className="boardingpass-grid" divided columns="equal" stackable>
                            <Grid.Column width={2}>
                                <QRCodeSVG value={boardingPass.code} width="100%" />
                            </Grid.Column>
                            <Grid.Column stretched>
                                <Grid columns={2} verticalAlign="middle">
                                    <Grid.Row verticalAlign="bottom">
                                        <Grid.Column textAlign="right">
                                            <Header>
                                                {format(initialDeparture, "h:mm a")}
                                                <Header.Subheader>
                                                    {format(initialDeparture, "MMMM do yyyy")}
                                                </Header.Subheader>
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column textAlign="left">
                                            <Header>
                                                {format(finalArrival, "h:mm a")}
                                                <Header.Subheader>
                                                    {format(finalArrival, "MMMM do yyyy")}
                                                </Header.Subheader>
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                    <Grid.Row verticalAlign="top">
                                        <Grid.Column textAlign="right">
                                            <Header>
                                                {firstTrip.fromStation.name}
                                                <Header.Subheader>
                                                    {firstTrip.fromStation.address}
                                                </Header.Subheader>
                                            </Header>
                                        </Grid.Column>
                                        <Grid.Column textAlign="left">
                                            <Header>
                                                {lastTrip.toStation.name}
                                                <Header.Subheader>
                                                    {lastTrip.toStation.address}
                                                </Header.Subheader>
                                            </Header>
                                        </Grid.Column>
                                    </Grid.Row>
                                </Grid>
                                <Divider vertical>
                                    <Icon name="arrow right" />
                                </Divider>
                            </Grid.Column>
                            <Grid.Column>
                                <PassengerList passengers={boardingPass.passengers} />
                            </Grid.Column>
                        </Grid>
                    </Card.Content>
                </Card>
            }
            size="tiny"
        >
            <Modal.Content>
                <QRCodeSVG value={boardingPass.code} width="100%" height="15rem" />
                <TripSummary trips={boardingPass.trips} travelClass={boardingPass.travelClass} />
                <Header attached="top">
                    Passengers
                </Header>
                <Segment attached="bottom">
                    <PassengerList passengers={boardingPass.passengers} />
                </Segment>
                <Button
                    color="blue"
                    className="print-button"
                    onClick={() => window.print()}
                >
                    <Icon name="print" /> Print
                </Button>
            </Modal.Content>
        </Modal>
    );
}

export default BoardingPassesPage;