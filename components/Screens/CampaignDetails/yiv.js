import React from "react";
import { View, ScrollView } from "react-native";
import {
  Svg,
  Circle,
  Polygon,
  Polyline,
  Path,
  Rect,
  G
} from "react-native-svg";
import AbstractChart from "./abstract-chart";
import { widthPercentageToDP } from "react-native-responsive-screen";

class LineChart extends AbstractChart {
  getColor = (dataset, opacity) => {
    return (dataset.color || this.props.chartConfig.color)(opacity);
  };

  getStrokeWidth = dataset => {
    return dataset.strokeWidth || this.props.chartConfig.strokeWidth || 3;
  };

  getDatas = data =>
    data.reduce((acc, item) => (item.data ? [...acc, ...item.data] : acc), []);

  renderDots = config => {
    const {
      data,
      width,
      height,
      paddingTop,
      paddingRight,
      onDataPointClick
    } = config;
    const output = [];
    const datas = this.getDatas(data);
    data.map((dataset, index) => {
      dataset.data.map((x, i) => {
        const cx =
          paddingRight + (i * (width - paddingRight)) / dataset.data.length;
        const cy =
          (height / 4) *
            3 *
            (1 - (x - Math.min(...datas)) / this.calcScaler(datas)) +
          paddingTop;
        const onPress = () => {
          if (!onDataPointClick) {
            return;
          }

          onDataPointClick({
            value: x,
            dataset,
            getColor: opacity => this.getColor(dataset, opacity)
          });
        };

        output.push(
          <View key={Math.random()}>
            <Circle
              cx={cx}
              cy={cy}
              r="4"
              fill={this.getColor(dataset, 0.9)}
              onPress={onPress}
            />
            <Circle
              cx={cx}
              cy={cy}
              r="12"
              fill={this.getColor(dataset, 0)}
              onPress={onPress}
            />
          </View>
        );
      });
    });
    return output;
  };

  renderShadow = config => {
    if (this.props.bezier) {
      return this.renderBezierShadow(config);
    }

    const { data, width, height, paddingRight, paddingTop } = config;
    const output = [];
    const datas = this.getDatas(data);
    config.data.map((dataset, index) => {
      output.push(
        <Polygon
          key={index}
          points={
            dataset.data
              .map(
                (x, i) =>
                  paddingRight +
                  (i * (width - paddingRight)) / dataset.data.length +
                  "," +
                  ((height / 4) *
                    3 *
                    (1 - (x - Math.min(...datas)) / this.calcScaler(datas)) +
                    paddingTop)
              )
              .join(" ") +
            ` ${paddingRight +
              ((width - paddingRight) / dataset.data.length) *
                (dataset.data.length - 1)},${(height / 4) * 3 +
              paddingTop} ${paddingRight},${(height / 4) * 3 + paddingTop}`
          }
          fill="url(#fillShadowGradient)"
          strokeWidth={0}
        />
      );
    });
    return output;
  };

  renderLine = config => {
    if (this.props.bezier) {
      return this.renderBezierLine(config);
    }

    const { width, height, paddingRight, paddingTop, data } = config;
    const output = [];
    const datas = this.getDatas(data);
    data.forEach((dataset, index) => {
      const points = dataset.data.map(
        (x, i) =>
          paddingRight +
          (i * (width - paddingRight)) / dataset.data.length +
          "," +
          ((height / 4) *
            3 *
            (1 - (x - Math.min(...datas)) / this.calcScaler(datas)) +
            paddingTop)
      );

      output.push(
        <Polyline
          key={index}
          points={points.join(" ")}
          fill="none"
          stroke={this.getColor(dataset, 0.2)}
          strokeWidth={this.getStrokeWidth(dataset)}
        />
      );
    });

    return output;
  };

  getBezierLinePoints = (dataset, config) => {
    const { width, height, paddingRight, paddingTop, data } = config;
    if (dataset.data.length === 0) {
      return "M0,0";
    }

    const datas = this.getDatas(data);
    const x = i =>
      Math.floor(
        paddingRight + (i * (width - paddingRight)) / dataset.data.length
      );
    const y = i =>
      Math.floor(
        (height / 4) *
          3 *
          (1 -
            (dataset.data[i] - Math.min(...datas)) / this.calcScaler(datas)) +
          paddingTop
      );

    return [`M${x(0)},${y(0)}`]
      .concat(
        dataset.data.slice(0, -1).map((_, i) => {
          const x_mid = (x(i) + x(i + 1)) / 2;
          const y_mid = (y(i) + y(i + 1)) / 2;
          const cp_x1 = (x_mid + x(i)) / 2;
          const cp_x2 = (x_mid + x(i + 1)) / 2;
          return (
            `Q ${cp_x1}, ${y(i)}, ${x_mid}, ${y_mid}` +
            ` Q ${cp_x2}, ${y(i + 1)}, ${x(i + 1)}, ${y(i + 1)}`
          );
        })
      )
      .join(" ");
  };

  renderBezierLine = config => {
    const output = [];
    config.data.map((dataset, index) => {
      const result = this.getBezierLinePoints(dataset, config);
      output.push(
        <Path
          key={index}
          d={result}
          fill="none"
          stroke={this.getColor(dataset, 0.2)}
          strokeWidth={this.getStrokeWidth(dataset)}
        />
      );
    });
    return output;
  };

  renderBezierShadow = config => {
    const { width, height, paddingRight, paddingTop, data } = config;
    const output = [];
    data.map((dataset, index) => {
      const d =
        this.getBezierLinePoints(dataset, config) +
        ` L${paddingRight +
          ((width - paddingRight) / dataset.data.length) *
            (dataset.data.length - 1)},${(height / 4) * 3 +
          paddingTop} L${paddingRight},${(height / 4) * 3 + paddingTop} Z`;
      output.push(
        <Path
          key={index}
          d={d}
          fill="url(#fillShadowGradient)"
          strokeWidth={0}
        />
      );
    });
    return output;
  };

  render() {
    const paddingTop = 16;
    const paddingRight = 64;
    const {
      width,
      height,
      data,
      withShadow = true,
      withDots = true,
      withInnerLines = true,
      withOuterLines = true,
      style = {},
      decorator,
      onDataPointClick
    } = this.props;
    const { labels = [] } = data;
    const { borderRadius = 0 } = style;
    const config = {
      width,
      height
    };
    const datas = this.getDatas(data.datasets);
    return (
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={[style, { flexDirection: "column" }]}>
          <Svg height={height} width={widthPercentageToDP("15")}>
            <G>
              {this.renderDefs({
                ...config,
                ...this.props.chartConfig
              })}
              <G>
                {withInnerLines
                  ? this.renderHorizontalLines({
                      ...config,
                      count: 4,
                      paddingTop,
                      paddingRight
                    })
                  : withOuterLines
                  ? this.renderHorizontalLine({
                      ...config,
                      paddingTop,
                      paddingRight
                    })
                  : null}
              </G>
              <G>
                {this.renderVerticalLabels({
                  ...config,
                  count: Math.min(...datas) === Math.max(...datas) ? 1 : 4,
                  data: datas,
                  paddingTop,
                  paddingRight
                })}
              </G>
              <G>
                {withInnerLines
                  ? this.renderVerticalLines({
                      ...config,
                      data: data.datasets[0].data,
                      paddingTop,
                      paddingRight
                    })
                  : withOuterLines
                  ? this.renderVerticalLine({
                      ...config,
                      paddingTop,
                      paddingRight
                    })
                  : null}
              </G>

              <G>
                {withShadow &&
                  this.renderShadow({
                    ...config,
                    data: data.datasets,
                    paddingRight,
                    paddingTop
                  })}
              </G>
              <G>
                {withDots &&
                  this.renderDots({
                    ...config,
                    data: data.datasets,
                    paddingTop,
                    paddingRight,
                    onDataPointClick
                  })}
              </G>
              <G>
                {decorator &&
                  decorator({
                    ...config,
                    data: data.datasets,
                    paddingTop,
                    paddingRight
                  })}
              </G>
            </G>
          </Svg>
        </View>

        <View style={{ flexDirection: "column" }}>
          <ScrollView horizontal={true}>
            <Svg
              height={height}
              width={width}
              style={{
                marginLeft: -widthPercentageToDP("13"),
                marginRight: widthPercentageToDP("5")
              }}
            >
              <G>
                {this.renderHorizontalLabels({
                  ...config,
                  labels,
                  paddingRight,
                  paddingTop
                })}
              </G>
              <G>
                {this.renderLine({
                  ...config,
                  paddingRight,
                  paddingTop,
                  data: data.datasets
                })}
              </G>
            </Svg>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default LineChart;