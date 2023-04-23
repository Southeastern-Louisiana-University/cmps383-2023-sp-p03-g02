import React, { useState } from "react";
import { Button, Container, Header, Icon, Input, Modal, Popup, Segment, Table } from "semantic-ui-react";
import { useUser } from "../../components/AuthProvider";
import { Field, Form } from "formik";

export function AccountManage(): React.ReactElement {
    const user = useUser();
    const [open, setOpen] = useState(false);

    return (
        <Container>
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
                    <Modal
                        as={Form}
                        trigger={
                            <Button color="yellow">
                                <Icon name="edit" compact />
                            </Button>
                        }
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                    >
                        <div>
                            <h2> Change Password </h2>
                            <div>
                                <label><b> Password </b></label>
                                <Field as={Input} id="password" name="password" />
                            </div>
                            <Button negative type="button" onClick={() => setOpen(false)}> Cancel </Button>
                            <Button positive type="submit"> Change </Button>
                        </div>
                    </Modal>
                    </Table.Cell>
                </Table.Body>
                </Table>
            </Segment>
        </Container>
    )
}