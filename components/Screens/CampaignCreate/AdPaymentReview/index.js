import React, { Component } from "react";
import {
  ImageBackground,
  View,
  TouchableWithoutFeedback,
  BackHandler,
  Dimensions,
  Platform
} from "react-native";
import { Content, Text, Container, Footer } from "native-base";
import { Segment, Video } from "expo";
import { SafeAreaView } from "react-navigation";
import ReviewItemCard from "../../../MiniComponents/ReviewItemCard";
import CustomHeader from "../../../MiniComponents/Header";
import BackButton from "../../../MiniComponents/BackButton";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";

// Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";

//Functions
import isUndefined from "lodash/isUndefined";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import formatNumber from "../../../formatNumber";
import dateFormat from "dateformat";

class AdPaymentReview extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
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
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  render() {
    if (
      this.props.loading ||
      !this.props.data ||
      !this.props.data.campaignInfo.targeting
    ) {
      return <LoadingScreen top={50} />;
    } else {
      let targeting = this.props.data.campaignInfo.targeting;
      let interestNames = [];
      if (this.props.interestNames.length > 0) {
        interestNames = this.props.interestNames.map(interest => interest.name);
      }
      let end_time = new Date(this.props.data.end_time);
      let start_time = new Date(this.props.data.start_time);
      end_time = dateFormat(end_time, "d mmm yyyy");
      start_time = dateFormat(start_time, "d mmm yyyy");
      let gender = targeting.demographics[0].gender
        ? targeting.demographics[0].gender
        : "All";
      let countryName = this.props.countryName;
      let regionNames = this.props.regionNames;
      // if (
      //   targeting.geos[0].hasOwnProperty("region_id") &&
      //   this.props.regionNames.length > 0
      // ) {
      //   regionNames = this.props.regionNames.map(region => region);
      // }

      let devices = [];
      devices = targeting.hasOwnProperty("devices")
        ? targeting.devices[0].hasOwnProperty("marketing_name")
          ? targeting.devices[0].marketing_name.join(", ")
          : []
        : [];

      const image = this.props.data ? this.props.data.image : "";
      return (
        <SafeAreaView
          style={styles.safeAreaView}
          forceInset={{ bottom: "never", top: "always" }}
        >
          <CustomHeader
            closeButton={false}
            segment={{
              str: "Ad Payment Review Back Button",
              obj: {
                businessname: this.props.mainBusiness.businessname
              }
            }}
            navigation={this.props.navigation}
            title="Review Selection"
          />
          <Container
            style={[
              styles.container,
              {
                marginTop: hp(2)

                // marginTop:
                //   Platform.OS === "ios" && !this.isIphoneXorAbove()
                //     ? 20
                //     : Platform.OS === "android"
                //     ? 40
                //     : -45,
                // // bottom: this.isIphoneXorAbove() ? -100 : 0,
                // top: Platform.OS === "ios" && this.isIphoneXorAbove() ? 40 : 0
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
                contentContainerStyle={{
                  flex: 1,
                  paddingTop: hp(2)
                }}
              >
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
                          content: this.props.data.objective.replace(
                            /BRAND_/i,
                            ""
                          )
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
                        {
                          title: "Headline",
                          content: this.props.data.headline
                        }
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
                        targeting.hasOwnProperty("devices") &&
                          targeting.devices[0].os_version_max !== "" && {
                            title: "OS Version",
                            content:
                              targeting.devices[0].hasOwnProperty(
                                "os_version_min"
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
                      <View
                        style={{
                          flexDirection: "column"
                        }}
                      >
                        <Text style={[styles.text, { textAlign: "left" }]}>
                          Budget
                        </Text>
                        {/* <Text style={[styles.text, { textAlign: "left" }]}>
                          Agency Fee
                        </Text> */}
                      </View>
                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={[
                            styles.text,
                            { color: "#FF9D00", textAlign: "right" }
                          ]}
                        >
                          {this.props.data.campaignInfo.lifetime_budget_micro} $
                        </Text>
                        {/* <Text
                          style={[
                            styles.text,
                            { color: "#FF9D00", textAlign: "right" }
                          ]}
                        >
                          {this.props.data.lifetime_budget_micro * 0.1} $
                        </Text> */}
                      </View>
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
                    borderTopStartRadius: 35,
                    borderTopEndRadius: 35,
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

                      this.props.navigation.navigate("PaymentForm");
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
                        {formatNumber(
                          this.props.data.campaignInfo.lifetime_budget_micro
                        )}{" "}
                        USD {"\n"}({this.props.kdamount} KWD)
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
  image: state.campaignC.image,
  countryName: state.campaignC.countryName,
  interestNames: state.campaignC.interestNames,
  regionNames: state.campaignC.regionNames,
  loading: state.campaignC.loadingDetail,
  kdamount: state.campaignC.kdamount,
  mainBusiness: state.account.mainBusiness
});

export default connect(
  mapStateToProps,
  null
)(AdPaymentReview);
