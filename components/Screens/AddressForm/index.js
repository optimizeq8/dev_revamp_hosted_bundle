import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  Image,
  SafeAreaView
} from "react-native";
import isEqual from "lodash/isEqual";
import { LinearGradient, Segment } from "expo";
import { Button, Text, Item, Input, Icon, Label, Container } from "native-base";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import KeyboardShift from "../..//MiniComponents/KeyboardShift";
import Sidemenu from "react-native-side-menu";
import MultiSelect from "../../MiniComponents/MultiSelect/MultiSelect";
import SelectRegions from "../../MiniComponents/SelectRegions";
import { Modal } from "react-native-paper";
import LoadingScreen from "../../MiniComponents/LoadingScreen";
import BillingAddressCard from "../../MiniComponents/BillingAddressCard";
import SelectBillingAddressCard from "../../MiniComponents/SelectBillingAddressCard";

// Style
import styles from "./styles";
import { colors } from "../../GradiantColors/colors";

//Icons
import Address from "../../../assets/SVGs/Location";
import DownButton from "../../../assets/SVGs/DownButton";
import CheckmarkIcon from "../../../assets/SVGs/Checkmark.svg";
import BackIcon from "../../../assets/SVGs/BackButton.svg";
import globalStyles from "../../../Global Styles";

//Data
import Areas from "./Areas";

//Redux
import * as actionCreators from "../../../store/actions/";

//Functions
import validateWrapper from "../../../Validation Functions/ValidateWrapper";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp
} from "react-native-responsive-screen";
import isUndefined from "lodash/isUndefined";
import isNull from "lodash/isNull";

class AddressForm extends Component {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this.state = {
      address: {
        country: "",
        area: "",
        block: "",
        street: "",
        building: "",
        office: "",
        avenue: ""
      },
      addressId: null,
      country_code: "",
      region_id: [],
      areas: Areas[0].regions,
      sidemenustate: false,
      sidemenu: "",
      filteredRegions: Areas[0].regions,
      inputC: false,
      inputA: false,
      inputBL: false,
      inputS: false,
      inputB: false,
      inputO: false,
      inputAv: false,
      countryError: "",
      areaError: "",
      blockError: "",
      streetError: "",
      buildingError: ""
    };
    this._handleSubmission = this._handleSubmission.bind(this);
    this._handleAddressChange = this._handleAddressChange.bind(this);
  }
  componentDidMount() {
    Segment.screen("Address Form Screen");
    this.props.getAddressDetail();
    this.setState({
      from: this.props.navigation.getParam("from", null),
      kdamount: this.props.navigation.getParam("kdamount", null),
      interestNames: this.props.navigation.getParam("interestNames", null)
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.address &&
      this.props.address &&
      (!isEqual(prevProps.address, this.props.address) ||
        (prevState.address.country === "" &&
          prevState.address.area === "" &&
          prevState.address.block === "" &&
          prevState.address.street === "" &&
          prevState.address.building === "" &&
          prevState.address.avenue === "" &&
          prevState.address.office === ""))
    ) {
      const bsn_address = {
        country: this.props.address.country,
        area: this.props.address.area,
        block: this.props.address.block,
        street: this.props.address.street,
        building: this.props.address.building,
        avenue: this.props.address.avenue,
        office: this.props.address.office
      };
      this.setState({
        address: bsn_address,
        addressId: this.props.address.id
      });
    }
  }

  _handleAddressChange = (key, value) => {
    if (key === "address") {
      this.setState({
        address: value
      });
    } else {
      this.setState({
        address: { ...this.state.address, [key]: value }
      });
    }
  };

  _handleSideMenuState = status => {
    this.setState({ sidemenustate: status }, () => {});
  };
  _handleSubmission = () => {
    this.props.addressForm(
      this.state.address,
      this.props.navigation,
      this.state.addressId
    );
  };

  render() {
    return (
      <Container style={styles.container}>
        <LinearGradient
          colors={[colors.background1, colors.background2]}
          locations={[0.7, 1]}
          style={styles.gradient}
        />
        {!this.state.sidemenustate && (
          <View style={{ marginBottom: 10 }}>
            <TouchableOpacity
              onPress={() => this.props.navigation.goBack()}
              style={globalStyles.backButton}
            >
              <BackIcon />
            </TouchableOpacity>
            <Text style={styles.title}>Billing Address</Text>
            <Address
              fill="#fff"
              style={{
                alignSelf: "center",
                marginTop: 20
              }}
              width={55}
              height={55}
            />
          </View>
        )}
        <View style={{ display: "flex", flex: 3 }}>
          {/* TODO: When user selects CC display this */}
          {this.state.from === "creditCard" &&
          !isUndefined(this.state.addressId) &&
          !isNull(this.state.addressId) ? (
            <SelectBillingAddressCard
              address={this.state.address}
              addressId={this.state.addressId}
              navigation={this.props.navigation}
              kdamount={this.state.kdamount}
            />
          ) : (
            <BillingAddressCard
              address={this.state.address}
              _handleSubmission={this._handleSubmission}
              _handleAddressChange={this._handleAddressChange}
              _handleSideMenuState={this._handleSideMenuState}
              sidemenustate={this.state.sidemenustate}
              errorLoading={this.props.errorLoading}
            />
          )}
        </View>
        <Modal visible={this.props.loading}>
          <LoadingScreen top={0} />
        </Modal>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  address: state.account.address,
  loading: state.account.loadingBillingAddress,
  errorLoading: state.account.errorLoadingBillingAddress
});

const mapDispatchToProps = dispatch => ({
  addressForm: (address, navigation, addressId) =>
    dispatch(actionCreators.addressForm(address, navigation, addressId)),
  getAddressDetail: () => dispatch(actionCreators.getAddressForm())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddressForm);
