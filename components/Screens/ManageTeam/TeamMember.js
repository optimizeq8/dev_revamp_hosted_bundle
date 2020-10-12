import React, { Component } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import * as Icons from "../../../assets/SVGs/MenuIcons/index";
import styles from "./Styles";
import PenIcon from "../../../assets/SVGs/Pen";
import { showMessage } from "react-native-flash-message";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";

export default class TeamMember extends Component {
  resendInvite = () => {
    let { firstname, lastname, email, user_role } = this.props.member;
    this.props.inviteTeamMember(
      {
        firstname,
        lastname,
        email,
        user_role,
        businessid: this.props.mainBusiness.businessid,
      },
      true
    );
  };

  handleUserRole = () => {
    this.props.navigation.navigate("AddOrEditTeamMember", {
      member: this.props.member,
      editTeamMember: true,
      source: "team_management_members_list",
      source_action: "a_open_team_member_details",
    });
  };

  render() {
    const { translate } = this.props.screenProps;
    let { member, loadingTeamMembers, isPending } = this.props;
    let userRoles = ["Admin", "Campaign manager", "Client"];
    return (
      <TouchableOpacity
        disabled={isPending || this.props.mainBusiness.user_role !== "1"}
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
