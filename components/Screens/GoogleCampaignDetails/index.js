import React, { Component } from "react";
import {
  View,
  Image as RNImage,
  Animated,
  ScrollView,
  BackHandler,
  TouchableOpacity
} from "react-native";
import { Card, Text, Container, Icon, Content, Button } from "native-base";
import Loading from "../../MiniComponents/LoadingScreen";
import Header from "../../MiniComponents/Header";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";
import ErrorComponent from "../../MiniComponents/ErrorComponent";
import CampaignCircleChart from "../../MiniComponents/GoogleCampaignCircleCharts";
import LowerButton from "../../MiniComponents/LowerButton";
import DateFields from "../../MiniComponents/DatePicker/DateFields";
import ChartDateChoices from "./ChartDateChoices";

import Keywords from "./Keywords";
import RejectedInfo from "./RejectedInfo";
import NavigationService from "../../../NavigationService";
import SlideUpPanel from "./SlideUpPanel";
import StatusModal from "./StatusModal";

import GoogleSEAPreview from "../../MiniComponents/GoogleSEAPreview";
import CustomButtons from "../../MiniComponents/CustomButtons";
//Icons
import LocationIcon from "../../../assets/SVGs/Location";
import GenderIcon from "../../../assets/SVGs/Gender";
import ADIcon from "../../../assets/SVGs/ADIcon.svg";
import GoogleSE from "../../../assets/SVGs/GoogleAds.svg";
import Toggle from "../../MiniComponents/Toggle";

// Style
import styles from "./styles";
import GlobalStyles, { globalColors } from "../../../GlobalStyles";

//Functions
import formatNumber from "../../formatNumber";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP
} from "react-native-responsive-screen";
import dateFormat from "dateformat";

//Data
import CountriesList from "../../Data/countries.googleSE.data";
import ageData from "../../Data/ageRange.googleSE.data";
import genderData from "../../Data/gender.googleSE.data";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import segmentEventTrack from "../../segmentEventTrack";
import AudienceOverview from "../../MiniComponents/AudienceOverview";
import { LinearGradient } from "expo-linear-gradient";
import CSVModal from "../CampaignDetails/CSVModal";
import { Transition } from "react-navigation-fluid-transitions";

class GoogleCampaignDetails extends Component {
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
      expand: false,
      minHeight: 0,
      maxHeight: hp(50),
      CSVModalVisible: false
    };
  }

  componentDidMount() {
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
      this.props.selectedCampaign &&
      !this.props.loading
    ) {
      this.setState({
        toggleText: this.props.selectedCampaign.campaign.status,
        toggle: this.props.selectedCampaign.campaign.status !== "PAUSED"
      });
    }
  }

  handleStartDatePicked = date => {
    segmentEventTrack("Selected Campaign Start Date", {
      campaign_start_date: date
    });
    this.setState({
      start_time: date
    });
  };

  handleEndDatePicked = date => {
    segmentEventTrack("Selected Campaign Start Date", {
      campaign_start_date: date
    });
    this.setState({
      end_time: date
    });
  };

  showModal = visible => {
    this.setState({ modalVisible: visible });
  };

  durationChange = (start_time, end_time) => {
    this.setState({ start_time, end_time });
    this.props.get_google_campiagn_details(
      this.props.selectedCampaign.campaign.id,
      start_time,
      end_time,
      true
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

  handleModalToggle = status => {
    this.setState({
      toggle: status !== "PAUSED",
      modalVisible: false,
      toggleText: status
    });
  };

  updateStatus = (endCampaign = false) => {
    this.props.enable_end_or_pause_google_campaign(
      this.props.selectedCampaign.campaign.id,
      this.state.toggleText === "PAUSED",
      endCampaign,
      this.handleModalToggle
    );
  };
  showCSVModal = isVisible => {
    this.setState({ CSVModalVisible: isVisible });
  };
  onLayout = event => {
    const layout = event.nativeEvent.layout;
    this.setState({
      maxHeight: hp(87) - layout.height
    });
  };
  render() {
    let loading = this.props.loading;
    const { translate } = this.props.screenProps;
    const campiagnDetails = this.props.navigation.getParam("campaign", {});
    const audienceOverviewData = [];

    if (this.props.campaignError) {
      return (
        <ErrorComponent
          loading={loading}
          navigation={this.props.navigation}
          screenProps={this.props.screenProps}
        />
      );
    } else {
      let selectedCampaign = null;
      let start_time = "";
      let end_time = "";
      if (!loading && this.props.selectedCampaign) {
        selectedCampaign = {
          ...this.props.selectedCampaign
        };
        if (
          selectedCampaign.campaign.start_time &&
          selectedCampaign.campaign.end_time
        ) {
          end_time = new Date(selectedCampaign.campaign.end_time);
          start_time = new Date(selectedCampaign.campaign.start_time);
          end_year = end_time.getFullYear();
          start_year = start_time.getFullYear();
          end_time = dateFormat(end_time, "d mmm");
          start_time = dateFormat(start_time, "d mmm");
        }
        // mapping data for AUDIENCE OVERVIEW
        if (selectedCampaign.campaign) {
          // age
          let ageArray = ageData.filter(age =>
            selectedCampaign.campaign.age.find(sca => sca === age.value)
          );
          ageArray = ageArray.map(age => translate(age.label));
          audienceOverviewData.push({
            heading: "Age range",
            icon: (
              <Icon
                style={styles.icon}
                type="MaterialCommunityIcons"
                name="human-male-girl"
              />
            ),
            content: ageArray.join(", ")
          });

          //language

          audienceOverviewData.push({
            heading: "Language",
            icon: (
              <Icon style={styles.icon} type="FontAwesome" name="language" />
            ),
            content:
              selectedCampaign.campaign.language === "1019"
                ? translate("Arabic")
                : translate("English")
          });

          //gender
          let gender =
            selectedCampaign.campaign.gender === "Undetermined"
              ? "All"
              : selectedCampaign.campaign.gender;

          audienceOverviewData.push({
            heading: "Gender",
            icon: <GenderIcon width={31} height={31} fill={"#FF790A"} />,
            content: translate(gender)
          });

          let countryName = selectedCampaign.campaign.location.map(
            loc => loc.country
          );
          countryName = countryName.filter((v, i, a) => a.indexOf(v) === i);

          let regionNames = selectedCampaign.campaign.location.map(
            loc => loc.name && translate(loc.name)
          );

          const location =
            translate(countryName[0]) + ": " + regionNames.join(", ");

          audienceOverviewData.push({
            heading: "Location",
            icon: <LocationIcon width={31} height={31} fill={"#FF790A"} />,
            content: location
          });
        }
        console.log(selectedCampaign);
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
            selectedCampaign={campiagnDetails}
            chartRange={true}
            screenProps={this.props.screenProps}
          />
          <SafeAreaView
            style={{ flex: 1 }}
            forceInset={{ bottom: "never", top: "always" }}
          >
            <NavigationEvents
              onDidFocus={() => {
                Segment.screenWithProperties("Google Campaign Details", {
                  category: "Campaign Details",
                  channel: "google"
                });
              }}
            />
            <Container style={styles.container}>
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
                closeButton={false}
                translateTitle={false}
                title={loading ? "" : selectedCampaign.campaign.name}
                icon={"google"}
                navigation={
                  !this.state.expand ? this.props.navigation : undefined
                }
                actionButton={this.state.expand && this.handleChartToggle}
                selectedCampaign={selectedCampaign}
                showTopRightButtonIcon={
                  !loading &&
                  selectedCampaign.campaign.review_status === "APPROVED"
                }
                topRightButtonFunction={() => this.showCSVModal(true)}
                containerStyle={{ height: 50 }}
                titelStyle={{
                  textAlign: "left",
                  fontSize: 15,
                  paddingTop: 3,
                  alignSelf: "center",
                  justifyContent: "center",
                  flex: 1,
                  alignItems: "center"
                }}
              />

              {loading ? (
                <View style={{ margin: 5 }}>
                  <PlaceholderLine />
                </View>
              ) : this.state.expand ? null : selectedCampaign.campaign
                  .status === "REMOVED" ? (
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
                        color: selectedCampaign.campaign.review_status.includes(
                          "REJECTED"
                        )
                          ? globalColors.red
                          : selectedCampaign.campaign.status === "ENABLED"
                          ? globalColors.green
                          : globalColors.orange
                      }
                    ]}
                    name={
                      selectedCampaign.campaign.review_status.includes(
                        "REJECTED"
                      )
                        ? "circle-slash"
                        : "circle"
                    }
                    type={
                      selectedCampaign.campaign.review_status.includes(
                        "REJECTED"
                      )
                        ? "Octicons"
                        : "FontAwesome"
                    }
                  />
                  <Text
                    style={[
                      styles.reviewText,
                      {
                        color: selectedCampaign.campaign.review_status.includes(
                          "REJECTED"
                        )
                          ? globalColors.red
                          : !selectedCampaign.campaign.review_status.includes(
                              "PENDING"
                            ) && selectedCampaign.campaign.status === "ENABLED"
                          ? globalColors.green
                          : globalColors.orange
                      }
                    ]}
                  >
                    {translate(
                      `${
                        selectedCampaign.campaign.review_status.includes(
                          "PENDING"
                        )
                          ? "In Review"
                          : selectedCampaign.campaign.review_status.includes(
                              "REJECTED"
                            )
                          ? "Ad Rejected"
                          : selectedCampaign.campaign.status === "ENABLED"
                          ? "LIVE"
                          : "Campaign Paused"
                      }`
                    )}
                  </Text>
                </View>
              )}
              <ScrollView
                scrollEnabled={!this.state.expand}
                contentContainerStyle={[
                  styles.mainCard
                  // { height: heightPercentageToDP(100) }
                ]}
                style={{
                  maxHeight: "100%",
                  height: "100%",
                  overflow: "hidden",
                  borderBottomStartRadius: 30,
                  borderBottomEndRadius: 30
                }}
              >
                {this.state.expand && (
                  <ChartDateChoices
                    selectedCampaign={selectedCampaign.campaign}
                    dateField={this.dateField}
                    durationChange={this.durationChange}
                    screenProps={this.props.screenProps}
                  />
                )}

                {loading ? (
                  <View style={{ margin: 5 }}>
                    <PlaceholderLine />
                  </View>
                ) : selectedCampaign.campaign.review_status !== "REJECTED" ? (
                  selectedCampaign.campaign.review_status !== "PENDING" ? (
                    <TouchableOpacity
                      disabled={this.state.expand}
                      onLayout={this.layout}
                      onPress={this.handleChartToggle}
                    >
                      <CampaignCircleChart
                        selectedCampaign={selectedCampaign}
                        detail={true}
                        screenProps={this.props.screenProps}
                        loading={loading}
                        channel={"google"}
                        handleChartToggle={this.handleChartToggle}
                        chartExpanded={this.state.expand}
                      />
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )
                ) : (
                  <RejectedInfo
                    loading={loading}
                    screenProps={this.props.screenProps}
                    review_status_reason={selectedCampaign.review_status_reason}
                    review_status_help={selectedCampaign.review_status_help}
                    navigation={this.props.navigation}
                    campaign_id={selectedCampaign.campaign.id}
                    ad={selectedCampaign.ad}
                    error_type={selectedCampaign.error_type}
                    errors={selectedCampaign.errors}
                  />
                )}
                {loading ? (
                  <View style={{ margin: 5 }}>
                    <PlaceholderLine />
                  </View>
                ) : (
                  !this.state.expand && (
                    <View style={{ padding: 5, marginVertical: 10 }}>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          paddingHorizontal: 20
                        }}
                      >
                        <Text uppercase style={styles.subHeadings}>
                          {translate("Ad Details")}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          this.props.navigation.push("GoogleSEAPreviewScreen", {
                            campaign: selectedCampaign.ad,
                            language: selectedCampaign.campaign.language
                          })
                        }
                      >
                        <Transition shared="preview">
                          <GoogleSEAPreview
                            screenProps={this.props.screenProps}
                            headline1={selectedCampaign.ad.headline1}
                            headline2={selectedCampaign.ad.headline2}
                            headline3={selectedCampaign.ad.headline3}
                            finalurl={selectedCampaign.ad.finalurl}
                            path1={selectedCampaign.ad.path1}
                            path2={selectedCampaign.ad.path2}
                            description={selectedCampaign.ad.description}
                            description2={selectedCampaign.ad.description2}
                            language={selectedCampaign.campaign.language}
                          />
                        </Transition>
                      </TouchableOpacity>
                    </View>
                  )
                )}
                {/* <View> */}
                {!this.state.expand && (
                  <View style={styles.campaignMediaAndInfo}>
                    <Keywords
                      loading={loading}
                      navigation={this.props.navigation}
                      screenProps={this.props.screenProps}
                      keywords={!loading ? selectedCampaign.keywords : []}
                    />
                    <AudienceOverview
                      selectedCampaign={selectedCampaign}
                      data={audienceOverviewData}
                      screenProps={this.props.screenProps}
                      loading={loading}
                      navigatingRoutePath={"GoogleAudience"}
                      editCampaign={
                        selectedCampaign &&
                        selectedCampaign.campaign &&
                        selectedCampaign.campaign.status !== "REMOVED"
                      } // can be edited only if campaign is not ended (status: REMOVED)
                    />
                  </View>
                )}
                {loading ? (
                  <View style={{ margin: 5 }}>
                    <PlaceholderLine />
                  </View>
                ) : (
                  !this.state.expand && (
                    <View>
                      {selectedCampaign.campaign.review_status === "APPROVED" &&
                        (selectedCampaign.campaign.status !== "REMOVED" &&
                        new Date(selectedCampaign.campaign.end_time) >
                          new Date() ? (
                          selectedCampaign.campaign.review_status ===
                            "APPROVED" &&
                          new Date(selectedCampaign.campaign.start_time) >
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
                                    buttonTextStyle={styles.switchButtonText}
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
                  )
                )}
              </ScrollView>
            </Container>
            {!loading &&
              selectedCampaign.campaign.review_status !== "REJECTED" && (
                <StatusModal
                  screenProps={this.props.screenProps}
                  selectedCampaign={selectedCampaign}
                  updateStatus={this.updateStatus}
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
                selectedCampaign.campaign.review_status !== "REJECTED" && (
                  <SlideUpPanel
                    screenProps={this.props.screenProps}
                    start_time={this.state.start_time}
                    end_time={this.state.end_time}
                    dateField={this.dateField}
                    selectedCampaign={selectedCampaign}
                    campaignStats={this.props.googleCampaignStats}
                    hideCharts={this.hideCharts}
                    getCampaignStats={this.props.get_google_campiagn_details}
                    chartAnimation={this.state.chartAnimation}
                  />
                )}
            </Animated.View>
            <CSVModal
              google={true}
              isVisible={this.state.CSVModalVisible}
              showCSVModal={this.showCSVModal}
              screenProps={this.props.screenProps}
              downloadGoogleCSV={this.props.downloadGoogleCSV}
              campaign_id={selectedCampaign && selectedCampaign.campaign.id}
            />
          </SafeAreaView>
        </>
      );
    }
  }
}

const mapStateToProps = state => ({
  selectedCampaign: state.dashboard.selectedCampaign,
  googleCampaignStats: state.dashboard.googleCampaignStats,
  loadingCampaignStats: state.dashboard.loadingCampaignStats,
  loading: state.dashboard.loadingCampaignDetails,
  campaignStatusLoading: state.googleAds.campaignStatusLoading,
  campaignError: state.dashboard.campaignError
});
const mapDispatchToProps = dispatch => ({
  get_google_campiagn_details: (id, start_time, end_time, getStats) =>
    dispatch(
      actionCreators.get_google_campiagn_details(
        id,
        start_time,
        end_time,
        getStats
      )
    ),
  enable_end_or_pause_google_campaign: (
    campaign_id,
    enableOrpause,
    endCampaign,
    handleToggle
  ) =>
    dispatch(
      actionCreators.enable_end_or_pause_google_campaign(
        campaign_id,
        enableOrpause,
        endCampaign,
        handleToggle
      )
    ),
  downloadGoogleCSV: (campaign_id, email, showModalMessage) =>
    dispatch(
      actionCreators.downloadGoogleCSV(campaign_id, email, showModalMessage)
    )
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleCampaignDetails);
