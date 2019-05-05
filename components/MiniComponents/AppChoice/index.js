import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { Item, Icon, Input } from "native-base";
import * as Animatable from "react-native-animatable";

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
import validateWrapper from "../../../Validation Functions/ValidateWrapper";
import { ToggleButton, ActivityIndicator } from "react-native-paper";
class AppChoice extends Component {
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
      choice: null,
      showList: false,
      data: [],
      androidData: [],
      callaction: { label: "Call to Action", value: "" },
      callactions: list[1].call_to_action_list,
      nameError: "",
      callActionError: "",
      choiceError: "",
      AppError: "",
      loading: false
    };
  }

  componentDidMount() {
    this.setState({
      callactions: list[this.props.listNum].call_to_action_list
    });
  }

  _searchIosApps = () => {
    this.setState({ loading: true });
    const instance = Axios.create({
      baseURL: "https://api.apptweak.com/ios",
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
          data: data,
          showList: true,
          loading: false
        })
      )
      .catch(err => console.log(err.response));
  };
  _searchAndroidApps = () => {
    this.setState({ loading: true });
    const instance = Axios.create({
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
          showList: true,
          loading: false
        })
      )
      .catch(err => console.log(err.response));
  };

  _getAppIds = iosApp => {
    let androidUrl = "";
    if (this.state.choice === "" || this.state.choice === "ANDROID") {
      //--------------This is for dummy data--------------
      // androidUrl = androidDataTest.find(app => {
      //   if (app.title.length > iosApp.title.length) {
      //     if (
      //       app.title
      //         .toLowerCase()
      //         .trim()
      //         .includes(iosApp.title.toLowerCase().trim())
      //     )
      //       return app;
      //   } else {
      //     if (
      //       iosApp.title
      //         .toLowerCase()
      //         .trim()
      //         .includes(app.title.toLowerCase().trim())
      //     )
      //       return app;
      //   }
      // }); //this for dummy data

      //--------------This for the actual api data--------------
      androidUrl = this.state.androidData.find(app => {
        if (app.title.length > iosApp.title.length) {
          if (
            app.title
              .toLowerCase()
              .trim()
              .includes(iosApp.title.toLowerCase().trim())
          )
            return app;
        } else {
          if (
            iosApp.title
              .toLowerCase()
              .trim()
              .includes(app.title.toLowerCase().trim())
          )
            return app;
        }
      });
    }
    this.setState({
      attachment: {
        ...this.state.attachment,
        app_name: iosApp.title,
        ios_app_id: this.state.choice !== "ANDROID" ? iosApp.id : "",
        icon_media_url: iosApp.icon,
        android_app_url: androidUrl ? androidUrl.id : ""
      }
    });
  };

  validate = async () => {
    const AppError = validateWrapper(
      "mandatory",
      this.state.attachment.ios_app_id || this.state.attachment.android_app_url
    );
    const nameError = validateWrapper(
      "mandatory",
      this.state.attachment.app_name
    );
    const callActionError = validateWrapper(
      "mandatory",
      this.state.callaction.value
    );
    let choiceError = validateWrapper(
      "mandatory",
      this.state.choice === "" ? "x" : this.state.choice
    );
    this.setState({ nameError, callActionError, choiceError, AppError });

    if (!AppError && !nameError && !callActionError && !choiceError) {
      this.props.renderNextStep(
        this.state.nameError,
        this.state.callActionError,
        this.state.attachment,
        this.state.callaction,
        this.state.choice
      );
    }
  };

  handleChoice = choice => {
    this.setState({
      choice,
      attachment: {
        app_name: "",
        ios_app_id: "",
        android_app_url: "",
        icon_media_id: "",
        icon_media_url: ""
      },
      showList: false
    });
  };
  render() {
    return (
      <View>
        <RNPickerSelect
          items={this.state.callactions}
          placeholder={{ label: "Call to Action", value: "" }}
          onValueChange={(value, index) => {
            this.setState({
              callaction: {
                label: this.state.callactions[index - 1 > 0 ? index - 1 : 0]
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
                marginBottom: 20,
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
        <Animatable.View animation={"zoomInUp"}>
          <Animatable.View
            onAnimationEnd={() => this.setState({ choiceError: null })}
            style={{
              flexDirection: "row",
              alignSelf: "center",
              marginBottom: heightPercentageToDP(2)
            }}
            animation={!this.state.choiceError ? "" : "shake"}
          >
            <TouchableOpacity
              style={[
                styles.OS,
                {
                  backgroundColor:
                    this.state.choice === "iOS" ? "#FF9D00" : "#fff"
                }
              ]}
              onPress={() => this.handleChoice("iOS")}
            >
              <Text
                style={[
                  styles.OSText,
                  {
                    color: this.state.choice === "iOS" ? "#fff" : "#751AFF"
                  }
                ]}
              >
                iOS
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.OS,
                {
                  paddingHorizontal: 0,
                  backgroundColor:
                    this.state.choice === "ANDROID" ? "#FF9D00" : "#fff"
                }
              ]}
              onPress={() => this.handleChoice("ANDROID")}
            >
              <Text
                style={[
                  styles.OSText,
                  {
                    color: this.state.choice === "ANDROID" ? "#fff" : "#751AFF"
                  }
                ]}
              >
                Android
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.OS,
                {
                  paddingHorizontal: 0,
                  backgroundColor: this.state.choice === "" ? "#FF9D00" : "#fff"
                }
              ]}
              onPress={() => this.handleChoice("")}
            >
              <Text
                style={[
                  styles.OSText,
                  {
                    color: this.state.choice === "" ? "#fff" : "#751AFF"
                  }
                ]}
              >
                Both
              </Text>
            </TouchableOpacity>
          </Animatable.View>
        </Animatable.View>

        {this.state.choice || this.state.choice === "" ? (
          <Item
            rounded
            style={[
              styles.input,
              {
                borderColor: this.state.nameError ? "red" : "transparent",
                borderRadius: 30,
                marginBottom: 10,
                marginTop: 0
              }
            ]}
          >
            <SearchIcon stroke="white" style={{ left: "-60%" }} />
            <Input
              style={styles.inputtext}
              placeholder={`Search ${this.state.choice}`}
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
              onBlur={value => {
                if (this.state.attachment.app_name !== "") {
                  switch (this.state.choice) {
                    case "iOS":
                      this._searchIosApps();
                      break;
                    case "ANDROID":
                      this._searchAndroidApps();
                      break;
                    case "":
                      this._searchAndroidApps();
                      this._searchIosApps();
                      break;
                  }
                }
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
        ) : null}

        {this.state.loading ? (
          <ActivityIndicator
            color="#fff"
            size="large"
            style={{ height: heightPercentageToDP(35) }}
          />
        ) : (
          <View style={{ height: heightPercentageToDP(35) }}>
            <FlatList
              style={{ flex: 1 }}
              //-----------This is for actual app data searches-----------
              data={
                this.state.showList
                  ? this.state.choice !== "ANDROID"
                    ? this.state.data
                    : this.state.androidData
                  : []
              }
              //-----------This is for dummy app data searches-----------
              // data={
              //   this.state.showList
              //     ? this.state.choice !== "ANDROID"
              //       ? data
              //       : androidDataTest
              //     : []
              // }
              // contentContainerStyle={{ height: heightPercentageToDP(35) }}
              // contentInset={{ bottom: heightPercentageToDP(15) }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => this._getAppIds(item)}
                  style={[
                    styles.campaignButton,
                    {
                      backgroundColor:
                        this.state.attachment.ios_app_id === item.id ||
                        this.state.attachment.android_app_url === item.id
                          ? "#FF9D00"
                          : "transparent"
                    }
                  ]}
                >
                  <Animatable.View
                    animation={!this.state.AppError ? "" : "shake"}
                    onAnimationEnd={() => this.setState({ AppError: null })}
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
                  </Animatable.View>
                </TouchableOpacity>
              )}
              numcolumnns={3}
              keyExtractor={(item, index) => item.id}
            />
          </View>
        )}
        <LowerButton function={() => this.validate()} bottom={0} />
      </View>
    );
  }
}
export default AppChoice;
