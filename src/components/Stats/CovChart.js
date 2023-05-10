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


const CovChart = ({ data, ticker1, ticker2, splitChart, inverseStat, ...props }) => {

  return (
    <React.Fragment>
      <div style={{ height: splitChart ? '85%' : 850, background: '#2D3436', border: '3px solid #838996' }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart syncId="syncId" data={data} margin={{ top: 15, right: 15, left: 25, bottom: 20 }}>
            <Legend verticalAlign="top" iconType='diamond' iconSize={0} height={40} wrapperStyle={{ lineHeight: '1.5' }} />
            <CartesianGrid strokeDasharray="3 3" stroke="#838996" />
            <Tooltip offset={40} cursor={{ stroke: '#F5F5F5', fill: 'rgba(245, 245, 245, 0.5)', strokeWidth: 1 }} />
            <XAxis dataKey="Date" tickMargin={6} tickSize={4} height={60} tick={{ stroke: '#F8F8FF', strokeWidth: 1.25 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }}>
              <Label value="DATE" offset={15} position="insideBottom" />
            </XAxis>
            <YAxis yAxisId="left" orientation="left" type="number" domain={['auto', 'auto']} tickCount={10} tickMargin={6} tickSize={4} tick={{ stroke: '#F8F8FF',  strokeWidth: 1.5 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }} label={{ value: 'PRICE ($)', position: 'left', angle: -90, offset: 0 }} />
            <YAxis yAxisId="right" orientation="right" type="number" domain={['auto', 'auto']} tickCount={splitChart ? 10 : 20} tickMargin={6} tickSize={4} tick={{ stroke: '#F8F8FF',  strokeWidth: 1.5 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }} label={{ value: splitChart ? 'PRICE ($)' : 'Covariance', position: 'right', angle: -90, offset: 0 }} />
            <Line yAxisId="left" name={`${ticker1}`} dataKey={ticker1} type="monotone" stroke="#82CA9D" dot={false} />
            {splitChart ?
              <Line yAxisId={splitChart ? "right" : "left"} name={`${ticker2}`} dataKey={ticker2} type="monotone" stroke="#FF6961" dot={false} />
            : null}
            {!splitChart ?
              <Area yAxisId="right" name={!inverseStat ? "Covariance" : "Covariance (Inverted)"} dataKey="Covariance" type="monotone" stroke="#FFBF61" fillOpacity={0.3} fill="#FFBF61" />
            : null}
            <Brush dataKey="Date" travellerWidth={10} height={45} stroke="#414A4C" fill="#F2F3F4" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      {splitChart ?
        <div style={{ height: 350, marginTop: 15, background: '#2D3436', border: '3px solid #838996' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart syncId="syncId" data={data} margin={{ top: 10, right: 55, left: 5, bottom: 20 }}>
              <defs>
                <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FFDEAD" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#FFDEAD" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Legend verticalAlign="top" iconType='diamond' iconSize={0} height={40} wrapperStyle={{ lineHeight: '1.5' }} />
              <CartesianGrid strokeDasharray="3 3" stroke="#838996" />
              <Tooltip offset={40} cursor={{ stroke: '#F5F5F5', fill: 'rgba(245, 245, 245, 0.5)', strokeWidth: 1 }} />
              <XAxis dataKey="Date"  tickMargin={6} tickSize={4} height={60} tick={{ stroke: '#F8F8FF', strokeWidth: 1.25 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }}>
                <Label value="DATE" offset={15} position="insideBottom" />
              </XAxis>
              <YAxis yAxisId="left" orientation="left" tickMargin={6} tickSize={4} tick={{ stroke: '#F8F8FF',  strokeWidth: 1.5 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }} />
              <Area yAxisId="left" name={!inverseStat ? "Covariance" : "Covariance (Inverted)"} dataKey="Covariance" type="monotone" stroke="#FFBF61" fillOpacity={1} fill="url(#colorPv)" />
              <Brush dataKey="Date" travellerWidth={10} height={45} stroke="#414A4C" fill="#F5F5F5" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      : null }
    </React.Fragment>
  );
};


export default CovChart;