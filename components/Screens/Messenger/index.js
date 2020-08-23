import React, { Component } from "react";
import {
  View,
  Text,
  BackHandler,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  I18nManager,
  Platform,
} from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import CustomHeader from "../../MiniComponents/Header";
import MessageBubble from "../../MiniComponents/MessageBubble";
import analytics from "@segment/analytics-react-native";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import { ActivityIndicator } from "react-native-paper";
import socketIOClient from "socket.io-client";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import LottieView from "lottie-react-native";

//icons
import ForwardButton from "../../../assets/SVGs/ForwardMSGButton";
import Camera from "../../../assets/SVGs/Camera";
import ChatBot from "../../../assets/SVGs/ChatBot";

// Style
import styles from "./styles";
import rtlStyles from "./rtlStyles";
import { globalColors } from "../../../GlobalStyles";

//Redux
import * as actionCreators from "../../../store/actions";
import { connect } from "react-redux";
import * as actionTypes from "../../../store/actions/actionTypes";

//Functions
import { heightPercentageToDP } from "react-native-responsive-screen";

import isNull from "lodash/isNull";
import isEmpty from "lodash/isEmpty";
import { YellowBox } from "react-native";
import { AdjustEvent, Adjust } from "react-native-adjust";
import { showMessage } from "react-native-flash-message";
YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?",
]);

const socket = socketIOClient("https://www.optimizeapp.io/", {
  timeout: 10000,
  jsonp: false,
  transports: ["websocket"],
  autoConnect: false,
  reconnection: true,
  // agent: '-',
  // path: '/', // Whatever your path is
  // pfx: '-',
  // key: token, // Using token-based auth.
  // passphrase: cookie, // Using cookie auth.
  // cert: '-',
  // ca: '-',
  // ciphers: '-',
  // rejectUnauthorized: '-',
  // perMessageDeflate: '-',
});

class Messenger extends Component {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      text: "",
      date: "",
      textValue: "",
      height: 40,
    };
  }
  componentDidMount() {
    // after the scoket is connected, it will intercept any "AdminReply" activity for the
    // room the user is subscribed to based on their id
    // the conversation is set as seen/read whe they open the messenger
    // at the same time the update_conversatusion_read_status gets called tp update the notifications indicator
    this.props.connect_user_to_intercom(this.props.userInfo.userid);

    // this.props.connect_user_to_intercom(this.props.userInfo.userid);
    socket.connect();
    this.props.subscribe(socket);
    socket.on("AdminReply", (data) => {
      this.props.admin_response(data);
    });
    if (this.props.conversation_id) this.props.set_as_seen(true);
    this.props.update_conversatusion_read_status();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentDidUpdate(prevProps, prevState) {}

  componentWillUnmount() {
    //whene the user leaves the chat I disconnect them from the server
    //and I update their last seen status

    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    socket.removeAllListeners();
    socket.disconnect();
    this.props.update_last_seen();
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  //this handles the message dilevry, if there are no conversation open
  //it send the first msg through the open conversation function
  _handleSubmission = () => {
    if (this.state.textValue !== "") {
      if (this.props.open_conversation)
        this.props.reply(this.state.textValue, []);
      else
        this.props.start_conversation(this.state.textValue, () => {
          return {
            type: actionTypes.SET_LOADING_MESSAGE,
            payload: false,
          };
        });
      this._resetTextInput();
    }
  };
  _onChange(event) {
    this.setState({ textValue: event.nativeEvent.text || "" });
  }

  _resetTextInput() {
    this.setState({ textValue: "" });
    this._textInput.clear();
    // this._textInput.resetHeightToMin();
  }

  _keyExtractor = (item, index) => item.id;

  scrollToIndex = (params) => {
    return {
      animated: true,
      index: 50,
      viewOffset: 5,
      viewPosition: 1,
    };
  };

  getItemLayout = (data, index) => ({ length: 10, offset: 5 * index, index });
  updateSize = (height) => {
    this.setState({
      height,
    });
  };
  pick = async (screenProps) => {
    try {
      await this.askForPermssion(screenProps);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: "Images",
        base64: false,
        exif: false,
        quality: 0.8,
      });

      if (!result.cancelled)
        this.setState({ media: result }, () => {
          analytics.track(`a_select_media`, {
            source: "open_support",
            source_action: "a_select_media",
            image_for: "Messenger chat",
            ...result,
          });
          this.props.navigation.navigate("ImagePreview", {
            image: this.state.media.uri,
            id: "upload",
            upload: this.formatMedia.bind(this),
            source: "open_support",
            source_action: "a_select_media",
            returnData: this.returnData.bind(this),
          });
        });
    } catch (error) {
      showMessage({
        message: translate("Something went wrong!"),
        position: "top",
        type: "danger",
      });
    }
  };

  askForPermssion = async (screenProps) => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    const { translate } = screenProps;
    if (status !== "granted") {
      showMessage({
        message: translate(
          "Please allow access to the gallery to upload media"
        ),
        position: "top",
        type: "warning",
      });
      Platform.OS === "ios" && Linking.openURL("app-settings:");
    }
  };

  //Submits the media after formatting it after the user confirm their selection
  formatMedia() {
    var body = new FormData();
    let res = this.state.media.uri.split("/");
    res = res[res.length - 1];
    let format = res.split(".");

    var photo = {
      uri: this.state.media.uri,
      type: "IMAGE" + "/" + format[1],
      name: res,
    };
    body.append("media", photo);
    this.setState(
      {
        formatted: body,
      },
      () => {
        this.props.upload_media(this.state.formatted);
      }
    );
  }
  returnData(source, source_action) {
    this.onDidFocus(source, source_action);
  }
  onDidFocus = (src, src_action) => {
    const source = this.props.navigation.getParam(
      "source",
      src || this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      src_action
    );

    analytics.track(`open_support`, {
      source,
      source_action,
      support_type: "intercom",
      timestamp: new Date().getTime(),
    });
    let adjustSupportTrackeer = new AdjustEvent("9nk8ku");
    Adjust.trackEvent(adjustSupportTrackeer);
  };
  render() {
    const { translate } = this.props.screenProps;
    const { height } = this.state;
    let newStyle = {
      height,
    };
    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents onDidFocus={this.onDidFocus} />
        <CustomHeader
          backButton="messenger"
          screenProps={this.props.screenProps}
          closeButton={true}
          title={"Support"}
          titleStyle={{
            color: globalColors.rum,
          }}
          segment={{
            source: "open_support",
            source_action: "a_go_back",
          }}
          actionButton={() =>
            this.props.navigation.navigate("Dashboard", {
              source: "open_support",
              source_action: "a_go_back",
            })
          }
          containerStyle={{
            backgroundColor: "#F4F2F5",
          }}
        />
        <View style={styles.contentContainer}>
          {this.props.loading_con ? (
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
          ) : (
            <KeyboardAvoidingView
              keyboardVerticalOffset={heightPercentageToDP("10%")}
              style={styles.container}
              behavior={Platform.OS === "ios" ? "padding" : ""}
            >
              <>
                <View style={styles.flexEmptyView} />
                <FlatList
                  showsVerticalScrollIndicator={false}
                  inverted
                  ref={(ref) => {
                    this.flatList = ref;
                  }}
                  data={this.props.messages}
                  keyExtractor={this._keyExtractor}
                  renderItem={(msg, index) => {
                    if (
                      !isNull(msg.item.body) ||
                      msg.item.attachments.length !== 0
                    )
                      return (
                        <MessageBubble
                          navigation={this.props.navigation}
                          key={msg.item.id}
                          message={msg.item}
                        />
                      );
                  }}
                />
                {isEmpty(this.props.messages) && (
                  <View style={styles.chatBotViewSmall}>
                    <ChatBot width={100} height={100} />
                  </View>
                )}
                <View style={styles.textInputContainer}>
                  <TouchableOpacity
                    style={styles.cameraButton}
                    onPress={() => this.pick(this.props.screenProps)}
                  >
                    <Camera
                      fill={globalColors.orange}
                      style={styles.cameraIcon}
                      width={heightPercentageToDP(4.5)}
                      height={heightPercentageToDP(4.5)}
                    />
                  </TouchableOpacity>
                  <TextInput
                    editable={true}
                    multiline={true}
                    value={this.state.textValue}
                    onChange={(event) => this._onChange(event)}
                    style={[
                      I18nManager.isRTL
                        ? rtlStyles.textInput
                        : styles.textInput,
                      newStyle,
                      {
                        elevation: 2,
                        shadowColor: "#000",
                        shadowOffset: {
                          width: 5,
                          height: 5,
                        },
                        shadowRadius: 15,
                        shadowOpacity: 0.2,
                      },
                    ]}
                    placeholder={translate("Type Your Message")}
                    placeholderTextColor="#909090"
                    placeholderLineHeight={30}
                    maxHeight={100}
                    minHeight={45}
                    maxWidth={300}
                    enableScrollToCaret
                    ref={(r) => {
                      this._textInput = r;
                    }}
                    onContentSizeChange={(e) =>
                      this.updateSize(e.nativeEvent.contentSize.height)
                    }
                  />
                  {this.props.loading_msg ? (
                    <ActivityIndicator
                      color="orange"
                      size="small"
                      style={styles.activityIndicator}
                    />
                  ) : (
                    <TouchableOpacity
                      style={[styles.submitButton]}
                      onPress={this._handleSubmission}
                    >
                      <Text
                        style={{
                          color: "#9300FF",
                          fontFamily: "montserrat-bold",
                          fontSize: 12,
                          alignSelf: "center",
                        }}
                      >
                        {translate("Send")}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </>
            </KeyboardAvoidingView>
          )}
        </View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  userInfo: state.auth.userInfo,
  loading: state.messenger.loading,
  user: state.messenger.user,
  messages: state.messenger.messages,
  loading_con: state.messenger.loading_con,
  loading_msg: state.messenger.loading_msg,
  subscribed: state.messenger.subscribed,
  open_conversation: state.messenger.open_conversation,
  conversation_id: state.messenger.conversation_id,
});

const mapDispatchToProps = (dispatch) => ({
  reply: (message, media) => dispatch(actionCreators.reply(message, media)),
  connect_user_to_intercom: (user_id) =>
    dispatch(actionCreators.connect_user_to_intercom(user_id)),
  reply: (message) => dispatch(actionCreators.reply(message)),
  admin_response: (message) => dispatch(actionCreators.admin_response(message)),
  set_as_seen: (check) => dispatch(actionCreators.set_as_seen(check)),
  subscribe: (socket) => dispatch(actionCreators.subscribe(socket)),
  start_conversation: (message, callback) =>
    dispatch(actionCreators.start_conversation(message, callback)),
  update_last_seen: () => dispatch(actionCreators.update_last_seen()),
  update_conversatusion_read_status: () =>
    dispatch(actionCreators.update_conversatusion_read_status()),
  upload_media: (media) => dispatch(actionCreators.upload_media(media)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);
