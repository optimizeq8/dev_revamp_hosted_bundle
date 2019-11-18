//Components
import React, { Component } from "react";

import { connect } from "react-redux";
import * as Segment from "expo-analytics-segment";
import { Video } from "expo-av";
import * as Animatable from "react-native-animatable";

import {
  BackHandler,
  View,
  Text,
  TouchableOpacity,
  I18nManager
} from "react-native";
import { Container, Content } from "native-base";
import RNImageOrCacheImage from "../RNImageOrCacheImage";
import { Transition } from "react-navigation-fluid-transitions";
import { SafeAreaView } from "react-navigation";
import ImageViewer from "react-native-image-zoom-viewer";
import CustomHeader from "../Header";
import LowerButton from "../LowerButton";

//icons
// import CloseIcon from "../../../../assets/SVGs/Close";
// import ArrowUpIcon from "../../../../assets/SVGs/ArrowUp";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

//Functions

import isNull from "lodash/isNull";

const preview = {
  uri:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
};
class ImagePreview extends Component {
  static navigationOptions = {
    header: null
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  render() {
    const image = this.props.navigation.getParam("image");
    const id = this.props.navigation.getParam("id");
    const upload = this.props.navigation.getParam("upload", null);

    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ top: "always" }}
      >
        {isNull(upload) && (
          <CustomHeader
            screenProps={this.props.screenProps}
            title={""}
            navigation={this.props.navigation}
          />
        )}
        <Container style={styles.container}>
          <Content
            padder
            scrollEnabled={false}
            contentContainerStyle={styles.content}
          >
            <Transition shared={id}>
              <View style={{ flex: 1, padding: 5 }}>
                <ImageViewer
                  renderIndicator={() => null}
                  imageUrls={[{ url: image }]}
                />
              </View>
              {/* <RNImageOrCacheImage
                media={image}
                style={styles.placeholder}
                resizeMode={"cover"}
              /> */}
            </Transition>
            {/* <TouchableOpacity
              style={{
                backgroundColor: "orange",
                borderRadius: 30
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 30,
                  fontFamily: "montserrat-bold",
                  alignSelf: "center",
                  padding
                }}
              >
                Submit
              </Text>
            </TouchableOpacity> */}

            {!isNull(upload) && (
              <View style={{ alignSelf: "center" }}>
                <Text
                  style={[
                    // styles.text,
                    {
                      textAlign: "center",
                      color: "#fff",
                      fontFamily: "montserrat-bold",
                      fontSize: 17,
                      paddingVertical: 10,
                      bottom: 5,
                      fontFamily: "montserrat-regular",
                      width: 250
                    }
                  ]}
                >
                  would you like to upload this image?
                </Text>

                <View
                  style={{
                    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
                    alignSelf: "center",
                    justifyContent: "center"
                  }}
                >
                  <LowerButton
                    cross={true}
                    bottom={0}
                    function={() => this.props.navigation.goBack()}
                  />
                  <LowerButton
                    bottom={0}
                    function={() => {
                      upload();

                      this.props.navigation.goBack();
                    }}
                  />
                </View>
              </View>
            )}
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

export default ImagePreview;
