import React from "react";
import { Button, Container, Header, Icon, Popup, Segment, Table } from "semantic-ui-react";
import { useUser } from "../../components/AuthProvider";
import './AccountManage.css';

export function AccountManage(): React.ReactElement {
    const user = useUser();

    return (
        <Container className="account">
            <Header size="huge" attached> Manage Account </Header>

            <Segment attached>
                <Table columns={2}>
                <Table.Header className="ui center aligned">
                    <Table.HeaderCell> Your Information </Table.HeaderCell>
                    
                    <Table.HeaderCell> Edit </Table.HeaderCell>
                </Table.Header>

                <Table.Body className="ui center aligned">
                    <Table.Cell> {user?.userName} </Table.Cell> {/* userName cannot be changed */}
                </Table.Body>

                <Table.Body className="ui center aligned">
                    <Table.Cell> {user?.roles} </Table.Cell>
                    <Popup
                        on="hover"
                        trigger={
                            <Button>
                                 <Icon name="key" compact />
                            </Button>
                        }
                    >
                        <div>
                            <body> 
                                Your role defines what permissions you have. <br/> <br/>
                                Admin: An admin has full access and permissions.
                                The admin is the only user who can assign roles. <br/> <br/>
                                User: A user can only view information displayed.
                                A user can also buy tickets and plan their trip!
                            </body>
                        </div>
                    </Popup>
                </Table.Body>

                <Table.Body className="ui center aligned">
                    <Table.Cell> Password </Table.Cell>
                    <Table.Cell>
                        <Button color="yellow">
                            <Icon name="edit" compact />
                        </Button>
                    </Table.Cell>
                </Table.Body>
                </Table>
            </Segment>
        </Container>
    )
}