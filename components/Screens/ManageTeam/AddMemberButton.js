import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./Styles";
import AddTeamIcon from "../../../assets/SVGs/AddTeam";
import { showMessage } from "react-native-flash-message";
export default class AddMember extends Component {
  render() {
    let {
      sendInvite,
      submitFunction,
      navigation,
      mainBusiness,
      translate
    } = this.props;

    return (
      <TouchableOpacity
        onPress={() =>
          sendInvite
            ? submitFunction()
            : mainBusiness.user_role === "1"
            ? navigation.push("AddOrEditTeamMember")
            : showMessage({
                message: "Only an admin can add team members.",
                type: "info"
              })
        }
        style={styles.addMember}
      >
        <AddTeamIcon />
        <Text style={styles.addTeamMember}>{translate("Add team member")}</Text>
      </TouchableOpacity>
    );
  }
}
