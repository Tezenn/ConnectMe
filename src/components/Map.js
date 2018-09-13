import React, { Component } from "react";
import { withScriptjs, withGoogleMap, GoogleMap } from "react-google-maps";
import MarkerWithInfo from "./MarkerWithInfo";

class UserMap extends Component {
  state = {
    selectedUser: null
  };

  selectUser = user => {
    this.setState({ selectedUser: user });
  };

  render() {
    const { users } = this.props;
    const { selectedUser } = this.state;
    return (
      <GoogleMap defaultZoom={8} defaultCenter={{ lat: 45.84, lng: 9.66 }}>
        {users.map((user, index) => (
          <MarkerWithInfo
            user={user}
            position={user.position}
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
      googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `400px`, width: "80vw" }} />}
      mapElement={<div style={{ height: `100%` }} />}
      {...props}
    />
  );
}
