import React from "react";
import { useMatch } from "react-router-dom";
import { Divider, Header, Icon } from "semantic-ui-react";
import RouteListing from "./RouteListing";
import './RoutePlanning.css';

export function RoutePlanning(): React.ReactElement {
    const pathMatch = useMatch(`/route-planning/:fromStationId/:toStationId/:departure/:arrival/:travelClass`);

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
                {pathMatch && <RouteListing pathMatch={pathMatch} />}
            </div>
        </div>
    );
}
