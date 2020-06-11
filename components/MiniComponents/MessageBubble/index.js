import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Text, View, I18nManager, TouchableOpacity } from "react-native";
import dateFormat from "dateformat";
import { globalColors } from "../../../GlobalStyles";
import styles from "./styles";
import rtlStyles from "./rtlStyles";
import { Transition } from "react-navigation-fluid-transitions";

import OrangeTriangle from "../../../assets/SVGs/ChatBubbleOrangeTriangle";
import TransparentTriangle from "../../../assets/SVGs/ChatBubbleTransparentTriangle";
import RNImageOrCacheImage from "../RNImageOrCacheImage";
import isNull from "lodash/isNull";

class MessageBubble extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      height: 0,
    };
  }
  render() {
    let userFormatter = "#A496AC";
    var align = "flex-start";
    let body = "";
    // to format the color and direction of the bubble
    if (this.props.message.author.type === "user") {
      userFormatter = "#9300FF";
      align = "flex-end";
    }
    //originally the message body is sent in html but because I parse it into text
    //the text comes with an [Attachment:] array conjoined with the text as a string
    //so I just remove it if that's the case

    if (
      !isNull(this.props.message.body) &&
      this.props.message.body.includes("[Attachment:")
    ) {
      body = this.props.message.body.split("[Attachment:")[0].trim();
    } else body = this.props.message.body;

    return (
      <View style={styles.messageBubbleOuterView}>
        {this.props.message.created_at && (
          <Text
            style={[
              styles.dateText,
              {
                textAlign:
                  this.props.message.author.type === "user" ? "right" : "left",
              },
            ]}
          >
            {dateFormat(
              this.props.message.created_at * 1000,
              "dd mmm, h:MM TT"
            )}
          </Text>
        )}
        {/* Triangle for admin */}
        <View style={[styles.messagefullView, { alignSelf: align }]}>
          {this.props.message.author.type === "admin" &&
            !isNull(this.props.message.body) &&
            this.props.message.body !== "" && (
              <View
                style={[
                  I18nManager.isRTL
                    ? rtlStyles.transparentTriangleView
                    : styles.transparentTriangleView,
                  {
                    zIndex: 5,
                    left: I18nManager.isRTL
                      ? this.state.height > 50
                        ? -5
                        : -6
                      : this.state.height > 50
                      ? -8
                      : -6,
                  },
                ]}
              >
                <TransparentTriangle height={22} width={22} />
              </View>
            )}
          {this.props.message.attachments.length !== 0 && (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("ImagePreview", {
                  image: this.props.message.attachments[0].url,
                  id: this.props.message.id,
                })
              }
              style={{ paddingBottom: 5 }}
            >
              <Transition
                style={{ height: "100%", opacity: 1 }}
                shared={this.props.message.id}
              >
                <RNImageOrCacheImage
                  media={this.props.message.attachments[0].url}
                  style={styles.image}
                  resizeMode="center"
                />
              </Transition>
            </TouchableOpacity>
          )}
          {!isNull(this.props.message.body) && this.props.message.body !== "" && (
            <View
              style={[
                styles.messageView,
                {
                  paddingVertical: this.state.height < 50 ? 10 : 18,
                  paddingHorizontal: this.state.height < 50 ? 20 : 25,
                  backgroundColor: userFormatter,
                  alignSelf: align,
                },
              ]}
              onLayout={(event) => {
                var { height } = event.nativeEvent.layout;
                this.setState({
                  height: height,
                });
              }}
            >
              <Text selectable={true} style={styles.messageText}>
                {body}
              </Text>
            </View>
          )}
          {/* Triangle for user */}
          {this.props.message.author.type === "user" &&
            !isNull(this.props.message.body) &&
            this.props.message.body !== "" && (
              <View
                style={[
                  I18nManager.isRTL
                    ? rtlStyles.orangeTriangleView
                    : styles.orangeTriangleView,
                  {
                    right: 0,
                  },
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

const mapStateToProps = (state) => ({
  user: state.messenger.user,
});

export default connect(mapStateToProps)(MessageBubble);
