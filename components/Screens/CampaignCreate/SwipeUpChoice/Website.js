import React, { Component } from "react";
import { connect } from "react-redux";
import { View, BackHandler, ScrollView } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text, Item, Input, Icon, Button } from "native-base";
import { showMessage } from "react-native-flash-message";
import split from "lodash/split";
import isEmpty from "lodash/isEmpty";
import * as Segment from "expo-analytics-segment";
import Picker from "../../../MiniComponents/Picker";
import KeyboardShift from "../../../MiniComponents/KeyboardShift";
import LowerButton from "../../../MiniComponents/LowerButton";
import CustomHeader from "../../../MiniComponents/Header";

//icons
import WebsiteIcon from "../../../../assets/SVGs/SwipeUps/Website";

// Style
import styles from "./styles";
import GlobalStyles, { globalColors } from "../../../../GlobalStyles";

//Data
import list from "../../../Data/callactions.data";
import { netLoc } from "../../../Data/callactions.data";

//Functions
import validateWrapper from "../../../../ValidationFunctions/ValidateWrapper";
import segmentEventTrack from "../../../segmentEventTrack";
import WebsiteField from "../../../MiniComponents/InputField/Website";
class Website extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        attachment: "",
        callaction: list.SnapAd[0].call_to_action_list[0]
      },
      callActionLabel: "",
      // networkString: netLoc[0].label,
      netLoc: netLoc,
      callactions: list.SnapAd[0].call_to_action_list,
      urlError: "",
      inputCallToAction: false
    };
  }

  componentDidMount() {
    this.props.data;
    if (
      this.props.data &&
      this.props.data.hasOwnProperty("attachment") &&
      this.props.data.attachment !== "BLANK" &&
      !this.props.data.attachment.hasOwnProperty("android_app_url")
    ) {
      const url = this.props.data.attachment.url;
      this.setState({
        campaignInfo: {
          attachment: url,
          callaction: this.props.data.call_to_action
        }
        // networkString: url[0] + "://"
      });
    } else if (
      this.props.storyAdAttachment.destination === "REMOTE_WEBPAGE" ||
      this.props.storyAdAttachment.destination === "LEAD_GENERATION"
    ) {
      const url = this.props.storyAdAttachment.attachment.url;
      this.setState({
        campaignInfo: {
          attachment: url,
          callaction: this.props.storyAdAttachment.call_to_action
        }
        // networkString: url[0] + "://"
      });
    }
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  validateUrl = () => {
    const { translate } = this.props.screenProps;
    const urlError = validateWrapper(
      "website",
      this.state.campaignInfo.attachment
    );

    this.setState({
      urlError
    });

    if (urlError) {
      const regex = /(snapchat.|instagram.|youtube.|youtu.be|facebook.|fb.me|whatsapp.|wa.me)/g;
      showMessage({
        message: translate(
          `${
            !this.state.campaignInfo.attachment.match(regex)
              ? "Please enter a valid url"
              : "Please enter a valid url that does not direct to Instagram, Facebook, WhatsApp, Youtube or any social media"
          }`
        ),
        type: "warning",
        position: "top",
        duration: 7000
      });
      return false;
    } else {
      return true;
    }
  };
  setWebsiteValue = value => {
    const campaignInfo = {
      ...this.state.campaignInfo,
      attachment: value
    };
    this.setState({
      campaignInfo
    });
  };
  _handleSubmission = () => {
    let objective = this.props.data
      ? this.props.data.objective
      : this.props.storyAdAttachment.destination === "REMOTE_WEBPAGE"
      ? this.props.storyAdAttachment.destination
      : this.props.objective;
    if (!this.validateUrl()) {
      segmentEventTrack("Error Submit Website SwipeUp", {
        campaign_website_url: this.state.campaignInfo.attachment,
        campaign_error_website_url: this.state.urlError
      });
    }
    if (this.validateUrl()) {
      this.props._changeDestination(
        // this.props.adType !== "CollectionAd"
        //   ?
        this.props.collectionAdLinkForm === 0
          ? objective !== "LEAD_GENERATION"
            ? "REMOTE_WEBPAGE"
            : "LEAD_GENERATION"
          : "COLLECTION",

        this.state.campaignInfo.callaction,
        {
          url: this.state.campaignInfo.attachment
        }
      );
      segmentEventTrack("Submitted Website SwipeUp Success", {
        campaign_website_url: this.state.campaignInfo.attachment
      });
      this.props.navigation.navigate("AdDesign", {
        source: "swipe_up_destination",
        source_action: "a_swipe_up_destination"
      });
    }
  };
  onSelectedCallToActionIdChange = value => {
    // NOTE: compulsory to pass this function
    // console.log("businescatId", value);
  };
  closeCallToActionModal = () => {
    this.setState({
      inputCallToAction: false
    });
  };

  onSelectedCallToActionChange = value => {
    if (value && !isEmpty(value)) {
      segmentEventTrack("Selected Website Call to Action", {
        campaign_call_to_action: value[0].label
      });
      this.setState(
        {
          campaignInfo: {
            ...this.state.campaignInfo,
            callaction: {
              label: value[0].label,
              value: value[0].value
            }
          }
        },
        () => {
          this.closeCallToActionModal();
        }
      );
    }
  };
  render() {
    const { translate } = this.props.screenProps;
    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={styles.safeAreaContainer}
      >
        {this.props.adType === "CollectionAd" && (
          <View style={{ paddingBottom: 10 }}>
            <CustomHeader
              screenProps={this.props.screenProps}
              closeButton={false}
              title={"Swipe Up destination"}
              segment={{
                str: "Swipe up Destination CollectionAd  Back Button"
              }}
              navigation={this.props.navigation}
            />
          </View>
        )}
        <KeyboardShift>
          {() => (
            <View
              style={[
                styles.websiteContent,
                {
                  paddingHorizontal:
                    this.props.objective === "LEAD_GENERATION" ? 40 : 10
                }
              ]}
            >
              <WebsiteIcon style={styles.icon} fill={"#FFF"} />
              <View style={[styles.textcontainer]}>
                <Text style={styles.titletext}>{translate("Website")}</Text>
                <Text style={styles.subtext}>
                  {translate("The user will be taken to your website")}
                </Text>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollViewContainer}
              >
                <Picker
                  showIcon={true}
                  screenProps={this.props.screenProps}
                  searchPlaceholderText={"Search Call To Action"}
                  data={this.state.callactions}
                  uniqueKey={"value"}
                  displayKey={"label"}
                  open={this.state.inputCallToAction}
                  onSelectedItemsChange={this.onSelectedCallToActionIdChange}
                  onSelectedItemObjectsChange={
                    this.onSelectedCallToActionChange
                  }
                  selectedItems={[this.state.campaignInfo.callaction.value]}
                  single={true}
                  screenName={"Swipe up destination Website"}
                  closeCategoryModal={this.closeCallToActionModal}
                />
                <View>
                  <View style={[styles.callToActionLabelView]}>
                    <Text uppercase style={[styles.inputLabel]}>
                      {translate("call to action")}
                    </Text>
                  </View>
                  <Item
                    // rounded
                    style={[styles.input, { paddingHorizontal: 30 }]}
                    onPress={() => {
                      segmentEventTrack(
                        "Button Clicked to open Call to action Modal"
                      );
                      this.setState({ inputCallToAction: true }, () => {
                        if (this.state.inputCallToAction) {
                          Segment.screen("Call to Action Modal");
                        }
                      });
                    }}
                  >
                    <Text style={styles.callActionLabel}>
                      {this.state.campaignInfo.callaction.label}
                    </Text>
                    <Icon
                      type="AntDesign"
                      name="down"
                      style={{ color: "#fff", fontSize: 20, left: 25 }}
                    />
                  </Item>
                </View>

                <View style={styles.topContainer}>
                  <View style={styles.inputContainer}>
                    <View style={styles.websiteView}>
                      <WebsiteField
                        stateName={"attachment"}
                        screenProps={this.props.screenProps}
                        website={this.state.campaignInfo.attachment}
                        setWebsiteValue={this.setWebsiteValue}
                        stateNameError={this.state.websitelinkError}
                        // getValidInfo={this.validateUrl}
                        // disabled={
                        //   (this.state.editBusinessInfo &&
                        //     this.props.editBusinessInfoLoading) ||
                        //   this.props.savingRegister
                        // }
                      />
                      {/* <Item
                        style={[
                          styles.input
                          // this.state.urlError
                          //     ? GlobalStyles.redBorderColor
                          //     : GlobalStyles.transparentBorderColor
                        ]}
                      >
                        <TouchableOpacity
                          style={[
                            GlobalStyles.orangeBackgroundColor,
                            {
                              borderRadius: 30,
                              width: 54,
                              height: 54,
                              alignItems: "center",
                              justifyContent: "center"
                            }
                          ]}
                          onPress={() => {
                            if (this.state.networkString === "https://") {
                              this.setState(
                                {
                                  networkString: "http://"
                                },
                                () => {
                                  segmentEventTrack(
                                    "Changed SwipeUp Website network string",
                                    {
                                      campaign_website_network_string: this
                                        .state.networkString
                                    }
                                  );
                                }
                              );
                            } else {
                              this.setState(
                                {
                                  networkString: "https://"
                                },
                                () => {
                                  segmentEventTrack(
                                    "Changed SwipeUp Website network string",
                                    {
                                      campaign_website_network_string: this
                                        .state.networkString
                                    }
                                  );
                                }
                              );
                            }
                          }}
                        >
                          <Text uppercase style={styles.networkLabel}>
                            {this.state.networkString === "https://"
                              ? "https"
                              : "http"}
                          </Text>
                          <Text uppercase style={styles.networkLabel}>
                            {`< >`}
                          </Text>
                        </TouchableOpacity>

                        <Input
                          style={[
                            styles.inputtext,
                            I18nManager.isRTL
                              ? { textAlign: "right" }
                              : { textAlign: "left" }
                          ]}
                          placeholder={translate(`Enter your website's URL`)}
                          placeholderTextColor={globalColors.white}
                          value={this.state.campaignInfo.attachment}
                          autoCorrect={false}
                          autoCapitalize="none"
                          onChangeText={value =>
                            this.setState({
                              campaignInfo: {
                                ...this.state.campaignInfo,
                                attachment: value
                              }
                            })
                          }
                          onBlur={async () => {
                            segmentEventTrack(
                              "Changed Website URL attachment",
                              {
                                campaign_website_url_attachment: this.state
                                  .campaignInfo.attachment
                              }
                            );
                            const valid = await this.validateUrl();
                            if (!valid) {
                              segmentEventTrack("Error blur input Website", {
                                campaign_error_website_url: this.state.urlError
                              });
                            }
                          }}
                        />
                      </Item>
                    */}
                    </View>
                  </View>
                </View>
                <Text style={styles.warningText}>
                  {translate(
                    "Please make sure not to include social media sites such as Facebook, Instagram, Youtube, SnapChat, etc"
                  )}
                </Text>
                <View />
                <View style={styles.bottonViewWebsite}>
                  {this.props.swipeUpDestination && (
                    <Text
                      style={styles.footerText}
                      onPress={() => {
                        segmentEventTrack(
                          "Clicked Change Swipe-up Destination"
                        );
                        this.props.toggleSideMenu();
                      }}
                    >
                      {translate("Change Swipe-up Destination")}
                    </Text>
                  )}
                  <LowerButton
                    checkmark={true}
                    bottom={-5}
                    function={this._handleSubmission}
                  />
                </View>
              </ScrollView>
            </View>
          )}
        </KeyboardShift>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.campaignC.data,
  adType: state.campaignC.adType,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  storyAdAttachment: state.campaignC.storyAdAttachment
});

const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(Website);
