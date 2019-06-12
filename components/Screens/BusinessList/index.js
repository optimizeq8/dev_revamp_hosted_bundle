import React, { Component } from "react";
import { connect } from "react-redux";

import { View, ScrollView } from "react-native";
import { Button, Text, Container } from "native-base";
import { LinearGradient, Segment } from "expo";
import BusinessCard from "../../MiniComponents/BusinessCard";
import * as actionCreators from "../../../store/actions";
// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

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
          <Text style={styles.title}>Switch Account</Text>
          <Text style={[styles.text, styles.switchAccountText]}>
            You can switch between businesses here.
          </Text>
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {list}
          </ScrollView>
          <Button
            style={[styles.bottomCard]}
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
  mainBusiness: state.account.mainBusiness,
  businessAccounts: state.account.businessAccounts
});

const mapDispatchToProps = dispatch => ({
  updateCampaignList: id => dispatch(actionCreators.updateCampaignList(id))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessList);
