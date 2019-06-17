import React, { Component } from "react";
import { connect } from "react-redux";
import { SafeAreaView } from "react-native";
import { Content, Header, Left, Body, Right, Container } from "native-base";
import BackButton from "../../../MiniComponents/BackButton";

import { LinearGradient } from "expo";
import CustomeHeader from "../../../MiniComponents/Header";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Website from "./Website";
import App_Install from "./App_Install";
import Long_Form_Video from "./Long_Form_Video";
// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

class SwipeUpChoice extends Component {
  static navigationOptions = {
    header: null
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        <Container style={[styles.container]}>
          <CustomeHeader
            closeButton={false}
            navigation={this.props.navigation}
          />
          {/* <Header transparent noShadow iosBarStyle={"light-content"}>
            <Left
              style={{
                alignItems: "center",
                alignSelf: "center",
                flex: 0,
                paddingLeft: 10
              }}
            >
              <BackButton
                navigation={this.props.navigation.goBack}
                style={{ top: 0, left: 0 }}
              />
            </Left>
            <Body />
            <Right />
          </Header> */}
          <Content
            // padder
            contentContainerStyle={{
              flex: 1
            }}
          >
            <KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              scrollEnabled={false}
              contentContainerStyle={{
                flex: 1
              }}
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeUpChoice);
