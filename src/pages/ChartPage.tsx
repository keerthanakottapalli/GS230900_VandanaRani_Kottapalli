import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Line,
} from "recharts";
import { MenuItem, Select, FormControl, InputLabel, Container, Typography } from "@mui/material";
import { chartData } from "../data/ChartData"; // Import precomputed chart data

const ChartPage: React.FC = () => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const [selectedStore, setSelectedStore] = useState<string>("");

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Gross Margin
      </Typography>

      {/* Store Selector */}
      <FormControl fullWidth>
        <InputLabel>Select Store</InputLabel>
        <Select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value as string)}>
          {stores.map((store) => (
            <MenuItem key={store.id} value={store.id}>
              {store.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Render Chart only if a store is selected */}
      {selectedStore && (
        <div style={{ backgroundColor: "#000", padding: "20px", borderRadius: "8px", marginTop: "20px" }}>
          <ResponsiveContainer width="100%" height={400}>
            <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" /> {/* Dark Grid */}
              <XAxis dataKey="week" stroke="#fff" /> {/* White Text */}
              <YAxis
                yAxisId="left"
                label={{ value: "GM Dollars", angle: -90, position: "insideLeft", fill: "#fff" }}
                stroke="#fff"
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                label={{ value: "GM %", angle: -90, position: "insideRight", fill: "#ff7300" }}
                stroke="#ff7300"
              />
              <Tooltip contentStyle={{ backgroundColor: "#222", color: "#fff", borderRadius: "5px" }} />
              <Legend wrapperStyle={{ color: "#fff" }} />

              {/* Bar for GM Dollars */}
              <Bar yAxisId="left" dataKey="gmDollars" fill="#8884d8" name="GM Dollars" />

              {/* Line for GM Percentage */}
              <Line yAxisId="right" type="monotone" dataKey="gmPercent" stroke="#ff7300" name="GM %" dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      )}
    </Container>
  );
};

export default ChartPage;
