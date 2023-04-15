import React, { useState } from "react";
import { Button, Confirm, Container, Header, Icon, Input, Message, Popup, Segment, Table } from "semantic-ui-react";
import "./Passengers.css";
import useMyPassengers, { MyPassengers } from "../../hooks/api/useMyPassengers";
import { CreatePassengerDto, PassengerDto } from "../../types/types";
import { useUser } from "../../components/AuthProvider";
import { format } from 'date-fns';
import ExtraIcon from "../../components/ExtraIcon";
import { getPassengerIcon } from "../../helpers/passenger";
import { Field, Form, Formik } from "formik";
import { toSimpleISO } from "../../helpers/time";


const PassengersPage: React.FC = (props) => {
    const [createLoading, setCreateLoading] = useState(false);

    const onCreate = async (values: CreatePassengerDto) => {
        if(createLoading) return;
        setCreateLoading(true);
        await myPassengers.createPassenger(values);
        setCreateLoading(false);
    }

    const user = useUser();
    
    const myPassengers = useMyPassengers(user);

    const createInitialValues: CreatePassengerDto = {
        firstName: "",
        lastName: "",
        birthday: "1980-01-01",
    };
    return (
        <Container className="passengers">
            {user ? (
                <>
                    <Header size="huge" attached="top">
                        My Passengers
                    </Header>
                    <Segment attached="bottom">
                        <Table>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>
                                        Name
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Birthday
                                    </Table.HeaderCell>
                                    <Table.HeaderCell>
                                        Actions
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            <Table.Body>
                                {myPassengers.passengers.length > 0 ? (
                                    myPassengers.passengers.map(passenger => (
                                        <PassengerRow myPassengers={myPassengers} passenger={passenger} key={passenger.id} />
                                    ))
                                ) : (
                                    <Table.Row>
                                        <Table.Cell colSpan={3}>
                                            <Message>
                                                You don't have any passengers yet!
                                            </Message>
                                        </Table.Cell>
                                    </Table.Row>
                                )}
                            </Table.Body>
                        </Table>
                        <Formik initialValues={createInitialValues} onSubmit={onCreate}>
                            <Popup
                                as={Form}
                                trigger={
                                    <Button positive>
                                        <Icon name="plus" /> Create
                                    </Button>
                                }
                                on='click'
                                position="bottom center"
                                className="passenger-form-popup"
                            >
                                <div className="field-label">
                                    <label htmlFor="firstName"><b>First Name</b></label>
                                </div>
                                <Field as={Input} id="firstName" name="firstName" className="field" disabled={createLoading} />
                                <div className="field-label">
                                    <label htmlFor="lastName"><b>Last Name</b></label>
                                </div>
                                <Field as={Input} id="lastName" name="lastName" className="field" disabled={createLoading} />
                                <div className="field-label">
                                    <label htmlFor="birthday"><b>Birthday</b></label>
                                </div>
                                <Field as={Input} type="date" id="birthday" name="birthday" className="field" disabled={createLoading}
                                    min="1900-01-01"
                                    max={toSimpleISO(new Date())}
                                />
                                <Button type="submit" positive loading={createLoading}>
                                    Submit
                                </Button>
                            </Popup>
                        </Formik>
                    </Segment>
                </>
            ) : (
                <Segment>
                    <Header>
                        Please log in to see your passengers!
                    </Header>
                </Segment>
            )}
        </Container>
    );
}

type PassengerRowProps = {
    myPassengers: MyPassengers;
    passenger: PassengerDto;
}

const PassengerRow: React.FC<PassengerRowProps> = ({ myPassengers, passenger }) => {
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editLoading, setEditLoading] = useState(false);

    const onDelete = async () => {
        await myPassengers.deletePassenger(passenger.id);
        setDeleteOpen(false);
    }

    const onEdit = async (values: CreatePassengerDto) => {
        if(editLoading) return;
        setEditLoading(true);
        await myPassengers.updatePassenger(passenger.id, values);
        setEditLoading(false);
    }

    const editInitialValues: CreatePassengerDto = {
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        birthday: toSimpleISO(passenger.birthday),
    };
    return (
        <Table.Row>
            <Table.Cell>
                <ExtraIcon name={getPassengerIcon(passenger)} size="xl" /> {passenger.firstName} {passenger.lastName}
            </Table.Cell>
            <Table.Cell>
                {format(new Date(passenger.birthday), "MMM do y")}
            </Table.Cell>
            <Table.Cell>
                <Confirm 
                    open={deleteOpen}
                    onOpen={() => setDeleteOpen(true)}
                    onClose={() => setDeleteOpen(false)}
                    onCancel={() => setDeleteOpen(false)}
                    onConfirm={onDelete}
                    trigger={
                        <Button negative>
                            <Icon name="trash" /> Delete
                        </Button>
                    }
                    content={`Are you sure you want to delete ${passenger.firstName} ${passenger.lastName}?`}
                />
                <Formik initialValues={editInitialValues} onSubmit={onEdit}>
                    <Popup
                        as={Form}
                        trigger={
                            <Button color="yellow">
                                <Icon name="edit" /> Edit
                            </Button>
                        }
                        on='click'
                        position="bottom center"
                        className="passenger-form-popup"
                    >
                        <div className="field-label">
                            <label htmlFor="firstName"><b>First Name</b></label>
                        </div>
                        <Field as={Input} id="firstName" name="firstName" className="field" disabled={editLoading} />
                        <div className="field-label">
                            <label htmlFor="lastName"><b>Last Name</b></label>
                        </div>
                        <Field as={Input} id="lastName" name="lastName" className="field" disabled={editLoading} />
                        <div className="field-label">
                            <label htmlFor="birthday"><b>Birthday</b></label>
                        </div>
                        <Field as={Input} type="date" id="birthday" name="birthday" className="field" disabled={editLoading}
                            min="1900-01-01"
                            max={toSimpleISO(new Date())}
                        />
                        <Button type="submit" positive loading={editLoading}>
                            Submit
                        </Button>
                    </Popup>
                </Formik>
            </Table.Cell>
        </Table.Row>
    );
}

export default PassengersPage;