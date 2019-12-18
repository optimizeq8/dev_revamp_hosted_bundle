//Components
import React, { Component } from "react";
import {
  View,
  Slider,
  TouchableOpacity,
  ScrollView,
  Platform,
  Keyboard,
  BackHandler
} from "react-native";
import { Text, Container, Icon, Content, Item } from "native-base";
import * as Segment from "expo-analytics-segment";
import Sidemenu from "../../../MiniComponents/SideMenu";
import * as Animatable from "react-native-animatable";
import { BlurView } from "expo-blur";
import { Modal } from "react-native-paper";

import CountrySelector from "../../../MiniComponents/CountrySelector";
import RegionsSelector from "../../../MiniComponents/RegionsSelector";
import { TextInputMask } from "react-native-masked-text";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import CustomHeader from "../../../MiniComponents/Header";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import { showMessage } from "react-native-flash-message";
import SideMenuContainer from "../../../MiniComponents/SideMenuContainer";
import RadioButtons from "../../../MiniComponents/RadioButtons";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
import LowerButton from "../../../MiniComponents/LowerButton";
// import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import ReachBar from "../ReachBar";

//Data
import gender from "../../../Data/gender.googleSE.data";
import ageRange from "../../../Data/ageRange.googleSE.data";
import CountriesList from "../../../Data/countries.googleSE.data";

//Icons
import GreenCheckmarkIcon from "../../../../assets/SVGs/GreenCheckmark.svg";
import GenderIcon from "../../../../assets/SVGs/Gender.svg";
import PlusCircleIcon from "../../../../assets/SVGs/PlusCircleOutline.svg";
import AgeIcon from "../../../../assets/SVGs/AdDetails/AgeIcon";
import PlusCircle from "../../../../assets/SVGs/PlusCircle.svg";
import LocationIcon from "../../../../assets/SVGs/Location";
// import Icon from "react-native-vector-icons/MaterialIcons";

//Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../../GlobalStyles";

//Redux Axios
import * as actionCreators from "../../../../store/actions";
import { connect } from "react-redux";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";

import debounce from "lodash/debounce";
import isNan from "lodash/isNaN";
import isUndefined from "lodash/isUndefined";
import isEqual from "lodash/isEqual";

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import { isRTL } from "expo-localization";

class GoogleAdTargetting extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false
  };
  constructor(props) {
    super(props);
    this.state = {
      age: ["Undetermined"],
      gender: "Undetermined",
      keywords: [],
      sidemenustate: false,
      sidemenu: "gender",
      // minValueBudget: 25,
      // maxValueBudget: 1500,
      modalVisible: false,
      selectionOption: "",
      country: "",
      language: "",
      selectRegion: false,
      countryError: "",
      locationsError: "",
      location: [],
      modalVisible: false,
      total_reach: 0,
      total_reach_percentage: 0,
      avg_reach: 0,
      editCampaign: false,
      campaignInfo: {}
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  async componentDidMount() {
    const campaignTargettingInfo = this.props.navigation.getParam(
      "campaign",
      {}
    );
    let keys = Object.keys(this.state).filter(key => {
      // console.log("this.props.campaign", key);

      if (this.props.campaign.hasOwnProperty(key)) return key;
    });

    //gender
    let genderVal = "";

    genderVal = gender.find(
      gen =>
        gen.label === campaignTargettingInfo.campaign.gender ||
        gen.value === campaignTargettingInfo.campaign.gender
    ).value;

    // find county name from lcoation and compare from countries list to get criteria_id
    const countryName =
      campaignTargettingInfo &&
      campaignTargettingInfo.campaign.location
        .map(value => value.country)
        .filter((value, index, _arr) => _arr.indexOf(value) == index);

    let criteria_id =
      countryName &&
      CountriesList.find(country => country.name === countryName[0])
        .criteria_id;
    this._handleCountryChange(criteria_id);

    // regions
    const regionCriteriaId =
      campaignTargettingInfo &&
      campaignTargettingInfo.campaign.location.map(loc => loc.criteria_id);

    // language
    const language = campaignTargettingInfo.campaign.language;
    this.setState({
      age: [...campaignTargettingInfo.campaign.age],
      language,
      gender: genderVal,
      location: regionCriteriaId ? [...regionCriteriaId] : [],
      campaignInfo: campaignTargettingInfo.campaign
    });

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidUpdate(prevProps) {
    //set total reach
    if (
      !isEqual(
        prevProps.campaign.locationsFetchedList,
        this.props.campaign.locationsFetchedList
      ) &&
      this.props.campaign.locationsFetchedList.length > 0
    ) {
      const total_reach =
        this.props.campaign.locationsFetchedList &&
        this.props.campaign.locationsFetchedList.length > 0 &&
        this.props.campaign.locationsFetchedList.reduce(
          (totalReach, location) => (totalReach += location.reach),
          0
        );

      this.setState(
        {
          total_reach
        },
        () => this._handleReachChange()
      );
    }
  }
  formatNumber = num => {
    return "$" + num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {});
  };

  _renderSideMenu = (component, option = "") => {
    this.setState({ sidemenu: component, selectionOption: option }, () =>
      this._handleSideMenuState(true)
    );
  };
  _handleGenderSelection = gender => {
    this.setState({ gender: gender });
  };

  _handleAgeSelection = val => {
    if (val === "Undetermined") {
      this.setState({ age: [val] });
    } else {
      var res;
      if (isUndefined(this.state.age.find(l => l === val))) {
        res = this.state.age.filter(l => l !== val);
        res = this.state.age.filter(l => l !== "Undetermined");
        this.setState({ age: [...res, val] });
      } else {
        res = this.state.age.filter(l => l !== val);
        if (res.length === 0) {
          res = ["Undetermined"];
        } else if (res.length - 1 !== 0) {
          res = res.filter(l => l !== "Undetermined");
        }
        this.setState({ age: res });
      }
    }
  };

  _handleCountryChange = val => {
    if (this.state.country !== val) {
      this.props.get_google_SE_location_list_reach(val);
    }
    this.setState({
      country: val,
      location: [val]
    });
  };

  _handleReachChange = val => {
    // console.log("val", val);

    // console.log("this.state.location.", this.state.location);
    // console.log(
    //   "this.props.campaign.locationsFetchedList",
    //   this.props.campaign.locationsFetchedList
    // );

    // find locationList
    let list = this.state.location.map(loc =>
      this.props.campaign.locationsFetchedList.find(lctn => lctn.id === loc)
    );
    // to remove undefined values
    list = list.filter(val => val);
    // console.log("list", list);
    // regions selcted
    if (list && list.length > 0) {
      var avg_reach = list.reduce(
        (total, location) => (total += location.reach),
        0
      );
    }
    // ALL Selected( country reach itself)  and selcted country is same as camignInfo targetting
    else if (val === this.state.country) {
      avg_reach = this.state.avg_reach;
    }
    // ALL selected needs to be tested
    else {
      avg_reach = this.state.total_reach;
    }

    const percentage_reach = (avg_reach / this.state.total_reach) * 100;
    this.setState({
      total_reach_percentage: percentage_reach,
      avg_reach
    });
  };
  _handleSelectedRegions = async val => {
    if (val === this.state.country) {
      this.setState({ country: val, location: [val] }, () => {
        this._handleReachChange(val);
      });
    } else {
      var res;
      if (isUndefined(this.state.location.find(l => l === val))) {
        res = this.state.location.filter(l => l !== val);
        res = this.state.location.filter(l => l !== this.state.country);
        this.setState(
          {
            location: [...res, val]
          },
          () => {
            this._handleReachChange(val);
          }
        );
      } else {
        res = this.state.location.filter(l => l !== val);
        if (res.length === 0) {
          res = [this.state.country];
        } else if (res.length - 1 !== 0) {
          res = res.filter(l => l !== this.state.country);
        }

        this.setState({ location: res }, () => {
          this._handleReachChange(val);
        });
      }
    }
  };
  _handleLanguageChange = val => {
    this.setState({ language: val });
  };
  _handleSubmission = () => {
    const info = {
      businessid: this.props.mainBusiness.businessid,
      campaign_id: this.state.campaignInfo.campaign_id,
      age: this.state.age,
      gender: this.state.gender,
      location: this.state.location,
      language: this.state.language
    };

    this.props.update_google_audience_targetting(info);
  };
  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
    // this.setState({ selectRegion: false });
  };
  render() {
    const { translate } = this.props.screenProps;
    const { editCampaign } = this.state;
    // const listName =
    //   this.props.campaign.locationsFetchedList.length > 0 &&
    //   this.props.campaign.locationsFetchedList.map(loc => loc.location);

    let menu;
    switch (this.state.sidemenu) {
      case "gender": {
        menu = (
          <SideMenuContainer
            children={
              <RadioButtons
                screenProps={this.props.screenProps}
                data={gender}
                _handleChange={this._handleGenderSelection}
                selected={this.state.gender}
                id={"value"}
                value={"value"}
                label={"label"}
              />
            }
            icon={"gender"}
            title={"Gender"}
            subtitle={"Select your audience's Gender"}
            _handleSideMenuState={this._handleSideMenuState}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
      case "age": {
        menu = (
          <SideMenuContainer
            children={
              <RadioButtons
                screenProps={this.props.screenProps}
                data={ageRange}
                _handleChange={this._handleAgeSelection}
                selected={this.state.age}
                id={"value"}
                value={"value"}
                label={"label"}
              />
            }
            icon={"age"}
            title={"Age"}
            subtitle={"Select your audience's Age Range"}
            _handleSideMenuState={this._handleSideMenuState}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
      case "language": {
        menu = (
          <SideMenuContainer
            children={
              <RadioButtons
                screenProps={this.props.screenProps}
                data={[
                  { label: "English", value: "1000" },
                  { label: "Arabic", value: "1019" }
                ]}
                _handleChange={this._handleLanguageChange}
                selected={this.state.language}
                id={"value"}
                value={"value"}
                label={"label"}
              />
            }
            icon={"language"}
            title={"Language"}
            subtitle={"Select your audience's Language"}
            _handleSideMenuState={this._handleSideMenuState}
            screenProps={this.props.screenProps}
          />
        );
        break;
      }
    }

    return (
      <Sidemenu
        onChange={isOpen => {
          if (isOpen === false) {
            this._handleSideMenuState(isOpen);
          }
        }}
        disableGestures={true}
        menu={this.state.sidemenustate && menu}
        menuPosition={isRTL ? "right" : "left"}
        openMenuOffset={wp("100%")}
        isOpen={this.state.sidemenustate}
      >
        <SafeAreaView
          style={[styles.safeArea]}
          forceInset={{ bottom: "never", top: "always" }}
        >
          <NavigationEvents
            onDidFocus={() => {
              //   if (this.props.navigation.getParam("editCampaign", false)) {
              // Segment.screenWithProperties("Snap Ad Targetting Update", {
              //   category: "Campaign Update"
              // });
              //   } else {
              // Segment.screenWithProperties("Snap Ad Targetting", {
              //   category: "Campaign Creation"
              // });
              // Segment.trackWithProperties("Viewed Checkout Step", {
              //   checkout_id: this.props.campaign_id,
              //   step: 4
              // });
              //   }
            }}
          />
          <Container style={styles.mainContainer}>
            <Container style={styles.container}>
              <CustomHeader
                closeButton={false}
                segment={{
                  str: "Google SE Audience Back Button",
                  obj: {
                    businessname: this.props.mainBusiness.businessname
                  }
                }}
                navigation={this.props.navigation}
                title={"Audience"}
                topRightButtonText={"Edit"}
                showTopRightButton={this.props.navigation.getParam(
                  "editCampaign",
                  false
                )}
                topRightButtonFunction={() => {
                  this.setState({
                    editCampaign: true
                  });
                }}
                screenProps={this.props.screenProps}
              />

              <Content
                scrollEnabled={false}
                contentContainerStyle={styles.contentContainer}
              >
                {/* {!editCampaign ? (
                  <> */}

                <Text uppercase style={styles.subHeadings}>
                  {translate("Who would you like to reach?")}
                </Text>
                <ScrollView
                  ref={ref => (this.scrollView = ref)}
                  indicatorStyle="white"
                  style={styles.targetList}
                >
                  <TouchableOpacity
                    disabled={this.props.campaign.uploading || !editCampaign}
                    onPress={() => {
                      this._renderSideMenu("gender");
                    }}
                    style={styles.targetTouchable}
                  >
                    <View style={globalStyles.row}>
                      <GenderIcon width={25} height={25} style={styles.icon} />

                      <View style={globalStyles.column}>
                        <Text uppercase style={styles.menutext}>
                          {translate("Gender")}
                        </Text>
                        <Text style={styles.menudetails}>
                          {translate(
                            gender.find(r => {
                              if (r.value === this.state.gender) return r;
                            }).label
                          )}
                        </Text>
                      </View>
                    </View>
                    {editCampaign && (
                      <View style={globalStyles.column}>
                        {this.state.gender === "" || this.state.gender ? (
                          <GreenCheckmarkIcon width={25} height={25} />
                        ) : (
                          <PlusCircleIcon width={25} height={25} />
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={this.props.campaign.uploading || !editCampaign}
                    onPress={() => {
                      this._renderSideMenu("age");
                    }}
                    style={styles.targetTouchable}
                  >
                    <View style={globalStyles.row}>
                      <AgeIcon
                        fill={globalColors.orange}
                        width={25}
                        height={25}
                        style={styles.icon}
                      />
                      <View style={globalStyles.column}>
                        <Text uppercase style={styles.menutext}>
                          {translate("Age")}
                        </Text>
                        <Text style={styles.menudetails}>
                          {this.state.age[0] === "Undetermined"
                            ? translate("All")
                            : "[ " + this.state.age.join(", ") + " ]"}
                        </Text>
                      </View>
                    </View>
                    {editCampaign && (
                      <View>
                        {this.state.age.length !== 0 ? (
                          <GreenCheckmarkIcon width={25} height={25} />
                        ) : (
                          <PlusCircleIcon width={25} height={25} />
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={this.props.campaign.uploading || !editCampaign}
                    onPress={() => {
                      Keyboard.dismiss();
                      this.setModalVisible(true);
                    }}
                    style={styles.targetTouchable}
                  >
                    <View style={globalStyles.row}>
                      <LocationIcon
                        width={25}
                        height={25}
                        style={styles.icon}
                      />

                      <View
                        style={[
                          globalStyles.column,
                          {
                            width: "80%"
                          }
                        ]}
                      >
                        <Text uppercase style={styles.menutext}>
                          {translate("Location")}
                        </Text>
                        <Text numberOfLines={1} style={styles.menudetails}>
                          {this.state.country !== ""
                            ? translate(
                                CountriesList.find(
                                  c => c.criteria_id === this.state.country
                                ).name
                              )
                            : translate("Select Country") +
                              "/" +
                              translate("Region")}
                          :{" "}
                          {this.state.location.length > 0 &&
                            this.state.location.map(loc => {
                              if (
                                this.props.campaign &&
                                this.props.campaign.locationsFetchedList &&
                                this.props.campaign.locationsFetchedList.find(
                                  reg => reg.id === loc
                                )
                              )
                                return this.props.campaign.locationsFetchedList.find(
                                  reg => reg.id === loc
                                ).location;
                            })}
                        </Text>
                      </View>
                    </View>
                    {editCampaign && (
                      <View style={globalStyles.column}>
                        {this.state.gender === "" || this.state.gender ? (
                          <GreenCheckmarkIcon width={25} height={25} />
                        ) : (
                          <PlusCircleIcon width={25} height={25} />
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={this.props.campaign.uploading || !editCampaign}
                    onPress={() => {
                      this._renderSideMenu("language");
                    }}
                    // need to add for language handling
                    style={styles.targetTouchable}
                  >
                    <View style={globalStyles.row}>
                      <Icon
                        style={styles.icon}
                        type="FontAwesome"
                        name="language"
                      />

                      <View style={globalStyles.column}>
                        <Text uppercase style={styles.menutext}>
                          {translate("Language")}
                        </Text>
                        <Text style={styles.menudetails}>
                          {this.state.language === "1000"
                            ? translate("English")
                            : this.state.language === "1019"
                            ? translate("Arabic")
                            : ""}
                        </Text>
                      </View>
                    </View>
                    {editCampaign && (
                      <View style={globalStyles.column}>
                        {this.state.gender === "" || this.state.gender ? (
                          <GreenCheckmarkIcon width={25} height={25} />
                        ) : (
                          <PlusCircleIcon width={25} height={25} />
                        )}
                      </View>
                    )}
                  </TouchableOpacity>
                </ScrollView>

                <ReachBar
                  total_reach={this.state.total_reach_percentage}
                  avg_reach={this.state.avg_reach}
                  screenProps={this.props.screenProps}
                  _handleSubmission={this._handleSubmission}
                  editCampaign={this.state.editCampaign}
                  loading={this.props.campaign.uploading}
                />
              </Content>
            </Container>
          </Container>
          <Modal
            animationType={"slide"}
            transparent={true}
            onDismiss={() => this.setModalVisible(false)}
            visible={this.state.modalVisible}
          >
            <BlurView intensity={95} tint="dark">
              <SafeAreaView
                style={{ height: "100%" }}
                forceInset={{ bottom: "never", top: "always" }}
              >
                {this.state.selectRegion ? (
                  <Animatable.View
                    // onAnimationEnd={() => this.setState({ nameError: null })}
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
                          // this.setModalVisible(false);
                          this.setState({ selectRegion: false });
                        }}
                        title="Select Regions"
                        screenProps={this.props.screenProps}
                      />
                      <Content
                        scrollEnabled={false}
                        // padder
                        indicatorStyle="white"
                      >
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
                      <LowerButton bottom={4} function={this.setModalVisible} />
                    </View>
                  </Animatable.View>
                ) : (
                  <Animatable.View
                    // onAnimationEnd={() => this.setState({ nameError: null })}
                    duration={300}
                    easing={"ease"}
                    animation={
                      // !this.state.selectRegion ?
                      // "slideInRight"
                      // :
                      "slideInLeft"
                    }
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
                      <Content
                        scrollEnabled={false}
                        // padder
                        indicatorStyle="white"
                      >
                        <CountrySelector
                          screenProps={this.props.screenProps}
                          countries={CountriesList}
                          country={this.state.country}
                          onSelectedCountryChange={this._handleCountryChange}
                          //   _handleSideMenuState={this.props._handleSideMenuState}
                        />
                      </Content>
                      <LowerButton
                        bottom={4}
                        function={() => {
                          if (this.state.country) {
                            this.setState({
                              selectRegion: true
                            });
                          }
                        }}
                      />
                    </View>
                  </Animatable.View>
                )}
              </SafeAreaView>
            </BlurView>
          </Modal>

          {/* <Modal isVisible={this.props.campaign.uploading}>
            <LoadingScreen top={50} />
            </Modal> */}
        </SafeAreaView>
      </Sidemenu>
    );
  }
}

const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
  campaign: state.googleAds
});

const mapDispatchToProps = dispatch => ({
  update_google_audience_targetting: info =>
    dispatch(actionCreators.update_google_audience_targetting(info)),
  get_google_SE_location_list_reach: country =>
    dispatch(actionCreators.get_google_SE_location_list_reach(country))
});
export default connect(mapStateToProps, mapDispatchToProps)(GoogleAdTargetting);
