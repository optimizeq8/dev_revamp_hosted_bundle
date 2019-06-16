import React from "react";
import {
  View,
  Modal,
  Text,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";

import PropTypes from "prop-types";

import styles from "./style";
import BaseComponent from "./BaseComponent";

let componentIndex = 0;

const defaultProps = {
  data: [],
  onChange: () => {},
  initValue: "Select me!",
  style: {},
  selectStyle: {},
  optionStyle: {},
  optionTextStyle: {},
  sectionStyle: {},
  sectionTextStyle: {},
  cancelStyle: {},
  cancelTextStyle: {},
  overlayStyle: {},
  cancelText: "cancel"
};

export default class CountryModal extends BaseComponent {
  constructor() {
    super();

    this._bind("onChange", "open", "close", "renderChildren");

    this.state = {
      animationType: "fade",
      modalVisible: false,
      transparent: false,
      selected: "please select",
      data: []
    };
  }

  componentDidMount() {
    this.setState({ selected: this.props.initValue });
    this.setState({ cancelText: this.props.cancelText });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ data: nextProps.data });
  }

  onChange(item) {
    this.props.onChange(item);
    this.setState({ selected: item.label });
    this.close();
  }

  close() {
    this.setState({
      modalVisible: false
    });
  }

  open() {
    this.setState({
      modalVisible: true
    });
  }

  renderSection(section) {
    return (
      <View
        key={section.key}
        style={[styles.sectionStyle, this.props.sectionStyle]}
      >
        <Text style={[styles.sectionTextStyle, this.props.sectionTextStyle]}>
          {section.label}
        </Text>
      </View>
    );
  }

  renderOption(option) {
    return (
      <TouchableOpacity key={option.key} onPress={() => this.onChange(option)}>
        <View
          style={[
            styles.optionStyle,
            this.props.optionStyle,
            styles.optionStyleContainer
          ]}
        >
          <View style={styles.imageView}>
            <Image
              source={option.image}
              resizeMode="stretch"
              style={styles.imageStyle}
            />
          </View>
          <View style={styles.labelContainer}>
            <Text
              style={[
                styles.optionTextStyle,
                this.props.optionTextStyle,
                styles.optionTextStyleContainer
              ]}
            >
              {option.label}
            </Text>
          </View>
          <View style={styles.dialCodeContainer}>
            <Text
              style={[
                styles.optionTextStyle,
                this.props.optionTextStyle,
                styles.optionTextStyleContainer
              ]}
            >
              {option.dialCode}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderOptionList() {
    const options = this.state.data.map(item => {
      if (item.section) {
        return this.renderSection(item);
      }

      return this.renderOption(item);
    });

    return (
      <TouchableOpacity
        style={[styles.overlayStyle, this.props.overlayStyle]}
        key={`modalPicker${componentIndex++}`}
        onPress={this.close}
      >
        <View style={styles.optionContainer}>
          <ScrollView keyboardShouldPersistTaps="always">
            <View>{options}</View>
          </ScrollView>
        </View>
        <View style={styles.cancelContainer}>
          <TouchableOpacity onPress={this.close}>
            <View style={[styles.cancelStyle, this.props.cancelStyle]}>
              <Text
                style={[styles.cancelTextStyle, this.props.cancelTextStyle]}
              >
                {this.props.cancelText}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  renderChildren() {
    if (this.props.children) {
      return this.props.children;
    }
  }

  render() {
    const dp = (
      <Modal
        transparent
        ref={ref => {
          this.modal = ref;
        }}
        visible={this.state.modalVisible}
        onRequestClose={this.close}
        animationType={this.state.animationType}
      >
        {this.renderOptionList()}
      </Modal>
    );

    return (
      <View style={this.props.style}>
        {dp}

        <TouchableOpacity onPress={this.open}>
          {this.renderChildren()}
        </TouchableOpacity>
      </View>
    );
  }
}

CountryModal.defaultProps = defaultProps;
