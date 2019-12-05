import React, { Component } from "react";
import { View } from "react-native";
import styles from "./styles";
import { Text, Icon } from "native-base";
import isStringArabic from "../../isStringArabic";
import businessCardStyles from "../../MiniComponents/BusinessCard/styles";
import LowerButton from "../../MiniComponents/LowerButton";
import globalStyles, { globalColors } from "../../../GlobalStyles";

/**
 * Functional component for showing there is a business invite in the busniess list
 */
export default InvitationCard = props => {
  let { handleTeamInvite, businessInvitee, navigation, tempInviteId } = props;
  return (
    <View>
      <Text uppercase style={[styles.headings]}>
        Invitation
      </Text>
      <View style={[businessCardStyles.campaignButton]}>
        <View style={[businessCardStyles.businessIconStyle]}>
          <Icon
            name="envelope-letter"
            type="SimpleLineIcons"
            style={{ color: "#fff", fontSize: 25 }}
          />
        </View>
        <View style={businessCardStyles.textcontainer}>
          <Text
            style={[
              businessCardStyles.titletext,
              !isStringArabic(businessInvitee)
                ? {
                    fontFamily: "montserrat-medium-english"
                  }
                : {}
            ]}
          >
            {businessInvitee}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: "30%"
          }}
        >
          <LowerButton
            cross
            function={() => handleTeamInvite({ status: 0, v: tempInviteId })}
            width={30}
            height={30}
            style={[
              {
                shadowOpacity: 0,
                borderWidth: 1,
                borderRadius: 30,
                backgroundColor: globalColors.orange
              },
              globalStyles.orangeBorderColor
            ]}
          />
          <LowerButton
            checkmark
            function={() => navigation.navigate("TeamInvite")}
            width={30}
            height={30}
            style={{ shadowOpacity: 0 }}
          />
        </View>
      </View>
    </View>
  );
};
