import React, { Component } from "react";
import { connect } from "react-redux";
import {
  ImageBackground,
  View,
  Image,
  ScrollView,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
  BackHandler,
  Dimensions,
  SafeAreaView,
  Platform
} from "react-native";
import {
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Container,
  Header,
  Left,
  Footer,
  Icon,
  H1,
  Thumbnail,
  Spinner
} from "native-base";
import { LinearGradient, Segment, Video } from "expo";
import ReviewItemCard from "../../../MiniComponents/ReviewItemCard";
import dateFormat from "dateformat";
import formatNumber from "../../../formatNumber";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";
import BackButton from "../../../MiniComponents/BackButton";
import * as actionCreators from "../../../../store/actions";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import isUndefined from "lodash/isUndefined";

class AdPaymentReview extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
    this.navState = this.props.navigation.state.params;
    // this.state = {
    //   ad_account_id: "undefined",
    //   attachment: "BLANK",
    //   brand_name: "fm,dn,ngs,n",
    //   businessid: "14",
    //   call_to_action: "BLANK",
    //   destination: "BLANK",
    //   end_time: "2019-06-19T11:58:39.000Z",
    //   headline: "sdgm,gsdmngm,m,dg",
    //   lifetime_budget_micro: 440,
    //   media: "A4146B3D-5267-44A5-8AEA-460F4F0DBEE8.jpg",
    //   media_type: "IMAGE",
    //   name: "m,gt,gm",
    //   objective: "REACH",
    //   start_time: "2019-04-19T11:58:39.000Z",
    //   targeting: {
    //     demographics: [
    //       {
    //         languages: ["en", "ar"],
    //         max_age: "35+",
    //         min_age: 13
    //       }
    //     ],
    //     interests: [
    //       {
    //         category_id: ["SLC_1", "SLC_103"]
    //       }
    //     ],
    //     geos: [
    //       {
    //         country_code: "kw",
    //         region_id: ["25680"]
    //       }
    //     ]
    //   },
    //   userid: "8"
    // };
  }

  isIphoneXorAbove = () => {
    const dimen = Dimensions.get("window");
    return (
      Platform.OS === "ios" &&
      !Platform.isPad &&
      !Platform.isTVOS &&
      (dimen.height === 812 ||
        dimen.width === 812 ||
        (dimen.height === 896 || dimen.width === 896))
    );
  };
  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidMount() {
    Segment.screen("Ad Payment Review Screen");
    Segment.trackWithProperties("Viewed Checkout Step", {
      step: 5,
      business_name: this.props.mainBusiness.businessname,
      checkout_id: this.props.campaign_ids
    });
  }
  returnData = data => {
    this.navState = data;
  };
  render() {
    if (this.props.loading) {
      return <LoadingScreen top={50} />;
    } else {
      let targeting = this.props.data.targeting;
      let interestNames = [];
      if (this.navState.names.interestNames.length > 0) {
        interestNames = this.navState.names.interestNames.map(
          interest => interest.name
        );
      }
      let end_time = new Date(this.props.data.end_time);
      let start_time = new Date(this.props.data.start_time);
      end_time = dateFormat(end_time, "d mmm yyyy");
      start_time = dateFormat(start_time, "d mmm yyyy");
      let gender = targeting.demographics[0].gender
        ? targeting.demographics[0].gender
        : "All";
      let countryName = this.navState.names.countryName;
      let regionNames = [];
      if (
        targeting.geos[0].hasOwnProperty("region_id") &&
        this.navState.names.regionNames.length > 0
      ) {
        regionNames = this.navState.names.regionNames.map(region => region);
      }

      let devices = [];
      devices = targeting.hasOwnProperty("devices")
        ? targeting.devices[0].hasOwnProperty("marketing_name")
          ? targeting.devices[0].marketing_name.join(", ")
          : []
        : [];

      const image = this.props.navigation.getParam("image", "");
      return (
        <SafeAreaView style={styles.safeAreaContainer}>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />
          <Container
            style={[
              styles.container,
              {
                marginTop:
                  Platform.OS === "ios" && !this.isIphoneXorAbove()
                    ? 20
                    : Platform.OS === "android"
                    ? 40
                    : -45,

                // bottom: this.isIphoneXorAbove() ? -100 : 0,
                top: Platform.OS === "ios" && this.isIphoneXorAbove() ? 40 : 0
              }
            ]}
          >
            {!image.includes(".jpg") && (
              <View
                style={[
                  styles.backgroundViewWrapper,
                  {
                    height: "100%",
                    // borderTopRightRadius: 20,
                    // borderTopLeftRadius: 20,
                    borderTopRightRadius: 30,
                    borderTopLeftRadius: 30,
                    // backgroundColor: "black",
                    opacity: 0.2
                  }
                ]}
              >
                <Video
                  source={{
                    uri: image
                  }}
                  shouldPlay
                  isLooping
                  isMuted
                  resizeMode="cover"
                  style={{
                    width: "100%",
                    height: "100%",
                    opacity: 0.4
                    //   backgroundColor: "black"
                  }}
                />
              </View>
            )}
            <ImageBackground
              imageStyle={{ opacity: 0.2 }}
              style={{
                width: "100%",
                height: "100%",
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                overflow: "hidden",
                flex: 1
              }}
              source={{
                uri: image.includes(".jpg") ? image : "www.go.com"
              }}
            >
              <Content
                scrollEnabled={false}
                contentContainerStyle={{ flex: 1 }}
              >
                <Header transparent noShadow iosBarStyle={"light-content"}>
                  <Left style={{ flex: 0 }}>
                    <BackButton
                      navigation={this.props.navigation.goBack}
                      style={{ left: 0, top: 0 }}
                    />
                  </Left>

                  <Body>
                    <Text style={[styles.headline]}>Review your selection</Text>
                  </Body>
                </Header>
                <Content
                  scrollEnabled={false}
                  contentContainerStyle={{ flex: 1 }}
                >
                  <Content
                    contentContainerStyle={{
                      paddingHorizontal: 20
                      //   //   flex: 0,
                      //   borderBottomColor: "#FFF",
                      //   borderBottomWidth: 1
                    }}
                  >
                    <ReviewItemCard
                      title="Duration"
                      subtitles={[
                        { title: "Start", content: start_time },
                        { title: "End", content: end_time },
                        {
                          title: "Objective",
                          content: this.props.data.objective
                        }
                      ]}
                    />
                    <ReviewItemCard
                      title="Media"
                      subtitles={[
                        {
                          title: "Business Name",
                          content: this.props.data.brand_name
                        },
                        { title: "Headline", content: this.props.data.headline }
                      ]}
                    />

                    <ReviewItemCard
                      title="Audience"
                      subtitles={[
                        {
                          title: "Gender",
                          content: gender
                        },
                        {
                          title: "Location",
                          content:
                            regionNames.length > 0
                              ? countryName + ": " + regionNames
                              : countryName
                        },
                        {
                          title: "Language",
                          content: targeting.demographics[0].languages.join(
                            ", "
                          )
                        },
                        {
                          title: "Age group",
                          content:
                            targeting.demographics[0].min_age +
                            "-" +
                            targeting.demographics[0].max_age
                        },
                        interestNames.length > 0 && {
                          title: "Interests",
                          content: interestNames + ""
                        },

                        devices.length > 0 && {
                          title: "Devices",
                          content: devices + ""
                        },
                        targeting.hasOwnProperty("devices") && {
                          title: "OS Type",
                          content:
                            targeting.devices[0].hasOwnProperty("os_type") &&
                            targeting.devices[0].os_type !== ""
                              ? targeting.devices[0].os_type
                              : "All"
                        },
                        targeting.hasOwnProperty("devices") && {
                          title: "OS Version",
                          content:
                            targeting.devices[0].hasOwnProperty(
                              "os_version_max"
                            ) &&
                            targeting.devices[0].os_version_min +
                              ", " +
                              targeting.devices[0].os_version_max
                        }
                      ]}
                    />
                  </Content>

                  <View
                    style={{
                      borderTopColor: "#fff",
                      borderTopWidth: 1,
                      marginHorizontal: 40,
                      paddingBottom: 20
                    }}
                  >
                    <View
                      style={{
                        //   paddingHorizontal: 40,
                        width: "100%",
                        flexDirection: "row",
                        alignSelf: "center",

                        alignItems: "center",
                        justifyContent: "space-between"
                      }}
                    >
                      <Text style={styles.text}>Budget</Text>
                      {/* <Text style={styles.text}>Agency Fee</Text> */}
                      <Text style={[styles.text, { color: "#FF9D00" }]}>
                        {this.props.data.lifetime_budget_micro} $
                      </Text>
                      {/* <Text style={styles.text}>20 $</Text> */}
                    </View>
                    {/* <View
                  style={{
                    //   paddingHorizontal: 40,
                    width: "100%",
                    flexDirection: "row",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "space-between"
                  }}
                >
                  <Text style={styles.text}>Agency Fee</Text>
                  
                  <Text style={[styles.text, { color: "#ff9d00" }]}>20 $</Text>
                </View> */}
                  </View>
                </Content>

                <Footer
                  style={{
                    paddingBottom: 20,
                    margin: 0,
                    borderTopWidth: 0,
                    height: 100,
                    backgroundColor: "#FF9D00",
                    borderTopStartRadius: 30,
                    borderTopEndRadius: 30,
                    marginLeft: 0,
                    marginRight: 0,
                    width: "100%"
                    // flex: 1
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      Segment.trackWithProperties(
                        "Select Ad Payment Review Button",
                        {
                          business_name: this.props.mainBusiness.businessname,
                          campaign_budget: this.props.data.lifetime_budget_micro
                        }
                      );
                      Segment.trackWithProperties("Completed Checkout Step", {
                        step: 5,
                        business_name: this.props.mainBusiness.businessname,
                        checkout_id: this.props.campaign_id
                      });

                      this.props.navigation.navigate("PaymentForm", {
                        names: this.navState.names,
                        kdamount: this.props.kdamount,
                        returnData: this.returnData.bind(this)
                      });
                    }}
                    style={
                      {
                        //   zIndex: this.isIphoneXorAbove() ? 12 : 0,
                        //   elevation: this.isIphoneXorAbove() ? 3 : 0
                        //   //   flex: 1,
                        //   justifyContent: "center",
                        //   alignSelf: "center",
                        //   alignItems: "center"
                      }
                    }
                  >
                    <View
                      style={{
                        justifyContent: "center",
                        alignSelf: "center",
                        alignItems: "center"
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "montserrat-medium",
                          color: "#fff",
                          fontSize: 13,
                          textAlign: "center"
                        }}
                      >
                        TOTAL
                      </Text>

                      <Text
                        style={{
                          fontFamily: "montserrat-bold",
                          fontSize: 16,
                          color: "#fff",
                          textAlign: "center"
                        }}
                      >
                        {formatNumber(this.props.data.lifetime_budget_micro)}{" "}
                        USD {"\n"}
                        {this.props.kdamount} KWD
                      </Text>
                      <Text
                        style={{
                          fontFamily: "montserrat-medium",
                          color: "#FFF",
                          fontSize: 13,
                          textAlign: "center"
                        }}
                      >
                        Proceed to Payment
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                </Footer>
              </Content>
            </ImageBackground>
          </Container>
        </SafeAreaView>
      );
    }
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  userInfo: state.auth.userInfo,
  data: state.campaignC.data,
  loading: state.campaignC.loadingDetail,
  kdamount: state.campaignC.kdamount,
  interestsNames: state.campaignC.interestsNames,
  mainBusiness: state.account.mainBusiness
});

export default connect(
  mapStateToProps,
  null
)(AdPaymentReview);
