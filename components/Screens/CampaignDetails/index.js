import React, { Component } from "react";
import { connect } from "react-redux";

import { View, Image, ScrollView } from "react-native";
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
import dateFormat from "dateformat";
// Style
import styles, { colors } from "./styles";
import * as actionCreators from "../../../store/actions";

class CampaignDetails extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log("main", this.props.mainBusiness);
    if (!this.props.campaign) {
      return <Spinner color="red" />;
    } else {
      let end_time = new Date(this.props.campaign.end_time.split(".")[0]);
      let start_time = new Date(this.props.campaign.start_time.split(".")[0]);
      end_time = dateFormat(end_time, "d mmm yyyy");
      start_time = dateFormat(start_time, "d mmm yyyy");
      console.log(end_time);

      return (
        <Container style={styles.container}>
          <LinearGradient
            colors={[colors.background1, colors.background2]}
            startPoint={{ x: 1, y: 0 }}
            endPoint={{ x: 0, y: 1 }}
            style={styles.gradient}
          />
          <Image
            style={styles.image}
            source={require("../../../assets/images/logo01.png")}
            resizeMode="contain"
          />
          <Card padder style={styles.mainCard}>
            <Text style={styles.link}>{this.props.campaign.name}</Text>
            <Text style={styles.link}>Budget</Text>
            <Text style={styles.link}>Duration</Text>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <View style={{ flexDirection: "column", alignSelf: "center" }}>
                <Text style={styles.link}>Start</Text>
                <Text style={styles.link}>{start_time}</Text>
              </View>
              <View style={{ flexDirection: "column", alignSelf: "center" }}>
                <Text style={styles.link}>End</Text>
                <Text style={styles.link}>{end_time}</Text>
              </View>
            </View>
            <Text style={styles.link}>Audience</Text>
            <View style={{ flexDirection: "column", alignSelf: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignSelf: "center",
                  justifyContent: "flex-end"
                }}
              >
                <Text style={styles.link}>Gender</Text>
                <Text style={styles.link}>
                  {!this.props.campaign.targeting.demographics[0].hasOwnProperty(
                    "gender"
                  )
                    ? "All"
                    : this.props.campaign.targeting.demographics[0].gender}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={styles.link}>Languages</Text>
                <Text style={styles.link}>
                  {this.props.campaign.targeting.demographics[0].languages.join(
                    ", "
                  )}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={styles.link}>Age range</Text>
                <Text style={styles.link}>
                  {this.props.campaign.targeting.demographics[0].min_age} -{" "}
                  {this.props.campaign.targeting.demographics[0].max_age}
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignSelf: "center" }}>
                <Text style={styles.link}>Country</Text>
                <Text style={styles.link}>
                  {this.props.campaign.targeting.geos[0].country_code}
                </Text>
              </View>
            </View>
          </Card>
          <View>
            <View padder style={styles.bottomCard}>
              <Button rounded style={[styles.button]} onPress={() => {}}>
                <Text> {this.props.campaign.status} </Text>
              </Button>
            </View>
          </View>
        </Container>
      );
    }
  }
}

const mapStateToProps = state => ({
  campaign: state.auth.selectedCampaign
});
const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignDetails);
