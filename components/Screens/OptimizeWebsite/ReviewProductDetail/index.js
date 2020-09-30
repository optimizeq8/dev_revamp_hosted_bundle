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
import Axios from "axios";
import Carousel, { Pagination } from "react-native-snap-carousel";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../../store/actions";

//icons
// import OnlineStoreHome from "../../../assets/SVGs/OnlineStoreHome";
import CrossIcon from "../../../../assets/SVGs/Close";

import GradientButton from "../../../MiniComponents/GradientButton";
import { globalColors } from "../../../../GlobalStyles";

import { _pickImage } from "../PickImage";
import styles from "./styles";
import { widthPercentageToDP } from "react-native-responsive-screen";

class ReviewProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signal: null,
      loaded: 0,
      isVisible: false,
      activeSlide: 0,
      product: { media: [], prices: [], sizes: [] },
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
    const product = this.props.navigation.getParam("product", {});
    this.setState({
      product,
    });
    BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
  }
  goToManageProducts = () => {
    this.props.navigation.navigate("ManageProducts");
  };
  topRightButtonFunction = () => {
    console.log("delete");
  };
  goBack = () => {
    this.props.navigation.goBack();
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
  Slide = ({ item }) => {
    return (
      <Image
        style={styles.image}
        source={{
          uri: item.url,
        }}
      />
    );
  };
  navigationRouteHandler = (index) => {
    this.setState({
      activeSlide: index,
    });
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <View style={styles.outerView}>
        <SafeAreaView forceInset={{ bottom: "never", top: "never" }} />

        <Carousel
          firstItem={0}
          ref={(c) => {
            this._carousel = c;
          }}
          onSnapToItem={(indx) => this.navigationRouteHandler(indx)}
          data={this.state.product.media}
          renderItem={this.Slide}
          sliderWidth={widthPercentageToDP(100)}
          itemWidth={widthPercentageToDP(100)}
        />

        <TouchableOpacity style={styles.closeButton} onPress={this.goBack}>
          <CrossIcon width={12} height={12} stroke={"#9300FF"} />
        </TouchableOpacity>
        <View style={styles.productView}>
          <Pagination
            containerStyle={styles.paginationContainerStyle}
            dotsLength={this.state.product.media.length}
            activeDotIndex={this.state.activeSlide}
            dotStyle={styles.paginationDotStyle}
            dotColor={globalColors.purple}
            inactiveDotColor={"rgba(0, 0, 0, 0.16)"}
            inactiveDotOpacity={1}
            inactiveDotScale={1}
          />

          <Text style={styles.productName}> {this.state.product.name}</Text>
          <Text style={styles.productDesc}>
            {this.state.product.description_en}
          </Text>

          <Text style={styles.availSizeText}>Available Sizes</Text>
          <View style={styles.sizeView}>
            {this.state.product.sizes.map((size) => (
              <View
                style={[styles.eachSizeView, size.length > 2 && { width: 60 }]}
              >
                <Text style={styles.eachSizeText}>{size}</Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.priceView}>
          <View>
            <Text style={styles.priceText}>{translate("price")}</Text>
            {this.state.product.prices &&
            this.state.product.prices.length === 0 ? (
              <Text style={styles.contactUs}>Contact us for prices</Text>
            ) : (
              <Text style={styles.priceAmountText}>
                {this.state.product.prices[0].currency}{" "}
                <Text style={styles.priceAmountBigText}>
                  {this.state.product.prices[0].price}
                </Text>
              </Text>
            )}
          </View>
          <GradientButton
            purpleViolet
            uppercase
            text={"Buy on Whatsapp"}
            style={styles.buyBtn}
          />
        </View>
      </View>
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
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewProductDetail);
