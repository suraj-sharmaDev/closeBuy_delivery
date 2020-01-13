import React, { Component } from "react";
import LoginScreenPresenter from "./LoginScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <LoginScreenPresenter navigation={this.props.navigation}/>;
  }
}
