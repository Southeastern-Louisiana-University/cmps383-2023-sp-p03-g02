import React from "react";
import { useSearchParams } from "react-router-dom";
import { Divider } from "semantic-ui-react";
import RoutePlanner from "../../components/RoutePlanner/RoutePlanner";
import RouteListing from "./RouteListing";
import './RoutePlanning.css';

export function RoutePlanning(): React.ReactElement {
    const [searchParams] = useSearchParams();

    const validSearch = searchParams.has("fromStation") &&
                        searchParams.has("toStation") &&
                        searchParams.has("departure") &&
                        searchParams.has("arrival");

    return (
        <div className="route-planning">
            <div>
                <RoutePlanner />
                <Divider />
            </div>
            <div>
                {validSearch && <RouteListing searchParams={searchParams} />}
            </div>
        </div>
    );
}
