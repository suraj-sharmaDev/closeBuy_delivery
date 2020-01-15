import React, { Component } from "react";
import OrderTrackingScreenPresenter from "./OrderTrackingScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <OrderTrackingScreenPresenter navigation={this.props.navigation} userLocation={this.props.userLocation}/>;
  }
}
