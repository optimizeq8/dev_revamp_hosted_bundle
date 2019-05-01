import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import {
  heightPercentageToDP,
  widthPercentageToDP
} from "react-native-responsive-screen";
import Toggle from "react-native-switch-toggle";
//styles
import styles from "../../Screens/CampaignCreate/SwipeUpChoice/styles";
import LowerButton from "../LowerButton";
import { Item, Input } from "native-base";
import validateWrapper from "../../../Validation Functions/ValidateWrapper";
export default class index extends Component {
  state = { deep_link_url: "", deep_link_urlError: "" };

  validate = () => {
    const deep_link_urlError = validateWrapper(
      "deepLink",
      this.state.deep_link_url
    );
    this.setState({ deep_link_urlError });

    if (!deep_link_urlError) {
      this.props._handleSubmission(this.state.deep_link_url);
    }
  };
  render() {
    return (
      <View style={{ alignSelf: "center", height: heightPercentageToDP(80) }}>
        <View style={{ flexDirection: "row" }}>
          <Image
            style={{
              height: heightPercentageToDP(8.3),
              width: heightPercentageToDP(8.3),
              alignSelf: "center",
              borderRadius: 18
            }}
            source={{
              uri: this.props.icon_media_url
            }}
          />
          <View style={{ flexDirection: "column" }}>
            <Text style={[styles.title]}>{this.props.app_name}</Text>
            {this.props.ios_app_id !== "" && (
              <Text style={[styles.appTexts, { flexDirection: "column" }]}>
                iOS App ID{" "}
                <Text style={{ color: "#FF9D00" }}>
                  {" "}
                  {this.props.ios_app_id}
                </Text>
              </Text>
            )}
            {this.props.android_app_url !== "" && (
              <Text style={[styles.appTexts, { flexDirection: "column" }]}>
                Android URL{" "}
                <Text style={{ color: "#FF9D00" }}>
                  {this.props.android_app_url}
                </Text>
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            marginTop: heightPercentageToDP(4),
            alignSelf: "center"
          }}
        >
          <Text style={[styles.text]}>Your app will be advertised for</Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center"
            }}
          >
            <View style={{ flexDirection: "column" }}>
              <TouchableOpacity
                style={[
                  styles.OS,
                  {
                    backgroundColor:
                      this.props.ios_app_id !== ""
                        ? "#fff"
                        : "rgba(255,255,255,0.3)"
                  }
                ]}
              >
                <Text style={styles.OSText}>iOS</Text>
              </TouchableOpacity>
              <Toggle
                switchOn={this.props.ios_app_id !== ""}
                backgroundColorOff="rgba(255,255,255,0.1)"
                backgroundColorOn="rgba(255,255,255,0.1)"
                circleColorOff="#FFf"
                circleColorOn="#66D072"
                duration={500}
                circleStyle={styles.toggleCircle}
                containerStyle={styles.toggleStyle}
              />
            </View>
            <View style={{ flexDirection: "column" }}>
              <TouchableOpacity
                style={[
                  styles.OS,
                  {
                    paddingHorizontal: 0,
                    backgroundColor:
                      this.props.android_app_url !== ""
                        ? "#fff"
                        : "rgba(255,255,255,0.3)"
                  }
                ]}
              >
                <Text style={[styles.OSText]}>Android</Text>
              </TouchableOpacity>
              <Toggle
                switchOn={this.props.android_app_url !== ""}
                backgroundColorOff="rgba(255,255,255,0.1)"
                backgroundColorOn="rgba(255,255,255,0.1)"
                circleColorOff="#FFf"
                circleColorOn="#66D072"
                duration={500}
                circleStyle={styles.toggleCircle}
                containerStyle={styles.toggleStyle}
              />
            </View>
          </View>
        </View>
        {this.props.deepLink && (
          <>
            <Item
              rounded
              style={[
                styles.input,
                {
                  borderColor: this.state.deep_link_urlError
                    ? "red"
                    : "transparent",
                  marginBottom: 0,
                  top: heightPercentageToDP(4)
                }
              ]}
            >
              <Input
                style={styles.inputtext}
                placeholder="Deep Link URL"
                placeholderTextColor="white"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={value =>
                  this.setState({
                    deep_link_url: value
                  })
                }
                onBlur={() => {
                  this.setState({
                    deep_link_urlError: validateWrapper(
                      "deepLink",
                      this.state.deep_link_url
                    )
                  });
                }}
              />
            </Item>
            {this.state.deep_link_urlError ? (
              <Text style={styles.deepLinkError}>
                {this.state.deep_link_urlError}
              </Text>
            ) : null}
          </>
        )}
        <Text
          style={[
            styles.subtext,
            {
              marginBottom: 0,
              top: heightPercentageToDP(17),
              textDecorationLine: "underline",
              fontFamily: "montserrat-bold",
              fontSize: heightPercentageToDP(2)
            }
          ]}
          onPress={() => this.props.renderPreviousStep()}
        >
          Change app
        </Text>
        <LowerButton
          function={
            this.props.deepLink ? this.validate : this.props._handleSubmission
          }
          bottom={-heightPercentageToDP(2.5)}
        />
      </View>
    );
  }
}
