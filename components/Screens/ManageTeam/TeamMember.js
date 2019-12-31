import React, { Component } from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "native-base";
import * as Icons from "../../../assets/SVGs/MenuIcons/index";
import styles from "./Styles";
import PenIcon from "../../../assets/SVGs/Pen";
import { showMessage } from "react-native-flash-message";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";

export default class TeamMember extends Component {
  resendInvite = () => {
    let { firstname, lastname, email, user_role } = this.props.member;
    this.props.inviteTeamMember({
      firstname,
      lastname,
      email,
      user_role,
      businessid: this.props.mainBusiness.businessid
    });
  };
  handleUserRole = () =>
    this.props.mainBusiness.user_role === "1"
      ? this.props.navigation.push("AddOrEditTeamMember", {
          member: this.props.member,
          editTeamMember: true
        })
      : showMessage({
          message: "Only an admin can edit team members.",
          type: "info"
        });
  render() {
    const { translate } = this.props.screenProps;
    let { member, loadingTeamMembers, isPending } = this.props;
    let userRoles = ["Admin", "Campaign manager", "Client"];
    return (
      <TouchableOpacity
        disabled={isPending}
        onPress={this.handleUserRole}
        style={styles.teamMember}
      >
        <Icons.PersonalInfo
          style={styles.teamMemberIconStyle}
          width={30}
          height={30}
        />
        <View style={{ width: "70%" }}>
          {loadingTeamMembers ? (
            <PlaceholderLine width={"90%"} />
          ) : (
            <Text
              uppercase
              style={styles.teamText}
              ellipsizeMode="tail"
              numberOfLines={4}
            >
              {member.firstname + " " + member.lastname}{" "}
              <Text style={styles.teamText}>
                ({translate(userRoles[parseInt(member.user_role - 1)])})
              </Text>
              {"\n"}
              <Text style={styles.teamEmail}>{member.email}</Text>
            </Text>
          )}
        </View>
        {isPending ? (
          <TouchableOpacity
            disabled={loadingTeamMembers}
            onPress={this.resendInvite}
          >
            <Text style={styles.resendStyle}>resend</Text>
          </TouchableOpacity>
        ) : (
          <PenIcon width={20} height={20} />
        )}
      </TouchableOpacity>
    );
  }
}
