import React from "react";
import {
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


const CorrCovChart = ({ data, ticker1, ticker2, stat, statColor, ...props }) => {

  return (
    <React.Fragment>
      <div style={{ height: '75%', background: '#1B1B1B', border: '3px solid #838996' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart syncId="syncId" data={data} margin={{ top: 15, right: 15, left: 25, bottom: 20 }}>
            <Legend verticalAlign="top" iconType='diamond' iconSize={0} height={40} wrapperStyle={{ lineHeight: '1.5' }} />
            <CartesianGrid strokeDasharray="3 3" stroke="#838996" />
            <Tooltip offset={40} cursor={{ stroke: '#FFDEAD', fill: 'rgba(255, 222, 173, 0.5)', strokeWidth: 1 }} />
            <XAxis dataKey="Date" tickMargin={6} tickSize={4} height={60} tick={{ stroke: '#F8F8FF', strokeWidth: 1.25 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }}>
              <Label value="DATE" offset={15} position="insideBottom" />
            </XAxis>
            <YAxis yAxisId="left" orientation="left" type="number" domain={['auto', 'auto']} interval="preserveStartEnd" tickCount={10} tickMargin={6} tickSize={4} tick={{ stroke: '#F8F8FF',  strokeWidth: 1.5 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }} label={{ value: 'PRICE ($)', position: 'left', angle: -90, offset: 0 }} />
            <YAxis yAxisId="right" orientation="right" type="number" domain={['auto', 'auto']} interval="preserveStartEnd" tickCount={5} tickMargin={6} tickSize={4} tick={{ stroke: '#F8F8FF',  strokeWidth: 1.5 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }} label={{ value: 'PRICE ($)', position: 'right', angle: -90, offset: 0 }} />
            <Line yAxisId="left" name={`${ticker1}`} dataKey={ticker1} type="monotone" stroke="#82CA9D" dot={false} />
            <Line yAxisId="right" name={`${ticker2}`} dataKey={ticker2} type="monotone" stroke="#4169E1" dot={false} />
            <Brush dataKey="Date" travellerWidth={10} height={45} stroke="#414A4C" fill="#F2F3F4" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ height: 350, marginTop: 15, background: '#1B1B1B', border: '3px solid #838996' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart syncId="syncId" data={data} margin={{ top: 10, right: 55, left: 5, bottom: 20 }}>
            <defs>
              <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={statColor} stopOpacity={0.6}/>
                <stop offset="95%" stopColor={statColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Legend verticalAlign="top" iconType='diamond' iconSize={0} height={40} wrapperStyle={{ lineHeight: '1.5' }} />
            <CartesianGrid strokeDasharray="3 3" stroke="#838996" />
            <Tooltip offset={40} cursor={{ stroke: '#FFDEAD', fill: 'rgba(255, 222, 173, 0.5)', strokeWidth: 1 }} />
            <XAxis dataKey="Date"  tickMargin={6} tickSize={4} height={60} tick={{ stroke: '#F8F8FF', strokeWidth: 1.25 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }}>
              <Label value="DATE" offset={15} position="insideBottom" />
            </XAxis>
            <YAxis yAxisId="left" orientation="left" tickMargin={6} tickSize={4} tick={{ stroke: '#F8F8FF',  strokeWidth: 1.5 }} tickLine={{ stroke: '#F8F8FF', strokeWidth: 1.5 }} />
            <Area yAxisId="left" name={`${stat}`} dataKey={stat} type="monotone" stroke={statColor} fillOpacity={1} fill="url(#colorPv)" />
            <Brush dataKey="Date" travellerWidth={10} height={45} stroke="#414A4C" fill="#F5F5F5" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </React.Fragment>
  );
};


export default CorrCovChart;