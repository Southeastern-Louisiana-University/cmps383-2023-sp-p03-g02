import React from "react";
import { Header, Icon, List, ListProps } from "semantic-ui-react";
import { PassengerDto } from "../types/types";
import ExtraIcon from "./ExtraIcon";
import { getPassengerIcon } from "../helpers/passenger";

type PassengerListProps = ListProps & {
    passengers: PassengerDto[];
}

const PassengerList: React.FC<PassengerListProps> = (props) => {
    const { passengers } = props;
    return (
        <List {...props}>
            {passengers.map(passenger => (
                <List.Item key={passenger.id}>
                    <List.Icon>
                        <Icon>
                            <ExtraIcon name={getPassengerIcon(passenger)} size='2x' />
                        </Icon>
                    </List.Icon>
                    <List.Content>
                        <Header>
                            {passenger.firstName} {passenger.lastName}
                        </Header>
                    </List.Content>
                </List.Item>
            ))}
        </List>
    );
}

export default PassengerList;