import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, Image } from "react-native";
import { Icon } from "native-base";
import { Segment } from "expo";
//styles
import styles from "./styles";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
export default class AdTypeCard extends Component {
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() =>
          Segment.trackWithProperties(
            `${this.props.adType.title} AdType Card Button`,
            {
              business_name: this.props.mainBusiness.businessname,
              campaign_type: this.props.campaign_type
            }
          )
        }
      >
        <View
          style={{
            width: "100%",
            height: "100%",
            bottom: "5%",
            paddingTop: 10,
            alignSelf: "center"
          }}
        >
          <Text style={styles.slidtitle}>{this.props.adType.title} </Text>
          <View style={[styles.placeholder]}>
            <Image
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff"
              }}
              resizeMode={
                this.props.adType.media !== "snapchat" ? "center" : "stretch"
              }
              source={this.props.adType.image}
            />

            {this.props.adType.text.includes("Soon") && (
              <Text style={styles.slidetext}> {this.props.adType.text} </Text>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
