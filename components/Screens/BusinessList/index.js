//Components
import React, { Component } from "react";
import { View, ScrollView, RefreshControl } from "react-native";
import { Button, Text, Container } from "native-base";
import SearchBar from "../../MiniComponents/SearchBar";
import BusinessCard from "../../MiniComponents/BusinessCard";
import * as businessIcons from "../../../assets/SVGs/BusinessIcons";

// Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import { heightPercentageToDP } from "react-native-responsive-screen";

import InvitationCard from "./InvitationCard";

class BusinessList extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = { value: "", filteredBusinesses: this.props.businessAccounts };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.businessAccounts !== this.props.businessAccounts) {
      this.filterBusinesses(this.state.value);
    }
  }
  filterBusinesses = value => {
    let filteredBusinesses = this.props.businessAccounts.filter(
      bus =>
        bus.businessname
          .trim()
          .toLowerCase()
          .includes(value.trim().toLowerCase()) ||
        bus.brandname
          .trim()
          .toLowerCase()
          .includes(value.trim().toLowerCase())
    );
    this.setState({
      filteredBusinesses,
      value
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
          <View style={{ height: heightPercentageToDP(55) }}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.props.businessesLoading}
                  onRefresh={() => this.props.getBusinessAccounts()}
                />
              }
              contentContainerStyle={styles.contentContainer}
            >
              {this.props.businessInvitee &&
              this.props.userInfo.email === this.props.invitedEmail ? (
                <InvitationCard
                  handleTeamInvite={this.props.handleTeamInvite}
                  tempInviteId={this.props.tempInviteId}
                  businessInvitee={this.props.businessInvitee}
                  navigation={this.props.navigation}
                />
              ) : null}
              <Text uppercase style={[styles.headings]}>
                Businesses
              </Text>
              {list}
            </ScrollView>
          </View>
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
  businessAccounts: state.account.businessAccounts,
  businessesLoading: state.account.businessesLoading,
  businessInvitee: state.account.businessInvitee,
  tempInviteId: state.account.tempInviteId,
  invitedEmail: state.account.invitedEmail
});

const mapDispatchToProps = dispatch => ({
  getBusinessAccounts: () => dispatch(actionCreators.getBusinessAccounts()),
  updateCampaignList: id => dispatch(actionCreators.updateCampaignList(id)),
  handleTeamInvite: status => dispatch(actionCreators.handleTeamInvite(status))
});
export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);
