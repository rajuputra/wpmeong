'use client';

import { useMemo } from 'react';
import { ComposedChart, Area, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SecondSnapshot } from '@/types/typing';
import { transformSnapshotsToChartData } from '@/lib/chart-data';

interface ResultChartProps {
  snapshots: SecondSnapshot[];
}

export function ResultChart({ snapshots }: ResultChartProps) {
  const data = useMemo(() => transformSnapshotsToChartData(snapshots), [snapshots]);

  if (!data || data.length === 0) return null;

  return (
    <div className="w-full h-[300px] mt-8 mb-8 bg-black/30 p-4 rounded-xl border border-white/5">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="wpmGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#facc15" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#facc15" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#3f3f46" vertical={false} />
          <XAxis 
            dataKey="second" 
            stroke="#71717a" 
            tick={{ fill: '#71717a', fontSize: 12 }} 
            tickMargin={10}
          />
          <YAxis 
            yAxisId="wpm"
            stroke="#71717a" 
            tick={{ fill: '#71717a', fontSize: 12 }}
            domain={['auto', 'auto']}
          />
          <YAxis 
            yAxisId="errors"
            orientation="right"
            stroke="#71717a" 
            tick={false}
            axisLine={false}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
            itemStyle={{ color: '#e4e4e7' }}
          />
          <Area 
            yAxisId="wpm"
            type="monotone" 
            dataKey="wpm" 
            name="WPM"
            stroke="#facc15" 
            strokeWidth={3}
            fill="url(#wpmGradient)" 
            isAnimationActive={true}
          />
          <Scatter 
            yAxisId="errors"
            dataKey="errors" 
            name="Errors"
            fill="#f87171" 
            isAnimationActive={true}
          />
          <Scatter 
            yAxisId="errors"
            dataKey="modifications" 
            name="Modifications"
            fill="#60a5fa" 
            isAnimationActive={true}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
