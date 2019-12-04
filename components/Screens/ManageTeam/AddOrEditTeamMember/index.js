import React, { Component } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { connect } from "react-redux";
import AddTeamIcon from "../../../../assets/SVGs/AddTeam";
import Header from "../../../MiniComponents/Header";
import AddMember from "../AddMemberButton";
import * as actionCreators from "../../../../store/actions";
import styles from "./styles";
import { showMessage } from "react-native-flash-message";
import { Button, Text, Content } from "native-base";
import { globalColors } from "../../../../GlobalStyles";
import * as Animatable from "react-native-animatable";
import MemberTypes from "./MemberTypes";
import InputFields from "./InputFields";

class AddOrEditTeamMember extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    userRole: 0,
    // numOfAccounts: 0,
    // accountIds: "",
    incomplete: false,
    isVisible: false,
    firstNameError: "",
    lastNameError: "",
    emailError: ""
  };
  translate = this.props.screenProps.translate;

  componentDidMount() {
    if (this.props.navigation.getParam("editTeamMember", false)) {
      let teamMeber = this.props.navigation.getParam("member", {});
      this.setState({
        firstName: teamMeber.firstname,
        lastName: teamMeber.lastname,
        email: teamMeber.email,
        userRole: parseInt(teamMeber.user_role)
      });
    }
  }

  /**
   * Gets passed to a child component so that the parent's sate can
   * be updated
   *
   * @param {String} stateName the name of the state's key to update
   * @param {Any}  value any value that needs to be updated
   */
  setValue = (stateName, value) => {
    let state = {};
    state[stateName] = value;
    this.setState({ ...state });
  };

  /**
   * Creates or overwrites the error values in the parent's state to check when submitting
   *
   * @param {String} stateError a string concatenation of stateName +"Error"
   * @param {null||String} validWrap a variable of validateWrapper passed from the child
   */
  getValidInfo = (stateError, validWrap) => {
    let state = {};
    state[stateError] = validWrap;
    this.setState({
      ...state
    });
  };

  /**
   * Handles the switches for user roles
   *
   * @param {Int} userRole a number to indicate which user role is selected
   */
  handleMemberType = userRole => {
    this.setState({
      //if none of the switches are selected then set the state to 0
      userRole: userRole === this.state.userRole ? 0 : userRole
    });
  };

  /**
   * Handles the submission of the form
   */
  handleInvite = () => {
    let {
      firstName,
      lastName,
      email,
      userRole,
      emailError,
      lastNameError,
      firstNameError
    } = this.state;
    let currentUserEmail = email === this.props.userInfo.email;
    //if userRole is 0 then it means none of the switches are selected
    const userRoleError = userRole === 0;
    this.setState({ userRoleError });
    if (currentUserEmail) {
      showMessage({
        message: this.translate(
          "You can't add yourself to the same business account."
        ),
        type: "warning"
      });
    } else if (
      !firstNameError &&
      !lastNameError &&
      !emailError &&
      !userRoleError
    ) {
      this.props.inviteTeamMember({
        firstname: firstName,
        lastname: lastName,
        email,
        user_role: userRole,
        businessid: this.props.mainBusiness.businessid
      });
    } else {
      showMessage({
        message: this.translate("Please fill out the form"),
        type: "warning"
      });
      //incomplete is set to signal the child components to play the animations of shaking
      this.setState({ incomplete: true });
    }
  };

  /**
   * Handles updating an existing team member, mostly same concept as handleInvite
   */
  updateMember = () => {
    //Receives an object for the member from the list of team members
    let teamMember = this.props.navigation.getParam("member", {});
    let { userRole } = this.state;
    const userRoleError = userRole === 0;
    this.setState({ userRoleError });
    if (!userRoleError) {
      this.props.updateTeamMembers({
        userrole: userRole,
        userid: teamMember.userid,
        businessid: this.props.mainBusiness.businessid
      });
    } else {
      showMessage({
        message: this.translate("Please Choose a role for the team member."),
        type: "warning"
      });
      //incomplete is set to signal the child components to play the animations of shaking
      this.setState({ incomplete: true });
    }
  };

  render() {
    let {
      firstName,
      lastName,
      email,
      userRole,
      incomplete,
      userRoleError,
      firstNameError,
      lastNameError,
      emailError
    } = this.state;
    let editTeamMember = this.props.navigation.getParam(
      "editTeamMember",
      false
    );

    return (
      <SafeAreaView
        style={{ height: "100%" }}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Header
          screenProps={this.props.screenProps}
          title={editTeamMember ? "Edit team member" : "Add team member"}
          navigation={this.props.navigation}
        />
        <Content contentContainerStyle={{ flex: 1 }}>
          <AddTeamIcon
            style={{ alignSelf: "center", marginBottom: 10 }}
            width={50}
            height={50}
          />
          {InputFields(
            {
              firstName,
              lastName,
              email,
              emailError,
              firstNameError,
              lastNameError,
              incomplete,
              editTeamMember
            },
            this.setValue,
            this.getValidInfo,
            this.translate
          )}

          {/* Commented out for now until we decide if we want to 
            add members to multiple accounts 
            <BusinessModal
              handleAccounts={this.handleAccounts}
              numOfAccounts={numOfAccounts}
              businessAccounts={this.props.businessAccounts}
              screenProps={this.props.screenProps}
              isVisible={isVisible}
            />
          */}

          <Animatable.View
            onAnimationEnd={() => this.setState({ userRoleError: false })}
            duration={200}
            easing={"ease"}
            style={styles.membersTypes}
            animation={userRoleError ? "shake" : ""}
          >
            {MemberTypes(this.handleMemberType, userRole, this.translate)}
          </Animatable.View>
        </Content>

        {editTeamMember ? (
          <View style={{ flex: 0.25 }}>
            <Button onPress={this.updateMember} style={styles.deleteTeamMember}>
              <Text uppercase style={styles.deleteText}>
                {this.translate("Update")}
              </Text>
            </Button>
            <Button
              onPress={() =>
                this.props.deleteTeamMembers(
                  this.props.navigation.getParam("member", {}).userid,
                  this.props.mainBusiness.businessid,
                  this.props.navigation
                )
              }
              style={[
                styles.deleteTeamMember,
                { backgroundColor: globalColors.red }
              ]}
            >
              <Text uppercase style={[styles.deleteText]}>
                {this.translate("Delete")}
              </Text>
            </Button>
          </View>
        ) : (
          <AddMember
            translate={this.translate}
            sendInvite={true}
            submitFunction={this.handleInvite}
          />
        )}
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  businessAccounts: state.account.businessAccounts,
  userInfo: state.auth.userInfo,
  mainBusiness: state.account.mainBusiness,
  numberOfTeamAdmins: state.account.numberOfTeamAdmins
});
const mapDispatchToProps = dispatch => ({
  inviteTeamMember: info => dispatch(actionCreators.inviteTeamMember(info)),
  updateTeamMembers: memberInfo =>
    dispatch(actionCreators.updateTeamMembers(memberInfo)),
  updateTeamMemberForBusinesses: memberInfo =>
    dispatch(actionCreators.updateTeamMemberForBusinesses(memberInfo)),
  deleteTeamMembers: (memberId, businessid, navigation) =>
    dispatch(actionCreators.deleteTeamMembers(memberId, businessid, navigation))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddOrEditTeamMember);

//----was in componentDidUpdate----//
// else if (!this.props.mainBusiness.mainBusinessForuser) {
//   this.setState({
//     numOfAccounts: 1,
//     accountIds: this.props.mainBusiness.businessid
//   });
// }

/*To add members to multiple accounts at the same time, commented for now in 
    case we want to use it in the future   

  setModalVisible = isVisible => {
    this.setState({ isVisible });
  };
  handleAccounts = account => {
    let accountIds = this.state.accountIds;
    let numOfAccounts = this.state.numOfAccounts;
    if (account.isSelected) {
      numOfAccounts += 1;
      accountIds += account.businessid + ",";
    } else {
      numOfAccounts -= 1;
      accountIds = accountIds.replace(`${account.businessid},`, "");
    }
    this.setState({
      accountIds,
      numOfAccounts
    });
  };
  */
