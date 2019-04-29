import React, { Component } from "react";
import { connect } from "react-redux";

import {
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback
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
import BusinessCard from "../../MiniComponents/BusinessCard";
import * as actionCreators from "../../../store/actions";
// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";
import { heightPercentageToDP } from "react-native-responsive-screen";

class BusinessList extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    Segment.screen("Business List Screen");
  }
  render() {
    const list = this.props.businessAccounts.map(business => (
      <BusinessCard business={business} key={business.businessid} />
    ));
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <View padder style={[styles.mainCard]}>
          <Text style={styles.title}>Switch Business</Text>
          <View
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginBottom: 20,
              paddingBottom: 10
            }}
          >
            <Text style={[styles.text, { alignSelf: "center" }]}>
              You can switch between businesses here.
            </Text>
          </View>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {list}
          </ScrollView>
          <Button
            style={[styles.bottomCard, { justifyContent: "center" }]}
            onPress={() =>
              this.props.navigation.navigate("CreateBusinessAccount")
            }
          >
            <Text style={styles.subtext}>+ Add a new Business </Text>
          </Button>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.auth.mainBusiness,
  businessAccounts: state.auth.businessAccounts
});

const mapDispatchToProps = dispatch => ({
  updateCampaignList: id => dispatch(actionCreators.updateCampaignList(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessList);
