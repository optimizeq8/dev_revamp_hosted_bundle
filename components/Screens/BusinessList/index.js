//Components
import React, { Component, Fragment } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import analytics from "@segment/analytics-react-native";
import { Container, Icon } from "native-base";
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
import { unionBy } from "lodash";
const tabs = [
  {
    name: "Businesses",
    key: "0",
  },
  {
    name: "INVITATION",
    key: "-1",
  },
];
class BusinessList extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      filteredBusinesses: [{ businessid: "-1" }].concat(
        //adding that dummy data so that i can show the invitation cards in the flatlist
        this.props.businessAccounts
      ),
      activeTab: "Businesses",
    };
  }
  componentDidUpdate(prevProps) {
    if (prevProps.businessAccounts !== this.props.businessAccounts) {
      this.filterBusinesses(this.state.value);
    }
    if (
      prevProps.businessSearchLoading !== this.props.businessSearchLoading &&
      this.props.searchedBusinessesList !== prevProps.searchedBusinessesList
    ) {
      let filteredBusinesses = unionBy(
        this.state.filteredBusinesses,
        this.props.searchedBusinessesList,
        "businessid"
      );
      this.setState({
        filteredBusinesses: [{ businessid: "-1" }].concat(
          ...filteredBusinesses
        ),
      });
    }
  }
  filterBusinesses = async (value) => {
    let filteredBusinesses = this.props.businessAccounts.filter(
      (bus) =>
        bus.businessname
          .trim()
          .toLowerCase()
          .includes(value.trim().toLowerCase()) ||
        bus.brandname.trim().toLowerCase().includes(value.trim().toLowerCase())
    );

    if (value.length >= 3) {
      await this.props.searchForBusinessInBackend(value);
    }
    this.setState({
      filteredBusinesses: [{ businessid: "-1" }].concat(...filteredBusinesses),
      value,
    });
  };

  renderBusinessCards = (item) => {
    let business = item.item;
    const { translate } = this.props.screenProps;
    if (this.state.activeTab === "INVITATION" && business.businessid === "-1") {
      return (
        <Fragment key={business.businessid}>
          {(this.props.businessInvitee &&
            this.props.userInfo.email === this.props.invitedEmail) ||
          this.props.businessInvites ? (
            <InvitationCard
              screenProps={this.props.screenProps}
              handleTeamInvite={this.props.handleTeamInvite}
              tempInviteId={this.props.tempInviteId}
              businessInvitee={this.props.businessInvitee}
              navigation={this.props.navigation}
            />
          ) : null}
        </Fragment>
      );
    } else if (
      business.businessid !== "-1" &&
      this.state.activeTab === "Businesses"
    )
      return (
        <Fragment key={business.businessid}>
          <BusinessCard
            screenProps={this.props.screenProps}
            business={business}
          />
        </Fragment>
      );
    else return null;
  };

  /**
   * Gets height and y postion of the Text component so that  the plus button is
   * a close postion on different phones
   */
  handleButtonOffset = (event) => {
    const layout = event.nativeEvent.layout;
    this.setState({
      bottomOffset: layout.height + layout.y,
    });
  };

  changeActiveTab = () => {
    this.setState({
      activeTab:
        this.state.activeTab === "Businesses" ? "INVITATION" : "Businesses",
    });
  };
  createNewBuiness = () => {
    analytics.track(`a_create_buiness_account`, {
      source: "open_hamburger",
      source_action: `a_create_buiness_account`,
      action_status: "success",
      timestamp: new Date().getTime(),
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
    let userNotVerified =
      this.props.userInfo &&
      this.props.userInfo.hasOwnProperty("verified_account") &&
      !this.props.userInfo.verified_account;
    let notApproved = this.props.businessAccounts.some(
      (bsn) => bsn.approved === "0"
    );
    let userisSuperAdmin =
      this.props.userInfo &&
      this.props.userInfo.hasOwnProperty("superadmin") &&
      this.props.userInfo.superadmin;

    let routePath = "CreateBusinessAccount";
    if (userNotVerified) {
      routePath = "VerifyAccount";
    } else if (notApproved && !userisSuperAdmin) {
      routePath = "VerifyBusiness";
    }

    this.props.navigation.navigate(routePath, {
      createNewBusiness: true,
      source: "open_hamburger",
      source_action: `a_create_buiness_account`,
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <Container style={styles.container}>
        <View style={[styles.mainCard]}>
          <Text style={styles.title}>{translate("Switch Business")}</Text>

          <View style={styles.tabView}>
            {tabs.map((tab) => {
              return (
                <TouchableOpacity
                  key={tab.key}
                  style={[
                    styles.touchTabView,
                    tab.name === this.state.activeTab && styles.activeTab,
                  ]}
                  onPress={this.changeActiveTab}
                >
                  {tab.name === "INVITATION" &&
                  this.props.businessInvites &&
                  this.props.businessInvites.length > 0 ? (
                    <View style={styles.pendingInviteView}>
                      <Text style={styles.pendingInviteNumber}>
                        {this.props.businessInvites.length}
                      </Text>
                    </View>
                  ) : (
                    <View style={{ width: 17, paddingVertical: 7 }} />
                  )}
                  <Text
                    style={[
                      styles.tabText,
                      tab.name === this.state.activeTab && styles.activeTab,
                    ]}
                  >
                    {translate(tab.name)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {this.state.activeTab === "Businesses" && (
            <SearchBar
              screenProps={this.props.screenProps}
              filterBusinesses={this.filterBusinesses}
              businessList={true}
              customInputStyle={styles.customInputStyle}
              customSearchBarStyle={styles.customSearchBarStyle}
              height={"7%"}
              strokeColor={"#a0a0a0"}
              placeholderColor={globalStyles.lightGrayTextColor.color}
              source={"open_hamburger"}
            />
          )}
          <View style={styles.flatlistWrapper}>
            {this.props.businessSearchLoading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                contentContainerStyle={styles.contentContainer}
                keyExtractor={(item) => item.businessid}
                data={this.state.filteredBusinesses}
                initialNumToRender={10}
                renderItem={this.renderBusinessCards}
                onRefresh={this.props.getBusinessAccounts}
                refreshing={this.props.businessesLoading}
                showsVerticalScrollIndicator={false}
              />
            )}
          </View>
          {this.state.activeTab === "INVITATION" &&
            (!this.props.businessInvites ||
              (this.props.businessInvites &&
                this.props.businessInvites.length === 0)) && (
              <Text style={[styles.noInviteText]}>
                {translate("No Invitations available")}
              </Text>
            )}
          {this.state.activeTab === "INVITATION" &&
            (!this.props.businessInvites ||
              (this.props.businessInvites &&
                this.props.businessInvites.length === 0)) && (
              <GradientButton
                uppercase
                transparent
                style={[styles.bottomCard2]}
                radius={50}
                textStyle={{
                  fontFamily: "montserrat-bold",
                  fontSize: RFValue(7, 414),
                  color: "#D2C6D8",
                }}
                text={"Refresh"}
                onPressAction={this.props.getBusinessAccounts}
              />
            )}
          {this.state.activeTab === "Businesses" && (
            <GradientButton
              // purpleViolet
              style={[styles.bottomCard]}
              radius={50}
              onPressAction={this.createNewBuiness}
            >
              <View style={styles.flex}>
                <Icon
                  name="plus"
                  type="MaterialCommunityIcons"
                  style={styles.iconStyle}
                />
                <Text style={styles.addNewBusinessText}>
                  {translate("Add a new Business")}
                </Text>
              </View>
            </GradientButton>
          )}
        </View>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  businessAccounts: state.account.businessAccounts,
  businessesLoading: state.account.businessesLoading,
  businessInvitee: state.account.businessInvitee,
  tempInviteId: state.account.tempInviteId,
  invitedEmail: state.account.invitedEmail,
  businessInvites: state.account.businessInvites,
  businessSearchLoading: state.account.businessSearchLoading,
  searchedBusinessesList: state.account.searchedBusinessesList,
});

const mapDispatchToProps = (dispatch) => ({
  getBusinessAccounts: () => dispatch(actionCreators.getBusinessAccounts()),
  updateCampaignList: (id) => dispatch(actionCreators.updateCampaignList(id)),
  handleTeamInvite: (status, segmentInfo) =>
    dispatch(actionCreators.handleTeamInvite(status, segmentInfo)),
  searchForBusinessInBackend: (businessNa, e) =>
    dispatch(actionCreators.searchForBusinessInBackend(businessNa, e)),
});
export default connect(mapStateToProps, mapDispatchToProps)(BusinessList);
