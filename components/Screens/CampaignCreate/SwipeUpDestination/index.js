import React, { Component } from "react";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import { View, TouchableOpacity, Image, BackHandler } from "react-native";
import {
  Header,
  Left,
  Title,
  Body,
  Content,
  Text,
  Container
} from "native-base";
import { SafeAreaView } from "react-navigation";
import CustomHeader from "../../../MiniComponents/Header";
import Sidemenu from "react-native-side-menu";
import { LinearGradient, ImageBackground } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as actionCreators from "../../../../store/actions";
import BackButton from "../../../MiniComponents/BackButton";
import WebsiteIcon from "../../../../assets/SVGs/Objectives/BRAND_AWARENESS";
import LayersIcon from "../../../../assets/SVGs/Layers";
import Website from "../SwipeUpChoice/Website";
import Deep_Link from "../SwipeUpChoice/Deep_Link";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import isNull from "lodash/isNull";

// Style
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

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

  componentWillMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }
  handleBackButton = () => {
    this.props.navigation.goBack();
    return true;
  };
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }
  componentDidMount() {
    const image = this.props.navigation.state.params.image;

    this.setState({
      image
    });
  }
  toggleSideMenu() {
    this.setState({
      sidemenustate: false
    });
  }
  render() {
    let menu;
    switch (this.state.selected) {
      case "website": {
        menu = (
          <Website
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            objective={"website"}
            navigation={this.props.navigation}
            toggleSideMenu={this.toggleSideMenu}
            swipeUpDestination={true}
          />
        );
        break;
      }
      case "deep link": {
        menu = (
          <Deep_Link
            _changeDestination={
              this.props.navigation.state.params._changeDestination
            }
            objective={"deep link"}
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
        <Container
          style={[
            styles.container,
            {
              // paddingTop: 30,
            }
          ]}
        >
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

            <Content
              contentContainerStyle={{
                backgroundColor: "black",
                // paddingTop: 30,
                overflow: "hidden",
                marginTop: 10,
                flexGrow: 1,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30
              }}
            >
              {!isNull(this.state.image) && this.state.image.length > 0 && (
                <View style={{ ...styles.placeholder1 }}>
                  <Image
                    style={{ width: "100%", height: "100%", opacity: 0.4 }}
                    source={{ uri: this.state.image }}
                    resizeMode="cover"
                  />
                </View>
              )}
              <View style={{ marginTop: 30 }}>
                <TouchableOpacity
                  onPress={() => {
                    // this.props.navigation.push("SwipeUpChoice", {
                    //   _changeDestination: this.props.navigation.state.params
                    //     ._changeDestination,
                    //   objective: "website"
                    // });
                    this.setState({
                      selected: "website",
                      sidemenustate: true
                    });
                  }}
                  style={[
                    styles.buttonN,
                    {
                      backgroundColor:
                        this.state.selected === "website"
                          ? "#FF9D00"
                          : "transparent"
                    }
                  ]}
                >
                  <WebsiteIcon
                    // type="MaterialCommunityIcons"
                    // name="web"
                    style={styles.icon}
                  />
                  <View style={styles.textcontainer}>
                    <Text style={[styles.titletext]}>Website</Text>
                    <Text style={[styles.subtext]}>
                      Send Snapchatters directly to your website
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    // this.props.navigation.push("SwipeUpChoice", {
                    //   _changeDestination: this.props.navigation.state.params
                    //     ._changeDestination,
                    //   objective: "deep link"
                    // });
                    this.setState({
                      selected: "deep link",
                      sidemenustate: true
                    });
                  }}
                  style={[
                    styles.buttonN,
                    {
                      backgroundColor:
                        this.state.selected === "deep link"
                          ? "#FF9D00"
                          : "transparent"
                    }
                  ]}
                >
                  <LayersIcon style={styles.icon} />
                  <View style={styles.textcontainer}>
                    <Text style={[styles.titletext]}>Deep Link</Text>
                    <Text style={[styles.subtext]}>
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

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeUpDestination);
