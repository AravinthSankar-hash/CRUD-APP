import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import './register.css';
import '../../shared/styles/common.css';
import { APP_CONST, USER_RESPONSE } from '../../shared/constants/common.const';
import CustomToaster from "../toaster/toaster";
import AppService from "../../shared/services/app.service";
import HelperService from "../../shared/services/helper";

class Register extends React.Component {
    onCreateUser = async (values) => {
        const registerRequestBody = {
            body: JSON.stringify(values)
        };
        const savedUser = await AppService.saveUser(registerRequestBody);
        const toastMsg = savedUser.message ? savedUser.message : USER_RESPONSE.FAILED;
        HelperService.triggerToast(toastMsg, savedUser.data ? true : false);
        if (savedUser.data) {
            setTimeout(() => {
                this.props.history.push('/login');
            }, 1000);
        }
        return;
    }

    initialValues = APP_CONST.REGISTRATION.DEFAULT_VALUES;
    registrationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email().required("Email is required"),
        password: Yup.string()
            .required("Password is required")
            .min(4, "Should be 4 chars minimum"),
        location: Yup.string(),
        contact: Yup.number(),
    });

    render() {
        return <Formik
            initialValues={this.initialValues}
            validationSchema={this.registrationSchema}
            onSubmit={this.onCreateUser}>
            {(formik) => {
                const { dirty, touched, isValid, errors } = formik;
                return (
                    <div>
                        <Form className='reg-form'>
                            <div className="form-row">
                                <label htmlFor="name">Name *</label>
                                <Field
                                    type="text"
                                    name="name"
                                    className={errors.name && touched.name ?
                                        "input-error" : null}
                                />
                                <ErrorMessage name="name" component="span" className="error" />

                            </div>
                            <div className="form-row">
                                <label htmlFor="email">Email *</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className={errors.email && touched.email ?
                                        "input-error" : null}
                                />
                                <ErrorMessage name="email" component="span" className="error" />

                            </div>
                            <div className="form-row">
                                <label htmlFor="location">Location</label>
                                <Field
                                    type="text"
                                    name="location"
                                />

                            </div>
                            <div className="form-row">
                                <label htmlFor="contact">Contact</label>
                                <Field
                                    type="number"
                                    name="contact"
                                />
                            </div>
                            <div className="form-row">
                                <label htmlFor="password">Password *</label>
                                <Field
                                    type="password"
                                    name="password"
                                    className={errors.password && touched.password ?
                                        "input-error" : null}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="span"
                                    className="error"
                                />
                            </div>

                            <button
                                type="submit"
                                className={!(dirty && isValid) ? "disabled-btn" : ""}
                                disabled={!(dirty && isValid)}
                            >
                                Save Me
                            </button>
                        </Form>
                        <CustomToaster></CustomToaster>
                    </div>
                )
            }}
        </Formik>
    }
}

export default Register;