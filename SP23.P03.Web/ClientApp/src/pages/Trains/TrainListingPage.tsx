import React from "react";
import { Table } from "semantic-ui-react";
import './TrainListingPage.css';

export function TrainListingPage(): React.ReactElement {
    return (
        <Table columns={2} padded className="render-table">
            <Table.Header className="ui center aligned">
                <Table.HeaderCell> Train </Table.HeaderCell>
                <Table.HeaderCell> Actions </Table.HeaderCell>
            </Table.Header>

            <Table.Body>
                <Table.Cell>
                    cell 1
                </Table.Cell>
                <Table.Cell>
                    cell 2
                </Table.Cell>
            </Table.Body>
        </Table>
    )
}

