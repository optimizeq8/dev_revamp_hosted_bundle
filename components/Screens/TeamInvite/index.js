import React, { Component } from "react";
import { Text, View, I18nManager } from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import Header from "../../MiniComponents/Header";
import { connect } from "react-redux";
import AddTeamIcon from "../../../assets/SVGs/AddTeam";
import * as actionCreators from "../../../store/actions";
import styles from "./styles";
import GradientButton from "../../MiniComponents/GradientButton";
import analytics from "@segment/analytics-react-native";
import { Bold } from "../../MiniComponents/StyledComponents";
import Loading from "../../MiniComponents/LoadingScreen";
class TeamInvite extends Component {
  state = { wrongEmail: false, loggedOut: false };
  componentDidMount() {
    if (this.props.navigation.getParam("v", false)) {
      this.checkTeamInvite();
    } else if (this.props.businessInvitee) {
      this.props.navigation.setParams({
        v: this.props.tempInviteId,
        email: this.props.invitedEmail,
        business: this.props.businessInvitee,
      });
      this.checkTeamInvite();
    }
  }

  /**
   * Saves the navigation params in the store and checks if the correct invited user is logged in
   */
  checkTeamInvite = () => {
    if (
      this.props.navigation.getParam("v", false) &&
      this.props.navigation.getParam("business", false)
    ) {
      this.props.saveBusinessInvitee({
        tempInviteId: this.props.navigation.getParam("v", ""),
        businessInvitee: this.props.navigation.getParam("business", ""),
        invitedEmail: this.props.navigation.getParam("email", false),
      });
      if (!this.props.userInfo) {
        this.setState({ loggedOut: true });
      } else if (
        this.props.userInfo &&
        this.props.navigation.getParam("email", false) !==
          this.props.userInfo.email
      ) {
        this.setState({
          wrongEmail: true,
        });
      }
    }
  };

  /**
   * handles the accept button's function
   */
  handleCheckingInvite = () => {
    let {
      navigation,
      userInfo,
      clearPushToken,
      logout,
      tempInviteId,
    } = this.props;
    if (this.state.wrongEmail || this.state.loggedOut) {
      if (userInfo) clearPushToken(navigation, userInfo.userid);
      else logout(navigation);
    } else {
      //Accept invite
      this.props.handleTeamInvite(
        { status: 1, v: tempInviteId },
        {
          source: "team_invite",
          source_action: "a_accept_invite",
          invite_status: 1,
          invite_v: tempInviteId,
        }
      );
    }
  };
  onDidFocus = () => {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    let { businessInvitee } = this.props;
    analytics.track(`team_invite`, {
      source,
      source_action,
      invite_business: businessInvitee,
    });
    this.checkTeamInvite();
  };
  render() {
    let { wrongEmail, loggedOut } = this.state;
    let { businessInvitee, userInfo, tempInviteId } = this.props;

    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <Header
          screenProps={this.props.screenProps}
          actionButton={() => {
            this.props.navigation.navigate(userInfo ? "Dashboard" : "Signin", {
              v: this.props.tempInviteId,
              email: this.props.invitedEmail,
              business: this.props.businessInvitee,
              source: "team_invite",
              source_action: "a_go_back",
            });
          }}
          segment={{
            source: "team_invite",
            source_action: "a_go_back",
          }}
        />
        <View style={styles.containerView}>
          <AddTeamIcon style={{ alignSelf: "center" }} />
          <Text style={styles.title}>{translate("INVITATION")}</Text>
          <Text style={[styles.text, styles.joinText]}>
            {translate("You have been invited to join")}
          </Text>
          <Text style={[styles.text, styles.businessName]}>
            {businessInvitee}
          </Text>

          {(wrongEmail || loggedOut) && (
            <Text style={[styles.wrongEmailText]}>
              {translate("Please sign in with the correct email to accept")}
              <Bold>
                {"\n" + this.props.navigation.getParam("email", false)}
              </Bold>
            </Text>
          )}
          <GradientButton
            uppercase={true}
            radius={30}
            onPressAction={this.handleCheckingInvite}
            style={styles.button}
            textStyle={styles.textButton}
            text={
              loggedOut
                ? translate("Sign in")
                : wrongEmail
                ? translate("Logout")
                : translate("Accept")
            }
          ></GradientButton>
          {!wrongEmail && (
            <GradientButton
              uppercase={true}
              radius={30}
              transparent={true}
              onPressAction={() =>
                this.props.handleTeamInvite(
                  { status: 0, v: tempInviteId },
                  {
                    source: "team_invite",
                    source_action: "a_decline_invite",
                    invite_status: 0,
                    invite_v: tempInviteId,
                  }
                )
              }
              style={[styles.button, styles.borderWhite]}
              textStyle={styles.textButton}
              text={translate("Decline")}
            />
          )}
        </View>
        {this.props.teamInviteLoading && <Loading dash />}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  businessInvitee: state.account.businessInvitee,
  tempInviteId: state.account.tempInviteId,
  invitedEmail: state.account.invitedEmail,
  teamInviteLoading: state.account.teamInviteLoading,
});

const mapDispatchToProps = (dispatch) => ({
  clearPushToken: (navigation, userid) =>
    dispatch(actionCreators.clearPushToken(navigation, userid)),
  logout: (nav) => dispatch(actionCreators.logout(nav)),
  handleTeamInvite: (status, segmentInfo) =>
    dispatch(actionCreators.handleTeamInvite(status, segmentInfo)),
  saveBusinessInvitee: (inviteeInfo) =>
    dispatch(actionCreators.saveBusinessInvitee(inviteeInfo)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamInvite);
