import React, { Component } from "react";
import OrdersHistoryScreenPresenter from "./OrdersHistoryScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <OrdersHistoryScreenPresenter navigation={this.props.navigation}/>;
  }
}
