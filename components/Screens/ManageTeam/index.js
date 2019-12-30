import React, { Component } from "react";
import { Text, View, RefreshControl } from "react-native";
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import { SafeAreaView, ScrollView } from "react-navigation";
import Header from "../../MiniComponents/Header";
import * as Icons from "../../../assets/SVGs/MenuIcons/index";
import styles from "./Styles";
import AddMember from "./AddMemberButton";
import TeamMember from "./TeamMember";

class ManageTeam extends Component {
  translate = this.props.screenProps.translate;
  componentDidMount() {
    this.props.getTeamMembers(this.props.mainBusiness.businessid);
  }
  render() {
    let team = (this.props.agencyTeamMembers.length > 0
      ? this.props.agencyTeamMembers
      : [{ userid: 1 }, { userid: 2 }]
    ).map(member => (
      <TeamMember
        key={member.userid}
        navigation={this.props.navigation}
        member={member}
        screenProps={this.props.screenProps}
        mainBusiness={this.props.mainBusiness}
        loadingTeamMembers={this.props.loadingTeamMembers}
      />
    ));
    let pendingInvites = this.props.pendingTeamInvites.map(invite => (
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
        <Header
          screenProps={this.props.screenProps}
          title={"Manage Team"}
          navigation={this.props.navigation}
        />
        <Icons.GroupTransparentIcon
          style={styles.groupIconStyle}
          width={60}
          height={60}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              tintColor={"white"}
              refreshing={this.props.loadingTeamMembers}
              onRefresh={() =>
                this.props.getTeamMembers(this.props.mainBusiness.businessid)
              }
            />
          }
        >
          {team}
          <View style={{ top: 20 }}>
            <Text style={styles.title}>Pending</Text>
            {pendingInvites}
          </View>
        </ScrollView>
        <AddMember
          mainBusiness={this.props.mainBusiness}
          navigation={this.props.navigation}
          translate={this.translate}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
  agencyTeamMembers: state.account.agencyTeamMembers,
  pendingTeamInvites: state.account.pendingTeamInvites,
  loadingTeamMembers: state.account.loadingTeamMembers
});

const mapDispatchToProps = dispatch => ({
  getTeamMembers: businessId =>
    dispatch(actionCreators.getTeamMembers(businessId)),
  inviteTeamMember: info => dispatch(actionCreators.inviteTeamMember(info))
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeam);
