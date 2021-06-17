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
import { RFValue } from "react-native-responsive-fontsize";
import styles from "./styles";
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import { LinearGradient } from "expo-linear-gradient";
// import InstagramIcon from "../../../assets/SVGs/InstagramIcon";
import InstagramIcon from "../../../assets/images/AdTypes/InstaWhiteLogo";

import whyDidYouRender from "@welldone-software/why-did-you-render";

import { globalColors } from "../../../GlobalStyles";
import isStringArabic from "../../isStringArabic";
import CampaignCircleChart from "../InstagramCampaignCircleCharts";
import TimeDifferance from "../../Functions/TimeDifferance";
import isEqual from "react-fast-compare";
import globalStyles from "../../../GlobalStyles";
import RepeatCampaignModal from "../RepeatCampaignModal";
import ExtendCampaignModal from "../ExtendCampaignModal";
import CampaignOptionsMenu from "../CampaignOptionsMenu";

whyDidYouRender(React);
class CampaignCard extends Component {
  constructor(props) {
    super(props);
    // slowlog(this, /.*/, {
    // verbose: true
    // }); //verbose logs all functions and their time
  }
  state = {
    showRepeatModal: false,
    showExtendModal: false,
    showCampaignOptions: false,
  };
  currentDate = () => {
    let date = new Date();
    date.setTime(date.getTime() - new Date().getTimezoneOffset() * 60 * 1000);
    return date;
  };
  review_status = this.props.campaign.review_status;
  campaign_status = this.props.campaign.status;
  ad_status = this.props.campaign.ad_status;
  ad_status_color_code = this.props.campaign.ad_status_color_code;

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }
  handleCampaignPress = () => {
    analytics.track(`a_open_campaign_card`, {
      source: "dashboard",
      source_action: "a_open_campaign_card",
      timestamp: new Date().getTime(),
      campaignId: this.props.campaign.campaign_id,
      campaign_channel: "instagram",
      businessid: this.props.mainBusiness.businessid,
    });
    this.props.getInstagramCampaignDetails(
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
      source_action: "a_toggle_options_modal",
      visible: value,
      campaign_channel: "instagram",
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
      campaign_channel: "instagram",
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
      campaign_channel: "instagram",
      campaignId: this.props.campaign.campaign_id,
      businessid: this.props.mainBusiness.businessid,
    });
    this.setState({
      showCampaignOptions: value,
    });
  };
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
          <Text style={styles.repeatText}>{"Extend"}</Text>
        </TouchableOpacity>
      </>
    );
    return button;
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
      <LinearGradient
        colors={[gradientColor.color1, "#9300FF", gradientColor.color2]}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.cardStyle}
      >
        <TouchableOpacity
          // disabled={true}
          onPress={this.handleCampaignPress}
          style={styles.campaignButton}
        >
          <View style={styles.textcontainer}>
            <View style={styles.header}>
              <InstagramIcon
                width={RFValue(12.5, 414)}
                height={RFValue(12.5, 414)}
                fill={"#FFF"}
                style={
                  {
                    //   marginRight: RFValue(-7.5, 414),
                    //   marginLeft: -10,
                    //   marginBottom: -10,
                  }
                }
              />
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingHorizontal: RFValue(5, 414),
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
                        color: this.ad_status_color_code,
                      },
                    ]}
                    name={
                      this.ad_status && this.ad_status.includes("Ad Rejected")
                        ? "circle-slash"
                        : "circle"
                    }
                    type={
                      this.ad_status && this.ad_status.includes("Ad Rejected")
                        ? "Octicons"
                        : "FontAwesome"
                    }
                  />
                  <Text
                    style={[
                      styles.reviewText,
                      {
                        color: this.ad_status_color_code,
                      },
                    ]}
                  >
                    {translate(`${this.ad_status}`) + " "}
                    {campaign && campaign.campaign_start_date
                      ? campaign.campaign_start_date
                      : ""}
                  </Text>
                </View>
              </View>
              {campaign.snap_ad_id &&
                campaign.campaign_end === "0" &&
                endDate < new Date() && (
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
                )}
            </View>

            {this.ad_status && this.ad_status.includes("Ad Rejected") && (
              <Text style={[styles.subtext]}>
                {translate("Tap to submit your Ad again")}
              </Text>
            )}

            {this.review_status === "APPROVED" && (
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
                        {TimeDifferance(new Date(), campaign.end_time) + 1}
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
                        <Text style={styles.repeatText}>{"Extend"}</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <TouchableOpacity style={styles.dotsContainer}>
                    <Icon
                      name="options"
                      type="SimpleLineIcons"
                      onPress={() => this.handleOptionsModal(true)}
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
              />
            )}
            {this.state.showExtendModal && (
              <ExtendCampaignModal
                showRepeatModal={this.state.showExtendModal}
                screenProps={this.props.screenProps}
                handleExtendModal={this.handleExtendModal}
                campaign={campaign}
                instagramCampaign={true}
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
      </LinearGradient>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
});

const mapDispatchToProps = (dispatch) => ({
  getInstagramCampaignDetails: (id, naviagtion) =>
    dispatch(actionCreators.getInstagramCampaignDetails(id, naviagtion)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignCard);
CampaignCard.whyDidYouRender = false;
