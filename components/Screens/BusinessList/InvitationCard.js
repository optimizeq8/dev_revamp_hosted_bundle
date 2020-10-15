import React, { Component } from "react";
import { View } from "react-native";
import { connect } from "react-redux";
import InvitationRow from "./InvitationRow";

/**
 * Functional component for showing there is a business invite in the busniess list
 */
InvitationCard = (props) => {
  let {
    handleTeamInvite,
    businessInvitee,
    navigation,
    tempInviteId,
    businessInvites,
    userInfo,
    invitedEmail,
  } = props;
  const { translate } = props.screenProps;
  let invites = [];
  if (businessInvites)
    invites = businessInvites.map((invite) => (
      <InvitationRow
        key={invite.businessid}
        {...invite}
        handleTeamInvite={handleTeamInvite}
        invitedEmail={invitedEmail}
        navigation={navigation}
        userEmail={userInfo.email}
        screenProps={props.screenProps}
      />
    ));

  return <View>{invites}</View>;
};

const mapStateToProps = (state) => ({
  businessInvites: state.account.businessInvites,
  invitedEmail: state.account.invitedEmail,
  userInfo: state.auth.userInfo,
});

export default connect(mapStateToProps, null)(InvitationCard);
