import React, { Component } from "react";
import { View, TouchableOpacity, Image, BackHandler } from "react-native";
import { Content, Text, Container } from "native-base";
import { SafeAreaView } from "react-navigation";
import Sidemenu from "react-native-side-menu";
import CustomHeader from "../../../MiniComponents/Header";
import WebsiteIcon from "../../../../assets/SVGs/Objectives/BRAND_AWARENESS";
import LayersIcon from "../../../../assets/SVGs/Layers";
import Website from "../SwipeUpChoice/Website";
import Deep_Link from "../SwipeUpChoice/Deep_Link";

// Style
import styles from "./styles";
import GlobalStyles from "../../../../GlobalStyles";

//Functions
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import isNull from "lodash/isNull";
import isUndefined from "lodash/isUndefined";

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
      selected: ""
    };
    this.toggleSideMenu = this.toggleSideMenu.bind(this);
  }

  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidMount() {
    const image = this.props.navigation.getParam("image", "");

    this.setState({
      image,
      selected: this.props.data.destination
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  toggleSideMenu() {
    this.setState({
      sidemenustate: false
    });
  }
  render() {
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
    }
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "#0000" }}
        forceInset={{ bottom: "never" }}
      >
        <Container style={styles.container}>
          <Sidemenu
            onChange={isOpen => {
              if (isOpen === false) this.setState({ sidemenustate: isOpen });
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
              <View style={styles.content}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      selected: "REMOTE_WEBPAGE",
                      sidemenustate: true
                    });
                  }}
                  style={[
                    styles.buttonN,
                    this.state.selected === "REMOTE_WEBPAGE"
                      ? GlobalStyles.orangeBackgroundColor
                      : GlobalStyles.transparentBackgroundColor
                  ]}
                >
                  <WebsiteIcon style={styles.icon} />
                  <View style={styles.textcontainer}>
                    <Text style={styles.titletext}>Website</Text>
                    <Text style={styles.subtext}>
                      Send Snapchatters directly to your website

                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      selected: "DEEP_LINK",
                      sidemenustate: true
                    });
                  }}
                  style={[
                    styles.buttonN,
                    this.state.selected === "DEEP_LINK"
                      ? GlobalStyles.orangeBackgroundColor
                      : GlobalStyles.transparentBackgroundColor
                  ]}
                >
                  <LayersIcon style={styles.icon} />
                  <View style={styles.textcontainer}>
                    <Text style={styles.titletext}>Deep Link</Text>
                    <Text style={styles.subtext}>
                      Send Snapchatters to your app or a third-party app
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </Content>
          </Sidemenu>
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
)(SwipeUpDestination);
