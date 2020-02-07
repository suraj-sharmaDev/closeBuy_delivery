import React, { Component } from "react";
import DutyScreenPresenter from "./DutyScreenPresenter";

export default class extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <DutyScreenPresenter navigation={this.props.navigation}/>;
  }
}
