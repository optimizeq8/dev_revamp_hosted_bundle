import React from "react";
import { View, Text } from "react-native";
import { Content } from "native-base";
import Snapchat from "../../../assets/SVGs/Snapchat";
import Instagram from "../../../assets/images/AdTypes/InstagramLogo";

import MediaBox from "../../Screens/CampaignDetails/MediaBox";
import styles from "../ContinueCampaign/styles";
import formatNumber from "../../formatNumber";
import dateFormat from "dateformat";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import { connect } from "react-redux";
import { Small } from "../StyledComponents";

adCreatives = (item) => {
  return (
    <MediaBox
      key={item.index}
      name={item.index + 1}
      disabled={true}
      ad={item.item}
    />
  );
};

/**
 * Functional component that displays information about an incomplete campaign to resume
 * 
 * @param {Objec} props
 * @param {Object} data the saved data from a previous campaign
   @param {String} oldTempAdType the old saved adType of the campaign
   @param {Array}  storyAdsArray the array for old storyAds to display their media
   @param {Array}  collectionAdMedia the array for old collection ads to display their media
   @param {Object} oldTempData the object containing the old data of the campaign to resume incase the user
                                decides to change someting in the AdObjective screen, which will update this.props.data, but 
                                doesn't submit  
 */
ContinueInfo = (props) => {
  let {
    data,
    oldTempAdType,
    storyAdsArray,
    collectionAdMedia,
    oldTempData,
    screenProps,
  } = props;
  let { translate } = screenProps;

  return (
    <View
      style={{
        height: "60%",
        top: 10,
      }}
    >
      <Content
        contentContainerStyle={{
          alignItems: "center",
          paddingBottom: "15%",
        }}
        style={styles.contentStyle}
      >
        <Instagram style={{ alignSelf: "center" }} />
        {oldTempData && oldTempData.name ? (
          <Text style={styles.text}>{oldTempData.name}</Text>
        ) : null}
        {oldTempData && oldTempData.start_time && (
          <View style={styles.sections}>
            <Text style={[styles.text, styles.uppercase]}>
              {translate("Duration")}
            </Text>
            <Text style={globalStyles.numbers}>
              {dateFormat(new Date(oldTempData.start_time), "mmm dS, yyyy")}{" "}
              <Small>to</Small>{" "}
              {dateFormat(new Date(oldTempData.end_time), "mmm dS, yyyy")}
            </Text>
            {new Date(oldTempData.start_time) < new Date() ||
              (new Date(oldTempData.end_time) < new Date() && (
                <Text style={styles.text}>
                  {translate("The date is no longer applicable")}
                </Text>
              ))}
          </View>
        )}
        {data && data.media && (
          <View style={[styles.sections, { top: "2%", height: "60%" }]}>
            <Text style={[styles.text, styles.uppercase]}>
              {translate("Media")}
            </Text>
            <View style={styles.mediaContainer}>
              {data && oldTempAdType === "InstagramFeedAd" && (
                <MediaBox
                  name={1}
                  disabled={true}
                  ad={{ media: data.media, media_type: data.media_type }}
                />
              )}
            </View>
          </View>
        )}
      </Content>
    </View>
  );
};

const mapStateToProps = (state) => ({
  adType: state.instagramAds.adType,
  data: state.instagramAds.data,
  oldTempAdType: state.instagramAds.oldTempAdType,
  storyAdsArray: state.instagramAds.storyAdsArray,
  collectionAdMedia: state.instagramAds.collectionAdMedia,
  collectionAdLinkForm: state.instagramAds.collectionAdLinkForm,
  oldTempData: state.instagramAds.oldTempData,
});

export default connect(mapStateToProps, null)(ContinueInfo);
