import React, { Component } from "react";
import { View, Animated, BackHandler, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Text, Container, Icon } from "native-base";
import analytics from "@segment/analytics-react-native";
import DateFields from "../../MiniComponents/DatePicker/DateFields";
import Header from "../../MiniComponents/Header";
import { SafeAreaView, NavigationEvents, ScrollView } from "react-navigation";
import startCase from "lodash/startCase";
import toLower from "lodash/toLower";

import PlaceholderLine from "../../MiniComponents/PlaceholderLine";
import StatusModal from "./StatusModal";
import Toggle from "../../MiniComponents/Toggle";
import ErrorComponent from "../../MiniComponents/ErrorComponent";
import SlideUpPanel from "./SlideUpPanel";
import RejectedSnapchatInfo from "./RejectedInfoComp/RejectedSnapchatInfo";

//icons
import LocationIcon from "../../../assets/SVGs/Location";
import GenderIcon from "../../../assets/SVGs/Gender";
import InterestsIcon from "../../../assets/SVGs/Interests";
import DeviceMakeIcon from "../../../assets/SVGs/DeviceMake";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../GlobalStyles";
//Functions
import dateFormat from "dateformat";

//Data
import { country_regions as regionsCountries } from "../../Screens/CampaignCreate/AdDetails/data";
import countries from "../../Screens/CampaignCreate/AdDetails/data";
import { interestNames } from "./interesetNames";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import MediaBox from "./MediaBox";
import CampaignCircleChart from "../../MiniComponents/CampaignCircleCharts";
import CampaignMedia from "./CampaignMedia";
import AudienceOverview from "../../MiniComponents/AudienceOverview";
import { heightPercentageToDP } from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import ChartDateChoices from "./ChartDateChoices";
import CSVModal from "./CSVModal";

class InstagramCampaignDetails extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      start_time: "",
      end_time: "",
      modalVisible: false,
      toggle: false,
      toggleText: "",
      chartAnimation: new Animated.Value(0),
      LineAnimation: new Animated.Value(0),
      imageIsLoading: true,
      expand: false,
      minHeight: 0,
      maxHeight: heightPercentageToDP(50),
      CSVModalVisible: false,
    };
  }

  componentDidMount() {
    this.props.get_languages();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentDidUpdate(prevProps) {
    if (
      prevProps.selectedCampaign !== this.props.selectedCampaign &&
      this.props.selectedCampaign
    ) {
      this.setState({
        toggleText: this.props.selectedCampaign.status,
        toggle: this.props.selectedCampaign.status !== "PAUSED",
      });
    }
  }
  // need to ask
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.selectedCampaign.campaign_id !==
        nextProps.selectedCampaign.campaign_id ||
      this.props.selectedCampaign.spends !==
        nextProps.selectedCampaign.spends ||
      this.props.loading !== nextProps.loading ||
      this.props.languagesListLoading !== nextProps.languagesListLoading ||
      JSON.stringify(this.state) !== JSON.stringify(nextState) ||
      this.props.campaignEnded !== nextProps.campaignEnded
    );
  }

  handleStartDatePicked = (date) => {
    analytics.track(`a_ad_start_date`, {
      campaign_start_date: date,
      source: "ad_detail",
      source_action: "a_ad_start_date",
      campaign_id: this.props.selectedCampaign.campaign_id,
      campaign_start_date: date,
    });
    this.setState({
      start_time: date,
    });
  };
  handleEndDatePicked = (date) => {
    analytics.track(`a_ad_end_date`, {
      campaign_end_date: date,
      source: "ad_detail",
      source_action: "a_ad_end_date",
      campaign_id: this.props.selectedCampaign.campaign_id,
      campaign_end_date: date,
    });
    this.setState({
      end_time: date,
    });
  };
  handleToggle = (status) => {
    this.setState({
      toggle: status !== "PAUSED",
      modalVisible: false,
      toggleText: status,
    });
  };

  updateStatus = () => {
    this.props.updateStatus(
      {
        campaign_id: this.props.selectedCampaign.campaign_id,
        spends: this.props.selectedCampaign.spends,
        status: this.state.toggleText === "PAUSED" ? "ACTIVE" : "PAUSED",
      },
      this.handleToggle
    );
  };

  endCampaign = () => {
    this.props.endCampaign(
      {
        campaign_id: this.props.selectedCampaign.campaign_id,
        spends: this.props.selectedCampaign.spends,
        status: "PAUSED",
      },
      this.handleToggle
    );
  };

  showModal = (visible) => {
    analytics.track(`ad_status_modal`, {
      campaign_status: "rejected",
      visible,
      source: "campaign_detail",
      campaign_channel: "snapchat",
      source_action: "a_update_campaign_status",
    });
    this.setState({ modalVisible: visible });
  };

  checkOptionalTargerts = (interesetNames, deviceMakes, targeting) => {
    return (
      !this.props.loading &&
      (interesetNames.length > 0 ||
        deviceMakes.length > 0 ||
        (targeting.hasOwnProperty("devices") &&
          (targeting.devices[0].hasOwnProperty("os_type") ||
            targeting.devices[0].hasOwnProperty("os_version_max"))) ||
        (targeting.geo_locations.hasOwnProperty("region_id") &&
          targeting.geo_locations.region_id.length > 0))
    );
  };

  durationChange = (start_time, end_time) => {
    this.setState({ start_time, end_time });
    this.props.getInstagraCampaignStats(this.props.selectedCampaign, {
      start_time,
      end_time,
    });
  };

  adCreatives = (item) => {
    return (
      <MediaBox
        key={item.story_id}
        name={item.story_id}
        navigation={this.props.navigation}
        selectedCampaign={this.props.selectedCampaign}
        ad={item.item}
      />
    );
  };

  handleChartToggle = () => {
    this.setState((prevState) => ({
      expand: !prevState.expand,
    }));
    this.scroll.scrollTo({ x: 0, y: 0, animated: true });
    this.toggle();
  };

  toggle = () => {
    Animated.spring(this.state.chartAnimation, {
      toValue: !this.state.expand ? this.state.maxHeight : this.state.minHeight,
    }).start();
  };

  showCSVModal = (isVisible) => {
    analytics.track(`csv_modal`, {
      source: "ad_detail",
      source_action: "a_toggle_csv_modal",
      campaign_channel: "snapchat",
    });
    this.setState({ CSVModalVisible: isVisible });
  };
  campaignEndedOrNot = (campaign) => {
    let endDate = new Date(campaign.end_time);
    endDate.setDate(endDate.getDate() + 2);
    let campaignEndedOrNot =
      campaign.review_status.includes("APPROVED") &&
      new Date(campaign.start_time).setHours(0, 0, 0, 0) <=
        new Date().setHours(0, 0, 0, 0) &&
      new Date(campaign.end_time) >= new Date()
        ? null
        : campaign.campaign_end === "1" ||
          new Date(campaign.end_time) < new Date();
    return campaignEndedOrNot;
  };

  onLayout = (event) => {
    const layout = event.nativeEvent.layout;
    this.setState({
      maxHeight: hp(87) - layout.height,
    });
  };
  onDidFocus = () => {
    const { translate } = this.props.screenProps;
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );

    if (
      (!this.props.loading &&
        !this.props.languagesListLoading &&
        !this.props.selectedCampaign) ||
      this.props.campaignError ||
      this.props.languagesListError
    ) {
      analytics.track(`campaign_detail`, {
        source,
        source_action,
        campaign_channel: "snapchat",
        timestamp: new Date().getTime(),
        device_id: this.props.screenProps.device_id,
        campaign_id: "error",
        error_description:
          (!this.props.loading &&
            !this.props.languagesListLoading &&
            !this.props.selectedCampaign) ||
          this.props.campaignError ||
          this.props.languagesListError,
      });
    }

    if (this.props.selectedCampaign) {
      analytics.track(`campaign_detail`, {
        source,
        source_action,
        campaign_channel: "snapchat",
        timestamp: new Date().getTime(),
        device_id: this.props.screenProps.device_id,
        campaign_id: this.props.selectedCampaign.campaign_id,
      });
    }
  };
  render() {
    let loading = this.props.loading;
    const { translate } = this.props.screenProps;
    if (
      (!loading &&
        !this.props.languagesListLoading &&
        !this.props.selectedCampaign) ||
      this.props.campaignError ||
      this.props.languagesListError
    ) {
      return (
        <>
          <NavigationEvents onDidFocus={this.onDidFocus} />
          <ErrorComponent
            loading={loading}
            navigation={this.props.navigation}
            screenProps={this.props.screenProps}
          />
        </>
      );
    } else {
      let selectedCampaign = null;
      let targeting = null;
      let flexible_spec = null;
      let audienceOverViewData = [];
      let deviceMakes = [];
      let countryName = "";
      let region_names = [];
      let interesetNames = [];
      let langaugeNames = [];
      let start_time = "";
      let end_year = "";
      let start_year = "";
      let end_time = "";
      let media = [];
      if (!loading && this.props.selectedCampaign) {
        selectedCampaign = this.props.selectedCampaign;
        if (
          selectedCampaign.hasOwnProperty("story_creatives") ||
          selectedCampaign.hasOwnProperty("collection_creatives")
        ) {
          let creatives = selectedCampaign.hasOwnProperty("story_creatives")
            ? selectedCampaign.story_creatives
            : selectedCampaign.collection_creatives;

          media = creatives.map((ad, i) => (
            <MediaBox
              key={ad.story_id}
              name={i}
              navigation={this.props.navigation}
              selectedCampaign={selectedCampaign}
              ad={ad}
            />
          ));
        }

        targeting = selectedCampaign.targeting
          ? selectedCampaign.targeting
          : {};
        flexible_spec =
          targeting.hasOwnProperty("flexible_spec") &&
          targeting.flexible_spec[0];
        deviceMakes =
          targeting && targeting.hasOwnProperty("user_device")
            ? targeting.user_device.join(", ")
            : [];

        region_names =
          targeting.geo_locations.hasOwnProperty("regions") &&
          targeting.geo_locations.regions
            .map((reg) => translate(reg.name))
            .join(", ");

        // gender
        let gender = "All";
        if (targeting && targeting.hasOwnProperty("genders")) {
          let genderName = "";
          switch (targeting.genders[0]) {
            case "1":
              genderName = "MALE";
              break;
            case "2":
              genderName = "FEMALE";
              break;
            default:
              genderName = "All";
              break;
          }
          gender = translate(startCase(toLower(genderName)));
        }
        audienceOverViewData.push({
          heading: "Gender",
          icon: <GenderIcon fill={"#FF790A"} width={31} height={31} />,
          content: gender,
        });
        interesetNames =
          flexible_spec && flexible_spec.hasOwnProperty("interests")
            ? flexible_spec.interests.map((interest) => interest.name)
            : [];
        countryName = targeting.geo_locations.countries.map((country) => {
          return countries.find(
            (count) => country.toLowerCase() === count.value
          ).label;
        });
        audienceOverViewData.push({
          heading: "Location",
          icon: <LocationIcon fill={"#FF790A"} width={31} height={31} />,
          content: countryName + ", " + (region_names ? region_names : ""),
        });
        audienceOverViewData.push({
          heading: "Interests",
          icon: <InterestsIcon fill={"#FF790A"} width={31} height={31} />,
          content: interesetNames.length > 0 ? interesetNames : "All",
        });
        audienceOverViewData.push({
          heading: "Devices",
          icon: <DeviceMakeIcon fill={"#FF790A"} width={31} height={31} />,
          content: deviceMakes.length > 0 ? deviceMakes : "All",
        });
        if (selectedCampaign.start_time && selectedCampaign.end_time) {
          end_time = new Date(selectedCampaign.end_time.split("T")[0]);
          start_time = new Date(selectedCampaign.start_time.split("T")[0]);
          end_year = end_time.getFullYear();
          start_year = start_time.getFullYear();
          end_time = dateFormat(end_time, "d mmm");
          start_time = dateFormat(start_time, "d mmm");
        }
      }

      return (
        <SafeAreaView
          style={[{ height: "100%" }]}
          forceInset={{ bottom: "never", top: "always" }}
        >
          <DateFields
            onRef={(ref) => (this.dateField = ref)}
            handleStartDatePicked={this.handleStartDatePicked}
            handleEndDatePicked={this.handleEndDatePicked}
            start_time={this.state.start_time}
            end_time={this.state.end_time}
            durationChange={this.durationChange}
            selectedCampaign={selectedCampaign}
            chartRange={true}
            screenProps={this.props.screenProps}
          />
          <NavigationEvents onDidFocus={this.onDidFocus} />
          <Container style={[styles.container]}>
            <View
              style={[
                styles.gradient,
                {
                  borderBottomStartRadius: 30,
                  borderBottomEndRadius: 30,
                  overflow: "hidden",
                },
              ]}
            >
              <LinearGradient
                colors={["#6200FF", "#8900FF"]}
                locations={[1, 0.3]}
                style={styles.gradient}
              />
            </View>
            <Header
              screenProps={this.props.screenProps}
              campaignEnded={this.props.campaignEnded}
              closeButton={false}
              translateTitle={false}
              title={loading ? "" : selectedCampaign.name}
              icon={"instagram"}
              actionButton={this.state.expand && this.handleChartToggle}
              navigation={
                !this.state.expand ? this.props.navigation : undefined
              }
              selectedCampaign={selectedCampaign}
              containerStyle={{ height: 50 }}
              showTopRightButtonIcon={
                !loading && selectedCampaign.review_status === "APPROVED"
              }
              topRightButtonFunction={() => this.showCSVModal(true)}
              titelStyle={{
                textAlign: "left",
                fontSize: 15,
                paddingTop: 3,
                flex: 1,
              }}
              segment={{
                source: "campaign_detail",
                source_action: "a_go_back",
              }}
              campaignStatus={loading ? null : selectedCampaign.status}
            />
            {loading ? (
              <View style={{ margin: 5 }}>
                <PlaceholderLine />
              </View>
            ) : this.campaignEndedOrNot(selectedCampaign) ? (
              !this.state.expand && (
                <View style={[styles.adStatus]}>
                  <Icon
                    style={[
                      styles.circleIcon,
                      {
                        color: globalColors.orange,
                      },
                    ]}
                    name={"circle"}
                    type={"FontAwesome"}
                  />
                  <Text
                    style={[styles.reviewText, { color: globalColors.orange }]}
                  >
                    {translate("Campaign ended")}
                  </Text>
                </View>
              )
            ) : (
              !this.state.expand && (
                <View style={[styles.adStatus]}>
                  <Icon
                    style={[
                      styles.circleIcon,
                      {
                        color: selectedCampaign.review_status.includes(
                          "REJECTED"
                        )
                          ? globalColors.red
                          : selectedCampaign.status === "LIVE"
                          ? globalColors.green
                          : globalColors.orange,
                      },
                    ]}
                    name={
                      selectedCampaign.review_status.includes("REJECTED")
                        ? "circle-slash"
                        : "circle"
                    }
                    type={
                      selectedCampaign.review_status.includes("REJECTED")
                        ? "Octicons"
                        : "FontAwesome"
                    }
                  />
                  <Text
                    style={[
                      styles.reviewText,
                      {
                        color: selectedCampaign.review_status.includes(
                          "REJECTED"
                        )
                          ? globalColors.red
                          : !selectedCampaign.review_status.includes(
                              "PENDING"
                            ) && selectedCampaign.status === "LIVE"
                          ? globalColors.green
                          : globalColors.orange,
                      },
                    ]}
                  >
                    {translate(
                      `${
                        selectedCampaign.review_status.includes("PENDING")
                          ? "In Review"
                          : selectedCampaign.review_status.includes("REJECTED")
                          ? "Ad Rejected"
                          : selectedCampaign.status === "LIVE"
                          ? "LIVE"
                          : "Campaign Paused"
                      }`
                    )}
                  </Text>
                </View>
              )
            )}
            <ScrollView
              contentContainerStyle={{ height: hp(115) }}
              scrollEnabled={!this.state.expand}
              ref={(ref) => (this.scroll = ref)}
              style={{ maxHeight: "100%" }}
            >
              <View style={[styles.mainCard]}>
                {!loading &&
                  ((selectedCampaign &&
                    selectedCampaign.review_status !== "REJECTED") ||
                  new Date(selectedCampaign.end_time) < new Date() ? (
                    <TouchableOpacity
                      onLayout={this.onLayout}
                      disabled={this.state.expand}
                      onPress={this.handleChartToggle}
                    >
                      {this.state.expand && (
                        <ChartDateChoices
                          selectedCampaign={selectedCampaign}
                          dateField={this.dateField}
                          durationChange={this.durationChange}
                          screenProps={this.props.screenProps}
                        />
                      )}
                      <CampaignCircleChart
                        channel={"instagram"}
                        campaign={selectedCampaign}
                        detail={true}
                        screenProps={this.props.screenProps}
                        loading={loading}
                        handleChartToggle={this.handleChartToggle}
                        chartExpanded={this.state.expand}
                      />
                    </TouchableOpacity>
                  ) : (
                    <RejectedSnapchatInfo
                      loading={loading}
                      screenProps={this.props.screenProps}
                      review_status_reason={
                        selectedCampaign.review_status_reason || []
                      }
                      navigation={this.props.navigation}
                      selectedCampaign={selectedCampaign}
                    />
                  ))}

                {!this.state.expand && (
                  <View style={styles.campaignMediaAndInfo}>
                    <CampaignMedia
                      selectedCampaign={selectedCampaign}
                      navigation={this.props.navigation}
                      loading={loading}
                      screenProps={this.props.screenProps}
                      campaignDetails={true}
                      source={"campaign_detail"}
                    />
                    <AudienceOverview
                      screenProps={this.props.screenProps}
                      data={audienceOverViewData}
                      editCampaign={true}
                      // targeting={targeting}
                      loading={loading}
                      navigatingRoutePath={"InstagramFeedAdTargetting"}
                      selectedCampaign={selectedCampaign}
                    />
                  </View>
                )}
                {loading ? (
                  <View style={{ margin: 5 }}>
                    <PlaceholderLine />
                  </View>
                ) : (
                  <View style={{}}>
                    {!this.state.expand && (
                      <View>
                        {selectedCampaign.review_status === "APPROVED" &&
                          (selectedCampaign.campaign_end === "0" &&
                          !this.props.campaignEnded &&
                          new Date(selectedCampaign.end_time) > new Date() ? (
                            selectedCampaign.review_status === "APPROVED" &&
                            new Date(selectedCampaign.start_time) >
                              new Date() ? (
                              <View style={[styles.campaignStatus]}>
                                <Text style={styles.reviewtext}>
                                  {translate("Scheduled for")} {start_time}
                                </Text>
                              </View>
                            ) : (
                              !this.props.campaignEnded && (
                                <View padder style={styles.toggleSpace}>
                                  <View style={{ alignSelf: "center" }}>
                                    {selectedCampaign && (
                                      <Toggle
                                        buttonTextStyle={
                                          styles.switchButtonText
                                        }
                                        buttonText={
                                          this.state.toggleText !== "PAUSED"
                                            ? "LIVE"
                                            : "PAUSED"
                                        }
                                        containerStyle={styles.toggleStyle}
                                        switchOn={this.state.toggle}
                                        onPress={() => {
                                          this.state.toggle
                                            ? this.setState({
                                                modalVisible: true,
                                              })
                                            : this.updateStatus();
                                        }}
                                        backgroundColorOff="rgba(255,255,255,0.1)"
                                        backgroundColorOn="rgba(255,255,255,0.1)"
                                        circleColorOff="#FF9D00"
                                        circleColorOn="#66D072"
                                        duration={500}
                                        circleStyle={styles.switchCircle}
                                      />
                                    )}
                                    <Text style={styles.statusText}>
                                      {translate(
                                        `${
                                          this.state.toggle
                                            ? "Tap to pause AD"
                                            : "Tap to activate AD"
                                        }`
                                      )}
                                    </Text>
                                  </View>
                                </View>
                              )
                            )
                          ) : null)}
                      </View>
                    )}
                  </View>
                )}
              </View>
            </ScrollView>
          </Container>
          {!loading && (
            <StatusModal
              screenProps={this.props.screenProps}
              selectedCampaign={selectedCampaign}
              updateStatus={this.updateStatus}
              endCampaign={this.endCampaign}
              modalVisible={this.state.modalVisible}
              showModal={this.showModal}
            />
          )}
          <Animated.View
            style={[
              { backgroundColor: "#000", overflow: "hidden" },
              { height: this.state.chartAnimation },
            ]}
          >
            {this.state.expand &&
              selectedCampaign &&
              selectedCampaign.review_status !== "REJECTED" && (
                <SlideUpPanel
                  screenProps={this.props.screenProps}
                  start_time={this.state.start_time}
                  end_time={this.state.end_time}
                  dateField={this.dateField}
                  selectedCampaign={selectedCampaign}
                  hideCharts={this.hideCharts}
                  getInstagraCampaignStats={this.props.getInstagraCampaignStats}
                  chartAnimation={this.state.chartAnimation}
                />
              )}
          </Animated.View>
          <CSVModal
            isVisible={this.state.CSVModalVisible}
            showCSVModal={this.showCSVModal}
            screenProps={this.props.screenProps}
            downloadCSV={this.props.downloadCSV}
            campaign_id={selectedCampaign && selectedCampaign.campaign_id}
          />
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  selectedCampaign: state.dashboard.selectedCampaign,
  campaignEnded: state.campaignC.campaignEnded,
  loading: state.dashboard.loadingCampaignDetails,
  loadingCampaignStats: state.dashboard.loadingCampaignStats,
  campaignError: state.dashboard.campaignError,
  languages: state.campaignC.languagesList,
  mainBusiness: state.account.mainBusiness,
  languagesListLoading: state.campaignC.languagesListLoading,
  languagesListError: state.campaignC.languagesListError,
});
const mapDispatchToProps = (dispatch) => ({
  updateStatus: (info, handleToggle) =>
    dispatch(actionCreators.updateStatus(info, handleToggle)),
  endCampaign: (info, handleToggle) =>
    dispatch(actionCreators.endCampaign(info, handleToggle)),
  getInstagraCampaignStats: (info, range) =>
    dispatch(actionCreators.getInstagraCampaignStats(info, range)),
  get_languages: () => dispatch(actionCreators.get_languages()),
  downloadCSV: (campaign_id, email, showModalMessage) =>
    dispatch(actionCreators.downloadCSV(campaign_id, email, showModalMessage)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InstagramCampaignDetails);
