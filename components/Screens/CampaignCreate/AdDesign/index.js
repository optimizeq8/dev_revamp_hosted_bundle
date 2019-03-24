import React, { Component } from "react";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { Video } from "expo";
import {
  Card,
  Button,
  Content,
  Text,
  CardItem,
  Body,
  Item,
  Input,
  Container,
  Icon,
  H1,
  Badge
} from "native-base";
import { LinearGradient } from "expo";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as actionCreators from "../../../../store/actions";
import validateWrapper from "../../../../Validation Functions/ValidateWrapper";

// Style
import styles, { colors } from "./styles";
import { ScrollView } from "react-native-gesture-handler";

class AdDesign extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        campaign_id: "",
        brand_name: "",
        headline: "",
        destination: "BLANK",
        call_to_action: "BLANK",
        attachment: "BLANK",
        media_type: ""
      },
      objective: "",
      image: null,
      loaded: 0,
      type: "",
      formatted: null,
      brand_nameError: "",
      headlineError: "",
      imageError: ""
    };
    this._handleSubmission = this._handleSubmission.bind(this);
    this._changeDestination = this._changeDestination.bind(this);
  }
  async componentDidMount() {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        campaign_id: this.props.campaign_id
      },
      objective: this.props.data.objective
    });

    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  }

  _changeDestination = (destination, call_to_action, attachment) => {
    this.setState({
      campaignInfo: {
        ...this.state.campaignInfo,
        destination,
        call_to_action,
        attachment
      }
    });
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "All",
      base64: false,
      exif: false,
      quality: 0.1,
      aspect: [9, 16]
    });

    console.log(result);
    console.log(Math.floor(result.width / 9), "width");
    console.log(Math.floor(result.height / 16), "height");
    //if (result.width >= 1080 && result.height >= 1920)
    if (Math.floor(result.width / 9) === Math.floor(result.height / 16))
      if (!result.cancelled) {
        console.log(result);

        this.setState({ image: result.uri, type: result.type.toUpperCase() });
        this.formatMedia();
      }
  };

  formatMedia() {
    let res = this.state.image.split("/ImagePicker/");
    let format = res[1].split(".");
    let mime = "application/octet-stream";
    var photo = {
      uri: this.state.image,
      type: this.state.type + "/" + format[1],
      name: res[1]
    };
    var body = new FormData();

    body.append("media", photo);
    body.append("media_type", this.state.type);
    body.append("ad_account_id", this.props.mainBusiness.snap_ad_account_id);
    body.append("campaign_id", this.state.campaignInfo.campaign_id);
    body.append("brand_name", this.state.campaignInfo.brand_name);
    body.append("headline", this.state.campaignInfo.headline);
    body.append("destination", this.state.campaignInfo.destination);
    body.append("call_to_action", this.state.campaignInfo.call_to_action);
    body.append(
      "attachment",
      JSON.stringify(this.state.campaignInfo.attachment)
    );

    this.setState({
      formatted: body
    });
  }

  _getUploadState = loading => {
    console.log("loading", loading);

    this.setState({
      loaded: loading
    });
  };
  _handleSubmission = async () => {
    const brand_nameError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.brand_name
    );
    const headlineError = validateWrapper(
      "mandatory",
      this.state.campaignInfo.headline
    );
    const imageError = validateWrapper("mandatory", this.state.image);
    this.setState({
      brand_nameError,
      headlineError,
      imageError
    });

    if (!brand_nameError && !headlineError && !imageError) {
      let t = await this.formatMedia();
      this.props.ad_design(
        this.state.formatted,
        this._getUploadState,
        this.props.navigation
      );
      // this.props.navigation.navigate("AdDetails");
    }
  };
  render() {
    let { image } = this.state;
    let width = Dimensions.get("window").width * 0.5 - 185;
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <ScrollView
          style={{
            backgroundColor: "#fff",
            borderTopStartRadius: 30,
            borderTopEndRadius: 30
          }}
        >
          <KeyboardAwareScrollView
            resetScrollToCoords={{ x: 0, y: 0 }}
            scrollEnabled={false}
          >
            <Card
              style={[
                styles.mainCard,
                {
                  margin: 0,
                  shadowColor: "#fff",
                  shadowRadius: 1,
                  shadowOpacity: 0.7,
                  shadowOffset: { width: 8, height: 8 }
                }
              ]}
            >
              <View style={{ flexDirection: "row", marginBottom: 35 }}>
                <Button
                  onLayout={event => {
                    var { x, y, width, height } = event.nativeEvent.layout;
                    console.log("width", width);
                  }}
                  transparent
                  onPress={() => this.props.navigation.goBack()}
                  style={{
                    paddingLeft: 10,
                    marginRight: width
                  }}
                >
                  <Icon
                    style={{
                      top: 20,
                      fontSize: 35
                    }}
                    name="arrow-back"
                  />
                </Button>
                <Text style={styles.text}>Input your Snapchat AD Details</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  this._pickImage();
                }}
                style={styles.buttonN}
              >
                {this.state.type === "VIDEO" ? (
                  <Video
                    source={{
                      uri: image
                    }}
                    shouldPlay
                    isLooping
                    isMuted
                    resizeMode="cover"
                    style={styles.placeholder}
                  />
                ) : (
                  <Image
                    style={styles.placeholder}
                    source={
                      !image
                        ? require("../../../../assets/images/placeholder.png")
                        : { uri: image }
                    }
                    resizeMode="cover"
                  />
                )}
                <Item
                  style={[
                    styles.inputBrand,
                    {
                      borderColor: this.state.brand_nameError
                        ? "red"
                        : "#D9D9D9"
                    }
                  ]}
                >
                  <Icon
                    type="SimpleLineIcons"
                    name="pencil"
                    style={{ color: "white" }}
                  />
                  <Input
                    style={styles.inputtext}
                    placeholder="Brand Name (Business name)"
                    placeholderTextColor="white"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value =>
                      this.setState({
                        campaignInfo: {
                          ...this.state.campaignInfo,
                          brand_name: value
                        }
                      })
                    }
                    onBlur={() => {
                      this.setState({
                        brand_nameError: validateWrapper(
                          "mandatory",
                          this.state.campaignInfo.brand_name
                        )
                      });
                    }}
                  />
                </Item>

                <Item
                  style={[
                    styles.inputHeadline,
                    {
                      borderColor: this.state.headlineError ? "red" : "#D9D9D9"
                    }
                  ]}
                >
                  <Icon
                    type="SimpleLineIcons"
                    name="pencil"
                    style={{ color: "white" }}
                  />
                  <Input
                    style={styles.inputtext}
                    placeholder="Headline"
                    placeholderTextColor="white"
                    autoCorrect={false}
                    autoCapitalize="none"
                    onChangeText={value =>
                      this.setState({
                        campaignInfo: {
                          ...this.state.campaignInfo,
                          headline: value
                        }
                      })
                    }
                    onBlur={() => {
                      this.setState({
                        headlineError: validateWrapper(
                          "mandatory",
                          this.state.campaignInfo.headline
                        )
                      });
                    }}
                  />
                </Item>
                {!["BRAND_AWARENESS", "reach"].find(
                  obj =>
                    this.state.objective.toLowerCase() === obj.toLowerCase()
                ) && (
                  <TouchableOpacity
                    style={styles.swipeUp}
                    onPress={() => {
                      this.state.objective.toLowerCase() === "traffic"
                        ? this.props.navigation.navigate("SwipeUpDestination", {
                            _changeDestination: this._changeDestination
                          })
                        : this.props.navigation.navigate("SwipeUpChoice", {
                            _changeDestination: this._changeDestination,
                            objective: "app"
                          });
                    }}
                  >
                    <Text style={styles.swipeUpText}>
                      {this.state.campaignInfo.destination !== "BLANK"
                        ? this.state.campaignInfo.destination
                        : this.state.campaignInfo.destination.includes("REMOTE")
                        ? "Website"
                        : "Swipe Up destination"}
                      <Icon
                        type="MaterialIcons"
                        name="arrow-drop-down"
                        style={{ color: "white" }}
                      />
                    </Text>
                  </TouchableOpacity>
                )}
              </TouchableOpacity>
              {!this.state.imageError ? null : (
                <Text
                  style={{
                    textAlign: "center",
                    color: "#717171",

                    fontFamily: "benton-sans-medium",
                    fontSize: 16
                  }}
                >
                  Please choose an image.
                </Text>
              )}
              <Text> {Math.round(this.state.loaded, 2)} %</Text>
              <Button
                onPress={() => {
                  if (this.state.image)
                    this.props.navigation.push("AdDesignReview", {
                      image: this.state.image,
                      type: this.state.type,
                      call_to_action: this.state.campaignInfo.call_to_action,
                      headline: this.state.campaignInfo.headline,
                      brand_name: this.state.campaignInfo.brand_name
                    });
                }}
              >
                <Text> Preview</Text>
              </Button>
              <TouchableOpacity
                onPress={this._handleSubmission}
                style={styles.buttonN}
              >
                <Image
                  style={styles.image}
                  source={require("../../../../assets/images/button.png")}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </Card>
          </KeyboardAwareScrollView>
        </ScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  campaign_id: state.campaignC.campaign_id,
  mainBusiness: state.auth.mainBusiness,
  data: state.campaignC.data
});

const mapDispatchToProps = dispatch => ({
  ad_design: (info, loading, navigation) =>
    dispatch(actionCreators.ad_design(info, loading, navigation))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdDesign);
