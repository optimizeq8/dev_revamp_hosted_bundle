import React, { Component } from "react";
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Platform,
  BackHandler,
  FlatList,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import Header from "../../MiniComponents/Header";
import MessageBubble from "../../MiniComponents/MessageBubble";
import * as Segment from "expo-analytics-segment";
import { BlurView } from "expo-blur";
import { Button, Text, Item, Input, Label, Container, Icon } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as Animatable from "react-native-animatable";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import socketIOClient from "socket.io-client";

//icons
import ForwardButton from "../../../assets/SVGs/ForwardButton";

// Style
import styles from "./styles";
import globalStyles, { globalColors } from "../../../GlobalStyles";

//Redux
import * as actionCreators from "../../../store/actions/";
import { connect } from "react-redux";

//Functions
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import isNull from "lodash/isNull";
const socket = socketIOClient("https://intercom-react.glitch.me/");

class Messenger extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      text: "",
      date: "",
      textValue: ""
    };
  }
  componentDidMount() {
    this.props.connect_user_to_intercom(this.props.userInfo.userid);
    this.props.subscribe(socket);
    socket.on("AdminReply", data => {
      console.log("data:", data);
      this.props.admin_response(data);
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.messages.length !== this.props.messages.length) {
      // console.log("scrolling to end");
      this.flatList.scrollToEnd({ animated: true });
    }
    // if (prevState.text !== this.state.text) {
    //   socket.emit("unsubscribe", prevState.text);
    // }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    socket.removeAllListeners();
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  _handleSubmission = () => {
    console.log("this.props.open_conversation", this.props.open_conversation);

    if (this.state.textValue !== "") {
      if (this.props.open_conversation) this.props.reply(this.state.textValue);
      else this.props.start_conversation(this.state.textValue);
      this._resetTextInput();
    }
  };
  _onChange(event) {
    this.setState({ textValue: event.nativeEvent.text || "" });
  }

  _resetTextInput() {
    this._textInput.clear();
    this._textInput.resetHeightToMin();
  }

  _keyExtractor = (item, index) => item.id;

  scrollToIndex = params => {
    console.log("params", params);
    return {
      animated: true,
      index: 50,
      viewOffset: 5,
      viewPosition: 1
    };
  };

  getItemLayout = (data, index) => ({ length: 10, offset: 5 * index, index });

  render() {
    if (this.props.loading && this.props.loading_con)
      return <ActivityIndicator />;
    else
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
          <Container
            style={[
              styles.container,
              {
                opacity:
                  this.state.modalVisible && Platform.OS === "android"
                    ? 0.05
                    : 1
              }
            ]}
          >
            <Header
              closeButton={true}
              title={"Support"}
              navigation={this.props.navigation}
            />
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              scrollEnabled={false}
              contentContainerStyle={styles.contentContainer}
            >
              <View style={{ flex: 1 }} />
              <FlatList
                inverted
                ref={ref => {
                  this.flatList = ref;
                }}
                // onContentSizeChange={() => this.refs.flatList.scrollToEnd()}
                data={this.props.messages}
                keyExtractor={this._keyExtractor}
                // getItemLayout={this.getItemLayout}
                // scrollToIndex={params => this.scrollToIndex(params)}
                // initialScrollIndex={this.props.messages.length - 1}
                renderItem={(msg, index) => {
                  if (!isNull(msg.item.body))
                    return (
                      <MessageBubble key={msg.item.id} message={msg.item} />
                    );
                }}
              />
              <View style={styles.textInputContainer}>
                <AutoGrowingTextInput
                  value={this.state.textValue}
                  onChange={event => this._onChange(event)}
                  style={styles.textInput}
                  placeholder={"Your Message"}
                  placeholderTextColor="#66737C"
                  maxHeight={100}
                  minHeight={45}
                  enableScrollToCaret
                  ref={r => {
                    this._textInput = r;
                  }}
                />

                <TouchableOpacity
                  style={styles.submitButton}
                  onPress={this._handleSubmission}
                >
                  <ForwardButton
                    width={heightPercentageToDP(5)}
                    height={heightPercentageToDP(5)}
                  />
                </TouchableOpacity>
              </View>
            </KeyboardAwareScrollView>
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
    dispatch(actionCreators.connect_user_to_intercom(user_id)),
  get_conversation: (user_id, navigation) =>
    dispatch(actionCreators.get_conversation(user_id, navigation)),
  reply: message => dispatch(actionCreators.reply(message)),
  admin_response: message => dispatch(actionCreators.admin_response(message)),
  set_as_seen: () => dispatch(actionCreators.set_as_seen()),
  subscribe: socket => dispatch(actionCreators.subscribe(socket)),
  start_conversation: message =>
    dispatch(actionCreators.start_conversation(message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messenger);
