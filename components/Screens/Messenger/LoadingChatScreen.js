import React from "react";
import { View, Text, BackHandler } from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Container } from "native-base";
import * as Segment from "expo-analytics-segment";
import LottieView from "lottie-react-native";
import { showMessage } from "react-native-flash-message";

import ChatBot from "../../../assets/SVGs/ChatBot";
import Header from "../../MiniComponents/Header";

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
        <NavigationEvents
          onDidFocus={() => {
            Segment.screen("Support");
          }}
        />
        <Container style={[styles.container]}>
          <Header
            closeButton={true}
            title={translate("Support")}
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
                  this.props.navigation.navigate("Messenger");
                } else {
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoadingChatScreen);
