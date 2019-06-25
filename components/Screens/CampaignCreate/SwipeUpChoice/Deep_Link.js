import React, { Component } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Content, Text, Container } from "native-base";
import AppConfirm from "../../../MiniComponents/AppConfirm";
import AppChoice from "../../../MiniComponents/AppChoice";

//Icons
import AppInstallIcon from "../../../../assets/SVGs/SwipeUps/AppInstalls";

// Style
import styles from "./styles";

//Data
import list from "../../../Data/callactions.data";

//redux
import { connect } from "react-redux";

class Deep_Link extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      attachment: {
        app_name: "",
        ios_app_id: "",
        android_app_url: "",
        icon_media_id: "",
        deep_link_url: "",
        icon_media_url: ""
      },
      firstStepDone: false,
      data: [],
      androidData: [],
      image: "",
      callaction: list[3].call_to_action_list[0],
      callactions: list[3].call_to_action_list,
      nameError: "",
      appError: "",
      android_app_urlError: "",
      deep_link_urlError: "",
      showList: false
    };
  }

  componentDidMount() {
    if (
      this.props.data.hasOwnProperty("attachment") &&
      this.props.data.destination !== "REMOTE_WEBPAGE"
    ) {
      this.props.data.attachment !== "BLANK"
        ? this.setState({
            attachment: {
              ...this.props.data.attachment
            },
            firstStepDone: true
          })
        : this.setState({
            firstStepDone: false
          });
    }
  }

  renderNextStep = (nameError, callActionError, attachment, callaction) => {
    if (!nameError && !callActionError) {
      this.setState({
        attachment,
        callaction,
        firstStepDone: true
      });
    }
  };

  renderPreviousStep = () => {
    this.setState({ firstStepDone: !this.state.firstStepDone });
  };

  _handleSubmission = async deep_link_url => {
    await this.setState({
      attachment: { ...this.state.attachment, deep_link_url }
    });

    this.props._changeDestination(
      "DEEP_LINK",
      this.state.callaction,
      this.state.attachment
    );
    this.props.navigation.navigate("AdDesign");
  };
  render() {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <Container style={[styles.container]}>
          <Content
            style={styles.container}
            contentContainerStyle={styles.deepLinkContainer}
          >
            <View style={styles.deepLinkHeader}>
              <AppInstallIcon style={styles.icon} />
              <View style={styles.textcontainer}>
                <Text style={styles.titletext}>Deep Link</Text>
                <Text style={styles.subtext}>
                  Send Snapchatters to a specific{"\n"} page in your app
                </Text>
              </View>
            </View>
            {!this.state.firstStepDone ? (
              <AppChoice
                navigation={this.props.navigation}
                toggleSideMenu={this.props.toggleSideMenu}
                renderNextStep={this.renderNextStep}
                listNum={3}
                swipeUpDestination={this.props.swipeUpDestination}
              />
            ) : (
              <AppConfirm
                icon_media_url={this.state.attachment.icon_media_url}
                app_name={this.state.attachment.app_name}
                ios_app_id={this.state.attachment.ios_app_id}
                android_app_url={this.state.attachment.android_app_url}
                _handleSubmission={this._handleSubmission}
                renderPreviousStep={this.renderPreviousStep}
                deep_link_url={this.state.attachment.deep_link_url}
                deepLink={true}
                toggleSideMenu={this.props.toggleSideMenu}
                swipeUpDestination={this.props.swipeUpDestination}
              />
            )}
          </Content>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({ data: state.campaignC.data });

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Deep_Link);
