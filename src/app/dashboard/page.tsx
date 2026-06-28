'use client';

import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList,
} from 'recharts';
import { Eye, Phone, ShoppingCart, Target } from 'lucide-react';

const SALES_DATA = [
  { date: '06-14', value: 3200 }, { date: '06-15', value: 4100 },
  { date: '06-16', value: 2800 }, { date: '06-17', value: 5200 },
  { date: '06-18', value: 3900 }, { date: '06-19', value: 6100 },
  { date: '06-20', value: 4500 }, { date: '06-21', value: 7300 },
  { date: '06-22', value: 5800 }, { date: '06-23', value: 8200 },
  { date: '06-24', value: 6700 }, { date: '06-25', value: 9100 },
  { date: '06-26', value: 7800 }, { date: '06-27', value: 10500 },
  { date: '06-28', value: 9300 },
];

const LEADS_DATA = [
  { date: '06-14', value: 8 }, { date: '06-15', value: 12 },
  { date: '06-16', value: 6 }, { date: '06-17', value: 15 },
  { date: '06-18', value: 10 }, { date: '06-19', value: 18 },
  { date: '06-20', value: 13 }, { date: '06-21', value: 22 },
  { date: '06-22', value: 16 }, { date: '06-23', value: 25 },
  { date: '06-24', value: 19 }, { date: '06-25', value: 28 },
  { date: '06-26', value: 23 }, { date: '06-27', value: 31 },
  { date: '06-28', value: 27 },
];

const ORDERS_DATA = [
  { date: '06-14', value: 3 }, { date: '06-15', value: 5 },
  { date: '06-16', value: 2 }, { date: '06-17', value: 6 },
  { date: '06-18', value: 4 }, { date: '06-19', value: 8 },
  { date: '06-20', value: 5 }, { date: '06-21', value: 10 },
  { date: '06-22', value: 7 }, { date: '06-23', value: 12 },
  { date: '06-24', value: 9 }, { date: '06-25', value: 14 },
  { date: '06-26', value: 11 }, { date: '06-27', value: 16 },
  { date: '06-28', value: 13 },
];

const SOURCE_RANKING = [
  { name: '官网', count: 42 },
  { name: '展会', count: 28 },
  { name: '电话咨询', count: 22 },
  { name: '朋友推荐', count: 18 },
  { name: '社交媒体', count: 12 },
  { name: '广告投放', count: 8 },
];

const FUNNEL_DATA = [
  { name: '线索获取', value: 130, fill: '#2e6cf7' },
  { name: '需求确认', value: 85, fill: '#4e9af5' },
  { name: '推产品', value: 52, fill: '#7ec3fa' },
  { name: '成交', value: 31, fill: '#a8dbfd' },
];

const PRODUCT_PIE = [
  { name: '工业级不锈钢轴承', value: 22 },
  { name: '液压油缸密封圈', value: 18 },
  { name: '碳纤维复合板材', value: 15 },
  { name: '精密齿轮减速器', value: 12 },
  { name: '工业传感器模块', value: 10 },
  { name: '高强度合金螺栓', value: 8 },
  { name: '工业润滑油', value: 6 },
  { name: '其他', value: 9 },
];

const PIE_COLORS = ['#2e6cf7', '#4e9af5', '#7ec3fa', '#a8dbfd', '#3bceac', '#ff7d00', '#f53f3f', '#86909c'];

const SALES_REVENUE = [
  { name: '张经理', value: 28500 },
  { name: '王经理', value: 24200 },
  { name: '李经理', value: 19800 },
  { name: '赵经理', value: 16500 },
  { name: '刘经理', value: 14300 },
  { name: '陈经理', value: 12100 },
  { name: '杨经理', value: 10800 },
  { name: '黄经理', value: 9200 },
  { name: '吴经理', value: 7800 },
  { name: '周经理', value: 6500 },
];

const SALES_CONVERSION = [
  { name: '张经理', value: 38 },
  { name: '王经理', value: 35 },
  { name: '李经理', value: 32 },
  { name: '赵经理', value: 28 },
  { name: '刘经理', value: 26 },
  { name: '陈经理', value: 24 },
  { name: '杨经理', value: 22 },
  { name: '黄经理', value: 20 },
  { name: '吴经理', value: 18 },
  { name: '周经理', value: 15 },
];

const STATS = [
  { label: '本月销售额', value: '¥89,600', icon: Target, color: '#2e6cf7', bg: '#e8f0ff' },
  { label: '本月客户线索数', value: '276', icon: Eye, color: '#00b42a', bg: '#e8ffea' },
  { label: '本月订单数', value: '84', icon: ShoppingCart, color: '#ff7d00', bg: '#fff7e8' },
  { label: '本月业绩完成情况', value: '89.6%', sub: '目标 ¥100,000', icon: Phone, color: '#f53f3f', bg: '#fff1f0' },
];

const CHART_TABS = [
  { key: 'sales', label: '销售额', data: SALES_DATA, color: '#2e6cf7', prefix: '¥' },
  { key: 'leads', label: '客户线索数', data: LEADS_DATA, color: '#00b42a', prefix: '' },
  { key: 'orders', label: '订单数', data: ORDERS_DATA, color: '#ff7d00', prefix: '' },
];

export default function DashboardPage() {
  const [chartTab, setChartTab] = useState('sales');

  const activeChart = CHART_TABS.find((t) => t.key === chartTab)!;

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar placeholder — will be replaced by layout */}
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4 flex items-center justify-between shrink-0" style={{ borderColor: '#e5e6eb' }}>
          <div>
            <h2 className="text-xl font-semibold" style={{ color: '#1d2129' }}>数据仪表盘</h2>
            <p className="text-sm mt-0.5" style={{ color: '#86909c' }}>2026年6月 · 实时业务概览</p>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 space-y-6">
          {/* Section 1: Top Stat Cards */}
          <div className="grid grid-cols-4 gap-4">
            {STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="bg-white rounded-lg p-5 flex items-center gap-4"
                  style={{ border: '1px solid #e5e6eb' }}
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{ backgroundColor: stat.bg }}
                  >
                    <Icon size={24} style={{ color: stat.color }} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs" style={{ color: '#86909c' }}>{stat.label}</p>
                    <p className="text-2xl font-bold mt-1" style={{ color: '#1d2129' }}>{stat.value}</p>
                    {stat.sub && <p className="text-xs mt-0.5" style={{ color: '#86909c' }}>{stat.sub}</p>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Section 2: Trend Chart with Tabs */}
          <div className="bg-white rounded-lg" style={{ border: '1px solid #e5e6eb' }}>
            <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
              <h3 className="text-base font-semibold" style={{ color: '#1d2129' }}>业绩趋势</h3>
              <div className="flex gap-1">
                {CHART_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setChartTab(tab.key)}
                    className="px-4 py-1.5 text-sm rounded-md transition-all"
                    style={
                      chartTab === tab.key
                        ? { color: '#ffffff', backgroundColor: '#2e6cf7' }
                        : { color: '#4e5969', backgroundColor: '#f2f3f5' }
                    }
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={activeChart.data}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#86909c' }} />
                  <YAxis tick={{ fontSize: 12, fill: '#86909c' }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: '8px',
                      border: '1px solid #e5e6eb',
                      fontSize: '13px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={activeChart.color}
                    strokeWidth={2}
                    dot={{ fill: activeChart.color, r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Section 3, 4, 5: Source Ranking + Conversion Funnel + Product Pie */}
          <div className="grid grid-cols-3 gap-6">
            {/* Source Ranking */}
            <div className="bg-white rounded-lg" style={{ border: '1px solid #e5e6eb' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
                <h3 className="text-base font-semibold" style={{ color: '#1d2129' }}>线索来源排行榜</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={260}>
                  <BarChart data={SOURCE_RANKING} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12, fill: '#86909c' }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#4e5969' }} width={70} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e6eb', fontSize: '13px' }} />
                    <Bar dataKey="count" fill="#2e6cf7" radius={[0, 4, 4, 0]} barSize={16} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Conversion Funnel */}
            <div className="bg-white rounded-lg" style={{ border: '1px solid #e5e6eb' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
                <h3 className="text-base font-semibold" style={{ color: '#1d2129' }}>客户转化漏斗</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={260}>
                  <FunnelChart>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e6eb', fontSize: '13px' }} />
                    <Funnel
                      dataKey="value"
                      data={FUNNEL_DATA}
                      isAnimationActive
                    >
                      <LabelList position="right" fill="#4e5969" stroke="none" dataKey="name" fontSize={13} />
                      <LabelList position="center" fill="#ffffff" stroke="none" dataKey="value" fontSize={14} fontWeight="bold" />
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Product Pie */}
            <div className="bg-white rounded-lg" style={{ border: '1px solid #e5e6eb' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
                <h3 className="text-base font-semibold" style={{ color: '#1d2129' }}>售卖商品统计</h3>
              </div>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={PRODUCT_PIE}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={75}
                      innerRadius={35}
                      label={false}
                    >
                      {PRODUCT_PIE.map((_, idx) => (
                        <Cell key={idx} fill={PIE_COLORS[idx % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e6eb', fontSize: '13px' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-1 mt-2">
                  {PRODUCT_PIE.map((item, idx) => (
                    <div key={item.name} className="flex items-center gap-2 text-xs" style={{ color: '#4e5969' }}>
                      <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: PIE_COLORS[idx % PIE_COLORS.length] }} />
                      <span className="truncate">{item.name}</span>
                      <span className="ml-auto shrink-0" style={{ color: '#86909c' }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Sales Rankings — two charts side by side */}
          <div className="grid grid-cols-2 gap-6">
            {/* Revenue TOP10 */}
            <div className="bg-white rounded-lg" style={{ border: '1px solid #e5e6eb' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
                <h3 className="text-base font-semibold" style={{ color: '#1d2129' }}>销售业绩 TOP10</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={SALES_REVENUE} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12, fill: '#86909c' }} />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#4e5969' }} width={60} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e6eb', fontSize: '13px' }}
                      formatter={(v: number) => `¥${v.toLocaleString()}`}
                    />
                    <Bar dataKey="value" fill="#2e6cf7" radius={[0, 4, 4, 0]} barSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Conversion TOP10 */}
            <div className="bg-white rounded-lg" style={{ border: '1px solid #e5e6eb' }}>
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #e5e6eb' }}>
                <h3 className="text-base font-semibold" style={{ color: '#1d2129' }}>销售转化率 TOP10</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={SALES_CONVERSION} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 12, fill: '#86909c' }} unit="%" />
                    <YAxis dataKey="name" type="category" tick={{ fontSize: 12, fill: '#4e5969' }} width={60} />
                    <Tooltip
                      contentStyle={{ borderRadius: '8px', border: '1px solid #e5e6eb', fontSize: '13px' }}
                      formatter={(v: number) => `${v}%`}
                    />
                    <Bar dataKey="value" fill="#00b42a" radius={[0, 4, 4, 0]} barSize={18} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
