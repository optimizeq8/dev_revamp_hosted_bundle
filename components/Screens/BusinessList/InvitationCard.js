import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles";
import { Text, Icon } from "native-base";
import isStringArabic from "../../isStringArabic";
import businessCardStyles from "../../MiniComponents/BusinessCard/styles";
import LowerButton from "../../MiniComponents/LowerButton";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import { connect } from "react-redux";
import InvitationRow from "./InvitationRow";

/**
 * Functional component for showing there is a business invite in the busniess list
 */
InvitationCard = props => {
  let {
    handleTeamInvite,
    businessInvitee,
    navigation,
    tempInviteId,
    businessInvites,
    userInfo,
    invitedEmail
  } = props;

  let invites = [];
  if (businessInvites)
    invites = businessInvites.map(invite => (
      <InvitationRow
        key={invite.businssid}
        {...invite}
        handleTeamInvite={handleTeamInvite}
        invitedEmail={invitedEmail}
        navigation={navigation}
        userEmail={userInfo.email}
      />
    ));

  return (
    <View>
      <Text uppercase style={[styles.headings]}>
        Invitation
      </Text>
      {invites}
    </View>
  );
};

const mapStateToProps = state => ({
  businessInvites: state.account.businessInvites,
  invitedEmail: state.account.invitedEmail,
  userInfo: state.auth.userInfo
});

export default connect(mapStateToProps, null)(InvitationCard);
