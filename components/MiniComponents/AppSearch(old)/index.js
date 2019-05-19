import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Item, Icon, Input } from "native-base";
//icons
import SearchIcon from "../../../assets/SVGs/Search";

//data
import list from "./callactions";
import data, { androidDataTest } from "./data";

//styles
import styles from "../../Screens/CampaignCreate/SwipeUpChoice/styles";
import Axios from "axios";
import LowerButton from "../LowerButton";
import { heightPercentageToDP } from "react-native-responsive-screen";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachment: {
        app_name: "",
        ios_app_id: "",
        android_app_url: "",
        icon_media_id: "",
        icon_media_url: ""
      },
      showList: false,
      data: [],
      androidData: [],
      callaction: { label: "Call to Action", value: "" },
      callactions: list[1].call_to_action_list,
      nameError: "",
      callActionError: ""
    };
  }

  _searchIosApps = () => {
    const instance = Axios.create({
      baseURL: "https://api.apptweak.com/ios",
      headers: {
        common: {
          "X-Apptweak-Key": "2WikpoMepgo90kjKHbNvkP2GKlM"
        }
      }
    });
    instance
      .get(`/searches.json?term=${this.state.attachment.app_name}&num=4`)
      .then(res => {
        return res.data.content;
      })
      .then(data =>
        this.setState({
          data: data,
          showList: true
        })
      )
      .catch(err => console.log(err));
  };
  _searchAndroidApps = () => {
    const instance = axios.create({
      baseURL: "https://api.apptweak.com/android",
      headers: {
        common: {
          "X-Apptweak-Key": "2WikpoMepgo90kjKHbNvkP2GKlM"
        }
      }
    });
    instance
      .get(`/searches.json?term=${this.state.attachment.app_name}&num=10`)
      .then(res => {
        return res.data.content;
      })
      .then(data =>
        this.setState({
          androidData: data,
          showList: true
        })
      )
      .catch(err => console.log(err));
  };

  _getAppIds = iosApp => {
    // let androidUrl = this.state.androidData.find(
    //   app => app.title === iosApp.title
    // ); This for the actual api data
    let androidUrl = androidDataTest.find(app => app.title === iosApp.title); //this for dummy data

    this.setState({
      attachment: {
        ...this.state.attachment,
        app_name: iosApp.title,
        ios_app_id: iosApp.id,
        icon_media_url: iosApp.icon,
        android_app_url: androidUrl ? androidUrl.id : "Android app not found"
      }
      //   android_app_urlError: androidUrl ? validateWrapper("mandatory", "") : null
      // showList: false
    });
  };

  validate = () => {
    const iosAppError = validateWrapper(
      "mandatory",
      this.state.attachment.ios_app_id
    );
    const nameError = validateWrapper(
      "mandatory",
      this.state.attachment.app_name
    );
    const callActionError = validateWrapper(
      "mandatory",
      this.state.callaction.value
    );
    this.setState({ nameError, callActionError });
    if (!iosAppError && !nameError && !callActionError) {
      this.props.renderNextStep(
        this.state.nameError,
        this.state.callActionError,
        this.state.attachment,
        this.state.callaction
      );
    }
  };
  render() {
    return (
      <>
        <RNPickerSelect
          items={this.state.callactions}
          placeholder={{ label: "Call to Action", value: "" }}
          onValueChange={(value, index) => {
            this.setState({
              callaction: {
                label:
                  list[1].call_to_action_list[index - 1 > 0 ? index - 1 : 0]
                    .label,
                value
              },
              callActionError: validateWrapper(
                "mandatory",
                this.state.callaction
              )
            });
          }}
        >
          <Item
            rounded
            style={[
              styles.input,
              {
                borderColor: this.state.callActionError ? "red" : "transparent"
              }
            ]}
          >
            <Text
              style={[
                styles.inputtext,
                {
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  color: "#fff"
                }
              ]}
            >
              {this.state.callactions.find(
                c => this.state.callaction.value === c.value
              )
                ? this.state.callactions.find(
                    c => this.state.callaction.value === c.value
                  ).label
                : "Call to Action"}
            </Text>
            <Icon
              type="AntDesign"
              name="down"
              style={{
                color: "#fff",
                fontSize: 20,
                left: 25
              }}
            />
          </Item>
        </RNPickerSelect>
        <Item
          rounded
          style={[
            styles.input,
            {
              borderColor: this.state.nameError ? "red" : "transparent",
              borderRadius: 30,
              marginBottom: 10
            }
          ]}
        >
          <SearchIcon stroke="white" style={{ left: "-60%" }} />
          <Input
            style={styles.inputtext}
            placeholder="Search Apps"
            defaultValue={this.state.attachment.app_name + ""}
            placeholderTextColor="white"
            autoCorrect={false}
            autoCapitalize="none"
            onChangeText={value =>
              this.setState({
                attachment: {
                  ...this.state.attachment,
                  app_name: value
                }
              })
            }
            onBlur={() => {
              // this._searchIosApps();
              // this._searchAndroidApps();
              this.setState({
                nameError: validateWrapper(
                  "mandatory",
                  this.state.attachment.app_name
                ),
                showList: this.state.attachment.app_name !== ""
              });
            }}
          />
        </Item>
        <FlatList
          // data={this.state.showList ? this.state.data : []}
          data={this.state.showList ? data : []}
          contentContainerStyle={{ height: heightPercentageToDP(40) }}
          contentInset={{ bottom: heightPercentageToDP(5) }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => this._getAppIds(item)}
              style={[
                styles.campaignButton,
                {
                  backgroundColor:
                    this.state.attachment.ios_app_id === item.id
                      ? "#FF9D00"
                      : "transparent"
                }
              ]}
            >
              <View
                style={[
                  {
                    flexDirection: "row",
                    alignItems: "center"
                  }
                ]}
              >
                <Image
                  style={styles.image}
                  source={{
                    uri: item.icon
                  }}
                />
                <Text
                  style={[
                    styles.titletext,
                    {
                      color: "#fff",
                      fontSize: heightPercentageToDP(1.7)
                    }
                  ]}
                >
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          numcolumnns={3}
          keyExtractor={(item, index) => item.id}
        />
        <LowerButton
          function={() => this.validate()}
          bottom={heightPercentageToDP(0.1)}
        />
      </>
    );
  }
}
