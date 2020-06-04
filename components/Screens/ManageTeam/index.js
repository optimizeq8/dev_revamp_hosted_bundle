import React, { Component } from "react";
import { Text, View, RefreshControl } from "react-native";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import { SafeAreaView, ScrollView, NavigationEvents } from "react-navigation";
import Header from "../../MiniComponents/Header";
import * as Icons from "../../../assets/SVGs/MenuIcons/index";
import styles from "./Styles";
import AddMember from "./AddMemberButton";
import TeamMember from "./TeamMember";
import analytics from "@segment/analytics-react-native";

class ManageTeam extends Component {
  translate = this.props.screenProps.translate;
  componentDidMount() {
    this.props.getTeamMembers(this.props.mainBusiness.businessid);
  }
  onDidFocus = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`team_management_members_list`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
    });
  };

  onRefresh = () => {
    const source = "team_management_members_list";
    const source_action = "a_refresh_list";

    analytics.track(`a_refresh_list`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
      refresh_type: "members",
    });
    this.props.getTeamMembers(this.props.mainBusiness.businessid);
  };
  render() {
    let team = (this.props.agencyTeamMembers.length > 0
      ? this.props.agencyTeamMembers
      : [{ userid: 1 }, { userid: 2 }]
    ).map((member) => (
      <TeamMember
        key={member.userid}
        navigation={this.props.navigation}
        member={member}
        screenProps={this.props.screenProps}
        mainBusiness={this.props.mainBusiness}
        loadingTeamMembers={this.props.loadingTeamMembers}
      />
    ));
    let pendingInvites = [];
    if (this.props.pendingTeamInvites)
      pendingInvites = this.props.pendingTeamInvites.map((invite) => (
        <TeamMember
          key={invite.appuserid}
          navigation={this.props.navigation}
          member={invite}
          screenProps={this.props.screenProps}
          mainBusiness={this.props.mainBusiness}
          loadingTeamMembers={this.props.loadingTeamMembers}
          isPending={true}
          inviteTeamMember={this.props.inviteTeamMember}
        />
      ));

    return (
      <SafeAreaView
        style={{ height: "100%" }}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <Header
          screenProps={this.props.screenProps}
          title={"Manage Team"}
          navigation={this.props.navigation}
          segment={{
            source: "team_management_members_list",
            source_action: "a_go_back",
          }}
        />
        <Icons.GroupTransparentIcon
          style={styles.groupIconStyle}
          width={60}
          height={60}
        />
        <ScrollView
          contentContainerStyle={{ paddingBottom: "40%", height: "100%" }}
          refreshControl={
            <RefreshControl
              tintColor={"white"}
              refreshing={this.props.loadingTeamMembers}
              onRefresh={this.onRefresh}
            />
          }
        >
          {team}
          {this.props.pendingTeamInvites.length > 0 && (
            <View style={{ top: 20 }}>
              <Text style={styles.title}>{this.translate("Pending")}</Text>
              {pendingInvites}
            </View>
          )}
        </ScrollView>
        {this.props.mainBusiness.user_role === "1" && (
          <AddMember
            screenProps={this.props.screenProps}
            mainBusiness={this.props.mainBusiness}
            navigation={this.props.navigation}
            translate={this.translate}
          />
        )}
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
  agencyTeamMembers: state.account.agencyTeamMembers,
  pendingTeamInvites: state.account.pendingTeamInvites,
  loadingTeamMembers: state.account.loadingTeamMembers,
});

const mapDispatchToProps = (dispatch) => ({
  getTeamMembers: (businessId) =>
    dispatch(actionCreators.getTeamMembers(businessId)),
  inviteTeamMember: (info, resend) =>
    dispatch(actionCreators.inviteTeamMember(info, resend)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeam);
