import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { Button, Icon, Input, Modal, ModalProps } from "semantic-ui-react";
import useSubscription, { notify } from "../hooks/useSubscription";
import { CreateUserDto } from "../types/authentication";
import { signupUser } from "./AuthProvider";

export const openSignupModal = () => {
    notify("open-signup-modal");
}

function Password(): ReactElement {
    const [password, setPassword] = useState({
        password: '',
        confirmPassword: ''
    })

    const [match, setMatch] = useState(false);

    const inputChange: (event: React.ChangeEvent<HTMLInputElement>) => void = (event) => {
        const { value, name } = event.target;
        setPassword({
            ...password,
            [name]: value
        }) 
    }

    useEffect(() => {
        setMatch(!!password.password && password.confirmPassword === password.confirmPassword)
    }, [password])

    return (
        <div>
            <div className="field-label">
                <label htmlFor="password">Password</label>
            </div>
            <Field as={Input} id="password" name="password" type="password" className="field" />
            <div className="field-label">
                <label htmlFor="confirm-password">Confirm Password</label>
            </div>
            <Field as={Input} onChange={inputChange} id="confirmPassword" name="confirmPassword" type="password" className="field" />
        </div>
    )
}

const SignupModal = (props: ModalProps) => {
    const [signupOpen, setSignupOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useSubscription("open-signup-modal", () => {
        setSignupOpen(true);
    });

    const onSubmit = async (values: CreateUserDto, formikHelpers: FormikHelpers<CreateUserDto>) => {
        setLoading(true);
        signupUser(values)
            .then(() => {
                setLoading(false);
                setSignupOpen(false);
                formikHelpers.resetForm();
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
                //alert("Signup failed.");
            });
    }

    const INITIAL_VALUES: CreateUserDto = {userName: "", password: "", roles: ["user"]}

    return (
        <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
            <Modal {...props}
                closeIcon
                size='tiny'
                open={signupOpen}
                onOpen={() => setSignupOpen(true)}
                onClose={() => setSignupOpen(false)}
                as={Form}
            >
                <Modal.Header>
                    Signup
                </Modal.Header>
                <Modal.Content>
                    <div className="field-label">
                        <label htmlFor="userName">Username</label>
                    </div>
                    <Field as={Input} id="userName" name="userName" className="field" />
                    {Password()}
                </Modal.Content>
                <Modal.Actions>
                    <Button type="submit" color="green" loading={loading}>
                        <Icon name="sign in" />Signup
                    </Button>
                    <Button onClick={() => setSignupOpen(false)}>
                        <Icon name="x" />Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </Formik>
    );
}

export default SignupModal;