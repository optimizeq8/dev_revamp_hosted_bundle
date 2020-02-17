import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./Styles";
import AddTeamIcon from "../../../assets/SVGs/AddTeam";
import { showMessage } from "react-native-flash-message";
import segmentEventTrack from "../../segmentEventTrack";
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
        onPress={() => {
          segmentEventTrack("Button Add Team Member Clicked");
          sendInvite
            ? segmentEventTrack("Send Invite")
            : mainBusiness.user_role === "1"
            ? segmentEventTrack("Navigate To Add/Edit TeamMember")
            : segmentEventTrack("Error Add Team Member", {
                error_manage_team: "Only an admin can add team members"
              });
          sendInvite
            ? submitFunction()
            : mainBusiness.user_role === "1"
            ? navigation.push("AddOrEditTeamMember")
            : showMessage({
                message: translate("Only an admin can add team members"),
                type: "info"
              });
        }}
        style={styles.addMember}
      >
        <AddTeamIcon />
        <Text style={styles.addTeamMember}>{translate("Add team member")}</Text>
      </TouchableOpacity>
    );
  }
}
