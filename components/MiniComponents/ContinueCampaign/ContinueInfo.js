import React from "react";
import { View, FlatList } from "react-native";
import { Content, Text } from "native-base";
import Snapchat from "../../../assets/SVGs/Snapchat";
import MediaBox from "../../Screens/CampaignDetails/MediaBox";
import styles from "./styles";
import formatNumber from "../../formatNumber";
import dateFormat from "dateformat";
import globalStyles, { globalColors } from "../../../GlobalStyles";
import { connect } from "react-redux";
import { Small } from "../StyledComponents";

adCreatives = item => {
  return (
    <MediaBox
      key={item.id}
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
ContinueInfo = props => {
  let {
    data,
    oldTempAdType,
    storyAdsArray,
    collectionAdMedia,
    oldTempData
  } = props;

  return (
    <View
      style={{
        height: "50%"
      }}
    >
      <Content
        contentContainerStyle={{
          paddingBottom: "20%",
          alignItems: "center"
        }}
        style={styles.contentStyle}
      >
        <Snapchat style={{ alignSelf: "center" }} />
        {oldTempData.name && (
          <Text style={styles.text}>{oldTempData.name}</Text>
        )}
        {data.campaignInfo && data.campaignInfo.lifetime_budget_micro && (
          <View style={styles.sections}>
            <Text uppercase style={styles.text}>
              Budget
            </Text>
            <Text style={[globalStyles.numbers, { fontSize: 24 }]}>
              {formatNumber(data.campaignInfo.lifetime_budget_micro)}
            </Text>
          </View>
        )}
        {oldTempData.start_time && (
          <View style={styles.sections}>
            <Text uppercase style={styles.text}>
              Duration
            </Text>
            <Text style={globalStyles.numbers}>
              {dateFormat(new Date(oldTempData.start_time), "mmm dS, yyyy")}{" "}
              <Small>to</Small>{" "}
              {dateFormat(new Date(oldTempData.end_time), "mmm dS, yyyy")}
            </Text>
            {new Date(oldTempData.start_time) < new Date() ||
              (new Date(oldTempData.end_time) < new Date() && (
                <Text style={styles.text}>
                  The date is no longer applicable
                </Text>
              ))}
          </View>
        )}
        {data.media && (
          <View style={[styles.sections, { top: "5%", height: "35%" }]}>
            <Text uppercase style={[styles.text, { marginBottom: 30 }]}>
              Media
            </Text>
            <View style={styles.mediaContainer}>
              {oldTempAdType === "SnapAd" ? (
                <MediaBox
                  name={1}
                  disabled={true}
                  ad={{ media: data.media, media_type: data.media_type }}
                />
              ) : (
                <View
                  style={{
                    alignItems: "center"
                  }}
                >
                  {oldTempAdType === "CollectionAd" && (
                    <MediaBox
                      name={1}
                      disabled={true}
                      ad={{ media: data.media, media_type: data.media_type }}
                    />
                  )}
                  <FlatList
                    style={{ top: "5%" }}
                    contentContainerStyle={{
                      paddingBottom: "20%",
                      alignItems: "center"
                    }}
                    keyExtractor={item => item.id}
                    data={
                      oldTempAdType === "CollectionAd"
                        ? collectionAdMedia
                        : storyAdsArray.slice(0, storyAdsArray.length - 1)
                    }
                    renderItem={this.adCreatives}
                    numColumns={4}
                  />
                </View>
              )}
            </View>
          </View>
        )}
      </Content>
    </View>
  );
};

const mapStateToProps = state => ({
  adType: state.campaignC.adType,
  data: state.campaignC.data,
  oldTempAdType: state.campaignC.oldTempAdType,
  storyAdsArray: state.campaignC.storyAdsArray,
  collectionAdMedia: state.campaignC.collectionAdMedia,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  oldTempData: state.campaignC.oldTempData
});

export default connect(mapStateToProps, null)(ContinueInfo);
