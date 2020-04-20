// Components
import React, { Component } from "react";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import {
  View,
  BackHandler,
  Platform,
  I18nManager,
  TouchableOpacity,
  ScrollView,
  Text
} from "react-native";
import * as Segment from "expo-analytics-segment";
import { LinearGradient } from "expo-linear-gradient";

import LowerButton from "../../../MiniComponents/LowerButton";
import CustomHeader from "../../../MiniComponents/Header";

//Style
import styles from "./styles";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//Data
import { SocialPlatforms } from "../../../Data/socialMediaPlatforms.data";
import { snapAds, googleAds } from "../../../Data/adTypes.data";
//Functions
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";

class AdType extends Component {
  static navigationOptions = {
    header: null
  };
  state = {
    active: "Snapchat",
    ad_type_array: snapAds,
    socialMediaPlatforms:
      Platform.OS === "android" && I18nManager.isRTL
        ? [...SocialPlatforms].reverse()
        : SocialPlatforms,
    route: "AdObjective"
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  handleBackButton = () => {
    Segment.trackWithProperties("Closed Ad Type", {
      business_name: this.props.mainBusiness.businessname
    });
    this.props.navigation.navigate("Dashboard");
    return true;
  };

  navigationHandler = adType => {
    //Check if account is verified or not
    if (
      this.props.userInfo.hasOwnProperty("verified_account") &&
      !this.props.userInfo.verified_account
    ) {
      Segment.trackWithProperties("Navigate to VerifyAccount", {
        step: 1,
        business_name: this.props.mainBusiness.businessname,
        campaign_type: adType.value
      });
      this.props.navigation.navigate("VerifyAccount");
    } else {
      Segment.trackWithProperties("Selected Ad Type", {
        business_name: this.props.mainBusiness.businessname,
        campaign_type: adType.value
      });
      Segment.trackWithProperties("Completed Checkout Step", {
        step: 1,
        business_name: this.props.mainBusiness.businessname,
        campaign_type: adType.value
      });

      if (
        this.props.adType !== adType.value &&
        !this.props.incompleteCampaign
      ) {
        this.props.resetCampaignInfo(true);
      }
      if (!this.props.incompleteCampaign && adType.mediaType === "snapchat") {
        this.props.set_adType(adType.value);
      }

      if (
        !this.props.mainBusiness.snap_ad_account_id &&
        adType.mediaType === "snapchat"
      ) {
        this.props.navigation.navigate("SnapchatCreateAdAcc");
      } else if (
        !this.props.mainBusiness.google_account_id &&
        adType.mediaType === "google"
      ) {
        this.props.navigation.navigate("GoogleCreateAdAcc");
      } else if (
        this.props.mainBusiness.google_account_id &&
        adType.mediaType === "google" &&
        this.props.mainBusiness.google_suspended === "1"
      ) {
        this.props.navigation.navigate("SuspendedWarning");
      } else
        this.props.navigation.navigate(adType.rout, {
          tempAdType: adType.value
        });
    }
  };

  getValuebasedOnActiveSlide = () => {
    let backgroundColor = "#0000";
    let textColor = "#FFF";
    const index = SocialPlatforms.findIndex(
      sP => sP.title === this.state.active
    );
    let MainIcon = SocialPlatforms[index].headingIcon.type;
    let ad_type_array = [];
    switch (this.state.active) {
      case "Snapchat":
        backgroundColor = "#FEFB00";
        textColor = "#000";
        ad_type_array = snapAds;
        break;
      case "Google":
        backgroundColor = "#4285F4";
        textColor = "#FFF";
        ad_type_array = googleAds;
        break;
    }

    return {
      backgroundColor,
      textColor,
      MainIcon,
      ad_type_array
    };
  };

  setActiveCampaignType = title => {
    Segment.screenWithProperties(`Ad Type ${title}`, {
      category: "Campaign Creation"
    });
    this.setState({
      active: title
    });
  };

  render() {
    const { translate } = this.props.screenProps;
    const {
      backgroundColor,
      textColor,
      MainIcon,
      ad_type_array
    } = this.getValuebasedOnActiveSlide();

    return (
      <SafeAreaView
        forceInset={{ top: "always", bottom: "never" }}
        style={[
          {
            backgroundColor: backgroundColor
          },
          styles.safeAreaView
        ]}
      >
        {this.state.active === "Instagram" && (
          <LinearGradient
            colors={["#DC8B61", "#4300D9"]}
            start={[0, 0]}
            end={[0.7, 0.25]}
            style={styles.gradient}
          />
        )}
        <NavigationEvents
          onDidFocus={() => {
            Segment.screenWithProperties("Ad Type Snapchat", {
              category: "Campaign Creation"
            });
            Segment.trackWithProperties("Viewed Checkout Step", {
              step: 1,
              business_name: this.props.mainBusiness.businessname
            });
          }}
        />

        <CustomHeader
          screenProps={this.props.screenProps}
          closeButton={true}
          titelStyle={{ color: textColor }}
          iconColor={textColor}
          segment={{
            str: "Ad Type Close",
            obj: { businessname: this.props.mainBusiness.businessname }
          }}
          navigation={this.props.navigation}
        />

        <View style={{ paddingHorizontal: 26 }}>
          <Text
            style={[
              styles.createANewText,
              {
                color: textColor
              }
            ]}
          >
            {translate("Create a new")}
          </Text>
          <ScrollView horizontal contentContainerStyle={{ width: "100%" }}>
            {SocialPlatforms.map(social => {
              let MediaIcon = social.icon.type;
              return (
                <TouchableOpacity
                  key={social.title}
                  onPress={() => this.setActiveCampaignType(social.title)}
                  style={[
                    styles.mediaIcon,
                    this.state.active === social.title && styles.activeMediaIcon
                  ]}
                >
                  <MediaIcon width={"100%"} height={"100%"} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <MainIcon
            width={widthPercentageToDP(70)}
            style={[
              styles.mainIcon,
              this.state.active === "Google" && styles.googleMainIcon,
              {
                right:
                  this.state.active === "Google" && I18nManager.isRTL
                    ? widthPercentageToDP(-20)
                    : this.state.active === "Google" && !I18nManager.isRTL
                    ? widthPercentageToDP(-32)
                    : widthPercentageToDP(-22),
                top:
                  this.state.active === "Google"
                    ? heightPercentageToDP(-5)
                    : heightPercentageToDP(-10)
              },
              this.state.active === "Snapchat" &&
                I18nManager.isRTL && {
                  transform: [{ rotateY: "180deg" }]
                }
            ]}
          />
          {this.state.active !== "Google" && I18nManager.isRTL ? (
            <Text
              style={[
                styles.campaignText,
                {
                  color: textColor
                }
              ]}
            >
              {translate("Campaign") + " "}
              <Text
                style={[
                  styles.headingText,
                  {
                    color: textColor
                  }
                ]}
              >
                {translate(this.state.active)}
              </Text>
            </Text>
          ) : (
            <Text
              style={[
                styles.headingText,
                {
                  color: textColor
                }
              ]}
            >
              {translate(this.state.active)}
              <Text
                style={[
                  styles.campaignText,
                  {
                    color: textColor
                  }
                ]}
              >
                {" " + translate("Campaign")}
              </Text>
            </Text>
          )}
        </View>
        <View style={styles.mainView}>
          <Text style={styles.selectADTypeText}>
            {translate(`Select {{activeSlide}} Ad Type`, {
              activeSlide: I18nManager.isRTL ? " " : this.state.active
            })}
          </Text>
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {ad_type_array.map(item => {
              let Image = item.image;
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.navigationHandler(item);
                  }}
                  key={item.title}
                  style={styles.cardView}
                >
                  <Image style={styles.adTypeImage} />
                  <View style={styles.descriptionView}>
                    <Text style={styles.titleText}>
                      {translate(item.title)}
                    </Text>
                    <Text style={styles.description}>
                      {translate(item.description)}
                    </Text>
                    <Text style={styles.suitableForText}>
                      {translate("Suitable For:")}
                    </Text>
                    {item.suitableFor.map(point => {
                      let Icon = point.icon;
                      return (
                        <View
                          key={point.name}
                          style={styles.suitablePointsView}
                        >
                          <Icon />
                          <Text style={styles.suitablePoints}>
                            {translate(point.name)}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                  <LowerButton
                    style={styles.lowerButton}
                    width={12}
                    height={15}
                    bottom={2}
                    function={() => {
                      this.navigationHandler(item);
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  adType: state.campaignC.adType,
  incompleteCampaign: state.campaignC.incompleteCampaign,
  mainBusiness: state.account.mainBusiness,
  userInfo: state.auth.userInfo
});

const mapDispatchToProps = dispatch => ({
  set_adType: value => dispatch(actionCreators.set_adType(value)),
  resetCampaignInfo: resetAdType =>
    dispatch(actionCreators.resetCampaignInfo(resetAdType))
});
export default connect(mapStateToProps, mapDispatchToProps)(AdType);
