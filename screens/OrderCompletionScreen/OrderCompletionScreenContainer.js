import React, { Component } from "react";
import OrderCompletionScreenPresenter from "./OrderCompletionScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <OrderCompletionScreenPresenter navigation={this.props.navigation}/>;
  }
}
