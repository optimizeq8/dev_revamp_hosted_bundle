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
const Small = props => (
  <Text
    style={{
      fontFamily: "montserrat-medium",
      fontSize: 17,
      color: globalColors.white
    }}
  >
    {props.children}
  </Text>
);
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
ContinueInfo = props => {
  let {
    data,
    adType,
    storyAdsArray,
    collectionAdMedia,
    collectionAdLinkForm
  } = props;

  return (
    <View
      style={{
        height: "50%"
      }}
    >
      <Content
        contentContainerStyle={{
          paddingBottom: "20%"
        }}
        style={styles.contentStyle}
      >
        <Snapchat style={{ alignSelf: "center" }} />
        {data.name && <Text style={styles.text}>{data.name}</Text>}
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
        {data.start_time && (
          <View style={styles.sections}>
            <Text uppercase style={styles.text}>
              Duration
            </Text>
            <Text style={globalStyles.numbers}>
              {dateFormat(new Date(data.start_time), "mmm dS, yyyy")}{" "}
              <Small>to</Small>{" "}
              {dateFormat(new Date(data.end_time), "mmm dS, yyyy")}
            </Text>
            {new Date(data.start_time) < new Date() ||
              (new Date(data.end_time) < new Date() && (
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
              {collectionAdLinkForm === 0 && adType === "SnapAd" ? (
                <MediaBox
                  name={1}
                  disabled={true}
                  ad={{ media: data.media, media_type: data.media_type }}
                />
              ) : (
                <>
                  {collectionAdLinkForm !== 0 && (
                    <MediaBox
                      name={1}
                      disabled={true}
                      ad={{ media: data.media, media_type: data.media_type }}
                    />
                  )}
                  <FlatList
                    contentContainerStyle={{
                      paddingBottom: 100,
                      alignItems: "center"
                    }}
                    keyExtractor={item => item.id}
                    data={
                      collectionAdLinkForm !== 0
                        ? collectionAdMedia
                        : storyAdsArray.slice(0, storyAdsArray.length - 1)
                    }
                    renderItem={this.adCreatives}
                    numColumns={4}
                  />
                </>
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
  storyAdsArray: state.campaignC.storyAdsArray,
  collectionAdMedia: state.campaignC.collectionAdMedia,
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm
});

export default connect(mapStateToProps, null)(ContinueInfo);
