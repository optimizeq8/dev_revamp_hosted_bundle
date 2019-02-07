import React, { Component } from "react";
import { connect } from "react-redux";
import PhoneInput from "react-native-phone-input";
import { View, TouchableOpacity } from "react-native";
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
  H1,
  Badge,
  Icon
} from "native-base";
import RNPickerSelect from "react-native-picker-select";
import RadioGroup from "react-native-radio-buttons-group";

// Style
import styles, { colors } from "./styles";

class BusinessInfo extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);

    this.state = {
      data: [
        {
          label: "Default value is same as label"
        },
        {
          label: "Value is different",
          value: "I'm not same as label"
        }
      ],

      value: 0,
      favColor: "",
      items: [
        {
          label: "Red",
          value: "red"
        },
        {
          label: "Orange",
          value: "orange"
        },
        {
          label: "Blue",
          value: "blue"
        }
      ]
    };
  }
  onPress = data => this.setState({ data });

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.text}>Business Info</Text>

          <Item rounded style={styles.input}>
            <Input style={styles.inputtext} placeholder="Business Name" />
          </Item>
          <RNPickerSelect
            items={this.state.items}
            placeholder={{}}
            onValueChange={value => {
              this.setState({
                favColor: value
              });
            }}
          >
            <Item rounded style={styles.input}>
              <Text
                style={[
                  styles.inputtext,
                  {
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }
                ]}
              >
                Country
                <Icon
                  type="AntDesign"
                  name="down"
                  style={{ color: "#5F5F5F", fontSize: 20 }}
                />
              </Text>
            </Item>
          </RNPickerSelect>

          <RNPickerSelect
            items={this.state.items}
            placeholder={{}}
            onValueChange={value => {
              this.setState({
                favColor: value
              });
            }}
          >
            <Item style={styles.input}>
              <Text
                style={[
                  styles.inputtext,
                  {
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }
                ]}
              >
                Business Type
                <Icon
                  type="AntDesign"
                  name="down"
                  style={{ color: "#5F5F5F", fontSize: 20 }}
                />
              </Text>
            </Item>
          </RNPickerSelect>
          <RadioGroup
            flexDirection="row"
            color="#5F5F5F"
            radioButtons={this.state.data}
            onPress={this.onPress}
          />
        </View>
        <View
          style={{
            bottom: 50
          }}
        >
          <Text style={[styles.text, { marginBottom: 0 }]}>
            By tapping the button below you {"\n"}
            Agree to the Terms & Conditions
          </Text>
          <Button block dark style={styles.button}>
            <Text style={styles.buttontext}>CREATE ACCOUNT</Text>
          </Button>
        </View>
      </View>
    );
  }
}
const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BusinessInfo);
