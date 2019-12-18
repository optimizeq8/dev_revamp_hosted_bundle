import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import PlaceholderLine from "../../MiniComponents/PlaceholderLine";
import LowerButton from "../../MiniComponents/LowerButton";
import Rejected from "../../../assets/SVGs/Rejected.svg";
import Info from "../../../assets/SVGs/Info.svg";
import CustomButtons from "../../MiniComponents/CustomButtons";

import styles from "./styles";

export default RejectedInfo = props => {
  const {
    loading,
    review_status_reason,
    review_status_help,
    navigation,
    campaign_id,
    ad
  } = props;
  const { translate } = props.screenProps;
  handleSupportPage = () => {
    props.navigation.push("WebView", {
      url: review_status_help,
      title: "Support"
    });
  };
  return (
    <View
      style={{
        marginHorizontal: 15,
        flex: 1,
        alignItems: "center"
      }}
    >
      <Rejected />
      <Text
        uppercase
        style={{
          fontSize: 18,
          fontFamily: "montserrat-bold",
          color: "#EA514B",
          paddingVertical: 5
        }}
      >
        {translate("AD Rejected")}
      </Text>
      <Text
        style={{
          fontSize: 14,
          fontFamily: "montserrat-regular",
          color: "#FFF"
        }}
      >
        {translate("Here Are The Reasons")}:
      </Text>
      <View
        style={{
          paddingVertical: "5%",
          paddingHorizontal: "5%",
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: 15,
          marginVertical: "3%",
          alignItems: "left"
        }}
      >
        <Text
          uppercase
          style={{
            fontSize: 13,
            fontFamily: "montserrat-bold",
            color: "#FF9D00"
          }}
        >
          {review_status_reason}
        </Text>
        <Text
          style={{
            paddingVertical: 3,
            fontSize: 13,
            fontFamily: "montserrat-regular",
            color: "#FFF"
          }}
        >
          {translate("You can find more details here")}
        </Text>
        <Text
          selectable={true}
          //   onPress={this.handleSupportPage}
          style={{
            paddingVertical: 3,
            fontSize: 13,
            fontFamily: "montserrat-regular",
            color: "#FFF"
          }}
        >
          {review_status_help}
        </Text>
        <Info
          onPress={this.handleSupportPage}
          style={{ alignSelf: "flex-end" }}
        />
      </View>

      <CustomButtons
        screenProps={this.props.screenProps}
        onPressFunction={() =>
          navigation.push("GoogleAdDesign", {
            rejected: true,
            campaign_id: campaign_id,
            ad: ad
          })
        }
        content="Review Ad"
        filled
        buttonStyle={{ width: "39%", height: "14%", alignSelf: "flex-end" }}
        textStyle={{ fontSize: 14 }}
      />
    </View>
  );
};
