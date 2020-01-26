import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import { Text } from "native-base";
import GlobalStyles from "../../../GlobalStyles";
import styles from "./styles";
import ADIcon from "../../../assets/SVGs/ADIcon";

export default GoogleSEAPreview = props => {
  let {
    screenProps,
    headline1,
    headline2,
    headline3,
    finalurl,
    path1 = "",
    path2 = "",
    description,
    description2,
    inputH1,
    inputH2,
    inputH3,
    inputD,
    inputD2,
    inputURL,
    details = true,
    campaign
  } = props;
  const { translate } = screenProps;

  if (path1) finalurl = finalurl + "/" + path1;
  if (path2) finalurl += "/" + path2;

  return (
    <View style={styles.previewBlock}>
      <View
        style={[
          styles.headersCol,
          !details && { marginTop: 10 },
          {
            alignSelf:
              campaign && campaign.language === "1019"
                ? "flex-end"
                : "flex-start"
          }
        ]}
      >
        <View style={[GlobalStyles.row]}>
          {finalurl ? (
            <Text style={[styles.headlineText, styles.linkText]}>
              <Text
                style={[
                  styles.adIcon,
                  {
                    textAlign:
                      campaign && campaign.language === "1019"
                        ? "right"
                        : "left"
                  }
                ]}
              >
                {translate("Ad")}
              </Text>
              {"  " + finalurl}
            </Text>
          ) : (
            <Text style={[styles.headlineText, styles.linkText]}>
              {translate("Website")} {translate("url")}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={[GlobalStyles.row]}>
            <View style={styles.headerContent}>
              {details && (
                <Text
                  uppercase
                  style={[
                    styles.headline,
                    inputH1
                      ? GlobalStyles.orangeTextColor
                      : GlobalStyles.lightGrayTextColor
                  ]}
                >
                  {translate("Headline")} {translate("1")}
                </Text>
              )}
              {headline1 ? (
                <Text style={[styles.headlineText]}>{headline1}</Text>
              ) : (
                <Text uppercase style={[styles.headlineText]}>
                  {translate("Add")} {translate("Headline")}
                </Text>
              )}
            </View>
          </View>
          <View style={[GlobalStyles.row]}>
            <View style={styles.headlineBlueLine} />
            <View style={[GlobalStyles.column]}>
              {details && (
                <Text
                  uppercase
                  style={[
                    styles.headline,
                    { paddingLeft: 6 },
                    inputH2
                      ? GlobalStyles.orangeTextColor
                      : GlobalStyles.lightGrayTextColor
                  ]}
                >
                  {translate("Headline")} {translate("2")}
                </Text>
              )}
              {headline2 ? (
                <Text
                  style={[
                    styles.headlineText,
                    {
                      paddingLeft: 6,
                      textAlign:
                        campaign && campaign.language === "1019"
                          ? "right"
                          : "left"
                    }
                  ]}
                >
                  {headline2}
                </Text>
              ) : (
                <Text
                  uppercase
                  style={[styles.headlineText, { paddingLeft: 6 }]}
                >
                  {translate("Add")} {translate("Headline")}
                </Text>
              )}
            </View>
          </View>
          <View style={[GlobalStyles.row]}>
            <View style={styles.headlineBlueLine} />
            <View style={[GlobalStyles.column]}>
              {details && (
                <Text
                  uppercase
                  style={[
                    styles.headline,
                    { paddingLeft: 6 },
                    inputH3
                      ? GlobalStyles.orangeTextColor
                      : GlobalStyles.lightGrayTextColor
                  ]}
                >
                  {translate("Headline")} {translate("3")}
                </Text>
              )}
              {headline3 ? (
                <Text
                  style={[
                    styles.headlineText,
                    {
                      paddingLeft: 6,

                      textAlign:
                        campaign && campaign.language === "1019"
                          ? "right"
                          : "left"
                    }
                  ]}
                >
                  {headline3}
                </Text>
              ) : (
                <Text
                  uppercase
                  style={[styles.headlineText, { paddingLeft: 6 }]}
                >
                  {translate("Add")} {translate("Headline")}
                </Text>
              )}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.headersCol}>
        {details && (
          <Text
            uppercase
            style={[
              styles.headline,
              inputURL
                ? GlobalStyles.orangeTextColor
                : GlobalStyles.lightGrayTextColor
            ]}
          >
            {translate("Website")} {translate("url")}
          </Text>
        )}
      </View>
      <View style={styles.descriptionGrayLine} />
      <View
        style={[
          styles.headersCol,
          !details && { marginTop: 10 },
          {
            alignSelf:
              campaign && campaign.language === "1019"
                ? "flex-end"
                : "flex-start"
          }
        ]}
      >
        {details && (
          <Text
            uppercase
            style={[
              styles.headline,
              inputD || inputD2
                ? GlobalStyles.orangeTextColor
                : GlobalStyles.darkGrayTextColor
            ]}
          >
            {translate("Description")}
          </Text>
        )}
        <Text
          style={[
            styles.headlineText,
            styles.descriptionText,
            {
              textAlign:
                campaign && campaign.language === "1019" ? "right" : "left"
            },
            !details && { color: "#909090" }
          ]}
        >
          {description ||
            translate("Add") +
              " " +
              translate("Description") +
              " " +
              translate("1")}
        </Text>
        <Text
          style={[
            styles.headlineText,
            styles.descriptionText,
            {
              textAlign:
                campaign && campaign.language === "1019" ? "right" : "left",
              alignSelf:
                campaign && campaign.language === "1019"
                  ? "flex-end"
                  : "flex-start"
            },
            !details && { color: "#909090" }
          ]}
        >
          {description2 ||
            translate("Add") +
              " " +
              translate("Description") +
              " " +
              translate("2")}
        </Text>
      </View>
    </View>
  );
};

GoogleSEAPreview.propTypes = {
  screenProps: PropTypes.object.isRequired,
  headline1: PropTypes.string.isRequired,
  headline2: PropTypes.string.isRequired,
  headline3: PropTypes.string.isRequired,
  finalurl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  description2: PropTypes.string.isRequired,
  path1: PropTypes.string,
  path2: PropTypes.string
};
