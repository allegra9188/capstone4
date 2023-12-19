import React, { PureComponent } from "react";
import { Treemap, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Communication Services", size: 99.68 },
  { name: "Consumer Discretionary", size: 79.52 },
  { name: "Consumer Stapes", size: 48.64 },
  { name: "Energy", size: 105.19 },
  { name: "Financials", size: 184.85 },
  { name: "Healthcare", size: 87.64 },
  { name: "Industrials", size: 82.45 },
  { name: "Information Technology", size: 419.5 },
  { name: "Materials", size: 31.45 },
  { name: "Real Estate", size: 20.89 },
  { name: "Ultilities", size: 11.37 },
];

const COLORS = [
  "#8889DD",
  "#9597E4",
  "#8DC77B",
  "#A5D297",
  "#E2CF45",
  "#F8C12D",
];

class CustomizedContent extends PureComponent {
  render() {
    const {
      root,
      depth,
      x,
      y,
      width,
      height,
      index,
      payload,
      colors,
      rank,
      name,
    } = this.props;

    const fontSize = window.innerWidth <= 650 ? 8 : 14;

    const fontWeight = window.innerWidth <= 650 ? 100 : 'normal';
  

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill:
              depth < 2
                ? colors[Math.floor((index / root.children.length) * 6)]
                : "#ffffff00",
            stroke: "#fff",
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
            display: "flex",
            justifyContent: "center",
          }}
        />
        {depth === 1 ? (
          <text
            x={x + width / 2}
            y={y + height / 2 + 7}
            textAnchor="middle"
            fill="#fff"
            fontSize={fontSize}
          >
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text
            x={x + 4}
            y={y + 18}
            fill="#fff"
            fontSize={16}
            fillOpacity={0.9}
          >
            {index + 1}
          </text>
        ) : null}
      </g>
    );
  }
}

export default class Example extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/treemap-with-customized-content-7qxfp";

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          width={400}
          height={200}
          data={data}
          dataKey="size"
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent colors={COLORS} />}
        >
          <Tooltip
            formatter={(value, name, props) => {
              return [`${value} MM`];
            }}
          />
        </Treemap>
      </ResponsiveContainer>
    );
  }
}
