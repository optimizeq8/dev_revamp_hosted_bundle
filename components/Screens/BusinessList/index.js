//Components
import React, { Component } from "react";
import { View, ScrollView } from "react-native";
import { Button, Text, Container } from "native-base";
import SearchBar from "../../MiniComponents/SearchBar";
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
    this.state = { filteredBusinesses: this.props.businessAccounts };
  }
  filterBusinesses = value => {
    this.setState({
      filteredBusinesses: this.props.businessAccounts.filter(
        bus =>
          bus.businessname
            .trim()
            .toLowerCase()
            .includes(value.trim().toLowerCase()) ||
          bus.brandname
            .trim()
            .toLowerCase()
            .includes(value.trim().toLowerCase())
      )
    });
  };
  render() {
    const { translate } = this.props.screenProps;

    const list = this.state.filteredBusinesses.map(business => (
      <BusinessCard business={business} key={business.businessid} />
    ));
    return (
      <Container style={styles.container}>
        <View padder style={[styles.mainCard]}>
          <Text style={styles.title}>{translate("Switch Account")}</Text>
          <Text style={[styles.text, styles.switchAccountText]}>
            {translate("You can switch between businesses here")}
          </Text>
          <SearchBar
            screenProps={this.props.screenProps}
            filterBusinesses={this.filterBusinesses}
            businessList={true}
            height={"6%"}
          />
          <ScrollView contentContainerStyle={styles.contentContainer}>
            {list}
          </ScrollView>
          <Button
            style={[styles.bottomCard]}
            onPress={() =>
              this.props.navigation.navigate("CreateBusinessAccount")
            }
          >
            <Text style={styles.subtext}>
              + {translate("Add a new Business")}{" "}
            </Text>
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
