import React, { Component } from "react";
import { G } from "react-native-svg";
import { VictoryTooltip } from "victory-native";

export default class CustomLabel extends Component {
  render() {
    return (
      <G>
        <VictoryTooltip
          {...this.props}
          y={this.props.y - 5}
          text={
            (this.props.chartChoice === "Spend" ? "$" : "") +
            `${this.props.text}`
          }
          style={{
            fill: "#FF9D00",
            fontSize: 23
          }}
          orientation="top"
          pointerLength={10}
          cornerRadius={15}
          width={80}
          height={55}
          flyoutStyle={{ fill: "#fff", stroke: "#fff", marginBottom: 20 }}
        />
        <VictoryTooltip
          {...this.props}
          text={`${this.props.datum.x}`}
          y={this.props.y - 8}
          orientation="top"
          pointerLength={10}
          style={{ fill: "#C6C6C6", fontSize: 12 }}
          cornerRadius={15}
          width={90}
          height={10}
          flyoutStyle={{ fill: "transparent", stroke: "transparent" }}
        />
      </G>
    );
  }
}
