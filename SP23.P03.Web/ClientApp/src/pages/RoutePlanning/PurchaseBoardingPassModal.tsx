import axios from 'axios';
import React, { useState } from 'react';
import { Button, Checkbox, Header, Icon, Label, List, Modal, Popup, Segment } from 'semantic-ui-react';
import { useUser } from '../../components/AuthProvider';
import ExtraIcon from '../../components/ExtraIcon';
import TripSummary from '../../components/TripSummary';
import { formatUSD, getPassengerCostMultiplier, getTotalPassengerCostMultiplier } from '../../helpers/money';
import { getPassengerIcon } from '../../helpers/passenger';
import { getTravelClassPrice } from '../../helpers/travelClass';
import useMyPassengers from '../../hooks/api/useMyPassengers';
import { CreateBoardingPassDto, PassengerDto, TripWithCapacityDto } from '../../types/types';

type PurchaseBoardingPassModalProps = {
    trips: TripWithCapacityDto[],
    travelClass: string,
}

const PurchaseBoardingPassModal: React.FC<PurchaseBoardingPassModalProps> = (props) => {
    const [open, setOpen] = useState(false);
    const [bookLoading, setBookLoading] = useState(false);
    const [selectedPassengers, setSelectedPassengers] = useState<PassengerDto[]>([]);

    const onBook = async () => {
        if(bookLoading) return;
        const createBoardingPassDto: CreateBoardingPassDto = { travelClass, tripIds: trips.map(t => t.id), passengerIds: selectedPassengers.map(p => p.id) };
        setBookLoading(true);
        await axios.post(`/api/boardingpasses`, createBoardingPassDto)
            .then(() => alert("Your boarding pass was successfully booked!"))
            .catch(console.error);
        setBookLoading(false);
        setOpen(false);
    }

    const user = useUser();

    const myPassengers = useMyPassengers();

    const { travelClass, trips } = props;

    // const unselectedPassengers = myPassengers?.filter(passenger => !selectedPassengers.includes(passenger));

    // MULTIPLY BY PASSENGERS
    const pricePerPassenger = trips.reduce((sum, curr) => sum + getTravelClassPrice(curr, travelClass), 0);
    const totalPrice = pricePerPassenger * getTotalPassengerCostMultiplier(selectedPassengers);

    return (
        <Modal {...props}
            closeIcon
            size='tiny'
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            open={open}
            trigger={
                <Button positive>
                    Take a Look
                </Button>
            }
        >
            <Modal.Header>
                Trip
            </Modal.Header>
            <Modal.Content>
                <TripSummary trips={trips} travelClass={travelClass} />
                <Header attached="top">Passengers</Header>
                <Segment attached="bottom">
                    <List divided>
                        {myPassengers && myPassengers.length > 0 ? myPassengers.map((passenger) => (
                            <List.Item key={passenger.id}>
                                <i className='icon middle aligned'>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <Checkbox style={{ marginRight: "0.5em" }}
                                            onChange={(e, data) => {
                                                if(data.checked) {
                                                    setSelectedPassengers(selectedPassengers.concat(passenger));
                                                }
                                                else {
                                                    setSelectedPassengers(selectedPassengers.filter(p => p.id !== passenger.id));
                                                }
                                            }}
                                        />
                                        <ExtraIcon name={getPassengerIcon(passenger)} size='2x' />
                                    </div>
                                </i>
                                <List.Content>
                                    <List.Header>
                                        {passenger.firstName} {passenger.lastName}
                                    </List.Header>
                                    <List.Description>
                                        {passenger.ageGroup} ({formatUSD(pricePerPassenger * getPassengerCostMultiplier(passenger))})
                                    </List.Description>
                                </List.Content>
                            </List.Item>
                        )) : (
                            <div>You haven't created any passengers yet!</div>
                        )}
                    </List>
                </Segment>
            </Modal.Content>
            <Modal.Actions>
                <Popup trigger={
                    <span>
                        <Button as="div"
                            disabled={!user || selectedPassengers.length <= 0 || bookLoading}
                            labelPosition="left"
                            onClick={onBook}
                        >
                            <Label color='green' basic pointing="right" as='a'>{formatUSD(totalPrice)}</Label>
                            <Button color='green' loading={bookLoading}>
                                <Icon name={"shopping cart"} /> Book
                            </Button>
                        </Button>
                    </span>
                }
                    disabled={!!user}
                >
                    <Popup.Header>
                        Please log in to book trips!
                    </Popup.Header>
                </Popup>
                <Button type="button" onClick={() => setOpen(false)}>
                    <Icon name="x" /> Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
}

export default PurchaseBoardingPassModal;