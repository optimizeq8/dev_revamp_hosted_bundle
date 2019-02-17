import React, { Component } from "react";
import { connect } from "react-redux";
import { ImagePicker, Permissions } from "expo";
import {
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image
} from "react-native";

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

// Style
import styles, { colors } from "./styles";

class AdDesign extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      campaignInfo: {
        campaign_id: "9",
        brand_name: "",
        headline: "",
        destination: "BLANK",
        call_to_action: "BLANK",
        attachment: "BLANK",
        media_type: ""
      },
      image: null,
      loaded: 0,
      type: "",
      formatted: null
    };
  }
  async componentDidMount() {
    const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (permission.status !== "granted") {
      const newPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  }
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "All",
      base64: false,
      exif: false
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri, type: result.type.toUpperCase() });
    }
    this.formatMedia();
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
    body.append("ad_account_id", this.state.campaignInfo.ad_account_id);
    body.append("campaign_id", this.state.campaignInfo.campaign_id);
    body.append("brand_name", this.state.campaignInfo.brand_name);
    body.append("headline", this.state.campaignInfo.headline);
    body.append("destination", this.state.campaignInfo.destination);
    body.append("call_to_action", this.state.campaignInfo.call_to_action);
    body.append("attachment", this.state.campaignInfo.attachment);

    this.setState({
      formatted: body
    });
  }
  render() {
    let { image } = this.state;

    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          startPoint={{ x: 1, y: 0 }}
          endPoint={{ x: 0, y: 1 }}
          style={styles.gradient}
        />
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          scrollEnabled={false}
          style={{
            backgroundColor: "#fff",
            borderTopStartRadius: 30,
            borderTopEndRadius: 30
          }}
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
            <Text style={styles.text}>Input your Snapchat AD Details</Text>
            <Item rounded style={styles.input}>
              <Input
                style={styles.inputtext}
                placeholder="Brand Name (Business name)"
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
              />
            </Item>
            <Item rounded style={styles.input}>
              <Input
                style={styles.inputtext}
                placeholder="Headline"
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
              />
            </Item>
            <TouchableOpacity
              onPress={() => {
                this._pickImage();
              }}
              style={styles.buttonN}
            >
              <Image
                style={styles.placeholder}
                source={
                  !image
                    ? require("../../../../assets/images/placeholder.png")
                    : { uri: image }
                }
                resizeMode="contain"
              />
            </TouchableOpacity>
            <Text> {Math.round(this.state.loaded, 2)} %</Text>
            <TouchableOpacity
              onPress={() => {
                console.log(this.state.campaignInfo);
                this.props.ad_design(this.state.formatted);
              }}
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
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({
  ad_design: info => dispatch(actionCreators.ad_design(info))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdDesign);
