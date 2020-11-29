import React, { Component } from "react";
import { View, Text } from "react-native";
import analytics from "@segment/analytics-react-native";
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
export default class SuspendedWarning extends Component {
  onDidFocus = () => {
    const source = this.props.navigation.getParam("source", "");
    const source_action = this.props.navigation.getParam("source_action", "");
    analytics.track("suspended_warning", {
      source,
      source_action,
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
              width={285}
              height={322}
              style={{ alignSelf: "center", marginBottom: 20 }}
            />
            <Text style={[styles.title, { fontSize: 16, alignSelf: "center" }]}>
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
                Intercom.displayMessageComposer();
                // let continueRoutes = [
                //   // "Dashboard",
                //   "Messenger",
                // ].map((route) =>
                //   NavigationActions.navigate({
                //     routeName: route,
                //   })
                // );
                //resets the navigation stack
                let resetAction = StackActions.reset({
                  index: 0,

                  // continueRoutes.length - 1, //index of the last screen route
                  //   actions: continueRoutes,
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
