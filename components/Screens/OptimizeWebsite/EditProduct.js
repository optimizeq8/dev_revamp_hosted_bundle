import React, { Component } from "react";
import {
  View,
  Image,
  BackHandler,
  Text,
  Clipboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import analytics from "@segment/analytics-react-native";
import { SafeAreaView } from "react-navigation";
import { LinearGradient } from "expo-linear-gradient";
import Axios from "axios";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

//icons
// import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";
import Pen from "../../../assets/SVGs/Pen";
import CopyIcon from "../../../assets/SVGs/CopyIcon";
import PlusIcon from "../../../assets/SVGs/Plus";

// Style
import styles from "./styles";
import myWebsiteStyles from "./myWebsiteStyles";

import Header from "../../MiniComponents/Header";
import Website from "../../MiniComponents/InputFieldNew/Website";
import ProductSelect from "./ProductSelect";
import { globalColors } from "../../../GlobalStyles";
import LoadingModal from "../CampaignCreate/AdDesign/LoadingModal";

import { _pickImage } from "./PickImage";

class MyWebsite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal: null,
      loaded: 0,
      isVisible: false,
    };
  }
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.goBack();
    return true;
  };
  _getUploadState = (loading) => {
    this.setState({
      loaded: loading,
    });
  };
  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`open_my_website`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  goToManageProducts = () => {
    this.props.navigation.navigate("ManageProducts");
  };
  topRightButtonFunction = () => {
    this.props.navigation.navigate("WebsiteSetting", {
      source: "open_my_website",
      source_action: "a_open_my_website_detail",
    });
  };
  goBack = () => {
    this.props.navigation.navigate("Dashboard", {
      source: "open_my_website",
      source_action: "a_go_back",
    });
  };
  startUpload = (media) => {
    var body = new FormData();
    body.append("businessid", this.props.mainBusiness.businessid);
    body.append("businesslogo", media);
    this.props.changeBusinessLogo(
      body,
      this._getUploadState,
      this.cancelUpload,
      this.onToggleModal
    );
  };
  handleUpload = () => {
    this.setState({ signal: Axios.CancelToken.source() });
  };
  cancelUpload = () => {
    if (this.state.signal) this.state.signal.cancel("Upload Cancelled");
  };

  uploadPhoto = () => {
    _pickImage("Images", this.props.screenProps, this.startUpload);
  };
  onToggleModal = (visibile) => {
    this.setState({ isVisible: visibile });
  };

  render() {
    const { translate } = this.props.screenProps;
    const { mainBusiness } = this.props;
    let website = mainBusiness.weburl;
    if (website && !website.includes(".com")) {
      website = `https://${mainBusiness.weburl}.optimizeapp.com`;
    }
    return (
      <SafeAreaView
        style={myWebsiteStyles.safeAreaViewContainer}
        forceInset={{ bottom: "never", top: "always" }}
      >
        <Header
          screenProps={this.props.screenProps}
          closeButton={false}
          segment={{
            str: "MyWebsite Back Button",
            obj: { businessname: this.props.mainBusiness.businessname },
            source: "open_my_website",
            source_action: "a_go_back",
          }}
          showTopRightButtonIcon={"settings"}
          // navigation={this.props.navigation}
          actionButton={this.goBack}
          topRightButtonFunction={this.topRightButtonFunction}
          title={"Edit Product"}
          titleStyle={{
            color: "#75647C",
          }}
          iconColor={"#75647C"}
        />
        <ScrollView
          style={{
            backgroundColor: "#f8f8f8",
          }}
        >
          <View>
            <Image
              style={{
                width: 140,
                height: 230,
                borderRadius: 20,
              }}
              source={{
                uri:
                  "https://instagram.fkwi8-1.fna.fbcdn.net/v/t51.2885-15/e35/s1080x1080/109965463_293445785428393_3199064970583842940_n.jpg?_nc_ht=instagram.fkwi8-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=NJ7QMVcx4GcAX_qF0MC&oh=19abfaf65fdaf4aca58af3265c256b60&oe=5F42CCE1",
              }}
            />
          </View>

          <View>
            <View
              style={{
                borderColor: globalColors.purple,
                borderWidth: 1,
                width: 20,
                height: 20,
                borderRadius: 20,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#9300FF50",
              }}
            >
              <PlusIcon width={7} fill={globalColors.purple} />
            </View>
            <View>
              <Text
                style={{
                  fontFamily: "montserrat-bold",
                  fontSize: 12,
                  color: "#75647C",
                  textTransform: "uppercase",
                }}
              >
                Product Name
              </Text>
              <Text
                style={{
                  fontFamily: "montserrat-regular",
                  fontSize: 12,
                  color: "#75647C",
                  marginTop: 4,
                }}
              >
                dfghjkj
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text
                style={{
                  fontFamily: "montserrat-bold",
                  fontSize: 12,
                  color: "#75647C",
                  textTransform: "uppercase",
                }}
              >
                Price
              </Text>
              <Text
                style={{
                  fontFamily: "montserrat-regular",
                  fontSize: 12,
                  color: "#75647C",
                  marginTop: 4,
                }}
              >
                Add Price
              </Text>
            </View>
          </View>
          <View>
            <View>
              <Text
                style={{
                  fontFamily: "montserrat-bold",
                  fontSize: 12,
                  color: "#75647C",
                  textTransform: "uppercase",
                }}
              >
                Description
              </Text>
              <Text
                style={{
                  fontFamily: "montserrat-regular",
                  fontSize: 12,
                  color: "#75647C",
                  marginTop: 4,
                }}
              >
                dfghjkj
              </Text>
            </View>
          </View>
        </ScrollView>
        <LoadingModal
          videoUrlLoading={false}
          loading={this.props.loading}
          isVisible={this.state.isVisible}
          onToggleModal={this.onToggleModal}
          cancelUpload={this.cancelUpload}
          loaded={this.state.loaded}
          screenProps={this.props.screenProps}
        />
      </SafeAreaView>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: state.account.loading,
  mainBusiness: state.account.mainBusiness,
  businessLogo: state.website.businessLogo,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserInfo: (info, navigation) =>
    dispatch(actionCreators.updateUserInfo(info, navigation)),
  changeBusinessLogo: (info, loading, cancelUpload, onToggleModal) =>
    dispatch(
      actionCreators.changeBusinessLogo(
        info,
        loading,
        cancelUpload,
        onToggleModal
      )
    ),
});
export default connect(mapStateToProps, mapDispatchToProps)(MyWebsite);
