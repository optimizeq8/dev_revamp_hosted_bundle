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
import {
  Content,
  Text,
  Item,
  Input,
  Container,
  Icon,
  Button,
  Textarea
} from "native-base";
import * as Segment from "expo-analytics-segment";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import * as Animatable from "react-native-animatable";
import LowerButton from "../../../MiniComponents/LowerButton";
import CustomHeader from "../../../MiniComponents/Header";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import ForwardLoading from "../../../MiniComponents/ForwardLoading";
import KeyboradShift from "../../../MiniComponents/KeyboardShift";
import GoogleSEAPreview from "../../../MiniComponents/GoogleSEAPreview";

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
        // Segment.trackWithProperties("Google SE Design AD", {
        //   business_name: this.props.mainBusiness.businessname
        // });
        // Segment.trackWithProperties("Completed Checkout Step", {
        //   step: 3,
        //   business_name: this.props.mainBusiness.businessname
        // });

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
        // Segment.trackWithProperties("Google SE Design AD", {
        //   business_name: this.props.mainBusiness.businessname
        // });
        // Segment.trackWithProperties("Completed Checkout Step", {
        //   step: 3,
        //   business_name: this.props.mainBusiness.businessname
        // });

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
            // if (
            //   !this.props.campaign.campaignSteps.includes("GoogleAdTargetting")
            // ) {
            if (!rejected)
              this.props.save_google_campaign_steps([
                "Dashboard",
                "GoogleAdInfo",
                "GoogleAdDesign"
              ]);
            // }
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
            <ScrollView
              contentContainerStyle={styles.mainContent}
              scrollEnabled={true}
            >
              <KeyboradShift style={styles.keyboardContainer}>
                {() => (
                  <>
                    <Animatable.View
                      onAnimationEnd={() =>
                        this.setState({ headline1Error: null })
                      }
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
                          placeholder={translate("Input headline text")}
                          placeholderTextColor={"#FFF"}
                          disabled={this.props.loading}
                          value={this.state.headline1}
                          style={[styles.inputText]}
                          autoCorrect={false}
                          maxLength={30}
                          autoCapitalize="none"
                          onChangeText={value => {
                            this.setState({
                              headline1: value
                            });
                            if (!rejected)
                              this.props.save_google_campaign_data({
                                headline1: value
                              });
                          }}
                          autoFocus={true}
                          onFocus={() => {
                            this.setState({ inputH1: true });
                          }}
                          onBlur={() => {
                            segmentEventTrack("headline1 Feild on Blur", {
                              campaign_headline1: this.state.headline1
                            });
                            this.setState({ inputH1: false });
                            this.setState({
                              headline1Error: validateWrapper(
                                "mandatory",
                                this.state.headline1
                              )
                            });
                          }}
                        />
                      </Item>
                    </Animatable.View>

                    <Animatable.View
                      onAnimationEnd={() =>
                        this.setState({ headline2Error: null })
                      }
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
                          autoCorrect={false}
                          maxLength={30}
                          autoCapitalize="none"
                          onChangeText={value => {
                            this.setState({
                              headline2: value
                            });
                            if (!rejected)
                              this.props.save_google_campaign_data({
                                headline2: value
                              });
                          }}
                          autoFocus={true}
                          onFocus={() => {
                            this.setState({ inputH2: true });
                          }}
                          onBlur={() => {
                            segmentEventTrack("headline2 Feild on Blur", {
                              campaign_headline2: this.state.headline2
                            });
                            this.setState({ inputH2: false });
                            this.setState({
                              headline2Error: validateWrapper(
                                "mandatory",
                                this.state.headline2
                              )
                            });
                          }}
                        />
                      </Item>
                    </Animatable.View>

                    <Animatable.View
                      onAnimationEnd={() =>
                        this.setState({ headline3Error: null })
                      }
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
                          autoCorrect={false}
                          maxLength={30}
                          autoCapitalize="none"
                          onChangeText={value => {
                            this.setState({
                              headline3: value
                            });
                            if (!rejected)
                              this.props.save_google_campaign_data({
                                headline3: value
                              });
                          }}
                          autoFocus={true}
                          onFocus={() => {
                            this.setState({ inputH3: true });
                          }}
                          onBlur={() => {
                            segmentEventTrack("headline3 Feild on Blur", {
                              campaign_headline3: this.state.headline3
                            });
                            this.setState({ inputH3: false });
                            this.setState({
                              headline3Error: validateWrapper(
                                "mandatory",
                                this.state.headline3
                              )
                            });
                          }}
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
                              this.setState(
                                {
                                  networkString: "http://"
                                },
                                () => {
                                  segmentEventTrack(
                                    "Changed Campaign network string",
                                    {
                                      campaign_url_network_string: this.state
                                        .networkString
                                    }
                                  );
                                }
                              );
                            } else {
                              this.setState(
                                {
                                  networkString: "https://"
                                },
                                () => {
                                  segmentEventTrack(
                                    "Changed Campaign network string",
                                    {
                                      campaign_url_network_string: this.state
                                        .networkString
                                    }
                                  );
                                }
                              );
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
                          style={[styles.inputText, { textAlign: "left" }]}
                          autoCorrect={false}
                          maxLength={34}
                          autoCapitalize="none"
                          onChangeText={value => {
                            this.setState({
                              finalurl: value
                            });
                            if (!rejected)
                              this.props.save_google_campaign_data({
                                finalurl: this.state.networkString + value
                              });
                          }}
                          autoFocus={true}
                          onFocus={() => {
                            this.setState({ inputURL: true });
                          }}
                          onBlur={() => {
                            segmentEventTrack("finalurl Feild on Blur", {
                              campaign_finalurl: this.state.finalurl
                            });
                            this.setState({ inputURL: false });
                            this.setState(
                              {
                                urlError: validateWrapper(
                                  "mandatory",
                                  this.state.networkString + this.state.finalurl
                                )
                              },
                              () => {
                                if (this.state.urlError) {
                                  segmentEventTrack(
                                    "Error urlError Feild on Blur",
                                    {
                                      campaign_error_urlError: this.state
                                        .urlError
                                    }
                                  );
                                }
                              }
                            );
                          }}
                        />
                      </Item>
                    </Animatable.View>
                    <Animatable.View
                      onAnimationEnd={() =>
                        this.setState({ descriptionError: null })
                      }
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
                          autoCorrect={false}
                          numberOfLines={6}
                          maxLength={90}
                          autoCapitalize="none"
                          onChangeText={value => {
                            this.setState({
                              description: value
                            });
                            if (!rejected)
                              this.props.save_google_campaign_data({
                                description: value
                              });
                          }}
                          autoFocus={true}
                          onFocus={() => {
                            this.setState({ inputD: true });
                          }}
                          onBlur={() => {
                            segmentEventTrack("description Feild on Blur", {
                              campaign_description: this.state.description
                            });
                            this.setState({ inputD: false });
                            this.setState(
                              {
                                descriptionError: validateWrapper(
                                  "mandatory",
                                  this.state.description
                                )
                              },
                              () => {
                                if (this.state.description2Error) {
                                  segmentEventTrack(
                                    "Error description Feild on Blur",
                                    {
                                      campaign_error_description: this.state
                                        .descriptionError
                                    }
                                  );
                                }
                              }
                            );
                          }}
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
                          autoCorrect={false}
                          numberOfLines={6}
                          maxLength={90}
                          autoCapitalize="none"
                          onChangeText={value => {
                            this.setState({
                              description2: value
                            });
                            if (!rejected)
                              this.props.save_google_campaign_data({
                                description2: value
                              });
                          }}
                          autoFocus={true}
                          onFocus={() => {
                            this.setState({ inputD2: true });
                          }}
                          onBlur={() => {
                            segmentEventTrack("description2 Feild on Blur", {
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
                                    "Error description2 Feild on Blur",
                                    {
                                      campaign_error_description2: this.state
                                        .description2Error
                                    }
                                  );
                                }
                              }
                            );
                          }}
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
                  </>
                )}
              </KeyboradShift>
            </ScrollView>
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
