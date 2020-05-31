import React from "react";
import { View, Text, BackHandler } from "react-native";
import { SafeAreaView } from "react-navigation";
import analytics from "@segment/analytics-react-native";
import { Container } from "native-base";
import LottieView from "lottie-react-native";
import { showMessage } from "react-native-flash-message";

import ChatBot from "../../../assets/SVGs/ChatBot";
import CustomHeader from "../../MiniComponents/Header";

import styles from "./styles";

//Redux
import * as actionCreators from "../../../store/actions/";
import { connect } from "react-redux";

class LoadingChatScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );

    analytics.track(`open_support`, {
      source,
      source_action,
      support_type: "intercom",
      timestamp: new Date().getTime(),
      device_id: this.props.screenProps.device_id
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
      (!prevProps.loading && this.props.loading) ||
      (!prevProps.loading_con && this.props.loading_con)
    ) {
      // this.props.navigation.navigate('Messenger');
      this.setState({
        loading: true
      });
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
          />
          <View style={styles.flexView}>
            <LottieView
              ref={animation => {
                this.animation = animation;
              }}
              style={styles.loadingAnimation}
              resizeMode="contain"
              source={require("../../../assets/animation/update_loader.json")}
              loop={false}
              autoPlay
              onAnimationFinish={() => {
                if (this.state.loading) {
                  analytics.track(`a_help`, {
                    source: this.props.navigation.getParam(
                      "source",
                      this.props.screenProps.prevAppState
                    ),
                    source_action: "a_help",
                    action_status: "success",
                    support_type: "intercom"
                  });
                  this.props.navigation.navigate("Messenger", {
                    source: this.props.navigation.getParam(
                      "source",
                      this.props.screenProps.prevAppState
                    ),
                    source_action: this.props.navigation.getParam(
                      "source_action",
                      this.props.screenProps.prevAppState
                    )
                  });
                } else {
                  analytics.track(`a_help`, {
                    source: this.props.navigation.getParam(
                      "source",
                      this.props.screenProps.prevAppState
                    ),
                    source_action: "a_help",
                    action_status: "failure",
                    support_type: "intercom",
                    error_description: "Something went wrong"
                  });
                  showMessage({
                    message: translate("Something went wrong!"),
                    type: "warning",
                    position: "top",
                    duration: 4500,
                    description: translate("Try again in sometime!")
                  });
                }
              }}
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

const mapStateToProps = state => ({
  userInfo: state.auth.userInfo,
  loading: state.messenger.loading,
  user: state.messenger.user,
  messages: state.messenger.messages,
  loading_con: state.messenger.loading_con,
  subscribed: state.messenger.subscribed,
  open_conversation: state.messenger.open_conversation
});

const mapDispatchToProps = dispatch => ({
  connect_user_to_intercom: user_id =>
    dispatch(actionCreators.connect_user_to_intercom(user_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadingChatScreen);
