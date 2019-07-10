import React, { Component } from "react";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Content, Container } from "native-base";
import { Segment } from "expo";
import CustomeHeader from "../../../MiniComponents/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Website from "./Website";
import App_Install from "./App_Install";
import Long_Form_Video from "./Long_Form_Video";

// Style
import styles from "./styles";
import WhatsApp from "./WhatsApp";

class SwipeUpChoice extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    let objective = this.props.navigation.getParam("objective", "");
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
        <NavigationEvents
          onDidFocus={() => {
            switch (this.props.navigation.getParam("objective")) {
              case "LEAD_GENERATION":
                Segment.screenWithProperties("Snap Ad Website SwipeUp", {
                  category: "Campaign Creation",
                  label: "Lead Generation Objective"
                });
                // Segment.trackWithProperties(
                //   "Selected Lead Generation Website Swipeup",
                //   {
                //     category: "Campaign Creation"
                //   }
                // );
                break;
              case "VIDEO_VIEWS":
                Segment.screenWithProperties("Snap Ad Video Views SwipeUp", {
                  category: "Campaign Creation",
                  label: "Video Views Objective"
                });
                break;
              case "WEB_CONVERSION":
                Segment.screenWithProperties("Snap Ad Whatsapp SwipeUp", {
                  category: "Campaign Creation",
                  label: "Whatsapp Campaign Objective"
                });
                break;
              default:
                Segment.screenWithProperties("Snap Ad App Install SwipeUp", {
                  category: "Campaign Creation",
                  label: "App Install Objective"
                });
            }
          }}
        />

        <Container style={styles.container}>
          <CustomeHeader
            closeButton={false}
            navigation={this.props.navigation}
          />
          <Content contentContainerStyle={styles.contentContainer}>
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              scrollEnabled={false}
              contentContainerStyle={styles.contentContainer}
            >
              {this.props.navigation.getParam("objective") ===
                "LEAD_GENERATION" && (
                <Website
                  objective={objective}
                  _changeDestination={
                    this.props.navigation.state.params._changeDestination
                  }
                  navigation={this.props.navigation}
                />
              )}
              {objective === "VIDEO_VIEWS" && (
                <Long_Form_Video
                  _changeDestination={
                    this.props.navigation.state.params._changeDestination
                  }
                  navigation={this.props.navigation}
                />
              )}
              {objective === "WEB_CONVERSION" && (
                <WhatsApp
                  _changeDestination={
                    this.props.navigation.state.params._changeDestination
                  }
                  navigation={this.props.navigation}
                />
              )}
              {objective.toLowerCase().includes("app") && (
                <App_Install
                  _changeDestination={
                    this.props.navigation.state.params._changeDestination
                  }
                  navigation={this.props.navigation}
                />
              )}
            </KeyboardAwareScrollView>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

export default SwipeUpChoice;
