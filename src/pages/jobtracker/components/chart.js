import { Cell, Pie, PieChart, Tooltip } from "recharts";

const data = [
  { name: "Flat", value: 1000 },
  { name: "Food", value: 500 },
  { name: "Transportation", value: 600 },
  { name: "Eating Out", value: 400 },
  { name: "Flight", value: 300 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#F44236"];

const renderCustomizedLabel = (
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">
          {payload[0].name}: ${payload[0].value}
        </p>
      </div>
    );
  }
  return null;
};

const ViewsChart = () => {
  return (
    <PieChart width={600} height={300}>
      <Pie
        data={data}
        dataKey="value"
        label={renderCustomizedLabel}
        labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index]} />
        ))}
      </Pie>
      <Tooltip content={<CustomTooltip />} />
    </PieChart>
  );
};

export default ViewsChart;

