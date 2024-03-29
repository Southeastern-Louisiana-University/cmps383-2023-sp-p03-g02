import { Field, Form, Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { Button, Icon, Input, Modal, ModalProps } from "semantic-ui-react";
import useSubscription, { notify } from "../hooks/useSubscription";
import { LoginDto } from "../types/authentication";
import { loginUser } from "./AuthProvider";

export const openLoginModal = () => {
    notify("open-login-modal");
}

const LoginModal = (props: ModalProps) => {
    const [loginOpen, setLoginOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    useSubscription("open-login-modal", () => {
        setLoginOpen(true);
    });

    const onSubmit = async (values: LoginDto, formikHelpers: FormikHelpers<LoginDto>) => {
        setLoading(true);
        loginUser(values)
            .then(() => {
                setLoading(false);
                setLoginOpen(false);
                formikHelpers.resetForm();
            })
            .catch((error) => {
                setLoading(false);
                console.error(error);
                alert("Login failed.");
            });
    }

    const INITIAL_VALUES: LoginDto = {userName: "", password: ""}
    return (
        <Formik initialValues={INITIAL_VALUES} onSubmit={onSubmit}>
            <Modal {...props}
                closeIcon
                size='tiny'
                open={loginOpen}
                onOpen={() => setLoginOpen(true)}
                onClose={() => setLoginOpen(false)}
                as={Form}
            >
                <Modal.Header>
                    Login
                </Modal.Header>
                <Modal.Content>
                    <div className="field-label">
                        <label htmlFor="userName">Username</label>
                    </div>
                    <Field as={Input} id="userName" name="userName" className="field" />
                    <div className="field-label">
                        <label htmlFor="password">Password</label>
                    </div>
                    <Field as={Input} id="password" name="password" type="password" className="field" />
                </Modal.Content>
                <Modal.Actions>
                    <Button type="submit" color="green" loading={loading}>
                        <Icon name="sign in" /> Login
                    </Button>
                    <Button onClick={() => setLoginOpen(false)}>
                        <Icon name="x" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </Formik>
    );
}

export default LoginModal;