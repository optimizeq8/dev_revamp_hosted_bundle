//Components
import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Text, Item, Input, Container, Textarea } from "native-base";
import * as Segment from "expo-analytics-segment";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";
import LowerButton from "../../../MiniComponents/LowerButton";
import CustomHeader from "../../../MiniComponents/Header";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
import GoogleSEAPreview from "../../../MiniComponents/GoogleSEAPreview";
import InputScrollView from "react-native-input-scroll-view";
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
import split from "lodash/split";
import segmentEventTrack from "../../../segmentEventTrack";

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
      urlError: "",
      networkString: "http://"
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
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
      if (rejectedCampaign.finalurl) {
        const url = split(rejectedCampaign.finalurl, "://");

        this.setState({
          ...data,
          networkString: url[0] + "://",
          finalurl: url[1]
        });
      }
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
      if (this.props.campaign.finalurl) {
        const url = split(this.props.campaign.finalurl, "://");

        this.setState({
          ...data,
          networkString: url[0] + "://",
          finalurl: url[1]
        });
      }
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
    const urlError = validateWrapper("website", this.state.finalurl);

    this.setState({
      headline1Error,
      headline2Error,
      headline3Error,
      descriptionError,
      description2Error,
      urlError
    });
    // set segment track for error
    if (
      headline1Error ||
      headline2Error ||
      headline3Error ||
      descriptionError ||
      description2Error ||
      urlError
    ) {
      segmentEventTrack("Error occured on ad design screen sumbit button", {
        campaign_error_headline1: headline1Error,
        campaign_error_headline2: headline2Error,
        campaign_error_headline3: headline3Error,
        campaign_error_description: descriptionError,
        campaign_error_description2: description2Error,
        campaign_error_url: urlError
      });
    }
    if (
      !headline1Error &&
      !headline2Error &&
      !headline3Error &&
      !description2Error &&
      !descriptionError &&
      !urlError
    ) {
      let data = {
        headline1: this.state.headline1,
        headline2: this.state.headline2,
        headline3: this.state.headline3,
        description: this.state.description,
        description2: this.state.description2,
        finalurl: this.state.networkString + this.state.finalurl
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
        checkout_id: this.props.campaign.campaign_id
      };
      let rejectedVal = this.props.navigation.getParam("rejected", false);
      if (!rejectedVal) {
        this.props.create_google_SE_campaign_ad_design(
          {
            ...data,
            campaign_id: this.props.campaign.campaign_id,
            businessid: this.props.mainBusiness.businessid
          },
          rejectedVal,
          segmentInfo
        );
        this.props.save_google_campaign_data({
          ...data,
          campaign_id: this.props.campaign.campaign_id
        });
      } else {
        this.props.create_google_SE_campaign_ad_design(
          {
            businessid: this.props.mainBusiness.businessid,
            ...data,
            campaign_id: this.props.navigation.getParam("campaign_id", null)
          },
          rejectedVal,
          segmentInfo
        );
      }
    }
  };
  focusTheField = fieldName => {
    this.inputs[fieldName]._root.focus();
  };
  inputs = {};

  render() {
    const { translate } = this.props.screenProps;
    const rejected = this.props.navigation.getParam("rejected", false);

    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            if (!rejected)
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
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            <CustomHeader
              closeButton={false}
              segment={{
                str: "Google SE Design Back Button",
                obj: { businessname: this.props.mainBusiness.businessname }
              }}
              navigation={this.props.navigation}
              title={"Search Engine Ad"}
              screenProps={this.props.screenProps}
            />
            <View style={{ zIndex: 10000 }}>
              <GoogleSEAPreview
                screenProps={this.props.screenProps}
                headline1={this.state.headline1}
                headline2={this.state.headline2}
                headline3={this.state.headline3}
                finalurl={this.state.finalurl}
                description={this.state.description}
                description2={this.state.description2}
                inputH1={this.state.inputH1}
                inputH2={this.state.inputH2}
                inputH3={this.state.inputH3}
                inputD={this.state.inputD}
                inputD2={this.state.inputD2}
                inputURL={this.state.inputURL}
              />
            </View>

            <InputScrollView
              {...ScrollView.props}
              contentContainerStyle={styles.mainContent}
            >
              <Animatable.View
                onAnimationEnd={() => this.setState({ headline1Error: null })}
                duration={200}
                easing={"ease"}
                animation={!this.state.headline1Error ? "" : "shake"}
              >
                <View style={[styles.inputView]}>
                  <Text
                    uppercase
                    style={[
                      styles.inputLabel,
                      this.state.inputH1
                        ? [GlobalStyles.orangeTextColor]
                        : GlobalStyles.whiteTextColor
                    ]}
                  >
                    {translate("Headline")} {translate("1")}
                  </Text>
                </View>
                <Item style={[styles.input]}>
                  <Input
                    autoFocus={true}
                    placeholder={translate("Input headline text")}
                    placeholderTextColor={"#FFF"}
                    disabled={this.props.loading}
                    value={this.state.headline1}
                    style={[styles.inputText]}
                    autoCorrect={true}
                    maxLength={30}
                    onChangeText={value => {
                      this.setState({
                        headline1: value
                      });
                      if (!rejected)
                        this.props.save_google_campaign_data({
                          headline1: value
                        });
                    }}
                    onFocus={() => {
                      this.setState({ inputH1: true });
                    }}
                    onBlur={() => {
                      segmentEventTrack("headline1 Field on Blur", {
                        campaign_headline1: this.state.headline1
                      });
                      this.setState({ inputH1: false });
                      this.setState(
                        {
                          headline1Error: validateWrapper(
                            "mandatory",
                            this.state.headline1
                          )
                        },
                        () => {
                          if (this.state.headline1Error) {
                            segmentEventTrack(
                              "Error at headline1 field on blur",
                              {
                                campaign_error_headline1: this.state
                                  .headline1Error
                              }
                            );
                          }
                        }
                      );
                    }}
                    onSubmitEditing={() => {
                      this.focusTheField("inputH2");
                    }}
                    blurOnSubmit={false}
                    returnKeyType={"next"}
                  />
                </Item>
              </Animatable.View>

              <Animatable.View
                onAnimationEnd={() => this.setState({ headline2Error: null })}
                duration={200}
                easing={"ease"}
                animation={!this.state.headline2Error ? "" : "shake"}
              >
                <View style={[styles.inputView]}>
                  <Text
                    uppercase
                    style={[
                      styles.inputLabel,
                      this.state.inputH2
                        ? [GlobalStyles.orangeTextColor]
                        : GlobalStyles.whiteTextColor
                    ]}
                  >
                    {translate("Headline")} {translate("2")}
                  </Text>
                </View>
                <Item style={[styles.input]}>
                  <Input
                    placeholder={translate("Input headline text")}
                    placeholderTextColor={"#FFF"}
                    disabled={this.props.loading}
                    value={this.state.headline2}
                    style={[styles.inputText]}
                    autoCorrect={true}
                    maxLength={30}
                    onChangeText={value => {
                      this.setState({
                        headline2: value
                      });
                      if (!rejected)
                        this.props.save_google_campaign_data({
                          headline2: value
                        });
                    }}
                    onFocus={() => {
                      this.setState({ inputH2: true });
                    }}
                    onBlur={() => {
                      segmentEventTrack("headline2 Field on Blur", {
                        campaign_headline2: this.state.headline2
                      });
                      this.setState({ inputH2: false });
                      this.setState(
                        {
                          headline2Error: validateWrapper(
                            "mandatory",
                            this.state.headline2
                          )
                        },
                        () => {
                          if (this.state.headline2Error) {
                            segmentEventTrack(
                              "Error at headline2 field on blur",
                              {
                                campaign_error_headline2: this.state
                                  .headline2Error
                              }
                            );
                          }
                        }
                      );
                    }}
                    ref={input => {
                      this.inputs["inputH2"] = input;
                    }}
                    onSubmitEditing={() => {
                      this.focusTheField("inputH3");
                    }}
                    blurOnSubmit={false}
                    returnKeyType={"next"}
                  />
                </Item>
              </Animatable.View>

              <Animatable.View
                onAnimationEnd={() => this.setState({ headline3Error: null })}
                duration={200}
                easing={"ease"}
                animation={!this.state.headline3Error ? "" : "shake"}
              >
                <View style={[styles.inputView]}>
                  <Text
                    uppercase
                    style={[
                      styles.inputLabel,
                      this.state.inputH3
                        ? [GlobalStyles.orangeTextColor]
                        : GlobalStyles.whiteTextColor
                    ]}
                  >
                    {translate("Headline")} {translate("3")}
                  </Text>
                </View>
                <Item style={[styles.input]}>
                  <Input
                    placeholder={translate("Input headline text")}
                    placeholderTextColor={"#FFF"}
                    disabled={this.props.loading}
                    value={this.state.headline3}
                    style={[styles.inputText]}
                    autoCorrect={true}
                    maxLength={30}
                    onChangeText={value => {
                      this.setState({
                        headline3: value
                      });
                      if (!rejected)
                        this.props.save_google_campaign_data({
                          headline3: value
                        });
                    }}
                    onFocus={() => {
                      this.setState({ inputH3: true });
                    }}
                    onBlur={() => {
                      segmentEventTrack("headline3 Field on Blur", {
                        campaign_headline3: this.state.headline3
                      });
                      this.setState({ inputH3: false });
                      this.setState(
                        {
                          headline3Error: validateWrapper(
                            "mandatory",
                            this.state.headline3
                          )
                        },
                        () => {
                          if (this.state.description2Error) {
                            segmentEventTrack(
                              "Error at headline3 Field on Blur",
                              {
                                campaign_error_headline3: this.state
                                  .headline3Error
                              }
                            );
                          }
                        }
                      );
                    }}
                    onSubmitEditing={() => {
                      this.focusTheField("inputURL");
                    }}
                    ref={input => {
                      this.inputs["inputH3"] = input;
                    }}
                    blurOnSubmit={false}
                    returnKeyType={"next"}
                  />
                </Item>
              </Animatable.View>
              <Animatable.View
                onAnimationEnd={() => this.setState({ urlError: null })}
                duration={200}
                easing={"ease"}
                animation={!this.state.urlError ? "" : "shake"}
              >
                <View style={[styles.inputView]}>
                  <Text
                    uppercase
                    style={[
                      styles.inputLabel,
                      this.state.inputURL
                        ? [GlobalStyles.orangeTextColor]
                        : GlobalStyles.whiteTextColor
                    ]}
                  >
                    {translate("Landing Page")}
                  </Text>
                </View>
                <Item style={[styles.input]}>
                  <TouchableOpacity
                    style={[
                      GlobalStyles.orangeBackgroundColor,
                      {
                        borderRadius: 30,
                        width: 54,
                        height: 54,
                        alignItems: "center",
                        justifyContent: "center"
                      }
                    ]}
                    onPress={() => {
                      if (this.state.networkString === "https://") {
                        this.setState({
                          networkString: "http://"
                        });
                      } else {
                        this.setState({
                          networkString: "https://"
                        });
                      }
                    }}
                  >
                    <Text uppercase style={styles.networkLabel}>
                      {this.state.networkString === "https://"
                        ? "https"
                        : "http"}
                    </Text>
                    <Text uppercase style={styles.networkLabel}>
                      {`< >`}
                    </Text>
                  </TouchableOpacity>
                  <Input
                    placeholderTextColor={"#FFF"}
                    disabled={this.props.loading}
                    value={this.state.finalurl}
                    style={[
                      styles.inputText,
                      this.state.finalurl
                        ? { textAlign: "left" }
                        : { right: wp(6) }
                    ]}
                    autoCorrect={false}
                    maxLength={34}
                    autoCapitalize="none"
                    placeholder={"Input landing page url"}
                    onChangeText={value => {
                      this.setState({
                        finalurl: value
                      });
                      if (!rejected)
                        this.props.save_google_campaign_data({
                          finalurl: this.state.networkString + value
                        });
                    }}
                    onFocus={() => {
                      this.setState({ inputURL: true });
                    }}
                    onBlur={() => {
                      this.setState({ inputURL: false });
                      this.setState({
                        urlError: validateWrapper(
                          "mandatory",
                          this.state.networkString + this.state.finalurl
                        )
                      });
                    }}
                    onSubmitEditing={() => {
                      this.focusTheField("inputD");
                    }}
                    ref={input => {
                      this.inputs["inputURL"] = input;
                    }}
                    blurOnSubmit={false}
                    returnKeyType={"next"}
                  />
                </Item>
              </Animatable.View>

              <Animatable.View
                onAnimationEnd={() => this.setState({ descriptionError: null })}
                duration={200}
                easing={"ease"}
                animation={!this.state.descriptionError ? "" : "shake"}
              >
                <View style={[styles.inputView]}>
                  <Text
                    uppercase
                    style={[
                      styles.inputLabel,
                      this.state.inputD
                        ? [GlobalStyles.orangeTextColor]
                        : GlobalStyles.whiteTextColor
                    ]}
                  >
                    {translate("Description")}
                  </Text>
                </View>
                <Item
                  style={[
                    styles.input,
                    { paddingVertical: 20, paddingHorizontal: 5 }
                  ]}
                >
                  <Textarea
                    rowSpan={3}
                    multiline={true}
                    placeholderTextColor={"#FFF"}
                    disabled={this.props.loading}
                    value={this.state.description}
                    style={[styles.inputTextarea]}
                    autoCorrect={true}
                    numberOfLines={6}
                    maxLength={90}
                    placeholder={"Input Description 1 text"}
                    onChangeText={value => {
                      this.setState({
                        description: value
                      });
                      if (!rejected)
                        this.props.save_google_campaign_data({
                          description: value
                        });
                    }}
                    onFocus={() => {
                      this.setState({ inputD: true });
                    }}
                    onBlur={() => {
                      segmentEventTrack("description Field on Blur", {
                        campaign_description: this.state.description
                      });
                      this.setState({ inputD: false });
                      this.setState(
                        {
                          headline3Error: validateWrapper(
                            "mandatory",
                            this.state.description
                          )
                        },
                        () => {
                          if (this.state.descriptionError) {
                            segmentEventTrack(
                              "Error description Field on Blur",
                              {
                                campaign_error_description: this.state
                                  .descriptionError
                              }
                            );
                          }
                        }
                      );
                    }}
                    onSubmitEditing={() => {
                      this.focusTheField("inputD2");
                    }}
                    ref={input => {
                      this.inputs["inputD"] = input;
                    }}
                    blurOnSubmit={false}
                    returnKeyType={"next"}
                  />
                </Item>
              </Animatable.View>

              <Animatable.View
                onAnimationEnd={() =>
                  this.setState({ description2Error: null })
                }
                duration={200}
                easing={"ease"}
                animation={!this.state.description2Error ? "" : "shake"}
              >
                <View style={[styles.inputView]}>
                  <Text
                    uppercase
                    style={[
                      styles.inputLabel,
                      this.state.inputD2
                        ? [GlobalStyles.orangeTextColor]
                        : GlobalStyles.whiteTextColor
                    ]}
                  >
                    {translate("Description")} {translate("2")}
                  </Text>
                </View>
                <Item
                  style={[
                    styles.input,
                    { paddingVertical: 20, paddingHorizontal: 5 }
                  ]}
                >
                  <Textarea
                    rowSpan={3}
                    multiline={true}
                    placeholderTextColor={"#FFF"}
                    disabled={this.props.loading}
                    value={this.state.description2}
                    style={[styles.inputTextarea]}
                    autoCorrect={true}
                    numberOfLines={6}
                    maxLength={90}
                    placeholder={"Input Description 2 text"}
                    onChangeText={value => {
                      this.setState({
                        description2: value
                      });
                      if (!rejected)
                        this.props.save_google_campaign_data({
                          description2: value
                        });
                    }}
                    onFocus={() => {
                      this.setState({ inputD2: true });
                    }}
                    onBlur={() => {
                      segmentEventTrack("description2 Field on Blur", {
                        campaign_description2: this.state.description2
                      });
                      this.setState({ inputD2: false });
                      this.setState(
                        {
                          description2Error: validateWrapper(
                            "mandatory",
                            this.state.description2
                          )
                        },
                        () => {
                          if (this.state.description2Error) {
                            segmentEventTrack(
                              "Error description2 Field on Blur",
                              {
                                campaign_error_description2: this.state
                                  .description2Error
                              }
                            );
                          }
                        }
                      );
                    }}
                    ref={input => {
                      this.inputs["inputD2"] = input;
                    }}
                    blurOnSubmit={true}
                    returnKeyType={"done"}
                  />
                </Item>
              </Animatable.View>

              {this.props.campaign.uploading ? (
                <ForwardLoading
                  mainViewStyle={{ width: wp(8), height: hp(8) }}
                  bottom={hp(3)}
                  style={{ width: wp(8), height: hp(8) }}
                />
              ) : (
                <LowerButton
                  bottom={3}
                  function={this._handleSubmission}
                  width={70}
                  height={70}
                />
              )}
            </InputScrollView>
          </Container>
        </TouchableWithoutFeedback>
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
