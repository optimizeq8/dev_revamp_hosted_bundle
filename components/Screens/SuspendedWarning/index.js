import React, { Component } from "react";
import { View, Text } from "react-native";
import analytics from "@segment/analytics-react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { connect } from "react-redux";
import Intercom from "react-native-intercom";
import {
  NavigationActions,
  StackActions,
  NavigationEvents,
} from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";

//Icons
import Suspended from "../../../assets/SVGs/Suspended";
import GradientButton from "../../MiniComponents/GradientButton";

//styles
import styles from "./styles";
class SuspendedWarning extends Component {
  onDidFocus = () => {
    const source = this.props.navigation.getParam("source", "");
    const source_action = this.props.navigation.getParam("source_action", "");
    analytics.track("suspended_warning", {
      source,
      source_action,
      businessid: this.props.mainBusiness && this.props.mainBusiness.businessid,
    });
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <View style={styles.popupOverlay}>
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              alignSelf: "center",
            }}
          >
            <Suspended
              width={RFValue(144.5, 414)}
              height={RFValue(161, 414)}
              style={{ alignSelf: "center", marginBottom: RFValue(10, 414) }}
            />
            <Text
              style={[
                styles.title,
                { fontSize: RFValue(8, 414), alignSelf: "center" },
              ]}
            >
              {translate("Account Suspended")}
            </Text>
            <Text style={[styles.pauseDes]}>
              {translate(
                "Your account has been suspended, please get in touch to review your issue"
              )}
            </Text>

            <GradientButton
              style={styles.button}
              onPressAction={() => {
                analytics.track(`a_help`, {
                  source: "suspended_warning",
                  source_action: "a_help",
                  support_type: "intercom",
                });
                // Intercom.displayMessageComposer();
                Intercom.displayConversationsList();
                let source = this.props.navigation.getParam("source", "");
                let continueRoutes = (source !== "app_crash"
                  ? ["Dashboard"]
                  : ["SuspendedWarning"]
                ).map((route) =>
                  NavigationActions.navigate({
                    routeName: route,
                  })
                );
                //resets the navigation stack
                let resetAction = StackActions.reset({
                  index: continueRoutes.length - 1, //index of the last screen route
                  actions: continueRoutes,
                });

                this.props.navigation.dispatch(resetAction);
              }}
              textStyle={styles.buttontext}
              text={translate("Get in touch")}
              uppercase={true}
            />
            {/* <GradientButton
              transparent={true}
              style={styles.whitebutton}
              onPressAction={() => {
                this.props.navigation.goBack();
              }}
              textStyle={styles.whitebuttontext}
              text={translate("Go Back")}
              uppercase={true}
            /> */}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
});

export default connect(mapStateToProps, null)(SuspendedWarning);
