import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, Text } from "react-native";
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
import SafeAreaView from "react-native-safe-area-view";
import { BlurView } from "expo-blur";
import LowerButton from "../LowerButton";
import { Input, Item, Icon } from "native-base";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import AppCard from "./AppCard";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import Axios from "axios";
import FlashMessage, { showMessage } from "react-native-flash-message";
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
    Axios.post(`https://optimizeapp.com/optimize/instagram/appSearch`, {
      query_term: this.props.mainState.appValue.trim(),
      app_store: "GOOGLE_PLAY",
    })
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
        analytics.track(`Form Error Made`, {
          error_screen: "Instagram/AppSearchModal",
          error_description:
            err.response && err.response.data
              ? err.response.data.error
              : "Something went wrong!",
          source: "ad_swipe_up_destination",
          source_action: "a_app_search_modal",
          campaign_app_OS: "ANDROID",
          business_id: this.props.mainBusiness.businessid,
        });
        this.refs.modalFlash.showMessage({
          message:
            err.response && err.response.data
              ? err.response.data.error
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
    Axios.post(`https://optimizeapp.com/optimize/instagram/appSearch`, {
      query_term: this.props.mainState.appValue.trim(),
      app_store: "ITUNES",
    })
      .then((res) => {
        return res.data;
      })
      .then((data) =>
        this.props.setTheState({
          data: data.data,
          showList: true,
          loading: false,
        })
      )
      .catch((err) => {
        console.log(err);

        this.props.setTheState({ loading: false });
        analytics.track(`Form Error Made`, {
          error_scren: "Instagram/AppSearchModal",
          error_description:
            err.response && err.response.data
              ? err.response.data.error
              : "Something went wrong!",
          source: "ad_swipe_up_destination",
          source_action: "a_app_search_modal",
          campaign_app_OS: "iOS",
          business_id: this.props.mainBusiness.businessid,
        });
        this.refs.modalFlash.showMessage({
          message: "Something went wrong!",
          type: "warning",
          position: "top",
          duration: 4500,
          floating: true,
          description:
            err.response && err.response.data
              ? translate("Please make sure the app id is correct")
              : translate("Please try again later"),
        });
        // console.log("err.response", JSON.stringify(err.response, null, 2));
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
                    <AppStoreIcon
                      fill={globalColors.rum}
                      width={50}
                      height={50}
                    />
                    <Text
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
                        analytics.track(`Form Populated`, {
                          form_type: "Instagram App Search",
                          form_field: "app_search",
                          form_value: {
                            name: appValue,
                            campaign_app_OS: appSelection,
                          },
                          business_id: this.props.mainBusiness.businessid,
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
                        // showList: appValue !== "",
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
                      keyExtractor={(item, index) => item.unique_id.toString()}
                      showsVerticalScrollIndicator={false}
                    />
                  </View>
                )}
              </View>
              <FlashMessage ref="modalFlash" position="top" />
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
  mainBusiness: state.account.mainBusiness,
});
export default connect(mapStateToProps, null)(AppSearchModal);
