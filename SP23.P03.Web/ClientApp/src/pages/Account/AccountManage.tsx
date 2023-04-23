import React from "react";
import { Container, Header, Segment, Table } from "semantic-ui-react";
import { useUser } from "../../components/AuthProvider";

export function AccountManage(): React.ReactElement {
    const user = useUser();

    return (
        <Container>
            <Header size="huge" attached> Manage Account </Header>

            <Segment attached>
                <Table>
                <Table.Header className="ui center aligned">
                    <Table.HeaderCell> Welcome { user?.userName }! </Table.HeaderCell>
                </Table.Header>

                <Table.Body>
                    User Name
                </Table.Body>

                </Table>
            </Segment>
        </Container>
    )
}