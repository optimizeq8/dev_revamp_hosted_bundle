import React, { Component } from "react";
import {
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
  Dimensions
} from "react-native";
import { Text, Icon } from "native-base";
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import Toggle from "react-native-switch-toggle";
import Chart from "./Charts";
import { LinearGradient, Segment } from "expo";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

import ImpressionsIcons from "../../../assets/SVGs/CampaignCards/ImpressionsIcon";
import SwipeUpsIcon from "../../../assets/SVGs/CampaignCards/SwipeUpsIcon";
import GlobalStyles, { globalColors } from "../../../Global Styles";
class CampaignCard extends Component {
  state = {
    paused: false,
    status: "PAUSED"
  };
  toggleStatus = () => {
    this.setState({ paused: !this.state.paused });
  };
  getLeftText = () => {
    return this.state.status === "PAUSED" ? "" : "Live";
  };
  formatNumber = num => {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };
  render() {
    let campaign = this.props.campaign;
    let chart = [
      { spend: campaign.spends }
      // { impressions: campaign.impressions },
      // { swipes: campaign.swipes }
    ].map((category, i) => (
      <Chart campaign={campaign} chartCategory={category} key={i} />
    ));
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        locations={[0.7, 1]}
        style={styles.cardStyle}
      >
        <TouchableOpacity
          onPress={() => {
            this.props.getCampaignDetails(
              this.props.campaign.campaign_id,
              this.props.navigation
            );
            Segment.trackWithProperties("Campaign Card Button", {
              campaign_id: this.props.campaign.campaign_id
            });
            // this.props.navigation.push("CampaignDetails", {
            //   review_status: this.props.campaign.review_status
            // });
          }}
          style={styles.campaignButton}
        >
          <View style={styles.textcontainer}>
            <View style={styles.header}>
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[styles.titletext]}
              >
                {this.props.campaign.name}
              </Text>
            </View>
            {this.props.campaign.review_status.includes("PENDING") && (
              <View
                style={{
                  borderRadius: 16,
                  backgroundColor: globalColors.orange,
                  paddingHorizontal: 10,
                  top: 5
                }}
              >
                <Text style={styles.reviewtext}>In Review</Text>
              </View>
            )}
            <Icon
              type="MaterialCommunityIcons"
              name="snapchat"
              style={styles.icon}
            />
            {!this.props.campaign.review_status.includes("PENDING") && (
              <Text style={[styles.subtext]}>Tap to view more</Text>
            )}

            <View style={{ flexDirection: "row" }}>
              {chart}
              <View>
                <View style={styles.campaignIcons}>
                  <ImpressionsIcons style={{ bottom: 3 }} />
                  <View style={styles.campaignInfo}>
                    <Text
                      style={[GlobalStyles.numbers, styles.campaignNumbers]}
                      ellipsizeMode="tail"
                      numberOfLines={1}
                    >
                      {this.formatNumber(campaign.impressions)}
                    </Text>
                    <Text style={[styles.subtext]}>Impressions</Text>
                  </View>
                </View>
                <View style={styles.campaignIcons}>
                  <SwipeUpsIcon />
                  <View style={styles.campaignInfo}>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      style={[GlobalStyles.numbers, styles.campaignNumbers]}
                    >
                      {this.formatNumber(campaign.swipes)}
                    </Text>
                    <Text style={[styles.subtext]}>Swipe Ups</Text>
                  </View>
                </View>
              </View>
            </View>

            <View pointerEvents="none" style={styles.containerStyle}>
              <Toggle
                backTextLeft={this.getLeftText()}
                containerStyle={styles.toggleStyle}
                switchOn={campaign.status !== "PAUSED"}
                textLeftStyle={styles.toggleTextLeft}
                onPress={this.toggleStatus}
                backgroundColorOff="rgba(255,255,255,0.1)"
                backgroundColorOn="rgba(255,255,255,0.1)"
                circleColorOff="#FF9D00"
                circleColorOn="#66D072"
                duration={200}
                circleStyle={{
                  width: widthPercentageToDP(4),
                  height: heightPercentageToDP(2),
                  borderRadius: 25
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </LinearGradient>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  getCampaignDetails: (id, naviagtion) =>
    dispatch(actionCreators.getCampaignDetails(id, naviagtion))
});
export default connect(
  null,
  mapDispatchToProps
)(CampaignCard);
