import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, ActivityIndicator } from "react-native";
import dateFormat from "dateformat";
import globalStyles, { globalColors } from "../../../GlobalStyles";

class MessageBubble extends Component {
  render() {
    let userFormatter = "rgba(0,0,0,0.5)";
    var align = "flex-start";
    // console.log("message...", this.props.message);

    if (this.props.message.author.type === "user") {
      userFormatter = globalColors.orange;
      align = "flex-end";
    }
    const message = this.props.message;
    const date = new Date();
    // console.log("date now", date.getDate());
    const mesdate = Date(message.created_at);
    // console.log("date ??", message.created_at);

    // console.log("date", mesdate);

    return (
      <View
        style={{
          marginLeft: 18,
          marginRight: 18,
          marginVertical: 5,
          flexDirection: "column",
          alignSelf: align
        }}
      >
        {
          <Text
            style={{
              color: "white",
              fontSize: 10,
              paddingBottom: 5,
              textAlign: "center"
            }}
          >
            {dateFormat(mesdate, "dd mmm, h:MM TT")}
          </Text>
        }
        <View
          style={{
            flexDirection: "row"
          }}
        >
          <View
            style={{
              backgroundColor: userFormatter,
              paddingVertical: 10,
              borderRadius: 50
              //   maxWidth: 150
            }}
          >
            <Text style={{ color: "white", paddingHorizontal: 20 }}>
              {message.body}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  user: state.messenger.user
});

export default connect(mapStateToProps)(MessageBubble);
