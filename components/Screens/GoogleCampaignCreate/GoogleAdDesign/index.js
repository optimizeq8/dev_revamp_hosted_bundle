//Components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  ScrollView,
  TouchableOpacity,
  I18nManager
} from "react-native";
import { Transition } from "react-navigation-fluid-transitions";
import { Text, Item, Input, Container, Textarea } from "native-base";
import * as Segment from "expo-analytics-segment";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import LowerButton from "../../../MiniComponents/LowerButton";
import CustomHeader from "../../../MiniComponents/Header";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
import GoogleSEABox from "./GoogleSEABox";
import EditModal from "../../GoogleCampaignDetails/EditKeywords/EditModal";
import InputScrollView from "react-native-input-scroll-view";

//Icons
import EyeIcon from "../../../../assets/SVGs/Eye";

// Style
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import segmentEventTrack from "../../../segmentEventTrack";
import { showMessage } from "react-native-flash-message";
import isEqual from "react-fast-compare";
class GoogleAdDesign extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      headline1: "",
      headline2: "",
      headline3: "",
      description: "",
      description2: "",
      finalurl: "",
      networkString: "http://",
      inputH1: false,
      inputH2: false,
      inputH3: false,
      inputD: false,
      inputD2: false,
      inputURL: false,
      headline1Error: "",
      headline2Error: "",
      headline3Error: "",
      descriptionError: "",
      description2Error: "",
      finalurlError: "",
      modalVisible: false
    };
    this.translate = this.props.screenProps.translate;
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }
  componentDidMount() {
    if (this.props.navigation.getParam("rejected", false)) {
      rejectedCampaign = this.props.navigation.getParam("ad", {});
      let keys = Object.keys(this.state).filter(key => {
        if (rejectedCampaign.hasOwnProperty(key)) return key;
      });
      let data = { ...this.state };
      keys.filter(key => {
        data = {
          ...data,
          [key]: rejectedCampaign[key]
        };
      }, {});

      if (rejectedCampaign.path1)
        data.finalurl = data.finalurl + "/" + rejectedCampaign.path1;
      if (rejectedCampaign.path2) data.finalurl += "/" + rejectedCampaign.path2;
      this.setState({
        ...data
      });
    } else {
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
      if (this.props.campaign.path1)
        data.finalurl = data.finalurl + "/" + this.props.campaign.path1;
      if (this.props.campaign.path2)
        data.finalurl += "/" + this.props.campaign.path2;
      this.setState({
        ...data
      });
    }

    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };

  _handleSubmission = async () => {
    const headline1Error = validateWrapper("mandatory", this.state.headline1);
    const headline2Error = validateWrapper("mandatory", this.state.headline2);
    const headline3Error = validateWrapper("mandatory", this.state.headline3);
    const descriptionError = validateWrapper(
      "mandatory",
      this.state.description
    );
    const description2Error = validateWrapper(
      "mandatory",
      this.state.description2
    );
    const finalurlError = validateWrapper(
      "website",
      (!this.state.finalurl.toLowerCase().includes("http")
        ? this.state.networkString
        : "") + this.state.finalurl
    );

    this.setState({
      headline1Error,
      headline2Error,
      headline3Error,
      descriptionError,
      description2Error,
      finalurlError
    });
    let { correctPathsLength, onlyTwoPaths } = this.validatePaths();
    // set segment track for error
    if (
      headline1Error ||
      headline2Error ||
      headline3Error ||
      descriptionError ||
      description2Error
    ) {
      showMessage({
        message: this.translate("Please complete all of the fields"),
        type: "warning"
      });
      segmentEventTrack("Error occured on ad design screen sumbit button", {
        campaign_error_headline1: headline1Error,
        campaign_error_headline2: headline2Error,
        campaign_error_headline3: headline3Error,
        campaign_error_description: descriptionError,
        campaign_error_description2: description2Error,
        campaign_error_finalurl: finalurlError
      });
    }
    if (
      !headline1Error &&
      !headline2Error &&
      !headline3Error &&
      !description2Error &&
      !descriptionError &&
      !finalurlError &&
      correctPathsLength &&
      onlyTwoPaths
    ) {
      let finalurl =
        (!this.state.finalurl.toLowerCase().includes("http")
          ? this.state.networkString
          : "") + this.state.finalurl;
      let data = {
        headline1: this.state.headline1,
        headline2: this.state.headline2,
        headline3: this.state.headline3,
        description: this.state.description,
        description2: this.state.description2,
        finalurl:
          finalurl[finalurl.length - 1] === "/" //gets rid of a trailing /
            ? finalurl.slice(0, -1)
            : finalurl
      };
      const segmentInfo = {
        step: 3,
        business_name: this.props.mainBusiness.businessname,
        campaign_headline1: this.state.headline1,
        campaign_headline2: this.state.headline2,
        campaign_headline3: this.state.headline3,
        campaign_description: this.state.description,
        campaign_description2: this.state.description2,
        campaign_finalurl: this.state.finalurl,
        checkout_id: this.props.campaign.id
      };
      /**
       * the screen is used to handle rejected ads as well, I send back rejected as a param
       * to handle the data submitted or the route it takes
       */
      let rejectedVal = this.props.navigation.getParam("rejected", false);
      let error_type = this.props.navigation.getParam("error_type", 1) === 1;
      if (!rejectedVal) {
        this.props.create_google_SE_campaign_ad_design(
          {
            ...data,
            id: this.props.campaign.id,
            businessid: this.props.mainBusiness.businessid,
            completed: error_type
          },
          rejectedVal,
          segmentInfo
        );
        this.props.save_google_campaign_data({
          ...data,
          id: this.props.campaign.id
        });
      } else {
        /**
         * if error type is 1 that means it will submit the ad details through the ad design action
         * if it is 3 it will navigate to the keywords screen and pass the data with it
         */
        if (error_type)
          this.props.create_google_SE_campaign_ad_design(
            {
              ...data,
              id: this.props.navigation.getParam("id", null),
              businessid: this.props.mainBusiness.businessid,
              completed: error_type
            },
            rejectedVal,
            segmentInfo
          );
        else
          this.props.navigation.navigate("GoogleEditKeywords", {
            adData: data
          });
      }
    }
  };
  focusTheField = fieldName => {
    this.inputs[fieldName]._root.focus();
  };
  handleModalToggle = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  };
  inputs = {};

  handleBlur = (value, booleanKey) => {
    campaign_ = "campaign_" + value;
    error = value + "Error";
    campaign_error_ = "campaign_error_" + value;
    segmentEventTrack([value] + "Field on Blur", {
      [campaign_]: this.state[value]
    });
    this.setState({ [booleanKey]: false });
    this.setState(
      {
        [error]: validateWrapper(
          value === "finalurl" ? "website" : "mandatory",
          (value === "finalurl" &&
          !this.state.finalurl.toLowerCase().includes("http")
            ? this.state.networkString
            : "") + this.state[value]
        )
      },
      () => {
        if (this.state[error]) {
          segmentEventTrack("Error at" + [value] + "field on blur", {
            [campaign_error_]: this.state[error]
          });
        }
        if (value === "finalurl") this.validatePaths();
      }
    );
  };
  setValue = (value, dontSave = false) => {
    this.setState(value);
    if (!this.props.navigation.getParam("rejected", false) && !dontSave)
      this.props.save_google_campaign_data(value);
  };

  handleInputRefs = (value, input) => {
    this.inputs[value] = input;
  };

  handleDidFocus = () => {
    if (!this.props.navigation.getParam("rejected", false))
      this.props.save_google_campaign_steps([
        "Dashboard",
        "GoogleAdInfo",
        "GoogleAdDesign"
      ]);
    Segment.screenWithProperties("Google SE Design AD", {
      category: "Campaign Creation",
      channel: "google"
    });
    Segment.trackWithProperties("Viewed Checkout Step", {
      step: 3,
      business_name: this.props.mainBusiness.businessname
    });
    this.setState({ unmounted: false });
  };

  /**
   * checks whether the url is vaild in terms of paths and validity
   */
  validatePaths = () => {
    let finalurl =
      (!this.state.finalurl.toLowerCase().includes("http")
        ? this.state.networkString
        : "") + this.state.finalurl;

    let seperatedUrl =
      finalurl[finalurl.length - 1] === "/" //gets rid of a trailing slash so it doesn't affect the split function
        ? //eg. (http://example.com/).split("/") returns [http:,"",example.com,""]
          finalurl.slice(0, -1).split("/")
        : finalurl.split("/");
    let correctPathsLength = true;
    let onlyTwoPaths = true;
    if (seperatedUrl.slice(3).length > 0) {
      //check if the url has paths
      let path1 = "";
      let path2 = "";
      path1 = seperatedUrl.slice(3)[0];
      if (seperatedUrl.slice(3)[1]) path2 = seperatedUrl.slice(3)[1];
      if (path1 && path2)
        correctPathsLength = path1.length <= 15 && path2.length <= 15;
      else if (path1 && !path2) correctPathsLength = path1.length <= 15;
      else correctPathsLength = path2.length <= 15;
      onlyTwoPaths = seperatedUrl.slice(3).length <= 2;
    }
    if (this.state.finalurlError)
      showMessage({
        message: this.translate("Please enter a valid URL"),
        type: "warning",
        description: this.translate("Eg") + "'https://url.com/path1/path2'"
      });
    else if (!correctPathsLength || !onlyTwoPaths) {
      this.setState({ finalurlError: true });
      showMessage({
        message: `${this.translate("Website url issue")}, ${
          !onlyTwoPaths
            ? this.translate("Only  2 paths are allowed")
            : this.translate("Paths length exceeded")
        }`,
        description:
          this.translate(
            "The max length of the url paths are 15 characters each"
          ) +
          this.translate("Eg") +
          "'https://www.example.com/path1/path2'",
        type: "warning",
        duration: 6000
      });
    }
    return { correctPathsLength, onlyTwoPaths };
  };
  render() {
    const rejected = this.props.navigation.getParam("rejected", false);

    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onWillBlur={() => {
            this.setState({ unmounted: true });
          }}
          onDidFocus={this.handleDidFocus}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View style={styles.container}>
            <CustomHeader
              closeButton={false}
              segment={{
                str: "Google SE Design Back Button",
                obj: { businessname: this.props.mainBusiness.businessname }
              }}
              actionButton={rejected && this.handleModalToggle}
              navigation={!rejected ? this.props.navigation : undefined}
              title={"Search Engine Ad"}
              screenProps={this.props.screenProps}
              disabled={this.props.campaign.uploading}
            />

            <InputScrollView
              keyboardAvoidingViewProps={{ behavior: "padding" }}
              {...ScrollView.props}
              contentContainerStyle={[
                styles.mainContent,
                { paddingBottom: "80%" }
              ]}
            >
              <View style={{ marginBottom: 35 }}>
                <Transition shared="preview">
                  <GoogleSEABox
                    screenProps={this.props.screenProps}
                    parentState={this.state}
                    inputH1={this.state.inputH1}
                    inputH2={this.state.inputH2}
                    inputH3={this.state.inputH3}
                    inputD={this.state.inputD}
                    inputD2={this.state.inputD2}
                    inputURL={this.state.inputURL}
                    setVal={this.setValue}
                    focus={this.setValue}
                    blur={this.handleBlur}
                    submitEditing={this.focusTheField}
                    reference={this.handleInputRefs}
                    disable={this.props.campaign.uploading}
                    campaign={this.props.campaign}
                  />
                </Transition>
              </View>
              <View
                style={{
                  flex: 1,
                  alignSelf: "flex-end",
                  marginHorizontal: 25,
                  flexDirection: "row"
                }}
              >
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                    segmentEventTrack(
                      "Button clicked to preview Google Ad Design"
                    );
                    this.props.navigation.push("GoogleSEAPreviewScreen", {
                      campaign: {
                        headline1: this.state.headline1,
                        headline2: this.state.headline2,
                        headline3: this.state.headline3,
                        finalurl: this.state.finalurl,
                        description: this.state.description,
                        description2: this.state.description2
                      }
                    });
                  }}
                >
                  <EyeIcon width={hp(10)} height={hp(10)} />
                </TouchableOpacity>
                {this.props.campaign.uploading ? (
                  <ForwardLoading
                    mainViewStyle={{ width: wp(8), height: hp(8) }}
                    bottom={hp(3)}
                    style={{ width: wp(8), height: hp(8) }}
                  />
                ) : (
                  <LowerButton
                    isRTL={I18nManager.isRTL}
                    style={I18nManager.isRTL ? styles.proceedButtonRTL : {}}
                    width={I18nManager.isRTL ? 25 : hp(9)}
                    height={I18nManager.isRTL ? 25 : hp(9)}
                    bottom={2}
                    function={this._handleSubmission}
                  />
                )}
              </View>
            </InputScrollView>
          </View>
        </TouchableWithoutFeedback>
        {this.state.modalVisible && (
          <EditModal
            handleModalToggle={this.handleModalToggle}
            screenProps={this.props.screenProps}
            navigation={this.props.navigation}
          />
        )}
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
  create_google_SE_campaign_ad_design: (info, rejected, segmentInfo) =>
    dispatch(
      actionCreators.create_google_SE_campaign_ad_design(
        info,
        rejected,
        segmentInfo
      )
    ),
  save_google_campaign_data: info =>
    dispatch(actionCreators.save_google_campaign_data(info)),
  save_google_campaign_steps: value =>
    dispatch(actionCreators.save_google_campaign_steps(value))
});
export default connect(mapStateToProps, mapDispatchToProps)(GoogleAdDesign);
