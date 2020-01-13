import React, { Component } from "react";
import HomeScreenPresenter from "./HomeScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <HomeScreenPresenter navigation={this.props.navigation}/>;
  }
}
