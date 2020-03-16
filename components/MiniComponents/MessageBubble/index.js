import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, ActivityIndicator, I18nManager } from "react-native";
import dateFormat from "dateformat";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import styles from "./styles";
import rtlStyles from "./rtlStyles";

import OrangeTriangle from "../../../assets/SVGs/ChatBubbleOrangeTriangle";
import TransparentTriangle from "../../../assets/SVGs/ChatBubbleTransparentTriangle";

class MessageBubble extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }
  render() {
    let userFormatter = "#6C63FF";
    var align = "flex-start";
    // console.log("message...", this.props.message);

    if (this.props.message.author.type === "user") {
      userFormatter = globalColors.orange;
      align = "flex-end";
    }

    return (
      <View style={styles.messageBubbleOuterView}>
        {this.props.message.created_at && (
          <Text
            style={[
              styles.dateText,
              {
                textAlign:
                  this.props.message.author.type === "user" ? "right" : "left"
              }
            ]}
          >
            {dateFormat(
              this.props.message.created_at * 1000,
              "dd mmm, h:MM TT"
            )}
          </Text>
        )}
        <View style={[styles.messagefullView, { alignSelf: align }]}>
          {this.props.message.author.type === "admin" && (
            <View
              style={[
                I18nManager.isRTL
                  ? rtlStyles.transparentTriangleView
                  : styles.transparentTriangleView,
                {
                  left: I18nManager.isRTL
                    ? this.state.height > 50
                      ? -5
                      : -6
                    : this.state.height > 50
                    ? -8
                    : -6,
                  top:
                    this.state.height > 100
                      ? "75%"
                      : this.state.height > 50
                      ? "65%"
                      : 20
                }
              ]}
            >
              <TransparentTriangle height={18} width={22} />
            </View>
          )}
          <View
            style={[
              styles.messageView,
              {
                paddingVertical: this.state.height < 50 ? 10 : 18,
                paddingHorizontal: this.state.height < 50 ? 20 : 25,
                backgroundColor: userFormatter,
                alignSelf: align
              }
            ]}
            onLayout={event => {
              var { x, y, width, height } = event.nativeEvent.layout;
              // console.log('width', width);
              // console.log('height', height);
              this.setState({
                height: height
              });
            }}
          >
            <Text selectable={true} style={styles.messageText}>
              {this.props.message.body}
            </Text>
          </View>
          {this.props.message.author.type === "user" && (
            <View
              style={[
                I18nManager.isRTL
                  ? rtlStyles.orangeTriangleView
                  : styles.orangeTriangleView,
                {
                  right: this.state.height > 50 ? 5 : 0
                }
              ]}
            >
              <OrangeTriangle width={22} height={22} />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.messenger.user
});

export default connect(mapStateToProps)(MessageBubble);
