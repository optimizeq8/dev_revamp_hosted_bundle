import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  BackHandler,
  TouchableOpacity,
  ScrollView,
  Platform,
  Modal,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-navigation";
import { Text, Item, Input, Icon, Button, Container } from "native-base";
import { showMessage } from "react-native-flash-message";
import isEmpty from "lodash/isEmpty";
import upperCase from "lodash/upperCase";
// import { Modal } from 'react-native-paper';
import { BlurView } from "expo-blur";
// import * as Location from "expo-location";
import MapView from "react-native-maps";
import * as Permissions from "expo-permissions";
import Picker from "../../../../MiniComponents/Picker";
import KeyboardShift from "../../../../MiniComponents/KeyboardShift";
import LowerButton from "../../../../MiniComponents/LowerButton";
import PhoneNoField from "../../../Signup/PhoneNo/PhoneNoField";
import CustomeHeader from "../../../../MiniComponents/Header";

//icons
import CurrentLocationIcon from "../../../../../assets/SVGs/CurrentLocation";
import WhatsAppIcon from "../../../../../assets/SVGs/SwipeUps/WhatsApp";
import SuccessIcon from "../../../../../assets/SVGs/Success";
import ErrorIcon from "../../../../../assets/SVGs/Error";

// Style
import styles from "../styles";

//Data
import list from "../../../../Data/callactions.data";

import * as actionCreators from "../../../../../store/actions";

//Functions
import validateWrapper from "../../../../../ValidationFunctions/ValidateWrapper";

// class LocationMap extends Component {
//   static navigationOptions = {
//     header: null
//   };
//   constructor(props) {
//     super(props);
//     this.state = {
//       campaignInfo: {
//         weburl: "",
//         googlemaplink: "http://www.google.com/maps/place/",
//         insta_handle: "",
//         callnumber: "",
//         callaction: list.SnapAd[4].call_to_action_list[0]
//       },
//       callactions: list.SnapAd[4].call_to_action_list,

//       insta_handleError: "",
//       inputCallToAction: false,
//       locationResult: null,
//       location: { coords: { latitude: 0, longitude: 0 } }
//     };
//   }
//   async componentDidMount() {
//     // ask permission to access location
//     const { status } = await Permissions.askAsync(Permissions.LOCATION);
//     console.log("status", status);
//     const serviceLocation = await Location.hasServicesEnabledAsync();
//     console.log("serviceLocation", serviceLocation);
//     if (!serviceLocation) {
//       showMessage({
//         message: "Please enable location to access map",
//         type: "warning"
//       });
//     }
//     if (status !== "granted") {
//       showMessage({
//         message: "Please allow OptimizeApp to access your location",
//         type: "danger"
//       });
//       this.setState({
//         locationResult: "Permission to access location was denied",
//         location
//       });
//     }

//     if (
//       (this.props.data &&
//         this.props.data.hasOwnProperty("attachment") &&
//         this.props.data.attachment !== "BLANK") ||
//       this.props.mainBusiness.googlemaplink !== ""
//     ) {
//       // console.log('capmaignDetail', this.props.data);
//       // console.log('mainBusinessInstaHandle', this.props.mainBusiness);

//       this.setState({
//         campaignInfo: {
//           ...this.state.campaignInfo,
//           weburl: this.props.mainBusiness.weburl
//             ? this.props.mainBusiness.weburl
//             : this.props.data.weburl,
//           insta_handle: this.props.data.insta_handle
//             ? this.props.data.insta_handle
//             : this.props.mainBusiness.insta_handle
//             ? this.props.mainBusiness.insta_handle
//             : "",
//           googlemaplink: this.props.mainBusiness.googlemaplink
//             ? this.props.mainBusiness.googlemaplink
//             : this.props.data.googlemaplink,
//           // ? this.props.data.googlemaplink
//           // : "http://www.google.com/maps/place/",
//           callnumber: this.props.mainBusiness.callnumber
//             ? this.props.mainBusiness.callnumber
//             : this.props.data.callnumber,
//           callaction:
//             this.props.data && this.props.data.call_to_action.value !== "BLANK"
//               ? this.props.data.call_to_action
//               : list.SnapAd[4].call_to_action_list[0]
//         }
//       });

//       //   this.getCurrentLocation();
//       const getLatLONg = await Location.geocodeAsync("Cairo");
//       console.log("getLatLONg", getLatLONg);
//       this.setState({
//         location: {
//           coords: {
//             latitude: getLatLONg[0].latitude,
//             longitude: getLatLONg[0].longitude
//           }
//         }
//       });
//     }
//     BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
//   }
//   handleBackButton = () => {
//     this.props.navigation.goBack();
//     return true;
//   };
//   componentWillUnmount() {
//     BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
//   }
//   validate = () => {
//     const { translate } = this.props.screenProps;
//     const insta_handleError = validateWrapper(
//       "mandatory",
//       this.state.campaignInfo.insta_handle
//     );
//     const weburlError = validateWrapper(
//       "mandatory",
//       this.state.campaignInfo.weburl
//     );
//     const googlemaplinkError = validateWrapper(
//       "mandatory",
//       this.state.campaignInfo.googlemaplink
//     );
//     this.setState({
//       insta_handleError,
//       weburlError
//     });
//     if (insta_handleError || weburlError || googlemaplinkError) {
//       showMessage({
//         message: insta_handleError
//           ? translate("Please provide an instagram handle")
//           : weburlError
//           ? translate("Please provide domain name")
//           : googlemaplinkError
//           ? translate("Please provide a valid location link")
//           : "",
//         type: "warning",
//         position: "top",
//         duration: 7000
//       });
//       return false;
//     } else {
//       return true;
//     }
//   };

//   _handleSubmission = async () => {
//     const { translate } = this.props.screenProps;
//     // if (!this.props.mainBusiness.weburl) {
//     await this.props.verifyInstagramHandle(
//       this.state.campaignInfo.insta_handle
//     );
//     if (!this.props.errorInstaHandle && !this.props.mainBusiness.weburl) {
//       await this.props.verifyBusinessUrl(this.state.campaignInfo.weburl);
//     }
//     if (this.props.errorInstaHandle && this.props.errorInstaHandleMessage) {
//       showMessage({
//         message: translate(
//           `{{insta_handle}} ${this.props.errorInstaHandleMessage.substr(
//             this.props.errorInstaHandleMessage.indexOf(" ") + 1
//           )}`,
//           { insta_handle: this.state.campaignInfo.insta_handle }
//         ),
//         type: "danger",
//         duration: 2000
//       });
//     }
//     let weburlAvalible =
//       this.props.mainBusiness.weburl || this.props.weburlAvalible;

//     if (this.validate() && weburlAvalible && !this.props.errorInstaHandle) {
//       let instagramTrafficCampaign = {
//         weburl: this.state.campaignInfo.weburl,
//         insta_handle: this.state.campaignInfo.insta_handle,
//         callnumber: this.state.campaignInfo.callnumber.replace("+", ""),
//         googlemaplink: this.state.campaignInfo.googlemaplink
//       };

//       this.props._changeDestination(
//         "REMOTE_WEBPAGE",
//         this.state.campaignInfo.callaction,
//         {
//           url: `https://${this.state.campaignInfo.weburl.replace(
//             /[^0-9a-z]/gi,
//             ""
//           )}.optimizeapp.com`
//         },
//         null,
//         null,
//         instagramTrafficCampaign
//       );

//       this\.props\.navigation\.navigate\("AdDesign"\);
//     }
//   };

//   getCurrentLocation = async () => {
//     let location = await Location.getCurrentPositionAsync({
//       accuracy: Location.Accuracy.Highest
//     });
//     console.log("locationCurrent", location);
//     const locationName = await Location.reverseGeocodeAsync({
//       latitude: location.coords.latitude,
//       longitude: location.coords.longitude
//     });
//     console.log("locationName", locationName);

//     this.setState({
//       locationResult: JSON.stringify(location),
//       location,
//       campaignInfo: {
//         ...this.state.campaignInfo,
//         googlemaplink: `http://www.google.com/maps/place/${locationName[0].name}+${locationName[0].street}/@${location.coords.latitude},${location.coords.longitude}`
//       }
//     });
//     this.mapView.animateToRegion(
//       {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421
//       },
//       2000
//     );
//   };
//   changeGoogleMapLocation = async value => {
//     console.log("value", value);
//     const resposneLocation = await axios.get(value);
//     console.log("responseLocation", resposneLocation);

//     var longUrl = resposneLocation.request.responseURL;
//     console.log("longURL", longUrl);

//     var matches = longUrl.match(/@([0-9]?[0-9]\.[0-9]*),([0-9]?[0-9]\.[0-9]*)/);
//     console.log("matches", matches);
//     if (matches) {
//       const locationName = await Location.reverseGeocodeAsync({
//         latitude: parseFloat(matches[1]),
//         longitude: parseFloat(matches[2])
//       });
//       console.log("locationName url", locationName);
//     }

//     this.setState({
//       campaignInfo: {
//         ...this.state.campaignInfo,
//         googlemaplink: value
//       }
//     });
//   };
//   render() {
//     const { translate } = this.props.screenProps;

//     return (
//       <SafeAreaView
//         forceInset={{ top: "always", bottom: "never" }}
//         style={[styles.safeAreaContainer]}
//       >
//         <CustomeHeader
//           title={translate("ADD YOUR LOCATION")}
//           closeButton={false}
//           navigation={this.props.navigation}
//         />
//         <KeyboardShift style={{ flex: 1 }}>
//           {() => (
//             <View style={[styles.whatsApp]}>
//               {/* <WhatsAppIcon
//                 width={60}
//                 height={60}
//                 fill="#fff"
//                 style={[styles.icon]}
//               /> */}

//               <ScrollView contentContainerStyle={styles.scrollViewContainer}>
//                 <View style={[styles.whatsAppDetailContainer]}>
//                   <View
//                     style={[
//                       styles.marginVertical,
//                       {
//                         // flex: 1,
//                         display: "flex",
//                         width: "100%",
//                         height: 500,
//                         borderRadius: 20,
//                         overflow: "hidden"
//                       }
//                     ]}
//                   >
//                     <MapView
//                       ref={ref => (this.mapView = ref)}
//                       zoomEnabled={true}
//                       pitchEnabled={false}
//                       region={{
//                         latitude: this.state.location.coords.latitude,
//                         longitude: this.state.location.coords.longitude,
//                         latitudeDelta: 0.0922,
//                         longitudeDelta: 0.0421
//                       }}
//                       style={{
//                         flex: 1
//                       }}
//                       loadingEnabled={true}
//                     >
//                       <MapView.Marker
//                         draggable
//                         coordinate={this.state.location.coords}
//                         // title="My Marker"
//                         // description="Some description"
//                       />
//                     </MapView>
//                     <TouchableOpacity
//                       style={{
//                         alignSelf: "flex-end",
//                         position: "absolute",
//                         bottom: 15,
//                         right: 15
//                       }}
//                       onPress={() => {
//                         this.getCurrentLocation();
//                       }}
//                     >
//                       <CurrentLocationIcon />
//                     </TouchableOpacity>
//                   </View>

//                   <View style={styles.marginVertical}>
//                     <View style={[styles.callToActionLabelView]}>
//                       <Text uppercase style={[styles.inputLabel]}>
//                         {translate("LOCATION URL")}
//                       </Text>
//                     </View>
//                     <Item
//                       rounded
//                       style={[
//                         styles.input,
//                         {
//                           paddingHorizontal: 0
//                           // width: "75%"
//                         }
//                         //   this.state.insta_handleError
//                         //     ? GlobalStyles.redBorderColor
//                         //     : GlobalStyles.transparentBorderColor
//                       ]}
//                     >
//                       <Input
//                         style={styles.inputtext}
//                         placeholder={translate("Add Location URL")}
//                         placeholderTextColor="#fff"
//                         value={this.state.campaignInfo.googlemaplink}
//                         autoCorrect={false}
//                         autoCapitalize="none"
//                         onChangeText={value =>
//                           this.changeGoogleMapLocation(value)
//                         }
//                         // onBlur={() => {
//                         //   this.validate();
//                         //   // if (!this.props.errorInstaHandle) {
//                         //   this.props.verifyInstagramHandle(
//                         //     this.state.campaignInfo.insta_handle
//                         //   );
//                         //   // }
//                         // }}
//                       />
//                     </Item>
//                   </View>
//                 </View>
//                 <View style={styles.bottonViewWebsite}>
//                   <LowerButton
//                     checkmark={true}
//                     bottom={-5}
//                     function={this._handleSubmission}
//                   />
//                 </View>
//               </ScrollView>
//             </View>
//           )}
//         </KeyboardShift>
//       </SafeAreaView>
//     );
//   }
// }

class LocationMap extends Component {
  render() {
    return <View />;
  }
}
const mapStateToProps = state => ({
  data: state.campaignC.data,
  weburlAvalible: state.campaignC.weburlAvalible,
  mainBusiness: state.account.mainBusiness,
  errorInstaHandle: state.campaignC.errorInstaHandle,
  errorInstaHandleMessage: state.campaignC.errorInstaHandleMessage,
  productInfoId: state.campaignC.productInfoId,
  businessLogo: state.campaignC.businessLogo,
});

const mapDispatchToProps = dispatch => ({
  verifyBusinessUrl: weburl =>
    dispatch(actionCreators.verifyBusinessUrl(weburl)),
  verifyInstagramHandle: insta_handle =>
    dispatch(actionCreators.verifyInstagramHandle(insta_handle)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LocationMap);
