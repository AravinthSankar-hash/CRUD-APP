import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

import AppService from '../../shared/services/app.service';
import { USER_CONST } from './users.const';
import { STATUS_CODE } from '../../shared/constants/common.const';
import './user.css'

class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userList: [], isUserListModified: this.props.isUserListModified }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.isUserListModified !== this.props.isUserListModified) {
      this.setState({ isUserListModified: this.props.isUserListModified });
    }
    if (prevState.isUserListModified !== this.state.isUserListModified) {
      this.fetchUserList();
    }
  }

  componentDidMount() {
    this.fetchUserList();
  }

  fetchUserList = async () => {
    const usersList = await AppService.getAllRegisteredUsers();
    if (usersList.statusCode && usersList.statusCode === STATUS_CODE.UNAUTH) {
      this.props.history.push('/login');
      return;
  }
    usersList.forEach((user, index) => {
      user.id = index + 1
    });
    this.setState({ userList: usersList });
  }

  rowClicked = (values) => {
    this.props.childListUserClick(values.row);
    this.setState({ isUserListModified: this.props.isUserListModified });
  }

  render() {
    return <div className='user-list'>
      <DataGrid
        rows={this.state.userList}
        columns={USER_CONST.TABLE_COLUMN_DETAILS}
        pageSize={5}
        checkboxSelection={USER_CONST.FALSE}
        onCellClick={this.rowClicked}
        hideFooterSelectedRowCount="false"
        onPageChange={this.props.isPageChanged}
      />
    </div>
  }
}

export default UsersList;
