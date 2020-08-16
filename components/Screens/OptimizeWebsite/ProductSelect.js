import React from "react";

import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import find from "lodash/find";
import analytics from "@segment/analytics-react-native";

//Redux
import { connect } from "react-redux";
import * as actionCreators from "../../../store/actions";

// Styles
import { globalColors } from "../../../GlobalStyles";
import styles from "./styles";

// Icons
import CloseIcon from "../../../assets/SVGs/EyeCut";

// MiniComponents
import GradientButton from "../../MiniComponents/GradientButton";
import LowerButton from "../../MiniComponents/LowerButton";
import { widthPercentageToDP } from "react-native-responsive-screen";
class ProductSelect extends React.Component {
  componentDidMount() {
    this.props.getInstagramPostInitialWebsite(
      this.props.mainBusiness.insta_handle
    );
    // if (this.props.edit) {
    this.props.getWebProductsToHide(this.props.mainBusiness.businessid);
    // }
  }

  constructor(props) {
    super(props);
    this.state = {
      cartList: [],
      counter: 0,
      posts: [],
      no_of_products_to_show: 60,
      productsToShowArray: [12, 24, 36, 48, 60],
    };
  }

  checkIfRecordExist = (newRecords, imageId) => {
    return newRecords.findIndex((img) => img.imageId === imageId) === -1;
  };
  componentDidUpdate(prevProps) {
    // console.log(
    //   "this.props.mainBusiness.insta_handle",
    //   this.props.mainBusiness.insta_handle
    // );

    if (
      prevProps.mainBusiness.insta_handle !==
      this.props.mainBusiness.insta_handle
    ) {
      this.props.getInstagramPostInitialWebsite(
        this.props.mainBusiness.insta_handle
      );
    }
    if (
      prevProps.getWebProductsLoading &&
      !this.props.getWebProductsLoading &&
      !this.props.savingWebProducts
    ) {
      this.setState({
        cartList: this.props.products_to_hide_list,
        counter: this.props.products_to_hide_list.length + 1,
      });
    }
    if (
      prevProps.products_to_hide_list &&
      this.props.products_to_hide_list &&
      prevProps.products_to_hide_list.length !==
        this.props.products_to_hide_list.length
    ) {
      this.setState({
        cartList: [...this.props.products_to_hide_list],
      });
    }

    if (
      prevProps.instagramPostList &&
      this.props.instagramPostList &&
      prevProps.instagramPostList.length !== this.props.instagramPostList.length
    ) {
      this.setState({
        posts: [...this.props.instagramPostList],
      });
    }
  }
  handleSubmission = () => {
    const businesslogo = this.props.edit
      ? this.props.mainBusiness.businesslogo
      : this.props.businessLogo;
    this.props.saveWebProductsToHide(
      this.props.edit,
      this.state.cartList,
      this.props.mainBusiness.businessid,
      businesslogo,
      this.state.no_of_products_to_show
    );
  };
  addToCart = (item) => {
    const newCartList = [...this.state.cartList];
    const checkifALreadyExist = find(
      this.state.cartList,
      (imageId) => imageId === item.imageId
    );
    // console.log("checkifALreadyExist", checkifALreadyExist);
    if (!checkifALreadyExist) {
      newCartList.push(item.imageId);

      analytics.track(`a_products_to_hide_in_cart`, {
        source: this.props.source,
        source_action: "a_add_products",
        timestamp: new Date().getTime(),
        products_to_hide_list: newCartList,
      });
      const counterNew = this.state.counter;
      this.setState({
        cartList: newCartList,
        counter: counterNew + 1,
      });
    } else {
      const index = newCartList.indexOf(checkifALreadyExist);

      // console.log("index", index);
      const counterNew = this.state.counter;

      newCartList.splice(index, 1);

      analytics.track(`a_products_to_hide_in_cart`, {
        source: this.props.source,
        source_action: "a_remove_products",
        timestamp: new Date().getTime(),
        products_to_hide_list: newCartList,
      });
      this.setState({
        cartList: newCartList,
        counter: counterNew - 1,
      });
    }
  };
  onScrollHandler = () => {
    this.props.loadMoreInstagramPostWebsite(
      this.props.instaHandleId,
      this.props.instaEndCursor
    );
  };
  renderItem = (item) => {
    if (item) {
      // console.log("itemFound", itemFound);
      const itemFound =
        this.state.cartList.filter((imageId) => imageId === item.imageId)
          .length > 0;
      return (
        <TouchableOpacity
          key={item.imageId}
          style={styles.itemProductView}
          onPress={() => this.addToCart(item)}
        >
          {itemFound ? (
            <View style={[styles.itemView, styles.itemFoundView]}>
              <CloseIcon width={15} />
            </View>
          ) : (
            <View style={styles.itemView}></View>
          )}
          <Image
            source={{
              uri: item.imageUrl,
            }}
            width={65}
            height={65}
            style={[styles.eachItem, itemFound && styles.itemFound]}
          />
        </TouchableOpacity>
      );
    }
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <View style={styles.productSelectOuterView}>
        <View style={styles.productsTextView}>
          <Text style={styles.productsText}>{translate("Products")}</Text>
        </View>
        <View style={styles.selectProductTextView}>
          <Text style={styles.selectProductText}>
            {translate("These are the products that will show on your website")}
            .{" "}
            <Text style={styles.hideProductText}>
              {translate("Tap to remove products")}.
            </Text>
          </Text>
          {this.props.instagramPostLoading && (
            <ActivityIndicator color={globalColors.orange} size="large" />
          )}
          {!this.props.instagramPostLoading && this.props.instagramPostList && (
            <FlatList
              contentContainerStyle={styles.list}
              initialNumToRender={12}
              numColumns={4}
              horizontal={false}
              data={this.state.posts}
              keyExtractor={(item, index) => {
                if (item) {
                  return item.imageId;
                }
                return index;
              }}
              renderItem={({ item }) => this.renderItem(item)}
            />
          )}
          {this.props.loadingMoreInstaPost && (
            <ActivityIndicator color={globalColors.orange} size="large" />
          )}
          {!this.props.instagramPostLoading &&
            !this.props.loadingMoreInstaPost &&
            this.props.instagramPostList &&
            this.props.instaHasNextPage && (
              <Text style={styles.viewMoreText} onPress={this.onScrollHandler}>
                {translate("VIEW MORE")}
              </Text>
            )}
          <LowerButton
            screenProps={this.props.screenProps}
            style={styles.lowerBtn}
            checkmark={true}
            function={this.handleSubmission}
          />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  instagramPostList: state.website.instagramPostList,
  instagramPostLoading: state.website.instagramPostLoading,
  selectedInstagramProducts: state.website.selectedInstagramProducts,
  getWebProductsLoading: state.website.getWebProductsLoading,
  savingWebProducts: state.website.savingWebProducts,
  instaHandleId: state.website.instaHandleId,
  instaEndCursor: state.website.instaEndCursor,
  instaHasNextPage: state.website.instaHasNextPage,
  loadingMoreInstaPost: state.website.loadingMoreInstaPost,
  businessLogo: state.website.businessLogo,
  mainBusiness: state.account.mainBusiness,
  products_to_hide_list: state.website.products_to_hide_list,
});

const mapDispatchToProps = (dispatch) => ({
  getInstagramPostInitialWebsite: (insta_handle) =>
    dispatch(actionCreators.getInstagramPostInitialWebsite(insta_handle)),
  loadMoreInstagramPostWebsite: (instaHandleId, instaEndCursor) =>
    dispatch(
      actionCreators.loadMoreInstagramPostWebsite(instaHandleId, instaEndCursor)
    ),
  saveWebProductsToHide: (
    edit,
    webprodcutsToHide,
    businessid,
    businessLogo,
    no_of_products_to_show
  ) =>
    dispatch(
      actionCreators.saveWebProductsToHide(
        edit,
        webprodcutsToHide,
        businessid,
        businessLogo,
        no_of_products_to_show
      )
    ),
  getWebProductsToHide: (businessid) =>
    dispatch(actionCreators.getWebProductsToHide(businessid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductSelect);
