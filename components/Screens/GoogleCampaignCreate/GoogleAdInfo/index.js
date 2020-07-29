//Components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  ScrollView,
  I18nManager,
  Text,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Content, Container } from "native-base";
import analytics from "@segment/analytics-react-native";
import { BlurView } from "@react-native-community/blur";
import { Modal } from "react-native-paper";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";
import LowerButton from "../../../MiniComponents/LowerButton";

import DateField from "../../../MiniComponents/DatePickerRedesigned/DateFields";
import Duration from "../../CampaignCreate/AdObjective/Duration"; //needs to be moved????
import ModalField from "../../../MiniComponents/InputFieldNew/ModalField";
import InputField from "../../../MiniComponents/InputFieldNew";
import CountrySelector from "../../../MiniComponents/CountrySelector";
import RegionsSelector from "../../../MiniComponents/RegionsSelector";
import CustomHeader from "../../../MiniComponents/Header";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
import ContinueGoogleCampaign from "../../../MiniComponents/ContinueGoogleCampaign";
import TopStepsHeader from "../../../MiniComponents/TopStepsHeader";
import CampaignDuration from "../../../MiniComponents/CampaignDurationField";
//Icons
import BackdropIcon from "../../../../assets/SVGs/BackDropIcon";
import GoogleSE from "../../../../assets/SVGs/GoogleAds.svg";
import LocationIcon from "../../../../assets/SVGs/LocationOutline";

// Style
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";
//Data
import CountriesList from "../../../Data/countries.googleSE.data";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";
import isUndefined from "lodash/isUndefined";
import { AdjustEvent, Adjust } from "react-native-adjust";

class GoogleAdInfo extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      language: "1000",
      start_time: "",
      end_time: "",
      location: [],
      minValueBudget: 0,
      maxValueBudget: 0,
      modalVisible: false,
      inputN: false,
      nameError: "",
      countryError: "",
      locationsError: "",
      start_timeError: "",
      end_timeError: "",
      selectRegion: false,
      closedContinueModal: false,
      incomplete: false,
      duration: 7,
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidMount() {
    if (!this.props.campaign.incompleteCampaign) {
      this.props.save_google_campaign_steps(["Dashboard", "GoogleAdInfo"]);
    }
    this.setCampaignInfo();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.campaign.campaignSteps !== this.props.campaign.campaignSteps
    ) {
      this.setCampaignInfo();
    }
  }
  setCampaignInfo = () => {
    let start_time = new Date();
    start_time.setDate(new Date().getDate() + 1);
    let end_time = new Date();
    end_time.setDate(start_time.getDate() + this.state.duration);
    let keys = Object.keys(this.state).filter((key) => {
      if (this.props.campaign.hasOwnProperty(key)) return key;
    });
    let data = { ...this.state };
    keys.filter((key) => {
      data = {
        ...data,
        [key]: this.props.campaign[key],
      };
    }, {});
    // By default set it to business country
    if (data.location && data.location.length === 0) {
      let bsnsCountry = this.props.mainBusiness.country;
      if (bsnsCountry === "UAE") {
        bsnsCountry = "United Arab Emirates";
      } else if (bsnsCountry === "KSA") {
        bsnsCountry = "Saudi Arabia";
      }
      const countryCode = CountriesList.find(
        (ctry) => ctry.name === bsnsCountry
      ).criteria_id;

      data.location = [countryCode];
      data.country = countryCode;
    }
    data.start_time = start_time.toISOString().split("T")[0];
    data.end_time = end_time.toISOString().split("T")[0];
    this.setState({ ...data });
  };

  handleBackButton = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    if (source === "ad_TNC") {
      this.props.navigation.navigate("AdType", {
        source: "ad_objective",
        source_action: "a_go_back",
      });
    } else this.props.navigation.goBack();

    return true;
  };

  handleStartDatePicked = (date) => {
    analytics.track(`a_ad_start_date`, {
      campaign_start_date: date,
      source: "ad_objective",
      source_action: "a_ad_start_date",
      campaign_start_date: date,
    });
    this.setState({
      start_time: date,
    });
    this.props.save_google_campaign_data({ start_time: date });
  };

  handleEndDatePicked = (date) => {
    analytics.track(`a_ad_end_date`, {
      campaign_end_date: date,
      source: "ad_objective",
      source_action: "a_ad_end_date",
      campaign_end_date: date,
    });
    this.setState({
      end_time: date,
    });

    this.props.save_google_campaign_data({ end_time: date });
  };

  setModalVisible = (visible) => {
    analytics.track(`country_modal`, {
      source: "ad_objective",
      source_action: "a_toggle_country_modal",
      visible,
      campaign_channel: "google",
      campaign_ad_type: "GoogleSEAd",
    });

    this.setState({ modalVisible: visible });
  };

  getMinimumCash = (days) => {
    // let minValueBudget = days !== 0 ? 50 * days : 50;
    // let maxValueBudget = days > 1 ? minValueBudget + 1500 : 1500;
    // this.setState({
    //   minValueBudget,
    //   maxValueBudget
    // });
    // this.props.save_google_campaign_data({
    //   minValueBudget: this.state.minValueBudget,
    //   maxValueBudget: this.state.maxValueBudget
    // });
  };

  _handleLanguageChange = (val) => {
    analytics.track(`a_ad_languages`, {
      source_action: `a_ad_languages`,
      source: "ad_objective",
      campaign_language: val === "1000" ? "English" : "Arabic",
    });
    this.setState({ language: val });
    this.props.save_google_campaign_data({ language: val });
  };

  _handleCountryChange = (val) => {
    this.setState({ country: val, location: [val] });

    analytics.track(`a_ad_country`, {
      source: "ad_objective",
      source_action: "a_ad_country",
      campaign_country_name: val,
    });
    this.props.save_google_campaign_data({ country: val, location: [val] });
  };

  _handleSelectedRegions = (val) => {
    /**
     * this is to set the main value of the location array as
     * the country value if "all" was selected
     *
     */

    if (val === this.state.country) {
      this.setState({ country: val, location: [val] });

      analytics.track(`a_ad_regions`, {
        source: "ad_objective",
        source_action: "a_ad_regions",
        campaign_region_names: val,
      });
      this.props.save_google_campaign_data({
        country: val,
        location: [val],
      });
    } else {
      /**
       * This checks if the value of the selected regio exists inside the location array
       * to either add it or remove it from the list
       */
      var res;
      if (isUndefined(this.state.location.find((l) => l === val))) {
        res = this.state.location.filter((l) => l !== val);
        res = this.state.location.filter((l) => l !== this.state.country);
        this.setState({ location: [...res, val] }, () => {
          analytics.track(`a_ad_regions`, {
            source: "ad_objective",
            source_action: "a_ad_regions",
            campaign_region_names: [...res, val],
          });
        });
        this.props.save_google_campaign_data({
          location: [...res, val],
        });
      } else {
        /**
         * filtering the array to remove the selected value,
         * if the array becomes empty, the country value gets set in the location array as all
         * the country value gets removed if another value gets set
         */
        res = this.state.location.filter((l) => l !== val);
        if (res.length === 0) {
          res = [this.state.country];
        } else if (res.length - 1 !== 0) {
          res = res.filter((l) => l !== this.state.country);
        }

        analytics.track(`a_ad_regions`, {
          source: "ad_objective",
          source_action: "a_ad_regions",
          campaign_region_names: res,
        });

        this.setState({ location: res });
        this.props.save_google_campaign_data({
          location: res,
        });
      }
    }
  };

  _handleSubmission = async () => {
    const nameError = validateWrapper("mandatory", this.state.name);
    const countryError = validateWrapper("mandatory", this.state.country);
    const locationsError =
      this.state.location.length === 0 ? "Please choose a region." : null;
    let dateErrors = this.dateField.getErrors();

    this.setState({
      nameError,
      countryError,
      start_timeError: dateErrors.start_timeError,
      end_timeError: dateErrors.end_timeError,
    });
    // segment track on submit
    if (
      nameError ||
      countryError ||
      dateErrors.start_timeError ||
      dateErrors.end_timeError
    ) {
      analytics.track(`a_error_form`, {
        error_page: "ad_objective",
        campaign_channel: "google",
        source_action: "a_submit_ad_objective",
        error_description:
          nameError ||
          countryError ||
          dateErrors.start_timeError ||
          dateErrors.end_timeError,
      });
    }
    if (
      !nameError &&
      !countryError &&
      !dateErrors.start_timeError &&
      !dateErrors.end_timeError
    ) {
      const segmentInfo = {
        campaign_channel: "google",
        campaign_ad_type: "GoogleSEAd",
        campaign_duration:
          Math.ceil(
            (new Date(this.state.end_time) - new Date(this.state.start_time)) /
              (1000 * 60 * 60 * 24)
          ) + 1,
        campaign_name: this.state.name,
        campaign_language: this.state.language,
        campaign_start_date: this.state.start_time,
        campaign_end_date: this.state.end_time,
        campaign_location: this.state.location,
        campaign_country: this.state.country,
      };

      /**
       * Set campaignProgressStarted back to false so that the continue modal
       * will show again if the exit and come back
       */
      this.props.set_google_campaign_resumed(false);

      this.props.create_google_SE_campaign_info(
        {
          id: this.props.campaign.id !== "" ? this.props.campaign.id : "",
          businessid:
            this.props.mainBusiness && this.props.mainBusiness.businessid,
          name: this.state.name,
          language: this.state.language,
          start_time: this.state.start_time,
          end_time: this.state.end_time,
          location: this.state.location,
          dduration: this.state.duration,
        },
        this.props.navigation,
        segmentInfo
      );

      this.props.save_google_campaign_data({
        name: this.state.name,
        language: this.state.language,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        location: this.state.location,
        country: this.state.country,
        minValueBudget: this.state.minValueBudget,
        maxValueBudget: this.state.maxValueBudget,
      });
    }
  };

  handleClosingContinueModal = () => {
    this.setState({ closedContinueModal: true });
  };

  handleGoogleAdInfoFocus = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`ad_objective`, {
      source,
      source_action,
      campaign_channel: "google",
      campaign_ad_type: "GoogleSEAd",
    });
    if (this.props.campaign.campaignResumed) {
      this.props.save_google_campaign_steps(["Dashboard", "GoogleAdInfo"]);
    }
    let adjustGoogleAdObjectiveTracker = new AdjustEvent("va71pj");
    adjustGoogleAdObjectiveTracker.addPartnerParameter(
      `Google_SEM`,
      "google_sem"
    );
    Adjust.trackEvent(adjustGoogleAdObjectiveTracker);
  };
  getValidInfo = (stateError, validObj) => {
    if (validObj) {
      analytics.track(`a_error_form`, {
        error_page: "ad_objective",
        error_description: `Error in ${stateError}: ${validObj}`,
        source: "ad_objective",
        source_action: "a_ad_name",
        campaign_channel: "google",
        campaign_ad_type: "GoogleSEAd",
      });
    }
    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state,
    });
  };
  setValue = (stateName, value) => {
    let state = {};
    state[stateName] = value;
    analytics.track(`a_ad_name`, {
      source: "ad_objective",
      source_action: "a_ad_name",
      campaign_channel: "google",
      campaign_ad_type: "GoogleSEAd",
      campaign_name: value,
    });
    this.setState({ ...state });
    this.props.save_google_campaign_data({ name: value });
  };
  handleDuration = (subtract = false) => {
    let duration = subtract
      ? this.state.duration - 1 > 7
        ? this.state.duration - 1
        : 7
      : this.state.duration + 1;

    let end_time = new Date(this.state.start_time.split("T")[0]);
    end_time.setDate(end_time.getDate() + duration);
    this.setState({
      end_time: end_time.toISOString(),
      duration,
    });
    this.props.save_google_campaign_data({
      end_time: end_time.toISOString(),
      duration,
      campaignDateChanged: true,
    });
    this.timer = setTimeout(() => this.handleDuration(subtract), 150);
  };
  stopTimer = () => {
    clearTimeout(this.timer);
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <View style={styles.safeAreaView}>
        <SafeAreaView
          style={{ backgroundColor: "#fff" }}
          forceInset={{ bottom: "never", top: "always" }}
        />
        <StatusBar barStyle="dark-content" />
        <NavigationEvents onDidFocus={this.handleGoogleAdInfoFocus} />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            <TopStepsHeader
              screenProps={this.props.screenProps}
              closeButton={false}
              segment={{
                str: "Google SE Info Back Button",
                obj: {
                  businessname:
                    this.props.mainBusiness &&
                    this.props.mainBusiness.businessname,
                },
                source: "ad_objective",
                source_action: "a_go_back",
              }}
              icon="google"
              actionButton={() => {
                this.handleBackButton();
                this.props.set_google_campaign_resumed(false);
              }}
              currentScreen="Details"
              title={"Search Engine Ad"}
              disabled={this.props.campaign.uploading}
            />
            <ScrollView
              contentContainerStyle={styles.mainContent}
              scrollEnabled={true}
              style={styles.scrollViewStyle}
            >
              <InputField
                label={"Ad Name"}
                setValue={this.setValue}
                getValidInfo={this.getValidInfo}
                disabled={this.props.campaign.uploading}
                stateName1={"name"}
                value={this.state.name}
                placeholder1={"Enter Your campaign’s name"}
                valueError1={this.state.nameError}
                maxLength={34}
                autoFocus={false}
                incomplete={this.state.incomplete}
                valueText={this.state.name}
                translate={this.props.screenProps.translate}
              />
              <Animatable.View
                onAnimationEnd={() => this.setState({ countryError: null })}
                duration={200}
                easing={"ease"}
                animation={!this.state.countryError ? "" : "shake"}
              >
                <ModalField
                  stateName={"country"}
                  setModalVisible={() => {
                    this.setModalVisible(true);
                  }}
                  modal={true}
                  label={"Country"}
                  valueError={this.state.countryError}
                  getValidInfo={this.getValidInfo}
                  disabled={this.props.campaign.uploading}
                  valueText={
                    this.state.country !== ""
                      ? CountriesList.find(
                          (c) => c.criteria_id === this.state.country
                        ).name
                      : "Select Country/Regions"
                  }
                  value={this.state.country}
                  incomplete={false}
                  translate={this.props.screenProps.translate}
                  icon={LocationIcon}
                  isVisible={this.state.modalVisible}
                  isTranslate={false}
                />
              </Animatable.View>
              <CampaignDuration
                stopTimer={this.stopTimer}
                handleDuration={this.handleDuration}
                duration={this.state.duration}
                screenProps={this.props.screenProps}
              />
              <Animatable.View
                onAnimationEnd={() =>
                  this.setState({
                    start_timeError: null,
                    end_timeError: null,
                  })
                }
                duration={200}
                easing={"ease"}
                animation={
                  !this.state.start_timeError || !this.state.end_timeError
                    ? ""
                    : "shake"
                }
              >
                <Duration
                  label={"Start Date"}
                  screenProps={this.props.screenProps}
                  loading={this.props.campaign.uploading}
                  dismissKeyboard={Keyboard.dismiss}
                  start_time={this.state.start_time}
                  end_time={this.state.end_time}
                  start_timeError={this.state.start_timeError}
                  end_timeError={this.state.end_timeError}
                  dateField={this.dateField}
                />
              </Animatable.View>

              <View style={styles.languageChoiceView}>
                <Text style={styles.languageChoiceText}>
                  {translate("Ad Language")}
                </Text>
                <View style={styles.topContainer}>
                  <TouchableOpacity
                    style={[
                      this.state.language === "1000"
                        ? styles.activeButton
                        : styles.inactiveButton,
                      styles.choiceButtonLeft,
                    ]}
                    onPress={() => {
                      this._handleLanguageChange("1000");
                    }}
                  >
                    <Text
                      style={[
                        this.state.language === "1000"
                          ? styles.activeText
                          : styles.inactiveText,
                      ]}
                    >
                      {translate("English")}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      this.state.language === "1019"
                        ? styles.activeButton
                        : styles.inactiveButton,
                      styles.choiceButtonRight,
                    ]}
                    onPress={() => {
                      this._handleLanguageChange("1019");
                    }}
                  >
                    <Text
                      style={[
                        this.state.language === "1019"
                          ? styles.activeText
                          : styles.inactiveText,
                      ]}
                    >
                      {translate("Arabic")}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              {this.props.campaign.uploading ? (
                <ForwardLoading
                  mainViewStyle={{ width: wp(8), height: hp(8) }}
                  bottom={-hp(5)}
                  style={{ width: wp(8), height: hp(8) }}
                />
              ) : (
                <LowerButton
                  screenProps={this.props.screenProps}
                  style={styles.proceedButtonRTL}
                  bottom={-5}
                  function={this._handleSubmission}
                />
              )}
            </ScrollView>
          </Container>
        </TouchableWithoutFeedback>

        <DateField
          getMinimumCash={this.getMinimumCash}
          onRef={(ref) => (this.dateField = ref)}
          handleStartDatePicked={this.handleStartDatePicked}
          handleEndDatePicked={this.handleEndDatePicked}
          start_time={this.state.start_time}
          end_time={this.state.start_time}
          screenProps={this.props.screenProps}
          incompleteCampaign={this.props.campaign.incompleteCampaign}
          campaignProgressStarted={this.props.campaign.campaignResumed}
          currentCampaignSteps={this.props.campaign.campaignSteps}
          navigation={this.props.navigation}
          google={true}
        />
        <ContinueGoogleCampaign
          navigation={this.props.navigation}
          dateField={this.dateField}
          screenProps={this.props.screenProps}
          handleClosingContinueModal={this.handleClosingContinueModal}
        />
        <Modal
          animationType={"slide"}
          transparent={true}
          onDismiss={() => this.setModalVisible(false)}
          visible={this.state.modalVisible}
        >
          <BlurView
            blurType="dark"
            blurAmount={20}
            reducedTransparencyFallbackColor="black"
          >
            <View style={styles.safeAreaView}>
              <SafeAreaView />
              {this.state.selectRegion ? (
                <Animatable.View
                  duration={300}
                  easing={"ease"}
                  animation={
                    this.state.selectRegion ? "slideInRight" : "slideOutRight"
                  }
                >
                  <View style={styles.popupOverlay}>
                    <CustomHeader
                      closeButton={false}
                      actionButton={() => {
                        this.setState({ selectRegion: false });
                      }}
                      title="Select Regions"
                      screenProps={this.props.screenProps}
                      segment={{
                        source: "regions_modal",
                        source_action: "a_go_back",
                      }}
                    />
                    <View style={{ height: "80%" }}>
                      <Content scrollEnabled={false} indicatorStyle="white">
                        <RegionsSelector
                          screenProps={this.props.screenProps}
                          country={this.state.country}
                          locationsFetchedList={
                            this.props.campaign.locationsFetchedList
                          }
                          locations={this.state.location}
                          onSelectRegions={this._handleSelectedRegions}
                          loading={this.props.campaign.loading}
                        />
                      </Content>
                    </View>
                    <LowerButton
                      screenProps={this.props.screenProps}
                      style={styles.proceedButtonRTL}
                      bottom={4}
                      function={this.setModalVisible}
                    />
                  </View>
                </Animatable.View>
              ) : (
                <Animatable.View
                  duration={300}
                  easing={"ease"}
                  animation={I18nManager.isRTL ? "slideInRight" : "slideInLeft"}
                >
                  <View style={styles.popupOverlay}>
                    <CustomHeader
                      closeButton={false}
                      actionButton={() => {
                        this.setModalVisible(false);
                      }}
                      title="Select Country"
                      screenProps={this.props.screenProps}
                      segment={{
                        source: "country_modal",
                        source_action: "a_go_back",
                      }}
                    />
                    <View style={{ height: "80%" }}>
                      <Content scrollEnabled={false} indicatorStyle="white">
                        <CountrySelector
                          screenProps={this.props.screenProps}
                          countries={CountriesList}
                          country={this.state.country}
                          onSelectedCountryChange={this._handleCountryChange}
                        />
                      </Content>
                    </View>
                    <LowerButton
                      screenProps={this.props.screenProps}
                      bottom={4}
                      style={styles.proceedButtonRTL}
                      function={() => {
                        if (this.state.country) {
                          analytics.track(`a_ad_country`, {
                            source: "ad_objective",
                            source_action: "a_ad_country",
                            campaign_country_name: this.state.country,
                          });

                          this.props.get_google_SE_location_list_reach(
                            this.state.country
                          );
                          this.setState(
                            {
                              selectRegion: true,
                            },
                            () => {
                              analytics.track(`ad_regions_modal`, {
                                source: "ad_objective",
                                source_action: "a_open_region_modal",
                                visible: true,
                              });
                            }
                          );
                        }
                      }}
                    />
                  </View>
                </Animatable.View>
              )}
            </View>
          </BlurView>
        </Modal>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
  campaign: state.googleAds,
});

const mapDispatchToProps = (dispatch) => ({
  create_google_SE_campaign_info: (info, navigation, segmentInfo) =>
    dispatch(
      actionCreators.create_google_SE_campaign_info(
        info,
        navigation,
        segmentInfo
      )
    ),
  get_google_SE_location_list_reach: (country) =>
    dispatch(actionCreators.get_google_SE_location_list_reach(country)),
  save_google_campaign_data: (info) =>
    dispatch(actionCreators.save_google_campaign_data(info)),
  set_google_campaign_resumed: (value) =>
    dispatch(actionCreators.set_google_campaign_resumed(value)),
  save_google_campaign_steps: (value) =>
    dispatch(actionCreators.save_google_campaign_steps(value)),
});
export default connect(mapStateToProps, mapDispatchToProps)(GoogleAdInfo);
