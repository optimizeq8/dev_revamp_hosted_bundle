import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./Styles";
import AddTeamIcon from "../../../assets/SVGs/AddTeam";

export default class AddMember extends Component {
  render() {
    let {
      sendInvite,
      submitFunction,
      navigation,
      translate
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          const source = this.props.navigation.getParam(
            "source",
            this.props.screenProps.prevAppState
          );
          const source_action = this.props.navigation.getParam(
            "source_action",
            this.props.screenProps.prevAppState
          );

          sendInvite
            ? submitFunction()
            : navigation.navigate("AddOrEditTeamMember", {
              source,
              source_action
            })

        }}
        style={styles.addMember}
      >
        <AddTeamIcon />
        <Text style={styles.addTeamMember}>{translate("Add team member")}</Text>
      </TouchableOpacity>
    );
  }
}
