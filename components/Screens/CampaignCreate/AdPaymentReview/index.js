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
import { LinearGradient } from "expo";
import ReviewItemCard from "../../../MiniComponents/ReviewItemCard";
import dateFormat from "dateformat";

// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

import * as actionCreators from "../../../../store/actions";

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

  componentDidMount() {
    // console.log("data", this.props.data);
    this.setState({ ...this.props.data });
  }
  render() {
    console.log(this.props.navigation.state.params.interestNames);

    if (!this.state.ad_account_id) {
      return <Spinner color="red" />;
    } else {
      let interestNames = [];
      if (this.props.navigation.state.params.interestNames.length > 0) {
        interestNames = this.props.navigation.state.params.interestNames.map(
          interest => interest.name
        );
      }
      let end_time = new Date(this.state.end_time);
      let start_time = new Date(this.state.start_time);
      end_time = dateFormat(end_time, "d mmm yyyy");
      start_time = dateFormat(start_time, "d mmm yyyy");
      let gender = this.state.targeting.demographics[0].gender
        ? this.state.targeting.demographics[0].gender
        : "All";
      let regions = this.state.targeting.geos[0].hasOwnProperty("region_id")
        ? ":" + this.state.targeting.geos[0].region_id.join(", ")
        : null;
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
              <Button
                onLayout={event => {
                  var { x, y, width, height } = event.nativeEvent.layout;
                  console.log("width", width);
                }}
                transparent
                onPress={() => this.props.navigation.goBack()}
                style={{
                  paddingLeft: 10
                }}
              >
                <Icon
                  style={{
                    top: 20,
                    fontSize: 35,
                    color: "#fff"
                  }}
                  name="arrow-back"
                />
              </Button>
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
                  { title: "objective", content: this.state.objective }
                ]}
              />
              <ReviewItemCard
                title="Media"
                subtitles={[
                  { title: "Business Name", content: this.state.brand_name },
                  { title: "Headline", content: this.state.headline }
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
                    content: regions
                      ? this.state.targeting.geos[0].country_code + regions
                      : this.state.targeting.geos[0].country_code
                  },
                  {
                    title: "language",
                    content: this.state.targeting.demographics[0].languages.join(
                      ", "
                    )
                  },
                  {
                    title: "Age group",
                    content:
                      this.state.targeting.demographics[0].min_age +
                      "-" +
                      this.state.targeting.demographics[0].max_age
                  },
                  interestNames.length > 0 && {
                    title: "Interests",
                    content: interestNames + ""
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
                  {this.state.lifetime_budget_micro} $
                </Text>
                {/* <Text style={styles.text}>20 $</Text> */}
              </View>
            </View>
          </Card>
          <View style={{ backgroundColor: "#000" }}>
            <Card padder style={styles.bottomCard}>
              <TouchableWithoutFeedback
                onPress={() => this.props.navigation.navigate("PaymentForm")}
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
                  Total {"\n"} {this.state.lifetime_budget_micro} ${"\n"}{" "}
                  proceed to payment{" "}
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
  userInfo: state.auth.userInfo,
  data: state.campaignC.data,
  interestsNames: state.campaignC.interestsNames
});
const mapDispatchToProps = dispatch => ({
  updateCampaignList: id => dispatch(actionCreators.updateCampaignList(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdPaymentReview);
