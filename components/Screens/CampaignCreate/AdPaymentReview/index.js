import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Image,
  ScrollView,
  Animated,
  Easing,
  TouchableWithoutFeedback,
  StyleSheet,
  Dimensions
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
  Icon,
  H1,
  Thumbnail,
  Spinner
} from "native-base";
import { LinearGradient, Segment } from "expo";
import ReviewItemCard from "../../../MiniComponents/ReviewItemCard";
import dateFormat from "dateformat";
import formatNumber from "../../../formatNumber";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";
import BackButton from "../../../MiniComponents/BackButton";
import * as actionCreators from "../../../../store/actions";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";

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

  componentDidMount() {
    Segment.screen("Ad Payment Review Screen");
    Segment.trackWithProperties("Viewed Checkout Step", {
      step: 5,
      business_name: this.props.mainBusiness.businessname,
      checkout_id: this.props.campaign_id
    });
  }

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
      return (
        <Container style={styles.container}>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            locations={[0.7, 1]}
            style={styles.gradient}
          />
          <View
            style={{
              justifyContent: "center",
              marginTop: 10,
              marginLeft: 20
            }}
          />
          <Card padder style={styles.mainCard}>
            <View
              style={{
                flexDirection: "row"
              }}
            >
              <BackButton navigation={this.props.navigation.goBack} />
              <Text
                style={[
                  styles.header,
                  {
                    paddingHorizontal: 50,
                    paddingVertical: 30,
                    textAlign: "center"
                  }
                ]}
              >
                Review your selection
              </Text>
            </View>
            <ScrollView>
              <ReviewItemCard
                title="Duration"
                subtitles={[
                  { title: "start", content: end_time },
                  { title: "end", content: start_time },
                  { title: "objective", content: this.props.data.objective }
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
                    title: "language",
                    content: targeting.demographics[0].languages.join(", ")
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
                      targeting.devices[0].hasOwnProperty("os_version_max") &&
                      targeting.devices[0].os_version_min +
                        ", " +
                        targeting.devices[0].os_version_max
                  }
                ]}
              />
            </ScrollView>

            <View
              style={{
                borderBottomColor: "#fff",
                borderBottomWidth: 1,
                marginHorizontal: 40
              }}
            />

            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <View style={{ flexDirection: "column", alignSelf: "center" }}>
                <Text style={styles.text}>Budget</Text>
                {/* <Text style={styles.text}>Agency Fee</Text> */}
              </View>
              <View style={{ flexDirection: "column", alignSelf: "center" }}>
                <Text style={styles.text}>
                  {this.props.data.lifetime_budget_micro} $
                </Text>
                {/* <Text style={styles.text}>20 $</Text> */}
              </View>
            </View>
          </Card>
          <View style={{ backgroundColor: "#000" }}>
            <Card padder style={styles.bottomCard}>
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
                    kdamount: this.props.kdamount
                  });
                }}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignSelf: "center",
                  alignItems: "center"
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    textAlign: "center"
                  }}
                >
                  Total {"\n"}{" "}
                  {formatNumber(this.props.data.lifetime_budget_micro)} USD{" "}
                  {"\n"}({this.props.kdamount} KWD){"\n"} proceed to payment{" "}
                </Text>
              </TouchableWithoutFeedback>
            </Card>
          </View>
        </Container>
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
