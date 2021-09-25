import React from "react";

import UsersList from './user-list';
import UserUpdate from "./user-update";
import CustomToaster from '../toaster/toaster';
import HelperService from "../../shared/services/helper";
import { USER_CONST } from './users.const';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedUserData: USER_CONST.DEFAULT_EMPTY_VALUE,
            isRowClicked: USER_CONST.FALSE,
            isUserListModified: USER_CONST.FALSE,
        }
    }

    onUserListClick = (userData) => {
        this.setState({ selectedUserData: userData }, () => {
            this.setState({ isRowClicked: USER_CONST.TRUE, isUserListModified: USER_CONST.FALSE });
        });
    }

    onUserListUpdate = (toastDetails) => {
        HelperService.triggerToast(toastDetails.toastMsg, toastDetails.isSuccResponse);
        this.setState({ isUserListModified: USER_CONST.TRUE, isRowClicked: USER_CONST.FALSE });
    }

    handlePageChange = () => {
        this.setState({ isRowClicked: false });
    }

    render() {
        return <div className='user-wrapper'>
            <UsersList {...this.props} isPageChanged={this.handlePageChange} isUserListModified={this.state.isUserListModified} childListUserClick={this.onUserListClick}
            ></UsersList>
            <CustomToaster></CustomToaster>
            {
                this.state.isRowClicked && this.props.location.isAdmin ?
                    <UserUpdate {...this.props} userListUpdated={this.onUserListUpdate} selectedUserData={this.state.selectedUserData}></UserUpdate>
                    : this.state.isRowClicked && <h2 style={{margin: 'auto'}}>Only Admin can modify user list / Try login again</h2>
            }
        </div>
    }
}

export default Users;
