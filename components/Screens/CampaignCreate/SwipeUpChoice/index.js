import React, { Component } from "react";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { Content, Container, View } from "native-base";
import * as Segment from "expo-analytics-segment";
import CustomeHeader from "../../../MiniComponents/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Website from "./Website";
import App_Install from "./App_Install";
import Long_Form_Video from "./Long_Form_Video";
import Deep_Link from "./Deep_Link";

// Style
import styles from "./styles";
import WhatsApp from "./WhatsApp";

//Redux
import { connect } from "react-redux";
// import * as actionCreators from "../../../../store/actions";

class SwipeUpChoice extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    let objective = this.props.navigation.getParam("objective", "");
    let _changeDestination = this.props.navigation.getParam(
      "_changeDestination",
      () => {}
    );
    let menu = <View />;
    if (this.props.adType === "CollectionAd") {
      switch (this.props.collectionAdLinkForm) {
        case 1: {
          menu = (
            <Website
              objective={objective}
              _changeDestination={_changeDestination}
              navigation={this.props.navigation}
              toggleSideMenu={this.toggleSideMenu}
              //   swipeUpDestination={true}
            />
          );
          break;
        }
        case 2: {
          menu = (
            <Deep_Link
              objective={objective}
              _changeDestination={_changeDestination}
              navigation={this.props.navigation}
              toggleSideMenu={this.toggleSideMenu}
              //   swipeUpDestination={true}
            />
          );
          break;
        }
      }
    } else {
      if (objective === "LEAD_GENERATION")
        menu = (
          <Website
            objective={objective}
            _changeDestination={_changeDestination}
            navigation={this.props.navigation}
            collectionAdLinkForm={this.props.navigation.getParam(
              "collectionAdLinkForm"
            )}
          />
        );
      else if (objective === "VIDEO_VIEWS") {
        menu = (
          <Long_Form_Video
            _changeDestination={_changeDestination}
            navigation={this.props.navigation}
          />
        );
      } else if (objective.toLowerCase().includes("app")) {
        menu = (
          <App_Install
            _changeDestination={_changeDestination}
            navigation={this.props.navigation}
          />
        );
      } else if (objective === "WEB_CONVERSION") {
        menu = (
          <WhatsApp
            _changeDestination={_changeDestination}
            navigation={this.props.navigation}
          />
        );
      }
    }

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
              {menu}
            </KeyboardAwareScrollView>
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  collectionAdLinkForm: state.campaignC.collectionAdLinkForm,
  adType: state.campaignC.adType
});

export default connect(
  mapStateToProps,
  null
)(SwipeUpChoice);
