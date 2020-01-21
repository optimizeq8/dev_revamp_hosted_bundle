//Components
import React, { Component, Fragment } from "react";
import { View, FlatList, TouchableOpacity } from "react-native";
import { Text, Container, Icon } from "native-base";
import SearchBar from "../../MiniComponents/SearchBar";
import BusinessCard from "../../MiniComponents/BusinessCard";
import InvitationCard from "./InvitationCard";

// Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import globalStyles from "../../../GlobalStyles";
import GradientButton from "../../MiniComponents/GradientButton";
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
      ),
      bottomOffset: 0
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

  /**
   * Gets height and y postion of the Text component so that  the plus button is
   * a close postion on different phones
   */
  handleButtonOffset = event => {
    const layout = event.nativeEvent.layout;
    this.setState({
      bottomOffset: layout.height + layout.y
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <Container style={styles.container}>
        <View padder style={[styles.mainCard]}>
          <Text style={styles.title}>{translate("Switch Business")}</Text>
          <Text
            onLayout={this.handleButtonOffset}
            style={[styles.text, styles.switchAccountText]}
          >
            {translate("You can switch between businesses here")}
          </Text>
          <SearchBar
            screenProps={this.props.screenProps}
            filterBusinesses={this.filterBusinesses}
            businessList={true}
            customInputStyle={styles.customInputStyle}
            height={"7%"}
            strokeColor={"#a0a0a0"}
            placeholderColor={globalStyles.lightGrayTextColor.color}
          />
          <View style={styles.flatlistWrapper}>
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
          <GradientButton
            style={[
              styles.bottomCard,
              {
                bottom: this.state.bottomOffset
              }
            ]}
            radius={50}
            onPressAction={() =>
              this.props.navigation.navigate("CreateBusinessAccount")
            }
          >
            <Icon
              name="plus"
              type="MaterialCommunityIcons"
              style={styles.iconStyle}
            />
          </GradientButton>
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
