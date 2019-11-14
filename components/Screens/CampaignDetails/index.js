import React, { Component } from "react";
import {
  View,
  Image as RNImage,
  Animated,
  BackHandler,
  FlatList
} from "react-native";
import { Card, Text, Container, Icon, Content, Button } from "native-base";
import Loading from "../../MiniComponents/LoadingScreen";
import DateField from "../../MiniComponents/DatePicker/DateFields";
import Header from "../../MiniComponents/Header";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import * as Segment from "expo-analytics-segment";
import { Video } from "expo-av";
import SlideUpPanel from "./SlideUpPanel";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";
import StatusModal from "./StatusModal";
import OptionalTargets from "./OptionalTargets";
import { Image } from "react-native-expo-image-cache";
import Toggle from "../../MiniComponents/Toggle";
import startCase from "lodash/startCase";
import toLower from "lodash/toLower";
//Icons
import LocationIcon from "../../../assets/SVGs/Location";
import GenderIcon from "../../../assets/SVGs/Gender";
import ErrorComponent from "../../MiniComponents/ErrorComponent";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../GlobalStyles";
//Functions
import formatNumber from "../../formatNumber";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import dateFormat from "dateformat";

//Data
import { country_regions as regionsCountries } from "../../Screens/CampaignCreate/AdDetails/data";
import countries from '../../Screens/CampaignCreate/AdDetails/data'
import { interestNames } from "./interesetNames";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import MediaBox from "./MediaBox";
import RejectedComp from "./RejectedComp";
import isStringArabic from "../../isStringArabic";

const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
};
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
  shouldComponentUpdate(nextProps) {
    return (
      this.props.selectedCampaign.campaign_id !==
      nextProps.selectedCampaign.campaign_id ||
      this.props.selectedCampaign.eCPSU !== nextProps.selectedCampaign.eCPSU
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
  render() {
    let loading = this.props.loading;
    const { translate } = this.props.screenProps;

    if (
      (!loading && !this.props.selectedCampaign) ||
      this.props.campaignError
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
            .map(
              id =>
                translate(regionsCountries
                  .find(
                    country =>
                      country.country_code === targeting.geos[0].country_code
                  )
                  .regions.find(reg => reg.id === id).name)
            )
            .join(", ");

        countryName = targeting && targeting.geos[0].country_code && translate(countries.find(
          country =>
            country.value === targeting.geos[0].country_code
        ).label)

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

        langaugeNames = targeting && targeting.demographics[0] && targeting.demographics[0].languages.map(languageId => {
          return this.props.languages && this.props.languages.find(lang => lang.id === languageId).name
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
          <DateField
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
          {this.state.imageIsLoading && (
            <View
              style={[{ flex: 1, position: "absolute", alignSelf: "center" }]}
            >
              <Loading dash={true} />
            </View>
          )}
          {!loading &&
            selectedCampaign &&
            (!selectedCampaign.media.includes(".jpg") ||
              !selectedCampaign.media.includes(".png")) && (
              <View style={[styles.backgroundViewWrapper]}>
                <Video
                  onLoadEnd={() => this.setState({ imageIsLoading: false })}
                  source={{
                    uri:
                      !loading && selectedCampaign
                        ? selectedCampaign.media
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
          <Image
            blurRadius={25}
            {...{
              preview,
              uri: !loading && selectedCampaign ? selectedCampaign.media : ""
            }}
            onLoad={() => {
              if (!loading) this.setState({ imageIsLoading: false });
            }}
            style={{
              position: "absolute",
              width: !loading ? "100%" : 0,
              height: !loading ? "100%" : 0
            }}
          />
          <SafeAreaView
            style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.6)" }}
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
            <Container style={styles.container}>
              <Header
                screenProps={this.props.screenProps}
                campaignEnded={this.props.campaignEnded}
                closeButton={true}
                navigation={this.props.navigation}
                selectedCampaign={selectedCampaign}
                topRightButtonText={translate("Edit")}
                topRightButtonFunction={() =>
                  this.props.navigation.push("AdDetails", {
                    editCampaign: true,
                    campaign: selectedCampaign,
                    media: selectedCampaign.media
                  })
                }
                showTopRightButton={
                  selectedCampaign &&
                  selectedCampaign.campaign_end === "0" &&
                  new Date(selectedCampaign.end_time) > new Date() &&
                  !this.props.campaignEnded
                }
              />
              <Card style={styles.mainCard}>
                <RNImage
                  style={styles.media}
                  source={require("../../../assets/images/snap-ghost.png")}
                  resizeMode="contain"
                />
                {loading ? (
                  <View style={{ margin: 5 }}>
                    <PlaceholderLine />
                  </View>
                ) : (
                    <Text
                      style={[
                        styles.title,
                        { width: 150 },
                        !isStringArabic(selectedCampaign.name)
                          ? { fontFamily: "montserrat-bold-english" }
                          : {}
                      ]}
                    >
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
                          ) : (
                            <View style={styles.adStatus}>
                              <Text style={styles.reviewtext}>
                                {translate("Campaign ended")}
                              </Text>
                            </View>
                          )
                      ) : (
                          <View
                            style={[
                              styles.adStatus,
                              {
                                backgroundColor:
                                  selectedCampaign.review_status === "PENDING"
                                    ? globalColors.orange
                                    : globalColors.red
                              }
                            ]}
                          >
                            <Text style={styles.reviewtext}>
                              {translate(
                                `${
                                selectedCampaign.review_status === "PENDING"
                                  ? "In Review"
                                  : "Rejected"
                                }`
                              )}
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
                      {translate("Budget")}
                      {"\n"}
                      <Text
                        style={[
                          styles.numbers,
                          {
                            fontSize: 25,
                            fontFamily: "montserrat-bold"
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
                <Text style={styles.subHeadings}>{translate("Duration")}</Text>
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
                                fontFamily: "montserrat-medium",
                                textAlign: "center"
                              }
                            ]}
                          >
                            {translate("Start")}
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
                                fontFamily: "montserrat-medium",
                                textAlign: "center"
                              }
                            ]}
                          >
                            {translate("End")}
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
                {selectedCampaign &&
                  ((selectedCampaign.review_status !== "REJECTED" &&
                    selectedCampaign.campaign_end === "0") ||
                    new Date(selectedCampaign.end_time) < new Date() ? (
                      <Content contentContainerStyle={{ paddingBottom: "60%" }}>
                        {media.length > 0 && (
                          <>
                            <Text style={styles.subHeadings}>
                              {translate("Media")}
                            </Text>
                            <FlatList
                              contentContainerStyle={{
                                paddingTop: 20,
                                paddingBottom: 100,
                                alignItems: "center"
                              }}
                              keyExtractor={item => item.campaign_id}
                              data={
                                selectedCampaign.story_creatives ||
                                selectedCampaign.collection_creatives
                              }
                              renderItem={this.adCreatives}
                              numColumns={4}
                            />
                          </>
                        )}
                        <Text style={styles.subHeadings}>
                          {translate("Audience")}
                        </Text>
                        <View
                          style={{
                            flexDirection: "column",
                            // justifyContent: "center",
                            marginHorizontal: 40
                          }}
                        >
                          <View style={{ flexDirection: "column" }}>
                            <View style={styles.categoryView}>
                              <GenderIcon width={hp("2")} height={hp("2")} />
                              {loading ? (
                                <View style={{ margin: 5 }}>
                                  <PlaceholderLine />
                                </View>
                              ) : (
                                  <Text style={styles.categories}>
                                    {translate("Gender")}
                                    {"\n "}
                                    <Text style={styles.subtext}>
                                      {targeting &&
                                        (targeting.demographics[0].gender === "" ||
                                          !targeting.demographics[0].hasOwnProperty(
                                            "gender"
                                          ))
                                        ? translate("All")
                                        : targeting &&
                                        translate(startCase(toLower(targeting.demographics[0].gender)))}
                                    </Text>
                                  </Text>
                                )}
                            </View>
                            <View style={styles.categoryView}>
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
                                    {translate("Language")}
                                    {"\n "}
                                    <Text style={styles.subtext}>
                                      {
                                        langaugeNames && langaugeNames.length > 0 &&
                                        langaugeNames.map(language => {
                                          return translate(language) + ", "
                                        })
                                      }
                                      {/* {targeting &&
                                        targeting.demographics[0].languages.join(
                                          ", "
                                        )} */}
                                    </Text>
                                  </Text>
                                )}
                            </View>
                            <View style={styles.categoryView}>
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
                                    {translate("Age range")}
                                    {"\n"}
                                    <Text style={styles.subtext}>
                                      {targeting &&
                                        targeting.demographics[0].min_age}{" "}
                                      -{" "}
                                      {targeting &&
                                        targeting.demographics[0].max_age}
                                    </Text>
                                  </Text>
                                )}
                            </View>
                            <View style={{ flexDirection: "row" }}>
                              <LocationIcon width={hp("2")} height={hp("2")} />
                              {loading && !targeting ? (
                                <View style={{ margin: 5 }}>
                                  <PlaceholderLine />
                                </View>
                              ) : (
                                  <View style={{ flexDirection: "column" }}>
                                    <Text style={styles.categories}>
                                      {translate("Location")} {"\n"}
                                      <Text style={styles.subtext}>
                                        {countryName}
                                        {/* {targeting &&
                                          targeting.geos[0].country_code} */}
                                      </Text>
                                    </Text>
                                  </View>
                                )}
                            </View>
                          </View>

                          {this.checkOptionalTargerts(
                            interesetNames,
                            deviceMakes,
                            targeting
                          ) && (
                              <OptionalTargets
                                screenProps={this.props.screenProps}
                                region_names={region_names}
                                deviceMakes={deviceMakes}
                                interesetNames={interesetNames}
                                targeting={targeting}
                              />
                            )}
                        </View>
                      </Content>
                    ) : (
                      <RejectedComp
                        screenProps={this.props.screenProps}
                        selectedCampaign={selectedCampaign}
                        navigation={this.props.navigation}
                      />
                    ))}
              </Card>
            </Container>
            {loading ? (
              <View style={{ margin: 5 }}>
                <PlaceholderLine />
              </View>
            ) : (
                <StatusModal
                  screenProps={this.props.screenProps}
                  selectedCampaign={selectedCampaign}
                  updateStatus={this.updateStatus}
                  endCampaign={this.endCampaign}
                  modalVisible={this.state.modalVisible}
                  showModal={this.showModal}
                />
              )}
          </SafeAreaView>
          {selectedCampaign &&
            (selectedCampaign.review_status !== "REJECTED" && (
              <SlideUpPanel
                screenProps={this.props.screenProps}
                start_time={this.state.start_time}
                end_time={this.state.end_time}
                dateField={this.dateField}
                selectedCampaign={selectedCampaign}
                hideCharts={this.hideCharts}
                getCampaignStats={this.props.getCampaignStats}
              />
            ))}
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
});
const mapDispatchToProps = dispatch => ({
  updateStatus: (info, handleToggle) =>
    dispatch(actionCreators.updateStatus(info, handleToggle)),
  endCampaign: (info, handleToggle) =>
    dispatch(actionCreators.endCampaign(info, handleToggle)),
  getCampaignStats: (info, range) =>
    dispatch(actionCreators.getCampaignStats(info, range)),
  get_languages: () => dispatch(actionCreators.get_languages()),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetails);
