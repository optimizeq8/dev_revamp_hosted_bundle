//Components
import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Button, Text, Container } from "native-base";
import { Segment } from "expo";
import BusinessCard from "../../MiniComponents/BusinessCard";

// Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

class BusinessList extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const list = this.props.businessAccounts.map(business => (
      <BusinessCard business={business} key={business.businessid} />
    ));
    return (
      <Container style={styles.container}>
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
