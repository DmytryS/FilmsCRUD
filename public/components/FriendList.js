import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import FriendListItem from './FriendListItem';

export default class FriendList extends Component {
  static propTypes = {
    friends: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
  };

  render () {
    return (
      <ul>
        {
          Object.keys(this.props.friends).map(key =>
            <FriendListItem
              key={this.props.friends[key].id}
              id={this.props.friends[key].id}
              name={this.props.friends[key].name}
              starred={this.props.friends[key].starred}
              {...this.props.actions} />
          )
        }
      </ul>
    );
  }

}
