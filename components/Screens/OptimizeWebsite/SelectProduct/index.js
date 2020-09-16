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
import * as actionCreators from "../../../../store/actions";

// Styles
import { globalColors } from "../../../../GlobalStyles";
import styles from "./styles";

// Icons
import CloseIcon from "../../../../assets/SVGs/Checkmark";

// MiniComponents
import LowerButton from "../../../MiniComponents/LowerButton";
import Header from "../../../MiniComponents/Header";
import GradientButton from "../../../MiniComponents/GradientButton";

import { SafeAreaView } from "react-navigation";

class ProductSelect extends React.Component {
  componentDidMount() {
    const source = this.props.navigation.getParam(
      "source",
      this.props.screenProps.prevAppState
    );
    const source_action = this.props.navigation.getParam(
      "source_action",
      this.props.screenProps.prevAppState
    );
    analytics.track(`open_select_product`, {
      source,
      source_action,
      timestamp: new Date().getTime(),
    });
    this.props.getInstagramPostInitialWebsite(
      this.props.mainBusiness.insta_handle
    );
    // if (this.props.edit) {
    this.props.getWebProductsToHide(this.props.mainBusiness.businessid);
    // }

    this.setState({
      cartList: this.props.webproducts,
      counter: this.props.webproducts.length + 1,
    });
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
        cartList: this.props.webproducts,
        counter: this.props.webproducts.length + 1,
      });
    }
    if (
      prevProps.webproducts &&
      this.props.webproducts &&
      prevProps.webproducts.length !== this.props.webproducts.length
    ) {
      this.setState({
        cartList: [...this.props.webproducts],
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
    const array = this.state.cartList.map((elem) => {
      const itemExistOnBackend = this.props.webproducts.find(
        ({ instagram_pid }) => elem.instagram_pid === instagram_pid
      );

      if (itemExistOnBackend) {
        return {
          shortcode: elem.media[0].shortcode,
          instagram_pid: elem.instagram_pid,
          image_url: elem.media[0].media_path,
          id: elem.id,
          description_en: elem.description_en,
        };
      }
      return {
        shortcode: elem.shortcode,
        instagram_pid: elem.instagram_pid,
        image_url: elem.image_url,
        description_en: elem.description_en,
        id: "",
      };
    });
    // check for if the product already exist in rge
    this.props.saveWebProductsToAdd(array, this.props.mainBusiness.businessid);
  };
  addToCart = (item) => {
    // console.log("item", item);
    const newCartList = [...this.state.cartList];
    const checkifALreadyExist = newCartList
      .map((prod) => {
        return prod.instagram_pid;
      })
      .indexOf(item.imageId);
    // console.log("add item", item);
    if (checkifALreadyExist === -1) {
      newCartList.push({
        shortcode: item.shortcode,
        instagram_pid: item.imageId,
        image_url: item.imageUrl,
        description_en: item.productDescription,
      });

      analytics.track(`a_products_to_add_in_cart`, {
        source: this.props.source,
        source_action: "a_add_products",
        timestamp: new Date().getTime(),
        webproducts: newCartList,
      });
      const counterNew = this.state.counter;
      this.setState({
        cartList: newCartList,
        counter: counterNew + 1,
      });
    } else {
      // const index = newCartList.indexOf(checkifALreadyExist);
      const index = newCartList
        .map((e) => {
          return e.instagram_pid;
        })
        .indexOf(item.imageId);
      // console.log("index", index);
      const counterNew = this.state.counter;

      newCartList.splice(index, 1);

      analytics.track(`a_products_to_add_in_cart`, {
        source: this.props.source,
        source_action: "a_remove_products",
        timestamp: new Date().getTime(),
        webproducts: newCartList,
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
        this.state.cartList.filter(
          (imageId) => imageId.instagram_pid === item.imageId
        ).length > 0;
      return (
        <TouchableOpacity
          key={item.imageId}
          style={styles.itemProductView}
          onPress={() => this.addToCart(item)}
        >
          {itemFound ? (
            <View style={[styles.itemView, styles.itemFoundView]}>
              <CloseIcon width={25} />
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
        <SafeAreaView forceInset={{ top: "always", bottom: "never" }} />
        <Header
          screenProps={this.props.screenProps}
          closeButton={false}
          segment={{
            str: "MyWebsite Back Button",
            obj: { businessname: this.props.mainBusiness.businessname },
            source: "open_my_website",
            source_action: "a_go_back",
          }}
          navigation={this.props.navigation}
          titleStyle={{ color: "#75647C" }}
          iconColor={"#75647C"}
          title={"Add Products"}
        />

        <GradientButton
          text={"Add Your own product"}
          textStyle={{
            color: globalColors.purple,
            padding: 0,
            fontFamily: "montserrat-bold",
          }}
          height={40}
          uppercase
          screenProps={this.props.screenProps}
          transparent
          style={{
            borderColor: globalColors.purple,
            borderWidth: 1,
            marginHorizontal: 0,
            paddingHorizontal: 16,
            alignSelf: "center",
          }}
          onPressAction={() => this.props.navigation.navigate("AddProduct")}
        />

        <Text
          style={{
            fontSize: 16,
            fontFamily: "montserrat-bold",
            color: globalColors.gray,
            textAlign: "center",
            marginVertical: 4,
          }}
        >
          ---OR---
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontFamily: "montserrat-bold",
            color: globalColors.gray,
            textAlign: "center",
            marginVertical: 4,
          }}
        >
          Select from existing instagram posts
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
            showsVerticalScrollIndicator={false}
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
  webproducts: state.website.webproducts,
});

const mapDispatchToProps = (dispatch) => ({
  getInstagramPostInitialWebsite: (insta_handle) =>
    dispatch(actionCreators.getInstagramPostInitialWebsite(insta_handle)),
  loadMoreInstagramPostWebsite: (instaHandleId, instaEndCursor) =>
    dispatch(
      actionCreators.loadMoreInstagramPostWebsite(instaHandleId, instaEndCursor)
    ),

  getWebProductsToHide: (businessid) =>
    dispatch(actionCreators.getWebProductsToHide(businessid)),
  saveWebProductsToAdd: (webProducts, businessid) =>
    dispatch(actionCreators.saveWebProductsToAdd(webProducts, businessid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ProductSelect);
