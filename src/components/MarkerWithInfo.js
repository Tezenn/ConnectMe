import React, { Component } from "react";
import { Marker, InfoWindow } from "react-google-maps";

class MarkerWithInfo extends Component {
  render() {
    const { user, isOpen, onSelect, onClose } = this.props;
    return (
      <Marker position={user.position} onClick={onSelect}>
        {isOpen && (
          <InfoWindow onCloseClick={onClose}>
            <div>{user.name}</div>
          </InfoWindow>
        )}
      </Marker>
    );
  }
}

export default MarkerWithInfo;
