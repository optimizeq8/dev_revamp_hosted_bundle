import React, { Component } from "react";
import { View, Modal, Platform } from "react-native";
import { Button, Text } from "native-base";
import {
  SafeAreaView,
  NavigationActions,
  StackActions
} from "react-navigation";
import * as Segment from "expo-analytics-segment";
//Icons
import Suspended from "../../../assets/SVGs/Suspended";
import GradientButton from "../../MiniComponents/GradientButton";
import CustomHeader from "../../MiniComponents/Header";

//styles
import styles from "./styles";
export default class SuspendedWarning extends Component {
  componentDidMount() {
    Segment.screen("Suspended Warning");
  }
  render() {
    const { translate } = this.props.screenProps;

    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <View style={styles.popupOverlay}>
          <View
            style={{
              justifyContent: "center",
              flex: 1,
              alignSelf: "center"
            }}
          >
            <Suspended
              width={285}
              height={322}
              style={{ alignSelf: "center", marginBottom: 20 }}
            />
            <Text
              uppercase
              style={[styles.title, { fontSize: 16, alignSelf: "center" }]}
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
                let continueRoutes = ["Dashboard", "MessengerLoading"].map(
                  route =>
                    NavigationActions.navigate({
                      routeName: route
                    })
                );
                //resets the navigation stack
                resetAction = StackActions.reset({
                  index: continueRoutes.length - 1, //index of the last screen route
                  actions: continueRoutes
                });

                this.props.navigation.dispatch(resetAction);
              }}
              textStyle={styles.buttontext}
              text={translate("Get in touch")}
              uppercase={true}
            />
            <GradientButton
              transparent={true}
              style={styles.whitebutton}
              onPressAction={() => {
                this.props.navigation.goBack();
              }}
              textStyle={styles.whitebuttontext}
              text={translate("Go Back")}
              uppercase={true}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
