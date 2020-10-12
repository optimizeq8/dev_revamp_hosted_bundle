import React from "react";
import { View, ScrollView } from "react-native";
import isUndefined from "lodash/isUndefined";
import analytics from "@segment/analytics-react-native";
import InputScrollView from "react-native-input-scroll-view";

import CustomHeader from "../Header";
import validateWrapper from "../../../ValidationFunctions/ValidateWrapper";
import CheckmarkLoading from "../../MiniComponents/CheckMarkLoading";
import Picker from "../Picker";
import InputField from "../InputFieldNew";
import ModalField from "../InputFieldNew/ModalField";

//Data
import Countries from "../../Data/countries.billingAddress";
import allAreas from "../../Data/NewAreas";

// Style
import styles from "./styles";
import globalStyles from "../../../GlobalStyles";

//Icons
import LocationIcon from "../../../assets/SVGs/LocationOutline";
import LowerButton from "../LowerButton";

class BillingAddressCard extends React.Component {
  constructor(props) {
    super(props);
    const { translate } = this.props.screenProps;
    this.state = {
      country_code: this.props.country_code,
      region_id: [],
      areas: [],
      sidemenu: "",
      selectedItems: [],
      selectedObjectets: [],
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
      buildingError: "",
      countries: Countries.map((country) => {
        return {
          label: translate(country.label),
          value: country.value,
        };
      }),
    };
  }

  // componentDidMount() {
  //   this.setState({ country_code: this.props.country_code });
  // }
  componentDidUpdate(prevProps) {
    if (
      prevProps.country_code !== this.props.country_code &&
      this.props.address.area !== ""
    ) {
      this.setState({
        country_code: this.props.country_code,
        selectedItems: [],
        selectedObjectets: [],
      });

      this.onSelectedCountryChange(
        [
          {
            label: this.props.address.country,
            value: this.props.country_code,
          },
        ],
        true
      );
    }
  }

  onSelectedCountryChange = async (selectedItem, mounting) => {
    let replace = this.props.address;
    if (selectedItem && selectedItem.length > 0) {
      replace.country = Countries.find(
        (country) => country.value === selectedItem[0].value
      ).label;

      if (!mounting) replace.area = "";
      let area = allAreas.find(
        (c) => c.country_code.toLowerCase() === selectedItem[0].value
      );

      this.props._handleAddressChange(
        "address",
        replace,
        selectedItem[0].value
      );

      this.setState({
        country_code: selectedItem[0].value,
        areas: area ? area.list : [],
        countryError: "",
        inputC: false,
      });
    }
  };

  onSelectedRegionChange = async (selectedItem) => {
    if (selectedItem) {
      await this.setState({
        region_id: [selectedItem],
        selectedItems: selectedItem,
        areaError: "",
      });
    }
  };
  onSelectedRegionNameChange = async (selectedItem) => {
    let replace = this.props.address;
    if (selectedItem && selectedItem.length > 0) {
      replace.area = selectedItem[0].name;

      this.props._handleAddressChange(
        "area",
        replace.area,
        this.state.country_code
      );
      await this.setState({
        selectedObjectets: selectedItem,
        areaError: "",
        inputA: false,
      });
    }
  };

  onSelectedRegionSelected = async (selectedItem) => {
    if (selectedItem) {
      await this.setState({
        areas: selectedItem,
        areaError: "",
      });
    }
  };

  _handleSubmission = () => {
    const countryError = validateWrapper(
      "mandatory",
      this.props.address.country
    );
    const areaError = validateWrapper("mandatory", this.props.address.area);
    const blockError = validateWrapper("mandatory", this.props.address.block);
    const streetError = validateWrapper("mandatory", this.props.address.street);
    const buildingError = validateWrapper(
      "mandatory",
      this.props.address.building
    );
    this.setState({
      countryError,
      areaError,
      blockError,
      streetError,
      buildingError,
    });
    if (
      !countryError &&
      !areaError &&
      !blockError &&
      !streetError &&
      !buildingError
    ) {
      this.props._handleSubmission();
    } else {
      analytics.track(`a_business_address`, {
        source: "open_business_address",
        source_action: "a_business_address",
        error_desctiption: "Please complete the mandatory fields",
        action_status: "failure",
      });
    }
  };
  closeCountryModal = () => {
    this.setState({
      countryError: validateWrapper("mandatory", this.props.address.country),
      inputC: false,
      inputA: false,
    });
  };
  onSelectedCountryIdChange = (value) => {
    // NOTE: compulsory to pass this function
    // console.log("country", value);
  };
  setValue = (stateName, value) => {
    this.props._handleAddressChange(stateName, value);
  };
  getValidInfo = (stateError, validObj) => {
    let state = {};
    state[stateError] = validObj;
    this.setState({
      ...state,
    });
  };
  feildsComponent = () => {
    const feilds = [
      {
        label: "Block",
        stateName1: "block",
        value: this.props.address.block,
        valueError1: this.state.blockError,
        maxLength: 10,
        incomplete: true,
      },
      {
        label: "Building/House",
        stateName1: "building",
        value: this.props.address.building,
        valueError1: this.state.buildingError,
        maxLength: 15,
        incomplete: true,
      },
      {
        label: "Street",
        stateName1: "street",
        value: this.props.address.street,
        valueError1: this.state.streetError,
        maxLength: 70,
        incomplete: true,
      },
      {
        label: "Office No",
        stateName1: "office",
        value: this.props.address.office,
        valueError1: this.state.officeError,
        maxLength: 10,
        incomplete: false,
      },
      {
        label: "Avenue",
        stateName1: "avenue",
        value: this.props.address.avenue,
        valueError1: this.state.avenueError,
        maxLength: 10,
        incomplete: true,
      },
    ].map((feild) => {
      return (
        <InputField
          animateCustomStyle={styles.customAnimate}
          customStyles={styles.customStyleInput}
          key={feild.label}
          label={feild.label}
          setValue={this.setValue}
          getValidInfo={this.getValidInfo}
          disabled={this.props.saving}
          stateName1={feild.stateName1}
          value={feild.value}
          valueError1={feild.valueError1}
          maxLength={feild.maxLength}
          autoFocus={false}
          incomplete={feild.incomplete}
          translate={this.props.screenProps.translate}
        />
      );
    });
    return feilds;
  };
  openCountryModal = () => {
    this.setState({
      inputC: true,
    });
  };

  openAreaModal = () => {
    this.setState({
      inputA: true,
    });
  };
  render() {
    const { translate } = this.props.screenProps;

    return (
      <>
        <CustomHeader
          screenProps={this.props.screenProps}
          title={"Billing Address"}
          navigation={this.props.navigation}
          segment={{
            source: "open_business_address",
            source_action: "a_go_back",
          }}
        />

        <InputScrollView
          showsVerticalScrollIndicator={false}
          {...ScrollView.props}
          contentContainerStyle={styles.contentScrollViewContainer}
        >
          <Picker
            showIcon={true}
            screenProps={this.props.screenProps}
            searchPlaceholderText={translate("Search Country")}
            data={this.state.countries}
            uniqueKey={"value"}
            displayKey={"label"}
            open={this.state.inputC}
            onSelectedItemsChange={this.onSelectedCountryIdChange}
            onSelectedItemObjectsChange={this.onSelectedCountryChange}
            selectedItems={[this.state.country_code]}
            single={true}
            screenName={"Billing Address"}
            closeCategoryModal={this.closeCountryModal}
          />

          <ModalField
            stateName={"country"}
            setModalVisible={this.openCountryModal}
            modal={true}
            label={"Country"}
            valueError={this.state.countryError}
            getValidInfo={this.getValidInfo}
            disabled={this.props.saving}
            valueText={
              this.props.address.country === ""
                ? "Select Country"
                : this.props.address.country
            }
            value={this.props.address.country}
            incomplete={false}
            translate={this.props.screenProps.translate}
            icon={LocationIcon}
            isVisible={this.state.inputC}
          />

          <Picker
            showDropDowns={true}
            screenProps={this.props.screenProps}
            searchPlaceholderText={translate("Search Area")}
            data={this.state.areas}
            uniqueKey={"id"}
            displayKey={"name"}
            subKey="areas"
            single={true}
            open={this.state.inputA}
            onSelectedItemsChange={this.onSelectedRegionChange}
            onSelectedItemObjectsChange={this.onSelectedRegionNameChange}
            selectedItems={this.state.selectedItems}
            single={true}
            screenName={"Billing Address"}
            closeCategoryModal={this.closeCountryModal}
            readOnlyHeadings={true}
            showIcon={false}
          />

          <ModalField
            stateName={"area"}
            setModalVisible={this.openAreaModal}
            modal={true}
            label={"Area"}
            valueError={this.state.countryError}
            getValidInfo={this.getValidInfo}
            disabled={this.props.saving}
            valueText={
              isUndefined(this.props.address.area) ||
              this.props.address.area === ""
                ? "Select Area"
                : this.props.address.area
            }
            value={this.props.address.area}
            incomplete={false}
            translate={this.props.screenProps.translate}
            icon={LocationIcon}
            isVisible={this.state.inputA}
          />
          <View style={styles.inputView}>{this.feildsComponent()}</View>
          {this.props.saving ? (
            <CheckmarkLoading
              style={{ bottom: -5, width: 70, height: 70 }}
              progress={this.props.progressSaving}
            />
          ) : (
            <LowerButton
              screenProps={this.props.screenProps}
              checkmark
              function={() => this._handleSubmission()}
              style={[
                styles.button,
                {
                  opacity: this.props.errorLoading ? 0.5 : 1,
                },
              ]}
              disabled={this.props.errorLoading}
            />
          )}
        </InputScrollView>
      </>
    );
  }
}

export default BillingAddressCard;
