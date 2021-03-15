import React from "react";
import { View, SafeAreaView, Text, TouchableOpacity } from "react-native";
import CustomHeader from "../../MiniComponents/Header";

import CopyIcon from "../../../assets/SVGs/CopyIcon";

import styles from "./styles";
export default class PixelScreen extends React.Component {
  render() {
    return (
      <View>
        <SafeAreaView />
        <CustomHeader
          screenProps={this.props.screenProps}
          title={"Pixel Info"}
          navigation={this.props.navigation}
          //   actionButton={() => closeBiometricsModal()}
          segment={{
            source: "open_pixel_info_details",
            source_action: "a_go_back",
          }}
        />
        <Text style={styles.copyText}>
          Please copy the code and paste it into your website under the head tag
        </Text>
        <TouchableOpacity activeOpacity={0.8} style={styles.pixelView}>
          <Text style={styles.pixelCode}>1213-12123-12323-1223</Text>
          <CopyIcon fill={"#FFF"} style={styles.copyIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}
