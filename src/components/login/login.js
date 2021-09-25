import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useHistory } from "react-router";

import '../../shared/styles/common.css';
import CustomToaster from '../toaster/toaster';
import { APP_CONST, STATUS_CODE, USER_RESPONSE } from '../../shared/constants/common.const';
import './login.css';
import AppService from '../../shared/services/app.service';
import HelperService from "../../shared/services/helper";

const initialValues = APP_CONST.LOGIN_IN.DEFAULT_VALUES;
const loginInSchema = Yup.object().shape({
    email: Yup.string().email().required("Email is required"),
    password: Yup.string()
        .required("Password is required")
        .min(4, "Should be 4 chars minimum"),
});

const LoginInForm = () => {
    const history = useHistory();
    const onUserLogin = async (values) => {
        const loginRequestBody = {
            body: JSON.stringify(values)
        };
        const loginResponse = await AppService.validateUserLogin(loginRequestBody);
        const loginSuccess = loginResponse.statusCode && loginResponse.statusCode === STATUS_CODE.SUCCESS;
        const toastMsg = loginSuccess ? USER_RESPONSE.LOGIN_SUCCESS : loginResponse.message;
        HelperService.triggerToast(toastMsg, loginSuccess);
        if (loginResponse.statusCode === STATUS_CODE.SUCCESS) {
            sessionStorage.setItem("token", loginResponse.token);
            setTimeout(() => {
                history.push({
                    pathname: '/users',
                    isAdmin: values.email === APP_CONST.ADMIN_ID
                });
            }, 1000);
        }
        return;
    };
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={loginInSchema}
            onSubmit={onUserLogin}
        >
            {(formik) => {
                const { errors, touched, isValid, dirty } = formik;
                return (
                    <div>
                        <Form className='login-form'>
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
                                Login
                            </button>
                        </Form>
                        <CustomToaster></CustomToaster>
                    </div>
                )
            }}
        </Formik>
    )
}

export default LoginInForm;