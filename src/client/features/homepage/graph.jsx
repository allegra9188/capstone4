/* eslint-disable max-classes-per-file */
import React, { PureComponent } from 'react';
import { Treemap, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  {
    name: 'Communication Services',
    children: [
      { name: 'volume', size: 99.68 },
    ],
  },
  {
    name: 'Consumer Discretionary',
    children: [
      { name: 'volume', size: 79.52 },
    ],
  },
  {
    name: 'Consumer Stapes',
    children: [
      { name: 'volume', size: 48.64 },
    ],
  },
  {
    name: 'Energy',
    children: [
      { name: 'volume', size: 105.19 },
    ],
  },
  {
    name: 'Financials',
    children: [
      { name: 'volume', size: 184.85 },
    ],
  },
  {
    name: 'Healthcare',
    children: [
      {
        name: 'distortion',
        children: [
          { name: 'volume', size: 87.64 },
        ],
      },
    ],
  },
  {
    name: 'Industrials',
    children: [
      { name: 'volume', size: 82.45 },
    ],
  },
  {
    name: 'Information Technology',
    children: [
      { name: 'volume', size: 419.5 },
    ],
  },
  {
    name: 'Materials',
    children: [
      { name: 'volume', size: 31.45 },
    ],
  },
  {
    name: 'Real Estate',
    children: [
      { name: 'volume', size: 20.89 },
    ],
  },
  {
    name: 'Ultilities',
    children: [
      { name: 'volume', size: 11.37 },
    ],
  },
];

const COLORS = ['#8889DD', '#9597E4', '#8DC77B', '#A5D297', '#E2CF45', '#F8C12D'];

class CustomizedContent extends PureComponent {
  render() {
    const { root, depth, x, y, width, height, index, payload, colors, rank, name } = this.props;

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : '#ffffff00',
            stroke: '#fff',
            strokeWidth: 2 / (depth + 1e-10),
            strokeOpacity: 1 / (depth + 1e-10),
            display: "flex",
            justifyContent: "center",
          }}
        />
        {depth === 1 ? (
          <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
            {name}
          </text>
        ) : null}
        {depth === 1 ? (
          <text x={x + 4} y={y + 18} fill="#fff" fontSize={16} fillOpacity={0.9}>
            {index + 1}
          </text>
        ) : null}
      </g>
    );
  }
}

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/treemap-with-customized-content-7qxfp';

  render() {
    return (
      <ResponsiveContainer width="70%" height="20%">
        <Treemap
          width={400}
          height={200}
          data={data}
          dataKey="size"
          stroke="#fff"
          fill="#8884d8"
          content={<CustomizedContent colors={COLORS} />}
        >
          <Tooltip content={({ payload }) => payload[0] && `Volume: ${payload[0].value}MM`} />
        </Treemap>
      </ResponsiveContainer>
    );
  }
}
