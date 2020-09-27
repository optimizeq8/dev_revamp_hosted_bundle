import React, { Component } from "react";
import { View, FlatList } from "react-native";
import analytics from "@segment/analytics-react-native";
import Modal from "react-native-modal";
import AppStoreIcon from "../../../assets/SVGs/AppleIcon";
import PlayStoreIcon from "../../../assets/SVGs/PlayStoreIcon";
import CustomHeader from "../Header";
import appConfirmStyles from "../AppConfirm/styles";
import SearchIcon from "../../../assets/SVGs/Search";
import { connect } from "react-redux";

import styles from "./styles";
import modalStyles from "./ModalStyle";
import { SafeAreaView } from "react-navigation";
import { BlurView } from "expo-blur";
import LowerButton from "../LowerButton";
import { Text, Input, Item, Icon } from "native-base";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { ActivityIndicator } from "react-native-paper";
import AppCard from "./AppCard";
import globalStyles from "../../../GlobalStyles";
import Axios from "axios";
import FlashMessage from "react-native-flash-message";

class AppSearchModal extends Component {
  state = { showBtn: false };
  componentDidUpdate(pervProps) {
    if (pervProps.appSelection !== this.props.appSelection)
      this.showConfirmBtn(false);
  }
  showConfirmBtn = (value) => {
    this.setState({ showBtn: value });
  };
  _searchAndroidApps = () => {
    const { translate } = this.props.screenProps;
    this.props.setTheState({ loading: true });
    Axios.get(
      `https://graph.facebook.com/v7.0/act_${this.props.FBAdAccountIDForAppSearch}/matched_search_applications?app_store=GOOGLE_PLAY&query_term=${this.props.mainState.appValue}&access_token=${this.props.FBAccessTokenForAppSearch}`
    )
      .then((res) => {
        return res.data;
      })
      .then((data) =>
        this.props.setTheState({
          androidData: data.data,
          showList: true,
          loading: false,
        })
      )
      .catch((err) => {
        // console.log(err);

        this.props.setTheState({ loading: false });
        analytics.track(`a_error`, {
          error_page: "app_search_modal",
          error_description:
            err.response && err.response.data
              ? err.response.data.error.message
              : "Something went wrong!",
          source: "ad_swipe_up_destination",
          source_action: "a_app_search_modal",
          campaign_app_OS: "ANDROID",
        });
        this.refs.modalFlash.showMessage({
          message:
            err.response && err.response.data
              ? err.response.data.error.message
              : "Something went wrong!",
          type: "warning",
          position: "top",
          duration: 4500,
          description: err.response.data
            ? translate("Please make sure the app id is correct")
            : translate("Please try again later"),
        });
        // console.log(err.response.data);
      });
  };

  _searchIosApps = () => {
    const { translate } = this.props.screenProps;
    this.props.setTheState({ loading: true });
    Axios.get(
      `https://graph.facebook.com/v7.0/act_${this.props.FBAdAccountIDForAppSearch}/matched_search_applications?app_store=ITUNES&query_term=${this.props.mainState.appValue}&access_token=${this.props.FBAccessTokenForAppSearch}`
    )
      .then((res) => {
        return res.data;
      })
      .then((data) => {
        this.props.setTheState({
          data: data.data,
          showList: true,
          loading: false,
        });
      })
      .catch((err) => {
        this.props.setTheState({ loading: false });
        analytics.track(`a_error`, {
          error_page: "app_search_modal",
          error_description:
            err.response && err.response.data
              ? err.response.data.error.message
              : "Something went wrong!",
          source: "ad_swipe_up_destination",
          source_action: "a_app_search_modal",
          campaign_app_OS: "iOS",
        });
        this.refs.modalFlash.showMessage({
          message:
            err.response && err.response.data
              ? err.response.data.error.message
              : "Something went wrong!",
          type: "warning",
          position: "top",
          duration: 4500,
          description:
            err.response && err.response.data
              ? translate("Please make sure the app id is correct")
              : translate("Please try again later"),
        });
        // console.log(err.response)
      });
  };
  submitApp = (close) => {
    let { mainState, selectApp, setModalVisible } = this.props;
    let {
      nameError,
      attachment,
      callactionError,
      iosApp_name,
      androidApp_name,
      callaction,
      appSelection,
    } = mainState;
    (!nameError || close) && setModalVisible(false);
    selectApp(
      nameError,
      callactionError,
      attachment,
      callaction,
      appSelection,
      iosApp_name,
      androidApp_name
    );
  };
  render() {
    let {
      mainState,
      setTheState,
      _getIosAppIds,
      _getAndroidAppIds,
      handleAppError,
    } = this.props;
    let {
      isVisible,
      appSelection,
      appValue,
      showList,
      loading,
      nameError,
      attachment,
      AppError,
      data,
      androidData,
      iosApp_name,
      androidApp_name,
    } = mainState;
    const { translate } = this.props.screenProps;
    return (
      <Modal style={{ margin: 0 }} isVisible={isVisible}>
        <BlurView intensity={95} tint="dark">
          <SafeAreaView
            style={modalStyles.safeAreaView}
            forceInset={{ bottom: "never", top: "always" }}
          >
            <View style={modalStyles.popupOverlay}>
              <CustomHeader
                screenProps={this.props.screenProps}
                closeButton={true}
                segment={{
                  source: "app_search_modal",
                  source_action: "a_go_back",
                }}
                actionButton={() => this.submitApp(true)} //when a user selects and closes the modal,
                //it will change in it AppChoice but won't change in App_installs or Deep_link
              />
              <View
                style={{
                  flex: 1,
                  //   justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {appSelection === "iOS" ? (
                  <>
                    <AppStoreIcon width={50} height={50} fill="#fff" />
                    <Text
                      uppercase
                      style={[
                        appConfirmStyles.appStoreButtonsText,
                        { fontSize: 14, maxWidth: 100 },
                      ]}
                    >
                      {translate(`apple\napp store`)}
                    </Text>
                  </>
                ) : (
                  <>
                    <Icon
                      name="google-play"
                      type="MaterialCommunityIcons"
                      style={{ color: "#fff" }}
                    />
                    <Text
                      uppercase
                      style={[
                        appConfirmStyles.appStoreButtonsText,
                        { fontSize: 14, maxWidth: 100 },
                      ]}
                    >
                      {translate(`google\nplay store`)}
                    </Text>
                  </>
                )}
                <Item
                  rounded
                  style={[
                    styles.input,
                    nameError
                      ? globalStyles.redBorderColor
                      : globalStyles.transparentBorderColor,

                    styles.searchContainer,
                  ]}
                >
                  <SearchIcon stroke="#fff" />
                  <Input
                    style={styles.inputText}
                    placeholder={translate(
                      `Search for ${appSelection} name or id`
                    )}
                    defaultValue={appValue + ""}
                    placeholderTextColor="white"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={(value) =>
                      setTheState({
                        appValue: value,
                      })
                    }
                    onBlur={() => {
                      if (appValue !== "") {
                        analytics.track(`a_app_search`, {
                          keywords: appValue,
                          source: "app_search_modal",
                          source_action: "a_app_search",
                          campaign_app_OS: appSelection,
                        });
                        switch (appSelection) {
                          case "iOS":
                            this._searchIosApps();
                            break;
                          case "ANDROID":
                            this._searchAndroidApps();
                            break;
                          // case "":
                          //   appSelection === "iOS"
                          //     ? this._searchIosApps()
                          //     : this._searchAndroidApps();
                          //   break;
                        }
                      }
                      setTheState({
                        nameError: validateWrapper("mandatory", appValue),
                        showList: appValue !== "",
                      });
                    }}
                  />
                </Item>
                {loading ? (
                  <ActivityIndicator
                    color="#fff"
                    size="large"
                    style={styles.activityIndicator}
                  />
                ) : (
                  <View style={{ width: "85%", height: "70%" }}>
                    <FlatList
                      showsVerticalScrollIndicator={false}
                      style={{ flex: 1, width: "100%" }}
                      contentContainerStyle={
                        styles.flatListContentContainerStyle
                      }
                      //-----------This is for actual app data searches-----------
                      data={
                        showList
                          ? appSelection !== ""
                            ? appSelection !== "ANDROID"
                              ? data
                              : androidData
                            : appSelection === "iOS"
                            ? data
                            : androidData
                          : []
                      }
                      //-----------This is for dummy app data searches-----------
                      // data={
                      //   this.props.showList
                      //     ? this.props.choice !== "ANDROID"
                      //       ? data
                      //       : androidDataTest
                      //     : []
                      // }
                      // contentContainerStyle={{ height: heightPercentageToDP(35) }}
                      // contentInset={{ bottom: heightPercentageToDP(15) }}
                      renderItem={({ item }) => (
                        <AppCard
                          item={item}
                          showConfirmBtn={this.showConfirmBtn}
                          attachment={attachment}
                          appChoice={appSelection}
                          iosApp_name={iosApp_name}
                          androidApp_name={androidApp_name}
                          _getIosAppIds={_getIosAppIds}
                          _getAndroidAppIds={_getAndroidAppIds}
                          AppError={AppError}
                          handleAppError={handleAppError}
                        />
                      )}
                      numcolumnns={3}
                      keyExtractor={(item, index) => item.unique_id}
                    />
                  </View>
                )}
              </View>
              <FlashMessage ref="modalFlash" position="top" floating />
              {this.state.showBtn && (
                <LowerButton
                  screenProps={this.props.screenProps}
                  bottom={4}
                  // function={() => navigation.push("AdDesign")}
                  function={this.submitApp}
                />
              )}
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => ({
  FBAccessTokenForAppSearch: state.generic.FBAccessTokenForAppSearch,
  FBAdAccountIDForAppSearch: state.generic.FBAdAccountIDForAppSearch,
});
export default connect(mapStateToProps, null)(AppSearchModal);
