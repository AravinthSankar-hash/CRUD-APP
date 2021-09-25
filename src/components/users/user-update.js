import React from 'react';
import { Formik, Form, Field } from 'formik';

import CustomToaster from '../toaster/toaster';
import { USER_CONST } from './users.const';
import { STATUS_CODE } from '../../shared/constants/common.const';
import AppService from '../../shared/services/app.service';

class UserUpdate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.initialValues = {};
        this.setFormValues();
    }

    componentDidMount() {
        this.setFormValues();
    }

    componentDidUpdate() {
        this.setFormValues();
    }

    setFormValues() {
        this.initialValues = {
            location: this.props.selectedUserData.location,
            contact: this.props.selectedUserData.contact,
            name: this.props.selectedUserData.name,
        }
    }

    deleteUserData = async () => {
        const updatedUser = await AppService.removeUserDataByEmail(this.props.selectedUserData.email);
        this.validateUser(updatedUser);
        const isSuccResponse = updatedUser.statusCode && updatedUser.statusCode === 200;
        const toastMsg = isSuccResponse ? USER_CONST.REMOVED_SUCCESSFULLY : USER_CONST.API_FAILED;
        this.props.userListUpdated({
            toastMsg, isSuccResponse
        });
    }

    validateUser(response) {
        if (response && response.statusCode && response.statusCode === STATUS_CODE.UNAUTH) {
            this.props.history.push('/login');
        }
    }

    onUserDataUpdate = async (values) => {
        const requestBody = {
            body: JSON.stringify(values)
        };
        const updatedUser = await AppService.updateUserData(this.props.selectedUserData.email, requestBody);
        this.validateUser(updatedUser);
        const isSuccResponse = updatedUser.statusCode && updatedUser.statusCode === 200;
        const toastMsg = isSuccResponse ? USER_CONST.UPDATED_SUCCESSFULLY : USER_CONST.API_FAILED;
        this.props.userListUpdated({
            toastMsg,
            isSuccResponse,
        });
    }

    render() {
        return <Formik
            initialValues={this.initialValues}
            onSubmit={this.onUserDataUpdate}
            enableReinitialize={true}
        >
            {(formik) => {
                return (
                    <div className='user-update-form-wrapper'>
                        <Form className='update-form'>
                            <div className="form-row">
                                <label htmlFor="name">Name</label>
                                <Field
                                    type="text"
                                    name="name"
                                />

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
                            <div className='button-group-wrapper'>
                                <button
                                    type="submit"
                                >Update</button>
                                <button type='button' onClick={this.deleteUserData}>Delete</button>
                            </div>
                        </Form>
                        <CustomToaster></CustomToaster>
                    </div>
                )
            }}
        </Formik>

    }
}

export default UserUpdate;
