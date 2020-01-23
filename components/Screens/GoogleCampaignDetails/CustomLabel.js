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
            `${this.props.datum.y.toFixed(2)}`
          }
          style={{
            fill: "#FF9D00",
            fontSize: 20
          }}
          orientation="top"
          pointerLength={15}
          cornerRadius={15}
          width={80}
          active={true}
          flyoutHeight={45}
          pointerWidth={30}
          flyoutStyle={{
            fill: "#fff",
            stroke: "#fff",
            marginBottom: 10
          }}
        />
        <VictoryTooltip
          {...this.props}
          text={
            this.props.category.length > 0
              ? `${this.props.category[this.props.datum.x].split("\n")[0]}`
              : `${this.props.datum.x}`
          }
          y={this.props.y - 20}
          orientation="top"
          pointerLength={10}
          style={{ fill: "#C6C6C6", fontSize: 12 }}
          cornerRadius={15}
          width={90}
          flyoutHeight={0.5}
          flyoutStyle={{ fill: "transparent", stroke: "transparent" }}
        />
      </G>
    );
  }
}
