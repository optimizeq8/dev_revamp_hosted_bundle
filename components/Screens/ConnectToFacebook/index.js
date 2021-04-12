// Components
import React from "react";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import { View } from "react-native";
//Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

class ConnectToFacebook extends React.Component {
  render() {
    return (
      <View>
        <NavigationEvents />
        <SafeAreaView />
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
  set_adType: (value) => dispatch(actionCreators.set_adType(value)),
  resetCampaignInfo: (resetAdType) =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType)),
  updateBusinessConnectedToFacebook: (data) =>
    dispatch(actionCreators.updateBusinessConnectedToFacebook(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ConnectToFacebook);
