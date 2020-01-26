import React, { Component } from "react";
import { View, Animated, BackHandler, TouchableOpacity } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Text, Container, Icon } from "native-base";
import DateFields from "../../MiniComponents/DatePicker/DateFields";
import Header from "../../MiniComponents/Header";
import { SafeAreaView, NavigationEvents, ScrollView } from "react-navigation";
import * as Segment from "expo-analytics-segment";
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

class CampaignDetails extends Component {
  static navigationOptions = {
    header: null
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
      CSVModalVisible: false
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
        toggle: this.props.selectedCampaign.status !== "PAUSED"
      });
    }
  }
  // need to ask
  shouldComponentUpdate(nextProps, nextState) {
    return (
      this.props.selectedCampaign.campaign_id !==
        nextProps.selectedCampaign.campaign_id ||
      this.props.selectedCampaign.eCPSU !== nextProps.selectedCampaign.eCPSU ||
      this.props.loading !== nextProps.loading ||
      this.props.languagesListLoading !== nextProps.languagesListLoading ||
      JSON.stringify(this.state) !== JSON.stringify(nextState)
    );
  }

  handleStartDatePicked = date => {
    this.setState({
      start_time: date
    });
  };
  handleEndDatePicked = date => {
    this.setState({
      end_time: date
    });
  };
  handleToggle = status => {
    this.setState({
      toggle: status !== "PAUSED",
      modalVisible: false,
      toggleText: status
    });
  };

  updateStatus = () => {
    this.props.updateStatus(
      {
        campaign_id: this.props.selectedCampaign.campaign_id,
        spends: this.props.selectedCampaign.spends,
        status: this.state.toggleText === "PAUSED" ? "ACTIVE" : "PAUSED"
      },
      this.handleToggle
    );
  };

  endCampaign = () => {
    this.props.endCampaign(
      {
        campaign_id: this.props.selectedCampaign.campaign_id,
        spends: this.props.selectedCampaign.spends,
        status: "PAUSED"
      },
      this.handleToggle
    );
  };

  showModal = visible => {
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
        (targeting.geos[0].hasOwnProperty("region_id") &&
          targeting.geos[0].region_id.length > 0))
    );
  };

  durationChange = (start_time, end_time) => {
    this.setState({ start_time, end_time });
    this.props.getCampaignStats(this.props.selectedCampaign, {
      start_time,
      end_time
    });
  };

  adCreatives = item => {
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
    this.setState(prevState => ({
      expand: !prevState.expand
    }));
    this.toggle();
  };

  toggle = () => {
    Animated.spring(this.state.chartAnimation, {
      toValue: !this.state.expand ? this.state.maxHeight : this.state.minHeight
    }).start();
  };

  showCSVModal = isVisible => {
    this.setState({ CSVModalVisible: isVisible });
  };
  campaignEndedOrNot = (campaign, endDate) => {
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
        <ErrorComponent
          loading={loading}
          navigation={this.props.navigation}
          screenProps={this.props.screenProps}
        />
      );
    } else {
      let selectedCampaign = null;
      let targeting = null;
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

        deviceMakes =
          targeting &&
          targeting.hasOwnProperty("devices") &&
          targeting.devices[0].hasOwnProperty("marketing_name")
            ? targeting.devices[0].marketing_name.join(", \n")
            : [];

        region_names =
          targeting.geos[0].hasOwnProperty("region_id") &&
          targeting.geos[0].region_id
            .map(id =>
              translate(
                regionsCountries
                  .find(
                    country =>
                      country.country_code === targeting.geos[0].country_code
                  )
                  .regions.find(reg => reg.id === id).name
              )
            )
            .join(", ");

        // gender
        const gender =
          targeting &&
          (targeting.demographics[0].gender === "" ||
            !targeting.demographics[0].hasOwnProperty("gender"))
            ? translate("All")
            : targeting &&
              translate(startCase(toLower(targeting.demographics[0].gender)));
        audienceOverViewData.push({
          heading: "Gender",
          icon: <GenderIcon fill={"#FF790A"} width={31} height={31} />,
          content: gender
        });
        const ageMin = targeting && targeting.demographics[0].min_age;
        const ageMax = targeting && targeting.demographics[0].max_age;
        // age range
        audienceOverViewData.push({
          heading: "Age range",
          icon: (
            <Icon
              style={styles.icon}
              type="MaterialCommunityIcons"
              name="human-male-girl"
            />
          ),
          content: ageMin + " - " + ageMax
        });
        interesetNames =
          targeting && targeting.hasOwnProperty("interests")
            ? targeting.interests[0].category_id.map(interest => {
                if (targeting.interests[0].category_id.hasOwnProperty("scls")) {
                  return ` ${
                    interestNames.interests.scls.find(
                      interestObj => interestObj.id === interest
                    ).name
                  }`;
                } else {
                  return (
                    interest !== "scls" &&
                    interestNames.interests.scls.find(
                      interestObj => interestObj.id === interest
                    ) &&
                    `${
                      interestNames.interests.scls.find(
                        interestObj => interestObj.id === interest
                      ).name
                    }`
                  );
                }
              })
            : [];

        langaugeNames =
          !this.props.languagesListLoading &&
          this.props.languages.length > 0 &&
          targeting &&
          targeting.demographics[0] &&
          targeting.demographics[0].languages.map(languageId => {
            return translate(
              this.props.languages.find(lang => lang.id === languageId).name
            );
          });
        audienceOverViewData.push({
          heading: "Language",
          icon: <Icon style={styles.icon} type="FontAwesome" name="language" />,
          content:
            langaugeNames && langaugeNames.length > 0
              ? langaugeNames.join(", ")
              : ""
        });
        countryName =
          targeting &&
          targeting.geos[0].country_code &&
          translate(
            countries.find(
              country => country.value === targeting.geos[0].country_code
            ).label
          );
        audienceOverViewData.push({
          heading: "Location",
          icon: <LocationIcon fill={"#FF790A"} width={31} height={31} />,
          content: countryName + ": " + (region_names ? region_names : "")
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
        <>
          <DateFields
            onRef={ref => (this.dateField = ref)}
            handleStartDatePicked={this.handleStartDatePicked}
            handleEndDatePicked={this.handleEndDatePicked}
            start_time={this.state.start_time}
            end_time={this.state.end_time}
            durationChange={this.durationChange}
            selectedCampaign={selectedCampaign}
            chartRange={true}
            screenProps={this.props.screenProps}
          />
          <SafeAreaView
            style={[{ height: "100%" }]}
            forceInset={{ bottom: "never", top: "always" }}
          >
            <NavigationEvents
              onDidFocus={() => {
                if (this.props.selectedCampaign) {
                  Segment.screenWithProperties("Campaign Details", {
                    campaign_id: this.props.selectedCampaign.campaign_id
                  });
                }
              }}
            />
            <Container style={[styles.container]}>
              <View
                style={[
                  styles.gradient,
                  {
                    borderBottomStartRadius: 30,
                    borderBottomEndRadius: 30,
                    overflow: "hidden"
                  }
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
                icon={"snapchat"}
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
                  alignSelf: "center",
                  justifyContent: "center",
                  flex: 1,
                  alignItems: "center"
                }}
                campaignStatus={loading ? null : selectedCampaign.status}
              />
              {loading ? (
                <View style={{ margin: 5 }}>
                  <PlaceholderLine />
                </View>
              ) : this.campaignEndedOrNot(
                  selectedCampaign,
                  new Date(selectedCampaign.end_time)
                ) ? (
                <View style={[styles.adStatus]}>
                  <Icon
                    style={[
                      styles.circleIcon,
                      {
                        color: globalColors.orange
                      }
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
              ) : (
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
                          : globalColors.orange
                      }
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
                          : globalColors.orange
                      }
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
              )}
              <ScrollView
                contentContainerStyle={{ height: "100%" }}
                scrollEnabled={!this.state.expand}
                style={{ maxHeight: "100%" }}
              >
                <View style={[styles.mainCard]}>
                  {!loading &&
                    ((selectedCampaign &&
                      selectedCampaign.review_status !== "REJECTED" &&
                      selectedCampaign.campaign_end === "0") ||
                    new Date(selectedCampaign.end_time) < new Date() ? (
                      <TouchableOpacity
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
                          channel={"snapchat"}
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
                          selectedCampaign.review_status_reason
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
                      />
                      <AudienceOverview
                        screenProps={this.props.screenProps}
                        data={audienceOverViewData}
                        editCampaign={true}
                        // targeting={targeting}
                        loading={loading}
                        navigatingRoutePath={"AdDetails"}
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
                                                modalVisible: true
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
                { height: this.state.chartAnimation }
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
                    getCampaignStats={this.props.getCampaignStats}
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
        </>
      );
    }
  }
}

const mapStateToProps = state => ({
  selectedCampaign: state.dashboard.selectedCampaign,
  campaignEnded: state.campaignC.campaignEnded,
  loading: state.dashboard.loadingCampaignDetails,
  loadingCampaignStats: state.dashboard.loadingCampaignStats,
  campaignError: state.dashboard.campaignError,
  languages: state.campaignC.languagesList,
  mainBusiness: state.account.mainBusiness,
  languagesListLoading: state.campaignC.languagesListLoading,
  languagesListError: state.campaignC.languagesListError
});
const mapDispatchToProps = dispatch => ({
  updateStatus: (info, handleToggle) =>
    dispatch(actionCreators.updateStatus(info, handleToggle)),
  endCampaign: (info, handleToggle) =>
    dispatch(actionCreators.endCampaign(info, handleToggle)),
  getCampaignStats: (info, range) =>
    dispatch(actionCreators.getCampaignStats(info, range)),
  get_languages: () => dispatch(actionCreators.get_languages()),
  downloadCSV: (campaign_id, email, showModalMessage) =>
    dispatch(actionCreators.downloadCSV(campaign_id, email, showModalMessage))
});
export default connect(mapStateToProps, mapDispatchToProps)(CampaignDetails);
