import PropTypes from "prop-types";
import React from "react";
import { View, Text, I18nManager } from "react-native";
import GlobalStyles from "../../../GlobalStyles";
import styles, { dynamicStyle } from "./styles";
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
    inputD,
    inputD2,
    inputURL,
    details = true,
    language,
    showEmpty
  } = props;
  const { translate } = screenProps;
  let headlineArray = [headline1, headline2, headline3];
  let headlineNums = ["1", "2", "3"];
  if (language === "1019") {
    headlineArray = headlineArray.reverse();
    headlineNums = headlineNums.reverse();
  }
  if (path1) finalurl = finalurl + "/" + path1;
  if (path2) finalurl += "/" + path2;

  return (
    <View style={styles.previewBlock}>
      <View style={[styles.headersCol, !details && { marginTop: 10 }]}>
        <View style={(styles.headersCol, dynamicStyle(language).arabic)}>
          {details && (
            <Text
              style={[
                styles.headline,
                inputURL
                  ? GlobalStyles.orangeTextColor
                  : GlobalStyles.darkGrayTextColor
              ]}
            >
              {translate("Website")} {translate("url")}
            </Text>
          )}
        </View>
        <View style={[GlobalStyles.row, dynamicStyle(language).arabic]}>
          {finalurl ? (
            <Text
              style={[
                styles.headlineText,
                styles.linkText,
                {
                  paddingRight: language === "1019" ? 20 : 0
                }
              ]}
            >
              <Text style={[styles.adIcon, dynamicStyle(language).arabic]}>
                {language === "1019" ? "إعلان" : "Ad"}
              </Text>
              {"  " + finalurl}
            </Text>
          ) : (
            <Text style={[styles.headlineText, styles.linkText]}>
              {translate("Website")} {translate("url")}
            </Text>
          )}
        </View>
        {details && (
          <Text
            style={[
              styles.headline,
              dynamicStyle(language).arabic,
              inputH1
                ? GlobalStyles.orangeTextColor
                : GlobalStyles.darkGrayTextColor
            ]}
          >
            {translate("Headline")}
          </Text>
        )}
        <View
          style={[styles.headlineRowContainer, dynamicStyle(language).arabic]}
        >
          <View style={[styles.headlineRow, dynamicStyle(language).arabic]}>
            <Text style={[styles.headlineText, dynamicStyle(language).arabic]}>
              {headline1
                ? headlineArray[0] + " "
                : translate("Add") + " " + translate("Headline")}
              |{" "}
              <Text
                style={[styles.headlineText, dynamicStyle(language).arabic]}
              >
                {headline2
                  ? headlineArray[1] + " "
                  : translate("Add") + " " + translate("Headline")}
              </Text>
              <Text
                style={[styles.headlineText, dynamicStyle(language).arabic]}
              >
                {headline3
                  ? "| " + headlineArray[2] + " "
                  : showEmpty
                  ? "| " + translate("Add") + " " + translate("Headline")
                  : ""}
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View
        style={[
          styles.headersCol,
          !details && { marginTop: 10 },
          dynamicStyle(language).arabic
        ]}
      >
        {details && (
          <Text
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
            dynamicStyle(language).arabic,
            !details && { color: "#909090" }
          ]}
        >
          {description ||
            translate("Add") +
              " " +
              translate("Description") +
              " " +
              translate("1") +
              " "}{" "}
          {description2
            ? description2
            : showEmpty
            ? translate("Add") +
              " " +
              translate("Description") +
              " " +
              translate("2")
            : ""}
        </Text>
        */}
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
