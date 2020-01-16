//Components
import React, { Component, Fragment } from "react";
import { View, FlatList } from "react-native";
import { Button, Text, Container } from "native-base";
import SearchBar from "../../MiniComponents/SearchBar";
import BusinessCard from "../../MiniComponents/BusinessCard";

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
    this.state = {
      value: "",
      filteredBusinesses: [{ businessid: "-1" }].concat(
        //adding that dummy data so that i can show the invitation cards in the flatlist
        this.props.businessAccounts
      )
    };
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
      filteredBusinesses: [{ businessid: "-1" }].concat(filteredBusinesses),
      value
    });
  };

  renderBusinessCards = item => {
    let business = item.item;
    const { translate } = this.props.screenProps;
    if (business.businessid === "-1") {
      return (
        <Fragment key={business.businessid}>
          {(this.props.businessInvitee &&
            this.props.userInfo.email === this.props.invitedEmail) ||
          this.props.businessInvites ? (
            <InvitationCard
              handleTeamInvite={this.props.handleTeamInvite}
              tempInviteId={this.props.tempInviteId}
              businessInvitee={this.props.businessInvitee}
              navigation={this.props.navigation}
            />
          ) : null}
        </Fragment>
      );
    } else
      return (
        <Fragment key={business.businessid}>
          {item.index === 1 ? (
            <Text uppercase style={[styles.headings]}>
              {translate("Businesses")}
            </Text>
          ) : null}
          <BusinessCard business={business} />
        </Fragment>
      );
  };
  render() {
    const { translate } = this.props.screenProps;
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
            <FlatList
              contentContainerStyle={styles.contentContainer}
              keyExtractor={item => item.businessid}
              data={this.state.filteredBusinesses}
              initialNumToRender={10}
              renderItem={this.renderBusinessCards}
              onRefresh={this.props.getBusinessAccounts}
              refreshing={this.props.businessesLoading}
            />
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
  invitedEmail: state.account.invitedEmail,
  businessInvites: state.account.businessInvites
});

const mapDispatchToProps = dispatch => ({
  getBusinessAccounts: () => dispatch(actionCreators.getBusinessAccounts()),
  updateCampaignList: id => dispatch(actionCreators.updateCampaignList(id)),
  handleTeamInvite: status => dispatch(actionCreators.handleTeamInvite(status))
});
export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);
