import React from "react";
import { View, Text, BackHandler } from "react-native";
import analytics from "@segment/analytics-react-native";
import {
  SafeAreaView,
  NavigationEvents,
  NavigationActions,
  StackActions,
} from "react-navigation";
import { Container } from "native-base";
import LottieView from "lottie-react-native";
import { showMessage } from "react-native-flash-message";

import ChatBot from "../../../assets/SVGs/ChatBot";
import CustomHeader from "../../MiniComponents/Header";
import ErrorComponent from "../../MiniComponents/ErrorComponent";

import styles from "./styles";

//Redux
import * as actionCreators from "../../../store/actions/";
import { connect } from "react-redux";

class LoadingChatScreen extends React.Component {
  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );

    analytics.track(`open_support_loading`, {
      source,
      source_action,
      support_type: "intercom",
      timestamp: new Date().getTime(),
      device_id: this.props.screenProps.device_id,
    });

    this.props.connect_user_to_intercom(this.props.userInfo.userid);
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentDidUpdate(prevProps) {
    if (
      prevProps.loading_con !== this.props.loading_con &&
      !this.props.loading_con
    ) {
      if (!this.props.loading_failed) {
        let continueRoutes = ["Dashboard", "Messenger"].map((route) =>
          NavigationActions.navigate({
            routeName: route,
            params: {
              source: "open_support_loading",
              source_action: "a_connecting_to_messenger",
            },
          })
        );
        //resets the navigation stack
        resetAction = StackActions.reset({
          index: continueRoutes.length - 1, //index of the last screen route
          actions: continueRoutes,
        });
        this.props.navigation.dispatch(resetAction);
      }
    }
  }

  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Container style={[styles.container]}>
          <CustomHeader
            screenProps={this.props.screenProps}
            closeButton={true}
            title={"Support"}
            navigation={this.props.navigation}
            segment={{
              source: "open_support",
              source_action: "a_go_back",
            }}
          />

          <View style={styles.flexView}>
            <LottieView
              ref={(animation) => {
                this.animation = animation;
              }}
              style={styles.loadingAnimation}
              resizeMode="contain"
              source={require("../../../assets/animation/update_loader.json")}
              loop={true}
              autoPlay
            />
            <Text style={styles.connectingAgentText}>
              {translate("Connecting you to Your Agent")}
            </Text>
          </View>
          <View style={styles.chatBotView}>
            <ChatBot />
          </View>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  loading_failed: state.messenger.loading_failed,
  user: state.messenger.user,
  messages: state.messenger.messages,
  loading_con: state.messenger.loading_con,
  subscribed: state.messenger.subscribed,
  open_conversation: state.messenger.open_conversation,
});

const mapDispatchToProps = (dispatch) => ({
  connect_user_to_intercom: (user_id) =>
    dispatch(actionCreators.connect_user_to_intercom(user_id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingChatScreen);
