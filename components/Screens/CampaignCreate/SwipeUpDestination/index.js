
import React, { Component } from "react";
import { View, TouchableOpacity, Image, BackHandler } from "react-native";
import { Content, Text, Container } from "native-base";
import { SafeAreaView } from "react-navigation";
import * as Segment from 'expo-analytics-segment';
import Sidemenu from "react-native-side-menu";
import CustomHeader from "../../../MiniComponents/Header";
import Website from "../SwipeUpChoice/Website";
import Deep_Link from "../SwipeUpChoice/Deep_Link";
import App_Install from "../SwipeUpChoice/App_Install";
import Long_Form_Video from "../SwipeUpChoice/Long_Form_Video";
import WhatsApp from "../SwipeUpChoice/WhatsApp";
import AttachmentCard from "./AttachmentCard";

//data
import attachmentOptionData from "../../../Data/attachmentOptions.data";


// Style
import styles from './styles';
import GlobalStyles from '../../../../GlobalStyles';

//Functions
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';

//Redux
import { connect } from "react-redux";

class SwipeUpDestination extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      image: "",
      sidemenustate: false,
      selected: "",
      attachmentOptions: attachmentOptionData
    };
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }
	handleBackButton = () => {
		this.props.navigation.goBack();
		return true;
	};
	componentWillUnmount() {
		BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
	}
	componentDidMount() {
		Segment.screenWithProperties('Snap Ad Traffic SwipeUp Selection', {
			category: 'Campaign Creation',
		});
		const image = this.props.navigation.getParam('image', '');
    this.setState({
      image,
      selected: this.props.data ? this.props.data.destination : ""
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  toggleSideMenu() {
    this.setState({
      sidemenustate: false
    });
  }
  handleChoice = value => {
    this.setState(
      {
        selected: value,
        sidemenustate: true
      },
      () => {
        Segment.trackWithProperties("Selected " + value + " Swipeup", {
          category: "Campaign Creation",
          label: this.props.data.objective + " Objective"
        });
      }
    );
  };

  render() {
    let storyAd = this.props.adType === "StoryAd";
    let attachmentOptionsCard = this.state.attachmentOptions
      .slice(0, storyAd ? this.state.attachmentOptions.length : 2)
      .map(opt => (
        <AttachmentCard
          key={opt.label}
          handleChoice={this.handleChoice}
          selected={this.state.selected}
          opt={opt}
        />
      ));
    let menu;
    switch (this.state.selected) {
      case "REMOTE_WEBPAGE": {
        menu = (
          <Website
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
          />
        );
        break;
      }
      case "DEEP_LINK": {
        menu = (
          <Deep_Link
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
          />
        );
        break;
      }
      case "APP_INSTALL": {
        menu = (
          <App_Install
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
          />
        );
        break;
      }
      case "LONGFORM_VIDEO": {
        menu = (
          <Long_Form_Video
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
          />
        );
        break;
      }
      case "WEB_CONVERSION": {
        menu = (
          <WhatsApp
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
          />
        );
        break;
      }
    }
    return (
      <SafeAreaView
        style={styles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Container style={styles.container}>
          <Sidemenu
            onChange={isOpen => {
              if (isOpen === false)
                this.setState({ sidemenustate: isOpen }, () => {
                  Segment.screenWithProperties(
                    "Snap Ad Traffic SwipeUp Selection",
                    {
                      category: "Campaign Creation"
                    }
                  );
                });
              else {
                if (this.state.selected === "REMOTE_WEBPAGE")
                  Segment.screenWithProperties("Snap Ad Website SwipeUp", {
                    category: "Campaign Creation",
                    label: "Traffic Objective"
                  });
                else
                  Segment.screenWithProperties("Snap Ad Deep link SwipeUp", {
                    category: "Campaign Creation",
                    label: "Traffic Objective"
                  });
              }
            }}
            menuPosition="right"
            disableGestures={true}
            isOpen={this.state.sidemenustate}
            menu={this.state.sidemenustate && menu}
            openMenuOffset={wp(85)}
          >
            <CustomHeader
              closeButton={false}
              title={"Swipe up Destination"}
              navigation={this.props.navigation}
            />

            <Content contentContainerStyle={styles.contentContainer}>
              {!isNull(this.state.image) &&
                !isUndefined(this.state.image) &&
                this.state.image.length > 0 && (
                  <View style={styles.placeholder1}>
                    <Image
                      style={styles.image}
                      source={{ uri: this.state.image }}
                      resizeMode="cover"
                    />
                  </View>
                )}
              <View style={styles.content}>{attachmentOptionsCard}</View>
            </Content>
          </Sidemenu>
        </Container>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  data: state.campaignC.data,
  adType: state.campaignC.adType
});

const mapDispatchToProps = dispatch => ({});
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SwipeUpDestination);
