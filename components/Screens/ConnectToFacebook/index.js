// Components
import React from "react";
import { NavigationEvents } from "react-navigation";
import SafeAreaView from "react-native-safe-area-view";
import { View, FlatList, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// MiniComponents
import CustomHeader from "../../MiniComponents/Header";
import GradientButton from "../../MiniComponents/GradientButton";

//Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";
import { globalColors } from "../../../GlobalStyles";

class ConnectToFacebook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: {},
    };
  }

  renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.itemView,
          !item.page_eligible_to_connect &&
            !item.page_has_ig_connected &&
            styles.itemDisableView,
        ]}
        onPress={() => {
          this.setState({
            selectedItem: { ...item },
          });
        }}
        disabled={!item.page_eligible_to_connect && !item.page_has_ig_connected}
      >
        <TouchableOpacity
          style={styles.radioButton}
          onPress={() => {
            this.setState({
              selectedItem: { ...item },
            });
          }}
          disabled={
            !item.page_eligible_to_connect && !item.page_has_ig_connected
          }
        >
          <View
            style={
              this.state.selectedItem.page_id === item.page_id
                ? styles.radioButtonActive
                : {}
            }
          ></View>
        </TouchableOpacity>
        <View style={styles.infoView}>
          <View style={styles.textView}>
            <Text style={styles.heading}>Page Name: </Text>
            <Text style={styles.description}>{item.page_name}</Text>
          </View>
          <View style={styles.textView}>
            <Text style={styles.heading}>Insatgram Handle: </Text>
            <Text style={styles.description}>{item.insta_handle}</Text>
          </View>

          {!item.page_eligible_to_connect && !item.page_has_ig_connected && (
            <Text style={[styles.textView, styles.heading]}>
              {item.page_not_eligible_message}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };
  render() {
    return (
      <View style={styles.outView}>
        <SafeAreaView
          forceInset={{
            top: "always",
            bottom: "never",
          }}
        />
        <NavigationEvents />

        <CustomHeader
          titleStyle={styles.titleStyle}
          screenProps={this.props.screenProps}
          title={"Connect To Facebook"}
          navigation={this.props.navigation}
          //   actionButton={() => closeBiometricsModal()}
          segment={{
            source: "open_fb_page_list",
            source_action: "a_go_back",
          }}
          iconColor={globalColors.rum}
        />
        <FlatList
          keyExtractor={(item) => item.page_id}
          data={this.props.fbPageList}
          renderItem={this.renderItem}
        />
        <GradientButton
          uppercase
          disabled={!this.state.selectedItem.page_id}
          screenProps={this.props.screenProps}
          text={"Submit"}
          style={styles.submitButton}
          onPressAction={() => {
            const {
              page_id,
              page_token,
              instagram_account_id,
              instagram_user_id,
              insta_handle,
            } = this.state.selectedItem;
            this.props.connectToInstagramPage(
              this.props.fbAccessToken,
              page_id,
              page_token,
              instagram_account_id,
              instagram_user_id,
              insta_handle
            );
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
  fbPageList: state.instagramAds.fbPageList,
  fbAccessToken: state.instagramAds.fbAccessToken,
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
