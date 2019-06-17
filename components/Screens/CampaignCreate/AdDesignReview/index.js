//Components
import React, { Component } from "react";
import { View, TouchableOpacity, Image, BackHandler } from "react-native";
import { Video, Segment } from "expo";
import {
  Text,
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Title,
  Subtitle
} from "native-base";
import LoadingScreen from "../../../MiniComponents/LoadingScreen";
import { Transition } from "react-navigation-fluid-transitions";
import { SafeAreaView } from "react-navigation";

//icons
import CloseIcon from "../../../../assets/SVGs/Close";

// Style
import styles from "./styles";
import globalStyles from "../../../../GlobalStyles";

//Functions
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import startCase from "lodash/startCase";
import toLower from "lodash/toLower";

class AdDesignReview extends Component {
  static navigationOptions = {
    header: null
  };
  state = { videoIsLoading: false };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);

    Segment.screen("Ad Preview Screen");
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  render() {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <Container style={styles.container}>
          <Header iosBarStyle={"light-content"} style={styles.header}>
            <Body style={styles.headerBody}>
              <Title style={styles.brandName}>
                {this.props.navigation.state.params.brand_name}
              </Title>
              <Subtitle style={styles.headline}>
                {this.props.navigation.state.params.headline}
              </Subtitle>
            </Body>
            <Right>
              <TouchableOpacity
                onPress={() => this.props.navigation.goBack()}
                style={[
                  globalStyles.backButton,
                  {
                    left: widthPercentageToDP(0),
                    top: heightPercentageToDP(0)
                  }
                ]}
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
                <View style={styles.callToActionContainer}>
                  <Text style={styles.callToActionText}>
                    {this.props.navigation.state.params.call_to_action !==
                    "BLANK"
                      ? startCase(
                          toLower(
                            this.props.navigation.state.params.call_to_action
                          )
                        )
                      : ""}
                  </Text>
                  <Text style={styles.AD}>Ad</Text>
                </View>
              </View>
            </Transition>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

export default AdDesignReview;
