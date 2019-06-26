//Components
import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  BackHandler,
  Animated
} from "react-native";
import { Video, Segment } from "expo";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Title,
  Subtitle,
  Button,
  Text
} from "native-base";
import * as Animatable from "react-native-animatable";

import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import { Transition } from "react-navigation-fluid-transitions";
import { SafeAreaView } from "react-navigation";

//icons
import CloseIcon from "../../../../assets/SVGs/Close";
import ArrowUpIcon from "../../../../assets/SVGs/ArrowUp";

// Style
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";

//Functions
import startCase from "lodash/startCase";
import toLower from "lodash/toLower";

class AdDesignReview extends Component {
  static navigationOptions = {
    header: null
  };
  state = { videoIsLoading: false };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    Segment.screenWithProperties("Ad Preview", {
      category: "Campaign Creation"
    });
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  render() {
    const destination = this.props.navigation.getParam("destination", "");
    const appIcon = this.props.navigation.getParam("icon_media_url", "");

    return (
      <SafeAreaView
        style={styles.safeAreaContainer}
        forceInset={{ top: "always" }}
      >
        <Container style={styles.container}>
          <Header iosBarStyle={"light-content"} style={styles.header}>
            <Body style={styles.headerBody}>
              <Title style={styles.brandName}>
                {this.props.navigation.state.params.brand_name}
              </Title>
              <Subtitle numberOfLines={1} style={styles.headline}>
                {this.props.navigation.state.params.headline}
              </Subtitle>
            </Body>
            <Right style={{ flex: 0 }}>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={[globalStyles.backButton, styles.closeButton]}
              >
                <CloseIcon />
              </TouchableOpacity>
            </Right>
          </Header>
          <Content
            padder
            scrollEnabled={false}
            contentContainerStyle={styles.content}
          >
            <Transition shared="image">
              <View style={styles.mainCard}>
                {this.props.navigation.state.params.type === "VIDEO" ? (
                  <>
                    {this.state.videoIsLoading ? (
                      <LoadingScreen dash={true} />
                    ) : null}
                    <Video
                      onLoadStart={() =>
                        this.setState({ videoIsLoading: true })
                      }
                      onLoad={() => this.setState({ videoIsLoading: false })}
                      source={{
                        uri: this.props.navigation.state.params.image
                      }}
                      isLooping
                      shouldPlay
                      resizeMode="stretch"
                      style={styles.video}
                    />
                  </>
                ) : (
                  <Image
                    resizeMode="stretch"
                    style={styles.placeholder}
                    source={{
                      uri: this.props.navigation.state.params.image
                    }}
                  />
                )}
                <View
                  style={[
                    styles.callToActionContainer,
                    destination === "APP_INSTALL" &&
                      styles.appInstallCallToActionContainer
                  ]}
                >
                  <View
                    style={[
                      styles.callToActionText,
                      destination === "APP_INSTALL" &&
                        styles.appInstallCallToActionText,
                      destination !== "APP_INSTALL" &&
                        destination !== "BLANK" &&
                        styles.appInstallAndBlankCallToActionContainer
                    ]}
                  >
                    {destination !== "APP_INSTALL" && destination !== "BLANK" && (
                      <View
                        style={[
                          styles.iconArrowUp,
                          { paddingRight: 0, marginBottom: 5 }
                        ]}
                      >
                        <ArrowUpIcon />
                      </View>
                    )}
                    <Text
                      style={[
                        styles.callToActionText,
                        destination === "APP_INSTALL" &&
                          styles.appInstallCallToActionText
                      ]}
                    >
                      {this.props.navigation.state.params.call_to_action !==
                      "BLANK"
                        ? startCase(
                            toLower(
                              this.props.navigation.state.params.call_to_action
                            )
                          )
                        : ""}
                    </Text>
                  </View>

                  {destination === "APP_INSTALL" && (
                    <View style={styles.iconArrowUp}>
                      <ArrowUpIcon />
                    </View>
                  )}
                  <Text style={styles.AD}>Ad</Text>
                </View>
                {destination === "APP_INSTALL" && (
                  <Animatable.View
                    animation={"fadeInUpBig"}
                    style={styles.bottomView}
                  >
                    <View style={[globalStyles.lightGrayBorderColor]}>
                      <Image
                        source={{ uri: appIcon }}
                        style={[
                          globalStyles.grayBorderColor,
                          styles.appIconBottom
                        ]}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={styles.textContainerBottom}>
                      <Text
                        numberOfLines={2}
                        style={styles.brandNameBottomText}
                      >
                        {this.props.navigation.state.params.brand_name}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={[
                          globalStyles.grayTextColor,
                          styles.headlineBottomText
                        ]}
                      >
                        {this.props.navigation.state.params.headline}
                      </Text>
                    </View>
                    <Button
                      style={[
                        styles.getButton,
                        globalStyles.darkGrayBackgroundColor
                      ]}
                    >
                      <Text style={styles.getButtonText}>GET</Text>
                    </Button>
                  </Animatable.View>
                )}
              </View>
            </Transition>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

export default AdDesignReview;
