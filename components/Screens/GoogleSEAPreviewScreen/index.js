//Components
import React, { Component } from "react";
import { View, BackHandler, Image } from "react-native";
import { Container } from "native-base";
import SafeAreaView from "react-native-safe-area-view";
import CustomHeader from "../../MiniComponents/Header";
import GoogleSEAPreview from "../../MiniComponents/GoogleSEAPreview";
import GradientButton from "../../MiniComponents/GradientButton";
import AnimatedCircularProgress from "../../MiniComponents/AnimatedCircleProgress/AnimatedCircularProgress";

// Style
import styles from "./styles";
//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

import { Transition } from "react-navigation-fluid-transitions";
import { LinearGradient } from "expo-linear-gradient";
import isEmpty from "lodash/isEmpty";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { showMessage } from "react-native-flash-message";

import { colors } from "../../GradiantColors/colors";
import globalStyles, { globalColors } from "../../../GlobalStyles";
// import isStringArabic from "../../isStringArabic";
class GoogleSEAPreviewScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      campaign: this.props.navigation.getParam("campaign", {}),
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  chunkString = (s, maxSize) => {
    return s.match(
      new RegExp(
        "(?=\\S)([^]{1," + (maxSize - 1) + "}|[^,;]*)(.$|[,&.\n ;])",
        "g"
      )
    );
  };
  /**
   * checks whether the url is vaild in terms of paths and validity
   */
  validatePaths = () => {
    const { translate } = this.props.screenProps;
    let finalurl =
      (!this.state.campaign.finalurl.toLowerCase().includes("http")
        ? this.state.networkString
        : "") + this.state.campaign.finalurl;

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
    if (this.state.campaign.finalurlError)
      showMessage({
        message: translate("Please enter a valid URL"),
        type: "warning",
        description: translate("Eg") + "'https://url.com/path1/path2'",
      });
    else if (!correctPathsLength || !onlyTwoPaths) {
      this.setState({ finalurlError: true });
      showMessage({
        message: `${translate("Website url issue")}, ${
          !onlyTwoPaths
            ? translate("Only  2 paths are allowed")
            : translate("Paths length exceeded")
        }`,
        description:
          translate("The max length of the url paths are 15 characters each") +
          translate("Eg") +
          "'https://www.example.com/path1/path2'",
        type: "warning",
        duration: 6000,
      });
    }
    return { correctPathsLength, onlyTwoPaths };
  };
  _handleSubmission = async () => {
    const { translate } = this.props.screenProps;
    const headline1Error = validateWrapper(
      "mandatory",
      this.state.campaign.headline1
    );
    const headline2Error = validateWrapper(
      "mandatory",
      this.state.campaign.headline2
    );
    // const headline3Error = validateWrapper("mandatory", this.state.campaign.headline3);
    const descriptionError = validateWrapper(
      "mandatory",
      this.state.campaign.description
    );
    // const description2Error = validateWrapper(
    //   "mandatory",
    //   this.state.campaign.description2
    // );
    const finalurlError = validateWrapper(
      "website",
      (!this.state.campaign.finalurl.toLowerCase().includes("http")
        ? this.state.campaign.networkString
        : "") + this.state.campaign.finalurl
    );

    this.setState({
      headline1Error,
      headline2Error,
      // headline3Error,
      descriptionError,
      // description2Error,
      finalurlError,
    });
    let { correctPathsLength, onlyTwoPaths } = this.validatePaths();
    // set segment track for error
    if (
      headline1Error ||
      headline2Error ||
      // headline3Error ||
      descriptionError
      // description2Error
    ) {
      showMessage({
        message: translate("Please complete all of the fields"),
        type: "warning",
      });
      const segmentInfo = {
        campaign_headline1: this.state.campaign.headline1,
        campaign_headline2: this.state.campaign.headline2,
        campaign_headline3: this.state.campaign.headline3,
        campaign_description: this.state.campaign.description,
        campaign_description2: this.state.campaign.description2,
        campaign_finalurl: this.state.campaign.finalurl,
        campaign_channel: "google",
        campaign_ad_type: "GoogleSEAd",
        campaign_id: this.props.campaign.id,
      };
      analytics.track(`a_error`, {
        error_page: "ad_preview",
        source_action: "a_submit_ad_preview",
        timestamp: new Date().getTime(),
        ...segmentInfo,
        error_description:
          headline1Error || headline2Error || descriptionError || finalurlError,
      });
    }
    if (
      !headline1Error &&
      !headline2Error &&
      // !headline3Error &&
      !descriptionError &&
      // !description2Error &&
      !finalurlError &&
      correctPathsLength &&
      onlyTwoPaths
    ) {
      let finalurl = this.state.campaign.finalurl;
      let data = {
        headline1: this.state.campaign.headline1,
        headline2: this.state.campaign.headline2,
        headline3: this.state.campaign.headline3,
        description: this.state.campaign.description,
        description2: this.state.campaign.description2,
        finalurl:
          finalurl[finalurl.length - 1] === "/" //gets rid of a trailing /
            ? finalurl.slice(0, -1)
            : finalurl,
      };
      const segmentInfo = {
        campaign_headline1: this.state.campaign.headline1,
        campaign_headline2: this.state.campaign.headline2,
        campaign_headline3: this.state.campaign.headline3,
        campaign_description: this.state.campaign.description,
        campaign_description2: this.state.campaign.description2,
        campaign_finalurl: this.state.campaign.finalurl,
        campaign_channel: "google",
        campaign_ad_type: "GoogleSEAd",
        campaign_id: this.props.campaign.id,
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
            completed: error_type,
          },
          rejectedVal,
          segmentInfo
        );
        this.props.save_google_campaign_data({
          ...data,
          id: this.props.campaign.id,
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
              completed: error_type,
            },
            rejectedVal,
            segmentInfo
          );
        else
          this.props.navigation.navigate("GoogleEditKeywords", {
            adData: data,
            source: "ad_preview",
            source_action: "a_ad_keywords",
          });
      }
    }
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
    let info = { ...this.state.campaign };
    if (isEmpty(info)) {
      info.headline1 = this.props.instagramDetail.full_name;
      if (this.props.instagramDetail.biography) {
        let headline = this.removeEmojis(this.props.instagramDetail.biography);
        headline = this.chunkString(headline, 30);
        info.headline2 = headline && headline[0] ? headline[0] : "";
      }
      info.headline3 = this.props.mainBusiness.country;
      if (this.props.instagramDetail.biography) {
        // First remove the headline 2 part
        let biography = this.props.instagramDetail.biography
          .split(info.headline2)
          .pop();
        // Remove any emoji present
        biography = this.removeEmojis(biography);
        // split string
        const desc = this.chunkString(biography, 90);
        info.description = desc && desc[0] ? desc[0] : "";
        info.description2 = desc && desc[1] ? desc[1] : "";
      }
      if (
        this.props.instagramDetail.external_url &&
        this.props.instagramDetail.external_url !== ""
      ) {
        info.finalurl = this.props.instagramDetail.external_url;
      } else {
        // If finalurl is still emty
        const { websitelink, weburl } = this.props.mainBusiness;
        //check if the business has websitelink ie(their own website)
        if (websitelink && websitelink !== "") {
          info.finalurl = websitelink;
        }
        // if that is also not present check if it has optimizeapp.com business website and set the finalurl to it
        else if (weburl && weburl !== "") {
          info.finalurl = weburl.includes("https")
            ? weburl
            : `https://${weburl}.optimizeapp.com`;
        }
      }
      this.setState({
        campaign: {
          ...info,
        },
      });
    }
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  removeEmojis = (text) => {
    return text.replace(
      /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
      ""
    );
  };
  render() {
    const { translate } = this.props.screenProps;
    let campaign = this.state.campaign;
    // let language = isStringArabic(campaign.headline2 ? campaign.headline2 : "")
    //   ? "1019"
    //   : "1000";
    let language =
      this.props.navigation.getParam("language", null) ||
      this.props.campaign.language;
    let campaignDetailScreen = this.props.navigation.getParam(
      "campaignDetailScreen",
      false
    );
    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[1, 0.3]}
          style={globalStyles.gradient}
        />
        <Container style={styles.container}>
          <CustomHeader
            closeButton={false}
            segment={{
              str: "Google SE Design Preview Back Button",
              obj: { businessname: this.props.mainBusiness.businessname },
              source: "ad_preview",
              source_action: "a_go_back",
            }}
            navigation={this.props.navigation}
            title={"Search Engine Ad Preview"}
            screenProps={this.props.screenProps}
          />
          <View style={styles.mainContent}>
            <Transition appear="bottom" zIndex={1}>
              <Image
                resizeMode="contain"
                animation="slideInUp"
                style={styles.phoneImage}
                source={require("../../../assets/images/GooglePhoneBG.png")}
              />
            </Transition>
            <View style={styles.container1}>
              <View style={styles.searchResult}>
                <Transition appear="scale" zIndex={2}>
                  <View style={styles.searchBar}>
                    <Image
                      width={322}
                      height={43}
                      resizeMode="contain"
                      style={styles.searchImage}
                      source={require("../../../assets/images/GoogleSearchBar.png")}
                    />
                  </View>
                </Transition>
                <Transition shared="preview" zIndex={3}>
                  <GoogleSEAPreview
                    details={false}
                    showEmpty={true}
                    screenProps={this.props.screenProps}
                    headline1={campaign.headline1}
                    headline2={campaign.headline2}
                    headline3={campaign.headline3}
                    finalurl={campaign.finalurl}
                    path1={campaign.path1}
                    path2={campaign.path2}
                    description={campaign.description}
                    description2={campaign.description2}
                    language={language}
                  />
                </Transition>
              </View>
            </View>
            {!campaignDetailScreen && (
              <View style={styles.bottomView}>
                <GradientButton
                  transparent
                  onPressAction={() => {
                    this.props.navigation.navigate("GoogleAdDesign", {
                      source: "ad_preview",
                      source_action: "a_edit_ad_design",
                    });
                  }}
                  text={translate("Edit")}
                  style={styles.editButton}
                  uppercase
                />
                {this.props.campaign.uploading ? (
                  <View style={styles.forwardLoading}>
                    <AnimatedCircularProgress
                      size={50}
                      width={5}
                      fill={100}
                      rotation={360}
                      lineCap="round"
                      tintColor={globalColors.orange}
                      backgroundColor="rgba(255,255,255,0.3)"
                      adDetails={false}
                      style={{ alignSelf: "flex-end" }}
                    />
                  </View>
                ) : (
                  <GradientButton
                    style={styles.nextButton}
                    text={translate("Next")}
                    uppercase
                    onPressAction={() => {
                      this._handleSubmission();
                    }}
                  />
                )}
              </View>
            )}
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
  campaign: state.googleAds,
  instagramDetail: state.googleAds.instagramDetail,
});

const mapDispatchToProps = (dispatch) => ({
  create_google_SE_campaign_ad_design: (info, rejected, segmentInfo) =>
    dispatch(
      actionCreators.create_google_SE_campaign_ad_design(
        info,
        rejected,
        segmentInfo
      )
    ),
  save_google_campaign_data: (info) =>
    dispatch(actionCreators.save_google_campaign_data(info)),
  save_google_campaign_steps: (value) =>
    dispatch(actionCreators.save_google_campaign_steps(value)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GoogleSEAPreviewScreen);
