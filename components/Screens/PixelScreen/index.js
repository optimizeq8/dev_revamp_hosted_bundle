import React from "react";
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Clipboard,
} from "react-native";
import { connect } from "react-redux";

import CustomHeader from "../../MiniComponents/Header";

import CopyIcon from "../../../assets/SVGs/CopyIcon";

import styles from "./styles";
import { showMessage } from "react-native-flash-message";
class PixelScreen extends React.Component {
  copyPixel = () => {
    const { mainBusiness } = this.props;
    const { translate } = this.props.screenProps;

    Clipboard.setString(mainBusiness.snap_pixel_id);
    showMessage({
      message: translate("Snap Pixel copied to clipboard"),
      type: "warning",
      autoHide: true,
    });
  };
  render() {
    const { translate } = this.props.screenProps;
    const { mainBusiness } = this.props;
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
          {translate(
            "Please copy the snap pixel code and paste it on your website"
          )}
        </Text>
        <TouchableOpacity
          onPress={this.copyPixel}
          activeOpacity={0.8}
          style={styles.pixelView}
        >
          <Text style={styles.pixelCode}>{mainBusiness.snap_pixel_id}</Text>
          <CopyIcon fill={"#FFF"} style={styles.copyIcon} />
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = (state) => ({
  mainBusiness: state.account.mainBusiness,
});
export default connect(mapStateToProps, null)(PixelScreen);
