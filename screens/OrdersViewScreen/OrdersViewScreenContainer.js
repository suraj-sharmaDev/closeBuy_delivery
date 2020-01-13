import React, { Component } from "react";
import OrdersViewScreenPresenter from "./OrdersViewScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <OrdersViewScreenPresenter navigation={this.props.navigation}/>;
  }
}
