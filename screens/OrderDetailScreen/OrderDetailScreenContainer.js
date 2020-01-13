import React, { Component } from "react";
import OrderDetailScreenPresenter from "./OrderDetailScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <OrderDetailScreenPresenter navigation={this.props.navigation}/>;
  }
}
