import React, { Component } from "react";
import DeliveryTrackingScreenPresenter from "./DeliveryTrackingScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <DeliveryTrackingScreenPresenter navigation={this.props.navigation} userLocation={this.props.userLocation}/>;
  }
}
