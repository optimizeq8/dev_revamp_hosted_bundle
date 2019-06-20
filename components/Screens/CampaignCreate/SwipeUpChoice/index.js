import React, { Component } from "react";
import { SafeAreaView } from "react-navigation";
import { Content, Container } from "native-base";
import CustomeHeader from "../../../MiniComponents/Header";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Website from "./Website";
import App_Install from "./App_Install";
import Long_Form_Video from "./Long_Form_Video";

// Style
import styles from "./styles";

class SwipeUpChoice extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SafeAreaView style={styles.container} forceInset={{ top: "always" }}>
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
              {(this.props.navigation.state.params.objective === "website" ||
                this.props.navigation.state.params.objective ===
                  "LEAD_GENERATION") && (
                <Website
                  objective={this.props.navigation.state.params.objective}
                  _changeDestination={
                    this.props.navigation.state.params._changeDestination
                  }
                  navigation={this.props.navigation}
                />
              )}
              {this.props.navigation.state.params.objective ===
                "VIDEO_VIEWS" && (
                <Long_Form_Video
                  _changeDestination={
                    this.props.navigation.state.params._changeDestination
                  }
                  navigation={this.props.navigation}
                />
              )}
              {this.props.navigation.state.params.objective
                .toLowerCase()
                .includes("app") && (
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
