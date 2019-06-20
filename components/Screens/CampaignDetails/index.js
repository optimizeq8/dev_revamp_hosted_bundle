import React, { Component } from "react";
import {
  View,
  Image,
  ImageBackground,
  Animated,
  BackHandler
} from "react-native";
import { Card, Text, Container, Icon } from "native-base";
import Loading from "../../MiniComponents/LoadingScreen";
import DateField from "../../MiniComponents/DatePicker/DateFields";
import Header from "../../MiniComponents/Header";
import { SafeAreaView } from "react-navigation";
import { Video, LinearGradient, BlurView, Segment } from "expo";
import Toggle from "react-native-switch-toggle";
import SlideUpPanel from "./SlideUpPanel";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";
import StatusModal from "./StatusModal";
import OptionalTargets from "./OptionalTargets";

//Icons
import LocationIcon from "../../../assets/SVGs/Location.svg";
import GenderIcon from "../../../assets/SVGs/Gender.svg";
import ErrorComponent from "../../MiniComponents/ErrorComponent";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";
//Functions
import formatNumber from "../../formatNumber";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import dateFormat from "dateformat";

//Data
import { country_regions as regionsCountries } from "../../Screens/CampaignCreate/AdDetails/data";
import { interestNames } from "./interesetNames";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

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
      chartAnimation: new Animated.Value(1),
      LineAnimation: new Animated.Value(0),
      imageIsLoading: true
    };
  }

  componentDidMount() {
    if (this.props.selectedCampaign) {
      Segment.screenWithProperties("Campaign Details Screen", {
        campaign_id: this.props.selectedCampaign.campaign_id
      });
    }
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
      Segment.screenWithProperties("Campaign Details Screen", {
        campaign_id: this.props.selectedCampaign.campaign_id
      });
      this.setState({
        toggleText: this.props.selectedCampaign.status,
        toggle: this.props.selectedCampaign.status !== "PAUSED"
      });
    }
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

  render() {
    let loading = this.props.loading;
    // if (this.props.loading) {
    //   return (
    //     <>
    //       <LinearGradient
    //         colors={[colors.background1, colors.background2]}
    //         locations={[0.7, 1]}
    //         style={styles.gradient}
    //       />
    //       <Loading dash={true} />
    //     </>
    //   );
    // } else
    if (
      !loading &&
      !this.props.selectedCampaign
      // (isNull(this.props.selectedCampaign) ||
      //   isUndefined(this.props.selectedCampaign) ||
      //   isEmpty(this.props.selectedCampaign))
    ) {
      return (
        <ErrorComponent loading={loading} navigation={this.props.navigation} />
      );
    } else {
      let selectedCampaign = null;
      let targeting = null;
      let deviceMakes = [];
      let region_names = [];
      let interesetNames = [];
      let start_time = "";
      let end_year = "";
      let start_year = "";
      let end_time = "";
      if (!loading) {
        selectedCampaign = this.props.selectedCampaign;
        targeting = selectedCampaign.targeting;
        deviceMakes =
          targeting &&
          targeting.hasOwnProperty("devices") &&
          targeting.devices[0].hasOwnProperty("marketing_name")
            ? targeting.devices[0].marketing_name.join(", \n")
            : [];

        region_names =
          targeting.geos[0].hasOwnProperty("region_id") &&
          targeting.geos[0].region_id
            .map(
              id =>
                regionsCountries
                  .find(
                    country =>
                      country.country_code === targeting.geos[0].country_code
                  )
                  .regions.find(reg => reg.id === id).name
            )
            .join(",\n");

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
                    ` ${
                      interestNames.interests.scls.find(
                        interestObj => interestObj.id === interest
                      ).name
                    }`
                  );
                }
              })
            : [];

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
          <DateField
            onRef={ref => (this.dateField = ref)}
            handleStartDatePicked={this.handleStartDatePicked}
            handleEndDatePicked={this.handleEndDatePicked}
            start_time={this.state.start_time}
            end_time={this.state.end_time}
            durationChange={this.durationChange}
            selectedCampaign={selectedCampaign}
            chartRange={true}
          />
          {this.state.imageIsLoading && (
            <View
              style={[
                globalStyles.orangeBackgroundColor,
                { flex: 1, width: "100%" },
                globalStyles.redBorderColor
              ]}
            >
              <Loading dash={true} />
            </View>
          )}
          {!loading &&
            (!selectedCampaign.media.includes(".jpg") ||
              !selectedCampaign.media.includes(".png")) && (
              <View style={[styles.backgroundViewWrapper]}>
                <Video
                  onLoadEnd={() => this.setState({ imageIsLoading: false })}
                  source={{
                    uri: !loading
                      ? "http://" + selectedCampaign.media
                      : "../../../assets/images/emptyPlaceHolder.png"
                  }}
                  isMuted
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%"
                  }}
                />
              </View>
            )}

          <ImageBackground
            source={
              !loading
                ? { uri: "http://" + selectedCampaign.media }
                : require("../../../assets/images/emptyPlaceHolder.png")
            }
            onLoad={() => {
              if (!loading) this.setState({ imageIsLoading: false });
            }}
            style={{
              width: "100%",
              height: "100%"
            }}
          >
            <SafeAreaView
              style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.7)" }}
              forceInset={{ bottom: "never", top: "always" }}
            >
              <Container style={styles.container}>
                <Header
                  closeButton={true}
                  navigation={this.props.navigation}
                  selectedCampaign={selectedCampaign}
                />

                <Card style={styles.mainCard}>
                  <Image
                    style={styles.image}
                    source={require("../../../assets/images/snap-ghost.png")}
                    resizeMode="contain"
                  />
                  {loading ? (
                    <View style={{ margin: 5 }}>
                      <PlaceholderLine />
                    </View>
                  ) : (
                    <Text style={[styles.title, { width: 150 }]}>
                      {selectedCampaign.name}
                    </Text>
                  )}
                  {loading ? (
                    <View style={{ margin: 5 }}>
                      <PlaceholderLine />
                    </View>
                  ) : (
                    <View>
                      {selectedCampaign.review_status === "APPROVED" ? (
                        selectedCampaign.campaign_end === "0" &&
                        !this.props.campaignEnded &&
                        new Date(selectedCampaign.end_time) > new Date() ? (
                          selectedCampaign.review_status === "APPROVED" &&
                          new Date(selectedCampaign.start_time) > new Date() ? (
                            <View
                              style={[
                                styles.adStatus,
                                { backgroundColor: "#66D072" }
                              ]}
                            >
                              <Text style={styles.reviewtext}>
                                Scheduled for {start_time}
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
                                  {this.state.toggle
                                    ? "Tap to pause AD"
                                    : "Tap to activate AD"}
                                </Text>
                              </View>
                            </View>
                          )
                        ) : (
                          <View style={styles.adStatus}>
                            <Text style={styles.reviewtext}>
                              Campagin Ended
                            </Text>
                          </View>
                        )
                      ) : (
                        <View style={styles.adStatus}>
                          <Text style={styles.reviewtext}>
                            {selectedCampaign.review_status === "PENDING" &&
                              "In Review"}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                  {loading ? (
                    <View style={{ margin: 5 }}>
                      <PlaceholderLine />
                    </View>
                  ) : (
                    <Text style={styles.subHeadings}>
                      Budget{"\n"}
                      <Text
                        style={[
                          styles.numbers,
                          {
                            fontSize: 25,
                            fontFamily: "montserrat-semibold"
                          }
                        ]}
                      >
                        {formatNumber(
                          selectedCampaign.lifetime_budget_micro,
                          true
                        )}
                      </Text>
                      <Text style={{ color: "white" }}>$</Text>
                    </Text>
                  )}
                  <Text style={styles.subHeadings}>Duration</Text>
                  <View style={{ flexDirection: "row", alignSelf: "center" }}>
                    <View
                      style={{
                        flexDirection: "column",
                        alignSelf: "center"
                      }}
                    >
                      {loading ? (
                        <View style={{ margin: 5 }}>
                          <PlaceholderLine />
                        </View>
                      ) : (
                        <>
                          <Text
                            style={[
                              styles.categories,
                              {
                                fontSize: 16,
                                fontFamily: "montserrat-medium"
                              }
                            ]}
                          >
                            Start
                          </Text>
                          <Text style={styles.numbers}>
                            {start_time}{" "}
                            <Text style={[styles.numbers, { fontSize: 12 }]}>
                              {start_year}
                            </Text>
                          </Text>
                        </>
                      )}
                    </View>
                    <View
                      style={{
                        flexDirection: "column",
                        alignSelf: "center"
                      }}
                    >
                      {loading ? (
                        <View style={{ margin: 5 }}>
                          <PlaceholderLine />
                        </View>
                      ) : (
                        <>
                          <Text
                            style={[
                              styles.categories,
                              {
                                fontSize: 16,
                                fontFamily: "montserrat-medium"
                              }
                            ]}
                          >
                            End
                          </Text>

                          <Text style={styles.numbers}>
                            {end_time}{" "}
                            <Text style={[styles.numbers, { fontSize: 12 }]}>
                              {end_year}
                            </Text>
                          </Text>
                        </>
                      )}
                    </View>
                  </View>
                  <Text style={styles.subHeadings}>Audience</Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      marginHorizontal: 40
                    }}
                  >
                    <View style={{ flexDirection: "column" }}>
                      <View
                        style={{
                          flexDirection: "column",
                          alignSelf: "center"
                        }}
                      >
                        <GenderIcon width={hp("2")} height={hp("2")} />
                        {loading ? (
                          <View style={{ margin: 5 }}>
                            <PlaceholderLine />
                          </View>
                        ) : (
                          <Text style={styles.categories}>
                            Gender{"\n "}
                            <Text style={styles.subtext}>
                              {targeting &&
                              (targeting.gender === "" ||
                                !targeting.hasOwnProperty("gender"))
                                ? "All"
                                : targeting && targeting.demographics[0].gender}
                            </Text>
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          alignSelf: "center"
                        }}
                      >
                        <Icon
                          style={styles.icon}
                          type="FontAwesome"
                          name="language"
                        />
                        {loading ? (
                          <View style={{ margin: 5 }}>
                            <PlaceholderLine />
                          </View>
                        ) : (
                          <Text style={styles.categories}>
                            Languages{"\n "}
                            <Text style={styles.subtext}>
                              {targeting &&
                                targeting.demographics[0].languages.join(", ")}
                            </Text>
                          </Text>
                        )}
                      </View>
                      <View
                        style={{
                          flexDirection: "column",
                          alignSelf: "center"
                        }}
                      >
                        <Icon
                          style={styles.icon}
                          type="MaterialCommunityIcons"
                          name="human-male-girl"
                        />

                        {loading ? (
                          <View style={{ margin: 5 }}>
                            <PlaceholderLine />
                          </View>
                        ) : (
                          <Text style={[styles.categories]}>
                            Age range{"\n"}
                            <Text style={styles.subtext}>
                              {targeting && targeting.demographics[0].min_age} -{" "}
                              {targeting && targeting.demographics[0].max_age}
                            </Text>
                          </Text>
                        )}
                      </View>
                      <View style={{ flexDirection: "row" }}>
                        <LocationIcon width={hp("2")} height={hp("2")} />
                        {loading ? (
                          <View style={{ margin: 5 }}>
                            <PlaceholderLine />
                          </View>
                        ) : (
                          <Text style={styles.categories}>
                            Location(s) {"\n"}
                            {targeting && targeting.geos[0].country_code}
                          </Text>
                        )}
                      </View>
                    </View>

                    {this.checkOptionalTargerts(
                      interesetNames,
                      deviceMakes,
                      targeting
                    ) && (
                      <OptionalTargets
                        region_names={region_names}
                        deviceMakes={deviceMakes}
                        interesetNames={interesetNames}
                        targeting={targeting}
                      />
                    )}
                  </View>
                </Card>
              </Container>
              {loading ? (
                <View style={{ margin: 5 }}>
                  <PlaceholderLine />
                </View>
              ) : (
                <StatusModal
                  selectedCampaign={selectedCampaign}
                  updateStatus={this.updateStatus}
                  endCampaign={this.endCampaign}
                  modalVisible={this.state.modalVisible}
                  showModal={this.showModal}
                />
              )}
            </SafeAreaView>
          </ImageBackground>
          <SlideUpPanel
            start_time={this.state.start_time}
            end_time={this.state.end_time}
            dateField={this.dateField}
            selectedCampaign={selectedCampaign}
            hideCharts={this.hideCharts}
            getCampaignStats={this.props.getCampaignStats}
          />
        </>
      );
    }
  }
}

const mapStateToProps = state => ({
  selectedCampaign: state.dashboard.selectedCampaign,
  campaignEnded: state.campaignC.campaignEnded,
  loading: state.dashboard.loadingCampaignDetails,
  loadingCampaignStats: state.dashboard.loadingCampaignStats
});
const mapDispatchToProps = dispatch => ({
  updateStatus: (info, handleToggle) =>
    dispatch(actionCreators.updateStatus(info, handleToggle)),
  endCampaign: (info, handleToggle) =>
    dispatch(actionCreators.endCampaign(info, handleToggle)),
  getCampaignStats: (info, range) =>
    dispatch(actionCreators.getCampaignStats(info, range))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetails);
