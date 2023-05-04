import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Brush,
  ReferenceLine,
  Label,
} from "recharts";


const ZeroDteChart = ({ data, spotPrice, activeChart, contracts, chartXAxis, ...props }) => {
  let config = activeChart;

  return (
    <React.Fragment>
      <div style={{ height: '100%', marginLeft: 0, background: '#2D3436', border: '3px solid #838996' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barSize={10} margin={{ top: 20, right: 25, left: config?.ml, bottom: 20 }}>
            <Legend verticalAlign="top" iconType='diamond' iconSize={0} height={40} wrapperStyle={{ lineHeight: '1.5', marginLeft: 40 }} />
            <CartesianGrid strokeDasharray="3 3" stroke="#838996" />
            <Tooltip offset={40} cursor={{ stroke: '#F5F5F5', fill: 'rgba(245, 245, 245, 0.5)', strokeWidth: 1 }} />
            <XAxis dataKey="strikePrice" type={chartXAxis} scale="auto" domain={['dataMin', 'dataMax']} tickCount={50} tickMargin={6} tickSize={4} height={60} tick={{ stroke: '#F8F8FF', strokeWidth: 1.25 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }}>
              <Label value="STRIKE PRICES" offset={15} position="insideBottom" />
            </XAxis>
            <YAxis type="number" scale="sqrt" domain={[`dataMin - ${config?.domain}`, `dataMax + ${config?.domain}`]} interval="preserveStartEnd" orientation="left" tickCount={10} tickMargin={6} tickSize={4} tick={{ stroke: '#F8F8FF',  strokeWidth: 1.5 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }} label={{ value: config?.title,  position: 'insideBottom', angle: -90, offset: 150 }} />
            <ReferenceLine y={0} stroke="#F8F8FF"  />
            <ReferenceLine x={spotPrice} label="SPOT PRICE" stroke="#FF0000" alwaysShow />
            {contracts.includes("calls") ? 
              <Bar name={config?.label1} dataKey={config?.data1} fill="#82CA9D" background={{ fill: 'rgba(65,74,76,0.25' }} />
            : null }
            {contracts.includes("puts") ? 
              <Bar name={config?.label2} dataKey={config?.data2} fill="#4C6293" />
            : null}
            <Brush dataKey="strikePrice" travellerWidth={10} height={45} stroke="#414A4C" fill="#F2F3F4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};


export default ZeroDteChart;