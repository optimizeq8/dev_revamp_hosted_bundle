import React, { Component } from "react";
import { Text, View } from "react-native";
import { Icon } from "native-base";
import { RFValue } from "react-native-responsive-fontsize";
import LowerButton from "../../MiniComponents/LowerButton";
import businessCardStyles from "../../MiniComponents/BusinessCard/styles";
import isStringArabic from "../../isStringArabic";
import globalStyles from "../../../GlobalStyles";
import styles from "./styles";
export default class InvitationRow extends Component {
  render() {
    let {
      handleTeamInvite,
      businessid,
      v,
      user_role,
      businessname,
      invitedEmail,
      navigation,
      userEmail,
    } = this.props;
    let role = ["Admin", "Campaign Manager", "Client"][parseInt(user_role) - 1];
    return (
      <View style={[businessCardStyles.businessButton]}>
        <View style={[businessCardStyles.businessIconStyle]}>
          <Icon
            name="envelope-letter"
            type="SimpleLineIcons"
            style={{ color: "#fff", fontSize: RFValue(12.5, 414) }}
          />
        </View>
        <View style={businessCardStyles.textcontainer}>
          <Text
            style={[
              businessCardStyles.titletext,
              !isStringArabic(businessname)
                ? {
                    fontFamily: "montserrat-bold-english",
                  }
                : {},
            ]}
          >
            {businessname}
          </Text>
          <Text style={[styles.subtext]}>{role}</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            // width: "30%",
          }}
        >
          <LowerButton
            screenProps={this.props.screenProps}
            cross
            function={() =>
              handleTeamInvite(
                { status: 0, v: v },
                {
                  source: "open_hamburger",
                  source_action: "a_decline_invite",
                  invite_status: 0,
                  invite_v: v,
                }
              )
            }
            width={RFValue(15, 414)}
            height={RFValue(15, 414)}
            style={[
              {
                width: RFValue(16, 414),
                height: RFValue(16, 414),
                ...globalStyles.orangeBorderColor,
              },
            ]}
          />
          <LowerButton
            screenProps={this.props.screenProps}
            checkmark
            function={() =>
              navigation.navigate("TeamInvite", {
                v,
                business: businessname,
                email:
                  navigation.getParam("email", false) ||
                  invitedEmail ||
                  userEmail,
                source: "open_hamburger",
                source_action: "a_open_team_invite",
              })
            }
            style={{
              width: RFValue(16, 414),
              height: RFValue(16, 414),
            }}
            width={RFValue(15, 414)}
            height={RFValue(15, 414)}
          />
        </View>
      </View>
    );
  }
}
