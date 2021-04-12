// Components
import React from "react";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import { View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// MiniComponents
import CustomHeader from "../../MiniComponents/Header";

//Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

class ConnectToFacebook extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SafeAreaView
          forceInset={{
            top: "always",
            bottom: "never",
          }}
        />
        <NavigationEvents />
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.3, 0.75]}
          style={styles.gradient}
        />
        <CustomHeader
          screenProps={this.props.screenProps}
          title={"Connect to Facebook"}
          navigation={this.props.navigation}
          //   actionButton={() => closeBiometricsModal()}
          segment={{
            source: "open_pixel_info_details",
            source_action: "a_go_back",
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  adType: state.campaignC.adType,
  incompleteCampaign: state.campaignC.incompleteCampaign,
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo,
});

const mapDispatchToProps = (dispatch) => ({
  updateBusinessConnectedToFacebook: (data) =>
    dispatch(actionCreators.updateBusinessConnectedToFacebook(data)),
  connectToInstagramPage: (
    accessToken,
    page_id,
    page_token,
    instagram_account_id,
    instagram_user_id,
    insta_handle
  ) =>
    dispatch(
      actionCreators.connectToInstagramPage(
        accessToken,
        page_id,
        page_token,
        instagram_account_id,
        instagram_user_id,
        insta_handle
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConnectToFacebook);
