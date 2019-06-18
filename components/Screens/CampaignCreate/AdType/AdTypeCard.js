import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import { Segment } from "expo";
import { ActivityIndicator } from "react-native-paper";

//styles
import styles from "./styles";
import { globalColors } from "../../../../GlobalStyles";
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
        <View style={styles.typeCardContainer}>
          <Text style={styles.slidTitle}>{adType.title} </Text>
          <View style={styles.placeholder}>
            <Image
              loadingIndicatorSource={
                <ActivityIndicator color={globalColors.white} />
              }
              style={styles.image}
              resizeMode={adType.media !== "snapchat" ? "center" : "stretch"}
              source={adType.image}
            />
            {adType.text.includes("Soon") && (
              <Text style={styles.slidetText}> {adType.text} </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}
