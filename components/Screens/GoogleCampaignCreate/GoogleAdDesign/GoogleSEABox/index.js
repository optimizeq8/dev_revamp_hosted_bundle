import PropTypes from "prop-types";
import React from "react";
import { View } from "react-native";
import { Text, Input, Textarea } from "native-base";
import GlobalStyles, { globalColors } from "../../../../../GlobalStyles";
import styles from "./styles";
import ADIcon from "../../../../../assets/SVGs/ADIcon";

export default GoogleSEABox = props => {
  let {
    screenProps,
    path1 = "",
    path2 = "",
    disable,
    setVal,
    focus,
    blur,
    submitEditing,
    reference
  } = props;
  let {
    headline1,
    headline2,
    headline3,
    finalurl,
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
    finalurlError
  } = props.parentState;
  const { translate } = screenProps;

  if (path1) finalurl = finalurl + "/" + path1;
  if (path2) finalurl += "/" + path2;

  return (
    <View style={styles.previewBlock}>
      <View style={styles.headersCol}>
        <View style={[styles.row]}>
          <View
            style={[styles.headlineBlueLine, { borderLeftColor: "#0000" }]}
          />

          <View style={styles.column}>
            <Text
              uppercase
              style={[
                styles.headline,
                inputH1
                  ? GlobalStyles.orangeTextColor
                  : headline1Error
                  ? GlobalStyles.redTextColor
                  : GlobalStyles.darkGrayTextColor
              ]}
            >
              {translate("Headline")} {translate("1")}
              <Text
                style={[
                  styles.headline,
                  styles.smallFont,
                  inputH1
                    ? GlobalStyles.orangeTextColor
                    : headline1Error
                    ? GlobalStyles.redTextColor
                    : GlobalStyles.darkGrayTextColor
                ]}
              >{` (${30 - headline1.length})`}</Text>
            </Text>
            <Input
              autoFocus={!props.parentState.unmounted}
              maxLength={30}
              autoCorrect={true}
              disabled={disable}
              value={headline1}
              style={styles.input}
              placeholder={translate("Input headline text")}
              onChangeText={value => {
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
            />
          </View>
        </View>
        <View style={[styles.row, { paddingVertical: 5 }]}>
          <View style={styles.headlineBlueLine} />
          <View style={[styles.column]}>
            <Text
              uppercase
              style={[
                styles.headline,
                inputH2
                  ? GlobalStyles.orangeTextColor
                  : headline2Error
                  ? GlobalStyles.redTextColor
                  : GlobalStyles.darkGrayTextColor
              ]}
            >
              {translate("Headline")} {translate("2")}
              <Text
                style={[
                  styles.headline,
                  styles.smallFont,
                  inputH2
                    ? GlobalStyles.orangeTextColor
                    : headline2Error
                    ? GlobalStyles.redTextColor
                    : GlobalStyles.darkGrayTextColor
                ]}
              >{` (${30 - headline2.length})`}</Text>
            </Text>
            <Input
              placeholder={translate("Input headline text")}
              disabled={disable}
              value={headline2}
              autoCorrect={true}
              style={styles.input}
              maxLength={30}
              onChangeText={value => {
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
              ref={input => reference("inputH2", input)}
            />
          </View>
        </View>
        <View style={[styles.row]}>
          <View style={styles.headlineBlueLine} />
          <View style={[styles.column]}>
            <Text
              uppercase
              style={[
                styles.headline,
                inputH3
                  ? GlobalStyles.orangeTextColor
                  : headline3Error
                  ? GlobalStyles.redTextColor
                  : GlobalStyles.darkGrayTextColor
              ]}
            >
              {translate("Headline")} {translate("3")}
              <Text
                style={[
                  styles.headline,
                  styles.smallFont,
                  inputH3
                    ? GlobalStyles.orangeTextColor
                    : headline3Error
                    ? GlobalStyles.redTextColor
                    : GlobalStyles.darkGrayTextColor
                ]}
              >{` (${30 - headline3.length})`}</Text>
            </Text>
            <Input
              placeholder={translate("Input headline text")}
              disabled={disable}
              value={headline3}
              autoCorrect={true}
              style={styles.input}
              maxLength={30}
              onChangeText={value => {
                setVal({ headline3: value });
              }}
              onSubmitEditing={() => {
                submitEditing("inputURL");
              }}
              onBlur={() => {
                blur("headline3", "inputH3");
              }}
              blurOnSubmit={false}
              onFocus={() => focus({ inputH3: true }, true)}
              returnKeyType={"next"}
              ref={input => reference("inputH3", input)}
            />
          </View>
        </View>
      </View>
      <View style={[styles.headersCol, { paddingTop: 5 }]}>
        <Text
          uppercase
          style={[
            styles.headline,
            styles.titlePadding,
            inputURL
              ? GlobalStyles.orangeTextColor
              : finalurlError
              ? GlobalStyles.redTextColor
              : GlobalStyles.darkGrayTextColor
          ]}
        >
          {translate("Website")} {translate("url")}
        </Text>
        <View style={[styles.row, { paddingTop: 5 }]}>
          <ADIcon style={styles.adIcon} />
          <Input
            placeholder={translate("Input landing page url")}
            disabled={disable}
            value={finalurl}
            autoCorrect={false}
            placeholderTextColor={globalColors.lightGray}
            style={[
              styles.input,
              styles.linkText,
              finalurlError && GlobalStyles.redTextColor
            ]}
            autoCapitalize="none"
            onChangeText={value => {
              setVal({ finalurl: value });
            }}
            onSubmitEditing={() => {
              submitEditing("inputD");
            }}
            onBlur={() => {
              blur("finalurl", "inputURL");
            }}
            blurOnSubmit={false}
            onFocus={() => focus({ inputURL: true }, true)}
            returnKeyType={"next"}
            ref={input => reference("inputURL", input)}
          />
        </View>
      </View>
      <View style={styles.descriptionGrayLine} />
      <View style={[styles.headersCol, { width: "100%" }]}>
        <Text
          uppercase
          style={[
            styles.headline,
            styles.titlePadding,
            inputD
              ? GlobalStyles.orangeTextColor
              : descriptionError
              ? GlobalStyles.redTextColor
              : GlobalStyles.darkGrayTextColor
          ]}
        >
          {translate("Description") + " " + translate("1")}
          <Text
            style={[
              styles.headline,
              styles.smallFont,
              inputD
                ? GlobalStyles.orangeTextColor
                : descriptionError
                ? GlobalStyles.redTextColor
                : GlobalStyles.darkGrayTextColor
            ]}
          >{` (${90 - description.length})`}</Text>
        </Text>
        <Input
          multiline
          disabled={disable}
          value={description}
          style={[styles.input, styles.textArea]}
          placeholderTextColor={globalColors.lightGray}
          autoCorrect={true}
          maxLength={90}
          placeholder={translate("Input Description 1 text")}
          onChangeText={value => {
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
          ref={input => reference("inputD", input)}
        />

        <Text
          uppercase
          style={[
            styles.headline,
            styles.titlePadding,
            inputD2
              ? GlobalStyles.orangeTextColor
              : description2Error
              ? GlobalStyles.redTextColor
              : GlobalStyles.darkGrayTextColor
          ]}
        >
          {translate("Description") + " " + translate("2")}
          <Text
            style={[
              styles.headline,
              styles.smallFont,
              inputD2
                ? GlobalStyles.orangeTextColor
                : description2Error
                ? GlobalStyles.redTextColor
                : GlobalStyles.darkGrayTextColor
            ]}
          >{` (${90 - description2.length})`}</Text>
        </Text>
        <Input
          multiline
          disabled={disable}
          value={description2}
          style={[styles.input, styles.textArea]}
          placeholderTextColor={globalColors.lightGray}
          autoCorrect={true}
          maxLength={90}
          placeholder={translate("Input Description 2 text")}
          onChangeText={value => {
            setVal({ description2: value });
          }}
          onBlur={() => {
            blur("description2", "inputD2");
          }}
          blurOnSubmit={true}
          onFocus={() => focus({ inputD2: true }, true)}
          returnKeyType={"done"}
          ref={input => reference("inputD2", input)}
        />
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