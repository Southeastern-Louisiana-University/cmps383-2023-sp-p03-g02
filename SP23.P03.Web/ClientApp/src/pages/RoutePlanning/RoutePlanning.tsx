import React from "react";
import { useMatch } from "react-router-dom";
import { Divider } from "semantic-ui-react";
import RouteListing from "./RouteListing";
import './RoutePlanning.css';

export function RoutePlanning(): React.ReactElement {
    const pathMatch = useMatch(`/route-planning/:fromStationId/:toStationId/:departure/:arrival/:travelClass`);

    return (
        <div>
            <div>
                {/* Add future RoutePlanner component here */}
                <Divider />
            </div>
            <div>
                {pathMatch && <RouteListing pathMatch={pathMatch} />}
            </div>
        </div>
    );
}
