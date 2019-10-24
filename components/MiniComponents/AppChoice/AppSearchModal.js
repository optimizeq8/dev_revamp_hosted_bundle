import React, { Component } from "react";
import { View, FlatList } from "react-native";

import Modal from "react-native-modal";
import AppStoreIcon from "../../../assets/SVGs/AppleIcon";
import PlayStoreIcon from "../../../assets/SVGs/PlayStoreIcon";
import CustomHeader from "../Header";
import appConfirmStyles from "../AppConfirm/styles";
import SearchIcon from "../../../assets/SVGs/Search";

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
import FlashMessage, { showMessage } from "react-native-flash-message";
export default class AppSearchModal extends Component {
  state = { showBtn: false };
  componentDidUpdate(pervProps) {
    if (pervProps.appSelection !== this.props.appSelection)
      this.showConfirmBtn(false);
  }
  showConfirmBtn = value => {
    this.setState({ showBtn: value });
  };
  _searchAndroidApps = () => {
    const { translate } = this.props.screenProps;
    this.props.setTheState({ loading: true });
    const instance = Axios.create({
      baseURL: "https://api.apptweak.com/android",
      headers: {
        common: {
          "X-Apptweak-Key": "2WikpoMepgo90kjKHbNvkP2GKlM"
        }
      }
    });
    let appIdorName = this.props.mainState.appValue.includes(".");
    instance
      .get(
        `/${appIdorName ? "applications/" : "searches.json?term="}${
          this.props.mainState.appValue
        }${appIdorName ? "/metadata.json" : "&num=20"}`
        // `/applications/com.espn.score_center/metadata.json`
      )
      .then(res => {
        // console.log(res);
        return !appIdorName ? res.data.content : [res.data.content];
      })
      .then(data =>
        this.props.setTheState({
          androidData: data,
          showList: true,
          loading: false
        })
      )
      .catch(err => {
        // console.log(err);

        this.props.setTheState({ loading: false });
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
            : translate("Please try again later")
        });
        // console.log(err.response.data);
      });
  };

  _searchIosApps = () => {
    const { translate } = this.props.screenProps;
    this.props.setTheState({ loading: true });
    const instance = Axios.create({
      baseURL: "https://api.apptweak.com/ios",
      headers: {
        common: {
          "X-Apptweak-Key": "2WikpoMepgo90kjKHbNvkP2GKlM"
        }
      }
    });
    let appIdorName = /^\d+$/.test(this.props.appValue);
    instance
      .get(
        `/${appIdorName ? "applications/" : "searches.json?term="}${
          this.props.mainState.appValue
        }${appIdorName ? "/metadata.json" : "&num=20"}`
      )
      .then(res => {
        return !appIdorName ? res.data.content : [res.data.content];
      })
      .then(data =>
        this.props.setTheState({
          data: data,
          showList: true,
          loading: false
        })
      )
      .catch(err => {
        // console.log(err);

        this.props.setTheState({ loading: false });
        this.refs.modalFlash.showMessage({
          message:
            err.response && err.response.data
              ? err.response.data.error
              : "Something went wrong!",
          type: "warning",
          position: "top",
          duration: 4500,
          description:
            err.response && err.response.data
              ? translate("Please make sure the app id is correct")
              : translate("Please try again later")
        });
        // console.log(err.response)
      });
  };
  render() {
    let {
      mainState,
      setTheState,
      _getIosAppIds,
      _getAndroidAppIds,
      handleAppError,
      selectApp,
      setModalVisible
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
      callactionError,
      data,
      androidData,
      iosApp_name,
      androidApp_name,
      callaction
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
                actionButton={() => {
                  setModalVisible(false, false);
                }}
              />
              <View
                style={{
                  flex: 1,
                  //   justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {appSelection === "iOS" ? (
                  <>
                    <AppStoreIcon width={50} height={50} />
                    <Text
                      uppercase
                      style={[
                        appConfirmStyles.appStoreButtonsText,
                        { fontSize: 14, maxWidth: 100 }
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
                        { fontSize: 14, maxWidth: 100 }
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

                    styles.searchContainer
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
                    onChangeText={value =>
                      setTheState({
                        appValue: value
                      })
                    }
                    onBlur={() => {
                      if (appValue !== "") {
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
                        showList: appValue !== ""
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
                      keyExtractor={(item, index) =>
                        item.id
                          ? item.id.toString()
                          : item.application_id.toString()
                      }
                    />
                  </View>
                )}
              </View>
              <FlashMessage ref="modalFlash" position="top" />
              {this.state.showBtn && (
                <LowerButton
                  bottom={4}
                  // function={() => navigation.push("AdDesign")}
                  function={() => {
                    !nameError && setModalVisible(false);
                    selectApp(
                      nameError,
                      callactionError,
                      attachment,
                      callaction,
                      appSelection,
                      iosApp_name,
                      androidApp_name
                    );
                  }}
                />
              )}
            </View>
          </SafeAreaView>
        </BlurView>
      </Modal>
    );
  }
}
