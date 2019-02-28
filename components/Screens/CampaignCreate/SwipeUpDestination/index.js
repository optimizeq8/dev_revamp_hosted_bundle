import React, { Component } from "react";
import { connect } from "react-redux";
import RNPickerSelect from "react-native-picker-select";
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
import DateTimePicker from "react-native-modal-datetime-picker";
import * as actionCreators from "../../../../store/actions";

// Style
import styles, { colors } from "./styles";

class SwipeUpDestination extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
            <Text style={styles.text}>Swipe Up Destination</Text>
            <View style={{ flexDirection: "column", paddingTop: 30 }}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.push("SwipeUpChoice");
                }}
                style={styles.buttonN}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name="web"
                  style={styles.icon}
                />
                <View style={styles.textcontainer}>
                  <Text style={[styles.titletext]}>Website</Text>
                  <Text style={[styles.subtext]}>
                    The user will be taken to your website
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log("hi");
                }}
                style={styles.buttonN}
              >
                <Icon
                  type="FontAwesome"
                  name="video-camera"
                  style={styles.icon}
                />
                <View style={styles.textcontainer}>
                  <Text style={[styles.titletext]}>Longform Video</Text>
                  <Text style={[styles.subtext]}>
                    The user will be shown A video of {"\n"} 10 Mins.
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log("hi");
                }}
                style={styles.buttonN}
              >
                <Icon type="AntDesign" name="download" style={styles.icon} />
                <View style={styles.textcontainer}>
                  <Text style={[styles.titletext]}>App Install</Text>
                  <Text style={[styles.subtext]}>
                    The user will be sent to Download {"\n"} your app.
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  console.log("hi");
                }}
                style={styles.buttonN}
              >
                <Icon type="Entypo" name="layers" style={styles.icon} />
                <View style={styles.textcontainer}>
                  <Text style={[styles.titletext]}>Deep Link</Text>
                  <Text style={[styles.subtext]}>
                    The user will be sent to a specific {"\n"} page in your app
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Card>
        </KeyboardAwareScrollView>
      </Container>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwipeUpDestination);
