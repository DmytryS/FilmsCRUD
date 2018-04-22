import React, { Component } from 'react';
import PropTypes from 'prop-types';


export default class FriendListItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    starred: PropTypes.boolean,
    starFriend: PropTypes.func.isRequired,
    onTrashClick: PropTypes.func.isRequired
  };

  render () {
    return (
      <li>
        <div>
          <div><span>{this.props.name}</span></div>
          <div><small>xx friends in common</small></div>
        </div>
        <div>
          <button className={`btn btn-default`} onClick={() => this.props.starFriend(this.props.id)}>
            <i />
          </button>
          <button className={`btn btn-default`} onClick={() => this.props.deleteFriend(this.props.id)}>
            <i className="fa fa-trash" />
          </button>
        </div>
      </li>
    );
  }

}
