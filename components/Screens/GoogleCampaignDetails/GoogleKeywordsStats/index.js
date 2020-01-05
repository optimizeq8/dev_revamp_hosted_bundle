import React, { Component } from "react";
import {
  View,
  Animated,
  BackHandler,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard
} from "react-native";
import { Text, Item, Input, Container } from "native-base";
import { SafeAreaView, NavigationEvents } from "react-navigation";
import { connect } from "react-redux";
import Header from "../../../MiniComponents/Header";
import KeywordRow from "./KeywordRow";
import KeywordValues from "./KeywordValues";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import * as Segment from "expo-analytics-segment";
// Style
import styles from "./styles";

//Icons
import ClicksIcon from "../../../../assets/SVGs/Performance/Clicks";
import CTRIcon from "../../../../assets/SVGs/Performance/CTR";
import SpendIcon from "../../../../assets/SVGs/Performance/Spend";
import SearchIcon from "../../../../assets/SVGs/Search.svg";
import isUndefined from "lodash/isUndefined";

class GoogleKeywordsStats extends Component {
  static navigationOptions = {
    header: null
  };
  constructor() {
    super();
    this.state = {
      filteredKeywords: [],
      selected: {},
      expanded: false,
      minHeight: 0,
      maxHeight: 300,
      animation: new Animated.Value(0)
    };
  }
  componentDidMount() {
    this.setState({
      filteredKeywords: this.props.selectedCampaign.keywords
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }
  handleSelectedKeyword = keyword => {
    this.setState(
      {
        selected: keyword,
        expanded: isUndefined(keyword.keyword)
      },
      () => {
        this.toggle();
      }
    );
  };

  toggle = () => {
    Animated.spring(this.state.animation, {
      toValue: !this.state.expanded
        ? this.state.maxHeight
        : this.state.minHeight
    }).start();
  };

  render() {
    const { translate } = this.props.screenProps;
    let keywordslist = this.state.filteredKeywords.map(k => {
      return (
        <KeywordRow
          content={k}
          selected={this.state.selected.keyword === k.keyword}
          onPressFunction={this.handleSelectedKeyword}
          key={k.keyword}
        />
      );
    });

    return (
      <SafeAreaView
        style={styles.safeAreaView}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <NavigationEvents
          onDidFocus={() => {
            Segment.screenWithProperties("Google Keywords Stats", {
              category: "Campaign Details",
              channel: "google"
            });
          }}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Container style={styles.container}>
            <View
              style={[
                styles.gradient,
                {
                  borderBottomStartRadius: 30,
                  borderBottomEndRadius: 30,
                  overflow: "hidden"
                }
              ]}
            >
              <LinearGradient
                colors={["#6200FF", "#8900FF"]}
                locations={[1, 0.3]}
                style={styles.gradient}
              />
            </View>
            <Header
              screenProps={this.props.screenProps}
              closeButton={false}
              translateTitle={false}
              title={this.props.selectedCampaign.campaign.name}
              icon={"google"}
              navigation={this.props.navigation}
              titelStyle={{
                textAlign: "left",
                fontSize: 15,
                paddingTop: 3,
                alignSelf: "center",
                justifyContent: "center",
                flex: 1,
                alignItems: "center"
              }}
              topRightButtonText={"Edit"}
              showTopRightButton={
                this.props.selectedCampaign.campaign.status === "REMOVED"
                  ? false
                  : true
              }
              topRightButtonFunction={() => {
                this.props.navigation.push("GoogleEditKeywords");
              }}
            />

            <View style={styles.slidercontainer}>
              <Item
                style={{
                  marginBottom: 10,
                  alignSelf: "center",
                  width: 300,
                  borderColor: "#0000",
                  backgroundColor: "rgba(0,0,0,0.15)",
                  borderRadius: 30,
                  paddingHorizontal: 15
                }}
              >
                <SearchIcon width={18} height={18} stroke="#fff" style={{}} />

                <Input
                  placeholder={translate("Search Keyword") + "..."}
                  style={styles.searchInputText}
                  placeholderTextColor="#fff"
                  onChangeText={value => {
                    let filteredKeywords = this.props.selectedCampaign.keywords.filter(
                      c => c.keyword.toLowerCase().includes(value.toLowerCase())
                    );
                    this.setState({ filteredKeywords: filteredKeywords });
                  }}
                />
              </Item>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                  paddingHorizontal: 10
                }}
              >
                <Text
                  uppercase
                  style={[
                    styles.title,
                    {
                      flex: 1,
                      textAlign: "left"
                    }
                  ]}
                >
                  {translate("Keywords")}
                </Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                    alignContent: "center"
                  }}
                >
                  <SpendIcon
                    width={26}
                    fill={"#fff"}
                    style={{ flex: 1, alignSelf: "center" }}
                  />
                  <ClicksIcon
                    height={24}
                    fill={"#fff"}
                    style={{ flex: 1, alignSelf: "center" }}
                  />
                  <CTRIcon
                    width={27}
                    height={27}
                    fill={"#fff"}
                    style={{ flex: 1, alignSelf: "center" }}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.scrollContainer,
                  !isUndefined(this.state.selected.keyword) && {
                    maxHeight: hp("45%"),
                    paddingBottom: "3%"
                  }
                ]}
              >
                <ScrollView>{keywordslist}</ScrollView>
              </View>
            </View>
          </Container>
        </TouchableWithoutFeedback>

        <Animated.View
          style={[
            { backgroundColor: "#000", overflow: "hidden" },
            { height: this.state.animation }
          ]}
        >
          {!isUndefined(this.state.selected.keyword) && (
            <KeywordValues
              screenProps={this.props.screenProps}
              content={this.state.selected}
            />
          )}
        </Animated.View>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  selectedCampaign: state.dashboard.selectedCampaign
});
export default connect(mapStateToProps)(GoogleKeywordsStats);
