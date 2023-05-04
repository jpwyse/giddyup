import React from "react";
import {
  ComposedChart,
  LineChart,
  Line,
  AreaChart,
  Area,
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


const SpreadChart = ({ data, quant10th, quant25th, quant50th, quant75th, quant90th, quant95th, quant99th, priceTicker, ...props }) => {

  return (
    <React.Fragment>
      <div style={{ height: '100%', marginLeft: 0, background: '#2D3436', border: '3px solid #838996' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 10, left: 15, bottom: 20 }}>
            <Legend verticalAlign="top" iconType='diamond' iconSize={0} height={40} wrapperStyle={{ lineHeight: '1.5', marginLeft: 40 }} />
            <CartesianGrid strokeDasharray="4 4" stroke="#838996" />
            <Tooltip offset={40} cursor={{ stroke: '#FFDEAD', fill: 'rgba(255, 222, 173, 0.5)', strokeWidth: 1 }} />
            <XAxis dataKey="Date" tickMargin={6} tickSize={4} height={60} tick={{ stroke: '#F8F8FF', strokeWidth: 1.25 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }}>
              <Label value="DATE" offset={15} position="insideBottom" />
            </XAxis>
            <YAxis yAxisId="left" orientation="left" type="number" domain={['dataMin', 'dataMax']} tickCount={10} tickMargin={6} tickSize={4} tick={{ stroke: '#F8F8FF',  strokeWidth: 1.5 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }} label={{ value: "VOLATILITY SPREAD SUM", position: 'left', angle: -90, offset: 0 }} />
            <YAxis yAxisId="right" orientation="right" type="number" tickCount={10} tickMargin={6} tickSize={4} tick={{ stroke: '#F8F8FF',  strokeWidth: 1.5 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }} label={{ value: "PRICE", position: 'right', angle: 90, offset: -5 }} />
            <Line yAxisId="left" name="VOLATILITY L/S SPREAD SUM" dataKey="Sum" type="monotone" stroke="#82CA9D" dot={false} />
            <Line yAxisId="right" name={priceTicker} dataKey={priceTicker} type="monotone" stroke="#FF6961" dot={false} />
            <ReferenceLine yAxisId="left" y={quant10th} label="Spread 10th %" strokeDasharray="2" stroke="#FFDEAD" alwaysShow />
            <ReferenceLine yAxisId="left" y={quant25th} label="Spread 25th %" strokeDasharray="2" stroke="#FFDEAD" alwaysShow />
            <ReferenceLine yAxisId="left" y={quant50th} label="Spread 50th %" strokeDasharray="2" stroke="#FFDEAD" alwaysShow />
            <ReferenceLine yAxisId="left" y={quant75th} label="Spread 75th %" strokeDasharray="2" stroke="#FFDEAD" alwaysShow />
            <ReferenceLine yAxisId="left" y={quant90th} label="Spread 90th %" strokeDasharray="2" stroke="#FFDEAD" alwaysShow />
            <ReferenceLine yAxisId="left" y={quant95th} label="Spread 95th %" strokeDasharray="2" stroke="#FFDEAD" alwaysShow />
            <ReferenceLine yAxisId="left" y={quant99th} label="Spread 99th %" strokeDasharray="2" stroke="#FFDEAD" alwaysShow />
            <Brush dataKey="Date" travellerWidth={10} height={45} stroke="#414A4C" fill="#F2F3F4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};

export default SpreadChart;