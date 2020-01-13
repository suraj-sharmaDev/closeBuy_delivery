import React, { Component } from "react";
import ProfileScreenPresenter from "./ProfileScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <ProfileScreenPresenter navigation={this.props.navigation}/>;
  }
}
