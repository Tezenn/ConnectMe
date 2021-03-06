import React, { Component } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import _ from 'lodash';
import MarkerWithInfo from './MarkerWithInfo';
import { URL } from '../config';
import { Redirect } from 'react-router-dom';

class UserMap extends Component {
  state = {
    selectedUser: null,
    users: this.props.users,
    lastCenter: null
  };

  selectUser = user => {
    this.setState({ selectedUser: user });
  };

  updateMapRef = gM => {
    this.mapRef = gM;
  };
  test = async () => {
    setTimeout(() => {
      if (this.mapRef) {
        this.setState({
          lastCenter: {
            coords: {
              latitude: this.mapRef.getCenter().lat(),
              longitude: this.mapRef.getCenter().lng()
            }
          }
        });
      }
      this.props.getCloseUsers(this.state.lastCenter);
    }, 1000);
  };

  debounced = _.throttle(this.test, 5000);

  render() {
    const { users } = this.props;
    const { selectedUser } = this.state;
    return (
      <GoogleMap
        ref={this.updateMapRef}
        defaultZoom={12}
        onIdle={() => {
          this.debounced();
        }}
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
      containerElement={<div style={{ height: `600px`, width: '80vw' }} />}
      mapElement={<div style={{ height: `100%` }} />}
      {...props}
    />
  );
}
