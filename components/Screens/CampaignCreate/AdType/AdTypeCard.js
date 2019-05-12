import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, Image } from "react-native";
import { Icon } from "native-base";
import { Segment } from "expo";
//styles
import styles from "./styles";
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
        <View style={{ width: "100%" }}>
          {/* <Icon
            style={styles.slideicon}
            type="FontAwesome"
            name={this.props.adType.icon}
          /> */}
          <Text style={styles.slidtitle}>{this.props.adType.title} </Text>
          <View
            style={[
              styles.placeholder,
              {
                backgroundColor: this.props.adType.title.includes("Snap")
                  ? "transparent"
                  : "#000"
              }
            ]}
          >
            <Image
              style={{ width: "100%", height: "100%", position: "absolute" }}
              resizeMode="stretch"
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
