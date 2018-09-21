import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import MarkerWithInfo from './MarkerWithInfo';
import { URL } from '../config';

class UserMap extends Component {
  state = {
    selectedUser: null,
    users: this.props.users
  };

  selectUser = user => {
    this.setState({ selectedUser: user });
  };

  render() {
    const { users } = this.props;
    const { selectedUser } = this.state;
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{
          lat: this.props.currentPos.coords.latitude || 45.84,
          lng: this.props.currentPos.coords.longitude || 9.66
        }}
      >
        {users.map((user, index) => (
          <MarkerWithInfo
            user={user}
            key={index}
            onSelect={() => this.selectUser(user)}
            isOpen={user === selectedUser}
            onClose={() => this.selectUser(null)}
          />
        ))}
      </GoogleMap>
    );
  }
}

const ConnectedUserMap = withScriptjs(withGoogleMap(UserMap));

export default function UserMapWithSettings(props) {
  return (
    <ConnectedUserMap
      googleMapURL={URL}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px`, width: '80vw' }} />}
      mapElement={<div style={{ height: `100%` }} />}
      {...props}
    />
  );
}
