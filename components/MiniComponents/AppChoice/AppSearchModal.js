import React, { Component } from "react";
import { View, FlatList } from "react-native";

import Modal from "react-native-modal";
import AppStoreIcon from "../../../assets/SVGs/AppleIcon.svg";
import PlayStoreIcon from "../../../assets/SVGs/PlayStoreIcon.svg";
import CustomHeader from "../Header";
import appConfirmStyles from "../AppConfirm/styles";
import SearchIcon from "../../../assets/SVGs/Search.svg";

import styles from "./styles";
import modalStyles from "./ModalStyle";
import { SafeAreaView } from "react-navigation";
import { BlurView } from "expo-blur";
import LowerButton from "../LowerButton";
import { Text, Input, Item } from "native-base";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import { ActivityIndicator } from "react-native-paper";
import AppCard from "./AppCard";
import globalStyles from "../../../GlobalStyles";
export default class AppSearchModal extends Component {
  state = { showBtn: false };
  componentDidUpdate(pervProps) {
    if (pervProps.appSelection !== this.props.appSelection)
      this.showConfirmBtn(false);
  }
  showConfirmBtn = value => {
    this.setState({ showBtn: value });
  };
  render() {
    let {
      isVisible,
      setModalVisible,
      appSelection,
      appValue,
      setTheState,
      _searchIosApps,
      _searchAndroidApps,
      showList,
      loading,
      data,
      androidData,
      attachment,
      _getIosAppIds,
      _getAndroidAppIds,
      AppError,
      handleAppError,
      nameError,
      callActionError,
      callAction,
      renderNextStep
    } = this.props;

    return (
      <Modal style={{ margin: 0 }} isVisible={isVisible}>
        <BlurView intensity={95} tint="dark">
          <SafeAreaView
            style={modalStyles.safeAreaView}
            forceInset={{ bottom: "never", top: "always" }}
          >
            <View style={modalStyles.popupOverlay}>
              <CustomHeader
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
                      {`apple \n app store`}
                    </Text>
                  </>
                ) : (
                  <>
                    <PlayStoreIcon width={50} height={50} />
                    <Text
                      uppercase
                      style={[
                        appConfirmStyles.appStoreButtonsText,
                        { fontSize: 14, maxWidth: 100 }
                      ]}
                    >
                      {`google \n play store`}
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
                    placeholder={`Search for ${appSelection} name or id`}
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
                            _searchIosApps();
                            break;
                          case "ANDROID":
                            _searchAndroidApps();
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
                      //   this.state.showList
                      //     ? this.state.choice !== "ANDROID"
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
                          choice={appSelection}
                          _getIosAppIds={_getIosAppIds}
                          _getAndroidAppIds={_getAndroidAppIds}
                          // _handleBothOS={_handleBothOS}
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

              {this.state.showBtn && (
                <LowerButton
                  bottom={4}
                  // function={() => navigation.push("AdDesign")}
                  function={() => {
                    !nameError && setModalVisible(false);
                    renderNextStep(
                      nameError,
                      callActionError,
                      attachment,
                      callAction,
                      appSelection
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
