import React, { Component } from "react";
import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image
} from "react-native";
import { Icon } from "native-base";
import { Segment } from "expo";
//styles
import styles from "./styles";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { ActivityIndicator } from "react-native-paper";
export default class AdTypeCard extends Component {
  render() {
    let adType = this.props.adType;
    return (
      <TouchableOpacity
        onPress={() => {
          Segment.trackWithProperties(`${adType.title} AdType Card Button`, {
            business_name: this.props.mainBusiness.businessname,
            campaign_type: this.props.campaign_type
          });
          this.props.navigationHandler(adType.rout);
        }}
      >
        <View
          style={{
            top: "0%",
            width: "100%",
            height: "95%",
            bottom: "5%",
            paddingTop: 10,
            alignSelf: "center"
          }}
        >
          <Text style={styles.slidtitle}>{adType.title} </Text>
          <View style={[styles.placeholder]}>
            <Image
              loadingIndicatorSource={<ActivityIndicator color="#fff" />}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "#fff"
              }}
              resizeMode={adType.media !== "snapchat" ? "center" : "stretch"}
              source={adType.image}
            />

            {adType.text.includes("Soon") && (
              <Text style={styles.slidetext}> {adType.text} </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
