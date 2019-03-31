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
import styles from "./styles";
import { colors } from "../../../GradiantColors/colors";

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
          locations={[0.7, 1]}
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
                  this.props.navigation.push("SwipeUpChoice", {
                    _changeDestination: this.props.navigation.state.params
                      ._changeDestination,
                    objective: "website"
                  });
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
                  this.props.navigation.push("SwipeUpChoice", {
                    _changeDestination: this.props.navigation.state.params
                      ._changeDestination,
                    objective: "deep link"
                  });
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
