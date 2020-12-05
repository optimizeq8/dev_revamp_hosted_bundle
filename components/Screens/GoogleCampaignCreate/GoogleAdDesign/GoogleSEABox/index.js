import PropTypes from "prop-types";
import React from "react";
import { View, Text } from "react-native";
import { Input } from "native-base";
import GlobalStyles, { globalColors } from "../../../../../GlobalStyles";
import styles from "./styles";
import WebsiteSVG from "../../../../../assets/SVGs/SwipeUps/Website";
import Headline1SVG from "../../../../../assets/SVGs/GoogleAdDesign/Headline1";
import Headline2SVG from "../../../../../assets/SVGs/GoogleAdDesign/Headline2";
import Headline3SVG from "../../../../../assets/SVGs/GoogleAdDesign/Headline3";
import Description1SVG from "../../../../../assets/SVGs/GoogleAdDesign/Description1";
import Description2SVG from "../../../../../assets/SVGs/GoogleAdDesign/Description2";
const handleHttp = (networkString, setVal) => {
  if (networkString === "https://") {
    setVal({ networkString: "http://" });
  } else {
    setVal({ networkString: "https://" });
  }
};

export default GoogleSEABox = (props) => {
  let {
    screenProps,
    path1 = "",
    path2 = "",
    disable,
    setVal,
    focus,
    blur,
    submitEditing,
    reference,
    campaign,
  } = props;
  let {
    headline1,
    headline2,
    headline3,
    finalurl,
    networkString,
    description,
    description2,
    inputH1,
    inputH2,
    inputH3,
    inputD,
    inputD2,
    inputURL,
    headline1Error,
    headline2Error,
    headline3Error,
    descriptionError,
    description2Error,
    finalurlError,
  } = props.parentState;
  const { translate } = screenProps;

  if (path1) finalurl = finalurl + "/" + path1;
  if (path2) finalurl += "/" + path2;

  return (
    <View style={styles.previewBlock}>
      <View style={styles.row}>
        <WebsiteSVG
          width={30}
          height={30}
          fill={
            inputURL
              ? globalColors.orange
              : finalurlError
              ? globalColors.red
              : globalColors.twilight
          }
        />
        <View style={[styles.column, { paddingTop: 5, paddingLeft: 10 }]}>
          <Text
            uppercase
            style={[
              styles.headline,
              {
                alignSelf:
                  campaign.language === "1019" ? "flex-end" : "flex-start",
                paddingRight: 10,
                color: inputURL
                  ? globalColors.orange
                  : finalurlError
                  ? globalColors.red
                  : globalColors.twilight,
              },
            ]}
          >
            {translate("Website")} {translate("url")}
          </Text>
          <Input
            autoFocus={!props.parentState.unmounted}
            placeholder={translate("Input landing page url")}
            disabled={disable}
            value={finalurl}
            autoCorrect={false}
            placeholderTextColor={globalColors.rum}
            style={[
              styles.input,
              styles.linkText,
              finalurlError && GlobalStyles.redTextColor,
              { textAlign: campaign.language === "1019" ? "right" : "left" },
            ]}
            autoCapitalize="none"
            onChangeText={(value) => {
              setVal({ finalurl: value });
            }}
            onSubmitEditing={() => {
              submitEditing("inputH1");
            }}
            onBlur={() => {
              blur("finalurl", "inputURL");
            }}
            blurOnSubmit={false}
            onFocus={() => focus({ inputURL: true }, true)}
            returnKeyType={"next"}
            ref={(input) => reference("inputURL", input)}
          />
        </View>
      </View>

      <View style={styles.headersCol}>
        <View
          style={[
            styles.row,
            {
              backgroundColor: "#F7F7F7",
            },
          ]}
        >
          <Headline1SVG
            fill={
              inputH1
                ? globalColors.orange
                : headline1Error
                ? globalColors.red
                : "#a5a5a5"
            }
          />
          <View style={[styles.column]}>
            <Text
              uppercase
              style={[
                styles.headline,
                {
                  alignSelf:
                    campaign.language === "1019" ? "flex-end" : "flex-start",
                  paddingRight: 10,
                  color: inputH1
                    ? globalColors.orange
                    : headline1Error
                    ? globalColors.red
                    : globalColors.twilight,
                },
              ]}
            >
              {translate("Headline")} {translate("1")}
              <Text
                style={[
                  styles.headline,
                  {
                    alignSelf:
                      campaign.language === "1019" ? "flex-end" : "flex-start",
                    paddingRight: 10,
                    color: inputH1
                      ? globalColors.orange
                      : headline1Error
                      ? globalColors.red
                      : globalColors.twilight,
                  },
                  styles.smallFont,
                ]}
              >{` (${30 - headline1.length})`}</Text>
            </Text>
            <Input
              maxLength={30}
              autoCorrect={true}
              disabled={disable}
              value={headline1}
              style={[
                styles.input,
                { textAlign: campaign.language === "1019" ? "right" : "left" },
              ]}
              placeholder={translate("Input headline text")}
              onChangeText={(value) => {
                setVal({ headline1: value });
              }}
              onSubmitEditing={() => {
                submitEditing("inputH2");
              }}
              onBlur={() => {
                blur("headline1", "inputH1");
              }}
              blurOnSubmit={false}
              onFocus={() => focus({ inputH1: true })}
              returnKeyType={"next"}
              ref={(input) => reference("inputH1", input)}
            />
          </View>
        </View>
        <View style={[styles.row, { paddingVertical: 5 }]}>
          <Headline2SVG
            fill={
              inputH2
                ? globalColors.orange
                : headline2Error
                ? globalColors.red
                : "#a5a5a5"
            }
          />

          <View style={[styles.column]}>
            <Text
              uppercase
              style={[
                styles.headline,
                {
                  alignSelf:
                    campaign.language === "1019" ? "flex-end" : "flex-start",
                  paddingRight: 10,
                  color: inputH2
                    ? globalColors.orange
                    : headline2Error
                    ? globalColors.red
                    : globalColors.twilight,
                },
              ]}
            >
              {translate("Headline")} {translate("2")}
              <Text
                style={[
                  styles.headline,
                  {
                    alignSelf:
                      campaign.language === "1019" ? "flex-end" : "flex-start",
                    paddingRight: 10,
                    color: inputH2
                      ? globalColors.orange
                      : headline2Error
                      ? globalColors.red
                      : globalColors.twilight,
                  },
                  styles.smallFont,
                ]}
              >{` (${30 - headline2.length})`}</Text>
            </Text>
            <Input
              placeholder={translate("Input headline text")}
              disabled={disable}
              value={headline2}
              autoCorrect={true}
              style={[
                styles.input,
                { textAlign: campaign.language === "1019" ? "right" : "left" },
              ]}
              maxLength={30}
              onChangeText={(value) => {
                setVal({ headline2: value });
              }}
              onSubmitEditing={() => {
                submitEditing("inputH3");
              }}
              onBlur={() => {
                blur("headline2", "inputH2");
              }}
              blurOnSubmit={false}
              onFocus={() => focus({ inputH2: true }, true)}
              returnKeyType={"next"}
              ref={(input) => reference("inputH2", input)}
            />
          </View>
        </View>
        <View style={[styles.row, { backgroundColor: "#F7F7F7" }]}>
          <Headline3SVG fill={inputH3 ? globalColors.orange : "#a5a5a5"} />

          <View style={[styles.column]}>
            <Text
              uppercase
              style={[
                styles.headline,
                {
                  alignSelf:
                    campaign.language === "1019" ? "flex-end" : "flex-start",
                  paddingRight: 10,
                  color: inputH3 ? globalColors.orange : globalColors.twilight,
                },
              ]}
            >
              {translate("Headline")} {translate("3")}
              <Text
                style={[
                  styles.headline,
                  {
                    alignSelf:
                      campaign.language === "1019" ? "flex-end" : "flex-start",
                    paddingRight: 10,
                    color: inputH3
                      ? globalColors.orange
                      : globalColors.twilight,
                  },
                  styles.smallFont,
                ]}
              >{` (${translate("optional")}) (${30 - headline3.length})`}</Text>
            </Text>
            <Input
              placeholder={translate("Input headline text")}
              disabled={disable}
              value={headline3}
              autoCorrect={true}
              style={[
                styles.input,
                { textAlign: campaign.language === "1019" ? "right" : "left" },
              ]}
              maxLength={30}
              onChangeText={(value) => {
                setVal({ headline3: value });
              }}
              onSubmitEditing={() => {
                submitEditing("inputD");
              }}
              onBlur={() => {
                blur("headline3", "inputH3");
              }}
              blurOnSubmit={false}
              onFocus={() => focus({ inputH3: true }, true)}
              returnKeyType={"next"}
              ref={(input) => reference("inputH3", input)}
            />
          </View>
        </View>
      </View>

      <View style={[styles.row]}>
        <Description1SVG
          fill={
            inputD
              ? globalColors.orange
              : descriptionError
              ? globalColors.red
              : "#a5a5a5"
          }
        />
        <View style={[styles.column]}>
          <Text
            uppercase
            style={[
              styles.headline,
              {
                alignSelf:
                  campaign.language === "1019" ? "flex-end" : "flex-start",
                paddingRight: 10,
                color: inputD
                  ? globalColors.orange
                  : descriptionError
                  ? globalColors.red
                  : globalColors.twilight,
              },
            ]}
          >
            {translate("Description") + " " + translate("1")}
            <Text
              style={[
                styles.headline,
                {
                  alignSelf:
                    campaign.language === "1019" ? "flex-end" : "flex-start",
                  paddingRight: 10,
                  color: inputD
                    ? globalColors.orange
                    : descriptionError
                    ? globalColors.red
                    : globalColors.twilight,
                },
                styles.smallFont,
              ]}
            >{` (${90 - description.length})`}</Text>
          </Text>
          <Input
            multiline
            disabled={disable}
            value={description}
            style={[
              styles.input,
              styles.textArea,
              { textAlign: campaign.language === "1019" ? "right" : "left" },
            ]}
            placeholderTextColor={globalColors.rum}
            autoCorrect={true}
            maxLength={90}
            placeholder={translate("Input Description 1 text")}
            onChangeText={(value) => {
              setVal({ description: value });
            }}
            onSubmitEditing={() => {
              submitEditing("inputD2");
            }}
            onBlur={() => {
              blur("description", "inputD");
            }}
            blurOnSubmit={true}
            onFocus={() => focus({ inputD: true }, true)}
            returnKeyType={"next"}
            ref={(input) => reference("inputD", input)}
          />
        </View>
      </View>

      <View style={[styles.row, { backgroundColor: "#F7F7F7" }]}>
        <Description2SVG fill={inputD2 ? globalColors.orange : "#a5a5a5"} />
        <View style={[styles.column]}>
          <Text
            uppercase
            style={[
              styles.headline,
              {
                alignSelf:
                  campaign.language === "1019" ? "flex-end" : "flex-start",
                paddingRight: 10,
                color: inputD2 ? globalColors.orange : globalColors.twilight,
              },
            ]}
          >
            {translate("Description") + " " + translate("2")}
            <Text
              style={[
                styles.headline,
                {
                  alignSelf:
                    campaign.language === "1019" ? "flex-end" : "flex-start",
                  paddingRight: 10,
                  color: inputD2 ? globalColors.orange : globalColors.twilight,
                },
                styles.smallFont,
              ]}
            >{` (${translate("optional")}) (${
              90 - description2.length
            })`}</Text>
          </Text>
          <Input
            multiline
            disabled={disable}
            value={description2}
            style={[
              styles.input,
              styles.textArea,
              { textAlign: campaign.language === "1019" ? "right" : "left" },
            ]}
            placeholderTextColor={globalColors.rum}
            autoCorrect={true}
            maxLength={90}
            placeholder={translate("Input Description 2 text")}
            onChangeText={(value) => {
              setVal({ description2: value });
            }}
            onBlur={() => {
              blur("description2", "inputD2");
            }}
            blurOnSubmit={true}
            onFocus={() => focus({ inputD2: true }, true)}
            returnKeyType={"done"}
            ref={(input) => reference("inputD2", input)}
          />
        </View>
      </View>
    </View>
  );
};

GoogleSEABox.propTypes = {
  screenProps: PropTypes.object.isRequired,
  headline1: PropTypes.string.isRequired,
  headline2: PropTypes.string.isRequired,
  headline3: PropTypes.string.isRequired,
  finalurl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  description2: PropTypes.string.isRequired,
  path1: PropTypes.string,
  path2: PropTypes.string,
};
