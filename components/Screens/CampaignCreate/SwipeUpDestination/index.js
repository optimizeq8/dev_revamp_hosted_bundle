import React, { Component } from "react";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  SafeAreaView
} from "react-native";
import {
  Header,
  Left,
  Right,
  Title,
  Body,
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Item,
  Input,
  Container,
  Icon,
  H1,
  Badge
} from "native-base";
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

  componentDidMount() {
    const image = this.props.navigation.state.params.image;
    console.log("image", image);

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
          />
        );
        break;
      }
      case "deep link": {
        menu = <Deep_Link />;
        break;
      }
    }
    return (
      <SafeAreaView style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
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
          <Container
            style={[
              styles.container,
              {
                top: 50,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
                overflow: "hidden"
              }
            ]}
          >
            {!isNull(this.state.image) && this.state.image.length > 0 && (
              <Image
                style={styles.placeholder1}
                source={{ uri: this.state.image }}
                resizeMode="cover"
              />
            )}
            <Header
              style={{ paddingTop: 0 }}
              transparent
              noShadow
              iosBarStyle={"light-content"}
            >
              <Left
                style={{
                  alignItems: "flex-start",
                  alignSelf: "center",
                  flex: 0,
                  marginLeft: 10
                }}
              >
                <BackButton
                  screenname="Ad Design"
                  // businessname={this.state.businessname}
                  navigation={this.props.navigation.goBack}
                  style={{ top: 0, left: 0 }}
                />
              </Left>
              <Body
                style={[
                  {
                    flex: 2,
                    alignItems: "center",
                    alignSelf: "center",
                    width: "100%",
                    color: "#fff"
                  }
                ]}
              >
                <Title style={[styles.headerTitle, { width: "100%" }]}>
                  Swipe up Destination
                </Title>
              </Body>
              {/* <Right /> */}
            </Header>

            <Content contentContainerStyle={{ flexGrow: 1 }}>
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
            </Content>
          </Container>
        </Sidemenu>
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
