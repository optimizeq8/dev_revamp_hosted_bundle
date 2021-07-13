import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  I18nManager,
  BackHandler,
} from "react-native";
import { Icon } from "native-base";
import analytics from "@segment/analytics-react-native";
import styles from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
import SnapchatBorder from "../../../assets/SVGs/Snapchat-Border";
import whyDidYouRender from "@welldone-software/why-did-you-render";

import isStringArabic from "../../isStringArabic";
import CampaignCircleChart from "../CampaignCircleCharts";
import TimeDifferance from "../../Functions/TimeDifferance";
import isEqual from "react-fast-compare";
import globalStyles from "../../../GlobalStyles";
import GradientButton from "../GradientButton";
import NavigationService from "../../../NavigationService";
import RepeatCampaignModal from "../RepeatCampaignModal";
import ExtendCampaignModal from "../ExtendCampaignModal";
import CampaignOptionsMenu from "../CampaignOptionsMenu";

whyDidYouRender(React);
class CampaignCard extends Component {
  review_status = this.props.campaign.review_status;
  campaign_status = this.props.campaign.status;
  ad_status_color = this.props.campaign.ad_status_color_code;
  ad_status = this.props.campaign.ad_status;
  state = {
    showRepeatModal: false,
    showExtendModal: false,
    showCampaignOptions: false,
  };
  //New date returns the current date with a timezone of -3
  //So I add back the offset so the dates from the backend are compared properly
  currentDate = () => {
    let date = new Date();
    date.setTime(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
    return date;
  };
  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }
  handleCampaignPress = () => {
    analytics.track(`a_open_campaign_card`, {
      source: "dashboard",
      source_action: "a_open_campaign_card",
      timestamp: new Date().getTime(),
      campaignId: this.props.campaign.campaign_id,
      campaign_channel: "snapchat",
      businessid: this.props.mainBusiness.businessid,
    });
    this.props.getCampaignDetails(
      this.props.campaign.campaign_id,
      this.props.navigation
    );
  };

  campaignEndedOrNot = (campaign, endDate) => {
    endDate.setDate(endDate.getDate() + 2);
    let campaignEndedOrNot =
      this.review_status.includes("PENDING") ||
      (this.review_status.includes("APPROVED") &&
        new Date(campaign.start_time).setHours(0, 0, 0, 0) <=
          this.currentDate().setHours(0, 0, 0, 0) &&
        new Date(campaign.end_time) >= this.currentDate())
        ? null
        : campaign.campaign_end === "1" ||
          new Date(campaign.end_time) < this.currentDate();
    return campaignEndedOrNot;
  };
  handleRepeatModal = (value) => {
    analytics.track("a_toggle_repeat_modal", {
      source: "dashboard",
      source_action: "a_toggle_repeat_modal",
      visible: value,
      campaign_channel: "snapchat",
      campaignId: this.props.campaign.campaign_id,
      businessid: this.props.mainBusiness.businessid,
    });
    this.handleOptionsModal(false);
    this.setState({
      showRepeatModal: value,
    });
  };
  handleExtendModal = (value) => {
    analytics.track("a_toggle_extend_modal", {
      source: "dashboard",
      source_action: "a_toggle_extend_modal",
      visible: value,
      campaign_channel: "snapchat",
      campaignId: this.props.campaign.campaign_id,
      businessid: this.props.mainBusiness.businessid,
    });
    this.handleOptionsModal(false);
    this.setState({
      showExtendModal: value,
    });
  };
  handleOptionsModal = (value) => {
    analytics.track("a_toggle_options_modal", {
      source: "dashboard",
      source_action: "a_toggle_options_modal",
      visible: value,
      campaign_channel: "snapchat",
      campaignId: this.props.campaign.campaign_id,
      businessid: this.props.mainBusiness.businessid,
    });
    this.setState({
      showCampaignOptions: value,
    });
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    if (this.state.showRepeatModal) {
      this.handleRepeatModal(false);
    }
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  showRepeatButton = () => {
    let campaign = this.props.campaign;
    const { translate } = this.props.screenProps;
    let button = null;
    button = (
      <>
        {campaign.objective !== "ENGAGEMENT" && (
          <TouchableOpacity
            style={styles.repeatButton}
            onPress={() => this.handleRepeatModal(true)}
          >
            <Text style={styles.repeatText}>{translate("Promote again")}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={[styles.repeatButton]}
          onPress={() => this.handleExtendModal(true)}
        >
          <Text style={styles.repeatText}>{translate("Extend")}</Text>
        </TouchableOpacity>
      </>
    );
    return button;
  };
  render() {
    const { translate } = this.props.screenProps;
    let campaign = this.props.campaign;
    let endDate = new Date(campaign.end_time);
    endDate.setDate(endDate.getDate() + 2);
    let gradientColor = {
      color1: "#9300FF",
      color2: "#671FDE",
    };
    if (I18nManager.isRTL) {
      gradientColor = {
        color2: "#9300FF",
        color1: "#671FDE",
      };
    }
    return (
      // <LinearGradient
      //   // colors={[gradientColor.color1, "#9300FF", gradientColor.color2]}
      //   colors={[]}
      //   start={[0, 0]}
      //   end={[1, 1]}
      //   style={styles.cardStyle}
      // >
      <TouchableOpacity
        onPress={this.handleCampaignPress}
        style={[styles.cardStyle, styles.campaignButton]}
        disabled={campaign.channel === "instagram"}
      >
        <View style={styles.textcontainer}>
          <View style={styles.header}>
            <SnapchatBorder width={30} height={30} fill="#000" />
            <View
              style={{
                display: "flex",
                flexDirection: "column",
                paddingHorizontal: 10,
                flex: 1,
              }}
            >
              <Text
                ellipsizeMode="tail"
                numberOfLines={1}
                style={[
                  styles.titleText,
                  !isStringArabic(this.props.campaign.name)
                    ? {
                        fontFamily: "montserrat-bold-english",
                      }
                    : {
                        fontFamily: "changa-bold-arabic",
                      },
                ]}
              >
                {this.props.campaign.name}
              </Text>
              <View style={[styles.adStatus]}>
                <Icon
                  style={[
                    styles.circleIcon,
                    {
                      color: this.ad_status_color,
                    },
                  ]}
                  name={
                    this.review_status.includes("REJECTED")
                      ? "circle-slash"
                      : "circle"
                  }
                  type={
                    this.review_status.includes("REJECTED")
                      ? "Octicons"
                      : "FontAwesome"
                  }
                />
                <Text
                  style={[
                    styles.reviewText,
                    {
                      color: this.ad_status_color,
                    },
                  ]}
                >
                  {translate(`${this.ad_status}`) +
                    " " +
                    (campaign && campaign.campaign_start_date
                      ? campaign.campaign_start_date
                      : "")}
                </Text>
              </View>
            </View>
            {/* {campaign.snap_ad_id &&
                campaign.campaign_end === "0" &&
                endDate < this.currentDate() && (
                  <Icon
                    type="MaterialCommunityIcons"
                    name="alert"
                    style={[
                      styles.icon,
                      {
                        marginLeft: "auto",
                        // left: "75%",
                        color: globalColors.green,
                        // position: "absolute"
                      },
                    ]}
                  />
                )} */}
          </View>
          {this.ad_status && this.ad_status.includes("Ad Rejected") && (
            <Text style={[styles.subtext]}>
              {translate("Tap to submit your Ad again")}
            </Text>
          )}
          {campaign.hasOwnProperty("engagement_unverified") &&
            campaign.hasOwnProperty("engagement_phone_number") &&
            campaign.engagement_unverified &&
            campaign.objective === "ENGAGEMENT" && (
              <View
                style={{
                  flexDirection: "row",
                  paddingVertical: 5,
                  justifyContent: "flex-end",
                }}
              >
                <Text style={[styles.subtext, { width: "50%" }]}>
                  {translate("You need to verify the phone number to launch")}
                </Text>
                <GradientButton
                  onPressAction={() =>
                    NavigationService.navigate("VerifyEngagmentNumber", {
                      dashboard: true,
                      engagement_phone_number: campaign.engagement_phone_number,
                      campaign_id: campaign.campaign_id,
                      source: "dashboard",
                      source_action: "a_verify_engagement_number",
                    })
                  }
                  style={{ height: "75%", width: "30%" }}
                  text={translate("Verify")}
                />
              </View>
            )}
          {this.review_status.includes("APPROVED") && (
            <View style={styles.chartContainer}>
              <CampaignCircleChart
                channel={this.props.channel}
                campaign={campaign}
                detail={false}
                screenProps={this.props.screenProps}
              />
              {this.ad_status !== "Campaign ended" ? (
                <>
                  <View style={styles.horizontalLineView} />
                  <View style={styles.cardStatusDays}>
                    <Text style={globalStyles.numbers}>
                      {TimeDifferance(this.currentDate(), campaign.end_time) +
                        1}
                    </Text>
                    <Text uppercase style={styles.cardText}>
                      {translate("Day(s) left")}
                    </Text>

                    <TouchableOpacity
                      style={[
                        styles.repeatButton,
                        { alignSelf: "center", marginTop: 10, width: "100%" },
                      ]}
                      onPress={() => this.handleExtendModal(true)}
                    >
                      <Text style={styles.repeatText}>
                        {translate("Extend")}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              ) : (
                <TouchableOpacity
                  style={styles.dotsContainer}
                  onPress={() => this.handleOptionsModal(true)}
                >
                  <Icon
                    name="options"
                    type="SimpleLineIcons"
                    style={{
                      fontSize: 20,
                      color: "#d4d4d4",
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
          {this.state.showRepeatModal && (
            <RepeatCampaignModal
              showRepeatModal={this.state.showRepeatModal}
              screenProps={this.props.screenProps}
              handleRepeatModal={this.handleRepeatModal}
              campaign={campaign}
              screenProps={this.props.screenProps}
            />
          )}
          {this.state.showExtendModal && (
            <ExtendCampaignModal
              showRepeatModal={this.state.showExtendModal}
              screenProps={this.props.screenProps}
              handleExtendModal={this.handleExtendModal}
              campaign={campaign}
              screenProps={this.props.screenProps}
            />
          )}
          <CampaignOptionsMenu
            showCampaignOptions={this.state.showCampaignOptions}
            handleOptionsModal={this.handleOptionsModal}
            translate={translate}
            showRepeatButton={this.showRepeatButton}
          />
        </View>
      </TouchableOpacity>
      // </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
});
const mapDispatchToProps = (dispatch) => ({
  getCampaignDetails: (id, naviagtion) =>
    dispatch(actionCreators.getCampaignDetails(id, naviagtion)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignCard);
CampaignCard.whyDidYouRender = false;
