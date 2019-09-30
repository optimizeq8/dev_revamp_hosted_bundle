import React, { Component } from "react";
import {
  View,
  BackHandler,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView
} from "react-native";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { isRTL } from "expo-localization";
import Header from "../../MiniComponents/Header";
import MessageBubble from "../../MiniComponents/MessageBubble";
import * as Segment from "expo-analytics-segment";
import { AutoGrowingTextInput } from "react-native-autogrow-textinput";
import socketIOClient from "socket.io-client";
import { Content } from "native-base";
import KeyBoardShift from "../../MiniComponents/KeyboardShift";
//icons
import ForwardButton from "../../../assets/SVGs/ForwardButton";
import Camera from "../../../assets/SVGs/Camera";
import ChatBot from "../../../assets/SVGs/ChatBot";

// Style
import styles from "./styles";
import rtlStyles from "./rtlStyles";
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
import isEmpty from "lodash/isEmpty";
import { YellowBox } from "react-native";

YellowBox.ignoreWarnings([
  "Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?"
]);

const socket = socketIOClient("https://www.optimizeapp.io/", {
  timeout: 10000,
  jsonp: false,
  transports: ["websocket"],
  autoConnect: false,
  reconnection: true
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
    gesturesEnabled: false
  };
  constructor(props) {
    super(props);
    this.state = {
      response: false,
      text: "",
      date: "",
      textValue: "",
      height: 40
    };
  }
  componentDidMount() {
    // this.props.connect_user_to_intercom(this.props.userInfo.userid);
    socket.connect();
    this.props.subscribe(socket);
    socket.on("AdminReply", data => {
      this.props.admin_response(data);
      // this.props.set_as_seen(true);
    });
    this.props.set_as_seen(true);
    this.props.update_conversatusion_read_status();
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }

  componentDidUpdate(prevProps, prevState) {
    // if (prevProps.messages.length !== this.props.messages.length) {
    // 	// console.log("scrolling to end");
    // 	this.flatList.scrollToEnd({ animated: true });
    // }
    // if (prevState.text !== this.state.text) {
    //   socket.emit("unsubscribe", prevState.text);
    // }
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    socket.removeAllListeners();
    this.props.update_last_seen();
  }

  handleBackPress = () => {
    // this.props.navigation.goBack();
    this.props.navigation.navigate("Dashboard");
    return true;
  };
  _handleSubmission = () => {
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
    // this._textInput.resetHeightToMin();
  }

  _keyExtractor = (item, index) => item.id;

  scrollToIndex = params => {
    return {
      animated: true,
      index: 50,
      viewOffset: 5,
      viewPosition: 1
    };
  };

  getItemLayout = (data, index) => ({ length: 10, offset: 5 * index, index });
  updateSize = height => {
    this.setState({
      height
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    const { height } = this.state;
    let newStyle = {
      height
    };
    // if (this.props.loading || this.props.loading_con)
    // 	return (
    // 		<LoadingChatScreen
    // 			loading_con={this.props.loading_con}
    // 			loading={this.props.loading}
    // 			navigation={this.props.navigation}
    // 		/>
    // 	);
    // else
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
        <Header
          closeButton={true}
          title={translate("Support")}
          actionButton={() => this.props.navigation.navigate("Dashboard")}
        />
        <View style={styles.contentContainer}>
          <Content
            contentContainerStyle={styles.contentContainer}
            scrollEnabled={false}
            // padder
          >
            <KeyBoardShift style={[styles.contentContainer]}>
              {() => (
                <>
                  <View style={styles.flexEmptyView} />
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
                  {isEmpty(this.props.messages) && (
                    <View style={styles.chatBotViewSmall}>
                      <ChatBot width={100} height={100} />
                    </View>
                  )}
                  {/* </View> */}
                  <View style={styles.textInputContainer}>
                    {/* <Camera
										fill={globalColors.orange}
										style={styles.cameraIcon}
										width={heightPercentageToDP(4)}
										height={heightPercentageToDP(4)}
									/> */}
                    <TextInput
                      editable={true}
                      multiline={true}
                      value={this.state.textValue}
                      onChange={event => this._onChange(event)}
                      style={[
                        isRTL ? rtlStyles.textInput : styles.textInput,
                        newStyle
                      ]}
                      placeholder={translate("Type Your Message")}
                      placeholderTextColor="#909090"
                      placeholderLineHeight={30}
                      maxHeight={100}
                      minHeight={45}
                      maxWidth={300}
                      enableScrollToCaret
                      ref={r => {
                        this._textInput = r;
                      }}
                      onContentSizeChange={e =>
                        this.updateSize(e.nativeEvent.contentSize.height)
                      }
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
                </>
              )}
            </KeyBoardShift>
          </Content>
        </View>
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
  open_conversation: state.messenger.open_conversation,
  conversation_id: state.messenger.conversation_id
});

const mapDispatchToProps = dispatch => ({
  connect_user_to_intercom: user_id =>
    dispatch(actionCreators.connect_user_to_intercom(user_id)),
  reply: message => dispatch(actionCreators.reply(message)),
  admin_response: message => dispatch(actionCreators.admin_response(message)),
  set_as_seen: check => dispatch(actionCreators.set_as_seen(check)),
  subscribe: socket => dispatch(actionCreators.subscribe(socket)),
  start_conversation: message =>
    dispatch(actionCreators.start_conversation(message)),
  update_last_seen: () => dispatch(actionCreators.update_last_seen()),
  update_conversatusion_read_status: () =>
    dispatch(actionCreators.update_conversatusion_read_status())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messenger);
