import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  SafeAreaView,
  Platform,
  BackHandler
} from "react-native";
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

//icons
import CloseIcon from "../../../../assets/SVGs/Close";

// Style
import styles from "./styles";
import globalStyles from "../../../../Global Styles";
import {
  widthPercentageToDP,
  heightPercentageToDP
} from "react-native-responsive-screen";
import { Transition } from "react-navigation-fluid-transitions";
import startCase from "lodash/startCase";
import toLower from "lodash/toLower";

class AdDesignReview extends Component {
  static navigationOptions = {
    header: null
  };
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
      <SafeAreaView style={styles.container}>
        <Container
          style={[
            {
              flex: 1,
              width: "100%"
            },
            styles.container,
            { paddingTop: Platform.OS === "android" ? 30 : 0 }
          ]}
        >
          <Header
            iosBarStyle={"light-content"}
            style={{ backgroundColor: "transparent", borderBottomWidth: 0 }}
          >
            <Body style={{ alignItems: "flex-start" }}>
              <Title style={styles.brand_name}>
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
            contentContainerStyle={{ flexGrow: 1, margin: 0, padding: 0 }}
          >
            <Transition shared="image">
              <View style={styles.mainCard}>
                {this.props.navigation.state.params.type === "VIDEO" ? (
                  <Video
                    source={{
                      uri: this.props.navigation.state.params.image
                    }}
                    isLooping
                    shouldPlay
                    resizeMode="stretch"
                    style={{ width: "100%", height: "100%" }}
                  />
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
                  style={{
                    // position: "absolute",
                    bottom: "10%",
                    width: "100%",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "row"
                    // justifyContent: "space-around"
                    // flex: 1
                  }}
                >
                  <Text style={[styles.call_to_action]}>
                    {this.props.navigation.state.params.call_to_action !==
                    "BLANK"
                      ? startCase(
                          toLower(
                            this.props.navigation.state.params.call_to_action
                          )
                        )
                      : ""}
                  </Text>
                  <Text style={[styles.AD]}>Ad</Text>
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
