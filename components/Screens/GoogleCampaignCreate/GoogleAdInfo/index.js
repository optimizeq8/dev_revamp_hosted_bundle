//Components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  ScrollView,
  I18nManager
} from "react-native";
import {
  Content,
  Text,
  Item,
  Input,
  Container,
  Icon,
  Button
} from "native-base";
import * as Segment from "expo-analytics-segment";
import { BlurView } from "expo-blur";
import { Modal } from "react-native-paper";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";
import LowerButton from "../../../MiniComponents/LowerButton";

import DateField from "../../../MiniComponents/DatePicker/DateFields";
import Duration from "../../CampaignCreate/AdObjective/Duration"; //needs to be moved????
import CountrySelector from "../../../MiniComponents/CountrySelector";
import RegionsSelector from "../../../MiniComponents/RegionsSelector";
import CustomHeader from "../../../MiniComponents/Header";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
import ContinueGoogleCampaign from "../../../MiniComponents/ContinueGoogleCampaign";

//Icons
import BackdropIcon from "../../../../assets/SVGs/BackDropIcon";
import GoogleSE from "../../../../assets/SVGs/GoogleAds.svg";

// Style
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";
//Data
import CountriesList from "../../../Data/countries.googleSE.data";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Functions
import segmentEventTrack from "../../../segmentEventTrack";
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import isUndefined from "lodash/isUndefined";

class GoogleAdInfo extends Component {
  static navigationOptions = {
    header: null
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
      closedContinueModal: false
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
    let keys = Object.keys(this.state).filter(key => {
      if (this.props.campaign.hasOwnProperty(key)) return key;
    });
    let data = { ...this.state };
    keys.filter(key => {
      data = {
        ...data,
        [key]: this.props.campaign[key]
      };
    }, {});
    this.setState({ ...data });
  };

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  handleStartDatePicked = date => {
    this.setState({
      start_time: date
    });
    segmentEventTrack("Selected Campaign Start Date", {
      campaign_start_date: date
    });
    this.props.save_google_campaign_data({ start_time: date });
  };

  handleEndDatePicked = date => {
    this.setState({
      end_time: date
    });
    segmentEventTrack("Selected Campaign End Date", {
      campaign_end_date: date
    });
    this.props.save_google_campaign_data({ end_time: date });
  };

  setModalVisible = visible => {
    if (visible) {
      Segment.screen("Select Country Modal");
    }
    this.setState({ modalVisible: visible });
  };

  getMinimumCash = days => {
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

  _handleLanguageChange = val => {
    this.setState({ language: val });
    this.props.save_google_campaign_data({ language: val });
  };

  _handleCountryChange = val => {
    this.setState({ country: val, location: [val] });
    segmentEventTrack("Selected Campaign Country", {
      campaign_country: val
    });
    this.props.save_google_campaign_data({ country: val, location: [val] });
  };

  _handleSelectedRegions = val => {
    /**
     * this is to set the main value of the location array as
     * the country value if "all" was selected
     *
     */

    if (val === this.state.country) {
      this.setState({ country: val, location: [val] });
      segmentEventTrack("Selected Campaign Regions", {
        campaign_regions: val
      });
      this.props.save_google_campaign_data({
        country: val,
        location: [val]
      });
    } else {
      /**
       * This checks if the value of the selected regio exists inside the location array
       * to either add it or remove it from the list
       */
      var res;
      if (isUndefined(this.state.location.find(l => l === val))) {
        res = this.state.location.filter(l => l !== val);
        res = this.state.location.filter(l => l !== this.state.country);
        this.setState({ location: [...res, val] }, () => {
          segmentEventTrack("Selected Campaign Regions", {
            campaign_regions: [...res, val]
          });
        });
        this.props.save_google_campaign_data({
          location: [...res, val]
        });
      } else {
        /**
         * filtering the array to remove the selected value,
         * if the array becomes empty, the country value gets set in the location array as all
         * the country value gets removed if another value gets set
         */
        res = this.state.location.filter(l => l !== val);
        if (res.length === 0) {
          res = [this.state.country];
        } else if (res.length - 1 !== 0) {
          res = res.filter(l => l !== this.state.country);
        }
        segmentEventTrack("Selected Campaign Regions", {
          campaign_regions: res
        });
        this.setState({ location: res });
        this.props.save_google_campaign_data({
          location: res
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
      end_timeError: dateErrors.end_timeError
    });
    // segment track on submit
    if (
      nameError ||
      countryError ||
      dateErrors.start_timeError ||
      dateErrors.end_timeError
    ) {
      segmentEventTrack("Error occured on ad info screen sumbit button", {
        campaign_error_ad_name: nameError ? nameError : "",
        campaign_error_country: countryError ? countryError : "",
        campaign_error_ad_start_date: dateErrors.start_timeError
          ? dateErrors.start_timeError
          : "",
        campaign_error_ad_end_date: dateErrors.end_timeError
          ? dateErrors.end_timeError
          : ""
      });
    }
    if (
      !nameError &&
      !countryError &&
      !dateErrors.start_timeError &&
      !dateErrors.end_timeError
    ) {
      const segmentInfo = {
        step: 2,
        business_name: this.props.mainBusiness.businessname,
        campaign_name: this.state.name,
        campaign_language: this.state.language,
        campaign_start_date: this.state.start_time,
        campaign_end_date: this.state.end_time,
        campaign_location: this.state.location,
        campaign_country: this.state.country,
        checkout_id: this.props.campaign.id
      };

      /**
       * Set campaignProgressStarted back to false so that the continue modal
       * will show again if the exit and come back
       */
      this.props.set_google_campaign_resumed(false);

      this.props.create_google_SE_campaign_info(
        {
          id: this.props.campaign.id !== "" ? this.props.campaign.id : "",
          businessid: this.props.mainBusiness.businessid,
          name: this.state.name,
          language: this.state.language,
          start_time: this.state.start_time,
          end_time: this.state.end_time,
          location: this.state.location
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
        maxValueBudget: this.state.maxValueBudget
      });
    }
  };

  handleClosingContinueModal = () => {
    this.setState({ closedContinueModal: true });
  };

  render() {
    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            if (this.props.campaign.campaignResumed) {
              this.props.save_google_campaign_steps([
                "Dashboard",
                "GoogleAdInfo"
              ]);
            }
            Segment.screenWithProperties("Google SE Info AD", {
              category: "Campaign Creation",
              channel: "google"
            });
            Segment.trackWithProperties("Viewed Checkout Step", {
              step: 2,
              business_name: this.props.mainBusiness.businessname
            });
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            <BackdropIcon style={styles.backDrop} height={hp("100%")} />
            <CustomHeader
              closeButton={false}
              segment={{
                str: "Google SE Info Back Button",
                obj: { businessname: this.props.mainBusiness.businessname }
              }}
              actionButton={() => {
                this.props.navigation.goBack();
                this.props.set_google_campaign_resumed(false);
              }}
              disabled={this.props.campaign.uploading}
              title={"Search Engine Ad"}
              screenProps={this.props.screenProps}
            />
            <View style={styles.iconView}>
              <GoogleSE
                width={hp(5) < 30 ? 50 : 70}
                height={hp(5) < 30 ? 50 : 70}
                style={styles.googleIcon}
              />
            </View>
            <ScrollView
              contentContainerStyle={styles.mainContent}
              scrollEnabled={true}
              style={styles.scrollViewStyle}
            >
              <Animatable.View
                onAnimationEnd={() => this.setState({ nameError: null })}
                duration={200}
                easing={"ease"}
                animation={!this.state.nameError ? "" : "shake"}
              >
                <View style={styles.inputViewContainer}>
                  <Text
                    uppercase
                    style={[
                      styles.inputLabel,
                      this.state.inputN
                        ? [GlobalStyles.orangeTextColor]
                        : GlobalStyles.whiteTextColor
                    ]}
                  >
                    {translate("Ad Name")}
                  </Text>
                </View>
                <Item style={[styles.input1]}>
                  <Input
                    placeholderTextColor={"#FFF"}
                    disabled={this.props.campaign.uploading}
                    value={this.state.name}
                    style={[styles.inputText]}
                    autoCorrect={false}
                    maxLength={34}
                    autoCapitalize="none"
                    onChangeText={value => {
                      this.setState({
                        name: value
                      });
                      this.props.save_google_campaign_data({ name: value });
                    }}
                    onFocus={() => {
                      this.setState({ inputN: true });
                    }}
                    onBlur={() => {
                      segmentEventTrack("Name Field on Blur", {
                        campaign_name: this.state.name
                      });
                      this.setState({ inputN: false });
                      this.setState(
                        {
                          nameError: validateWrapper(
                            "mandatory",
                            this.state.name
                          )
                        },
                        () => {
                          if (this.state.nameError) {
                            segmentEventTrack("Error Name Field on Blur", {
                              campaign_error_ad_name: this.state.nameError
                            });
                          }
                        }
                      );
                    }}
                  />
                </Item>
              </Animatable.View>
              <Animatable.View
                onAnimationEnd={() =>
                  this.setState({
                    start_timeError: null,
                    end_timeError: null
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
                <View style={[styles.dateTextLabel]}>
                  <Text uppercase style={[styles.inputLabel]}>
                    {translate("Date")}
                  </Text>
                </View>
                <Duration
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
              <Animatable.View
                onAnimationEnd={() => this.setState({ countryError: null })}
                duration={200}
                easing={"ease"}
                animation={!this.state.countryError ? "" : "shake"}
              >
                <View style={[styles.countryTextLabel]}>
                  <Text uppercase style={[styles.inputLabel]}>
                    {translate("Country")}
                  </Text>
                </View>
                <Item
                  disabled={this.props.campaign.uploading}
                  // rounded
                  style={[styles.input2]}
                  onPress={() => {
                    Keyboard.dismiss();
                    this.setModalVisible(true);
                  }}
                >
                  <Text style={styles.label}>
                    {this.state.country !== ""
                      ? translate(
                          CountriesList.find(
                            c => c.criteria_id === this.state.country
                          ).name
                        )
                      : translate("Select Country") +
                        "/" +
                        translate("Regions")}
                  </Text>
                  <Icon type="AntDesign" name="down" style={styles.downicon} />
                </Item>
              </Animatable.View>

              <View style={styles.languageChoiceView}>
                <Text uppercase style={styles.languageChoiceText}>
                  {translate("Ad Language")}
                </Text>
                <View style={styles.topContainer}>
                  <Button
                    block
                    style={[
                      this.state.language === "1000"
                        ? styles.activeButton
                        : styles.inactiveButton,
                      styles.choiceButtonLeft
                    ]}
                    onPress={() => {
                      segmentEventTrack("Selected campaign language", {
                        campaign_language: "English"
                      });
                      this._handleLanguageChange("1000");
                    }}
                  >
                    <Text
                      uppercase
                      style={[
                        this.state.language === "1000"
                          ? styles.activeText
                          : styles.inactiveText
                      ]}
                    >
                      {translate("English")}
                    </Text>
                  </Button>
                  <Button
                    block
                    style={[
                      this.state.language === "1019"
                        ? styles.activeButton
                        : styles.inactiveButton,
                      styles.choiceButtonRight
                    ]}
                    onPress={() => {
                      segmentEventTrack("Selected campaign language", {
                        campaign_language: "Arabic"
                      });
                      this._handleLanguageChange("1019");
                    }}
                  >
                    <Text
                      uppercase
                      style={[
                        this.state.language === "1019"
                          ? styles.activeText
                          : styles.inactiveText
                      ]}
                    >
                      {translate("Arabic")}
                    </Text>
                  </Button>
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
                  isRTL={I18nManager.isRTL}
                  style={I18nManager.isRTL ? styles.proceedButtonRTL : {}}
                  width={I18nManager.isRTL ? 25 : null}
                  height={I18nManager.isRTL ? 25 : null}
                  bottom={-5}
                  function={this._handleSubmission}
                />
              )}
            </ScrollView>
          </Container>
        </TouchableWithoutFeedback>

        <DateField
          getMinimumCash={this.getMinimumCash}
          onRef={ref => (this.dateField = ref)}
          handleStartDatePicked={this.handleStartDatePicked}
          handleEndDatePicked={this.handleEndDatePicked}
          start_time={this.state.start_time}
          end_time={this.state.end_time}
          screenProps={this.props.screenProps}
          incompleteCampaign={this.props.campaign.incompleteCampaign}
          campaignProgressStarted={this.props.campaign.campaignResumed}
          currentCampaignSteps={this.props.campaign.campaignSteps}
          navigation={this.props.navigation}
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
          <BlurView intensity={95} tint="dark">
            <SafeAreaView
              style={styles.safeAreaView}
              forceInset={{ bottom: "never", top: "always" }}
            >
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
                    />
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
                    <LowerButton
                      isRTL={I18nManager.isRTL}
                      style={I18nManager.isRTL ? styles.proceedButtonRTL : {}}
                      width={I18nManager.isRTL ? 25 : null}
                      height={I18nManager.isRTL ? 25 : null}
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
                    />
                    <Content scrollEnabled={false} indicatorStyle="white">
                      <CountrySelector
                        screenProps={this.props.screenProps}
                        countries={CountriesList}
                        country={this.state.country}
                        onSelectedCountryChange={this._handleCountryChange}
                      />
                    </Content>
                    <LowerButton
                      bottom={4}
                      isRTL={I18nManager.isRTL}
                      style={I18nManager.isRTL ? styles.proceedButtonRTL : {}}
                      width={I18nManager.isRTL ? 25 : null}
                      height={I18nManager.isRTL ? 25 : null}
                      function={() => {
                        if (this.state.country) {
                          segmentEventTrack(
                            "Button clicked to get google SE location list reach and to show regions modal",
                            {
                              campaign_country: this.state.country
                            }
                          );
                          this.props.get_google_SE_location_list_reach(
                            this.state.country
                          );
                          this.setState(
                            {
                              selectRegion: true
                            },
                            () => {
                              Segment.screen("Select Regions Modal");
                            }
                          );
                        }
                      }}
                    />
                  </View>
                </Animatable.View>
              )}
            </SafeAreaView>
          </BlurView>
        </Modal>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
  campaign: state.googleAds
});

const mapDispatchToProps = dispatch => ({
  create_google_SE_campaign_info: (info, navigation, segmentInfo) =>
    dispatch(
      actionCreators.create_google_SE_campaign_info(
        info,
        navigation,
        segmentInfo
      )
    ),
  get_google_SE_location_list_reach: country =>
    dispatch(actionCreators.get_google_SE_location_list_reach(country)),
  save_google_campaign_data: info =>
    dispatch(actionCreators.save_google_campaign_data(info)),
  set_google_campaign_resumed: value =>
    dispatch(actionCreators.set_google_campaign_resumed(value)),
  save_google_campaign_steps: value =>
    dispatch(actionCreators.save_google_campaign_steps(value))
});
export default connect(mapStateToProps, mapDispatchToProps)(GoogleAdInfo);