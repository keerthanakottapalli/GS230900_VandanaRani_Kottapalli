import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { calendarData } from "../data/CalenderData"; // Import new calendar data
import { salesUnitsData } from "../data/SalesData"; // Import sales data

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// Store & SKU Interfaces


// Planning Row Interface
interface PlanningRow {
  store: string;
  sku: string;
  [key: string]: string | number;
}

const PlanningScreen: React.FC = () => {
  const stores = useSelector((state: RootState) => state.stores.stores);
  const skus = useSelector((state: RootState) => state.skus);

  const [rowData, setRowData] = useState<PlanningRow[]>([]);

  // Initialize Table Data
  useEffect(() => {
    const newRowData: PlanningRow[] = [];

    stores.forEach((store) => {
      skus.forEach((sku) => {
        const row: PlanningRow = {
          store: store.label,
          sku: sku.label,
        };

        // Initialize Sales Units from provided sales data
        calendarData.forEach(({ week }) => {
          const salesRecord = salesUnitsData.find(
            (record) => record.Store === store.id && record.SKU === sku.id && record.Week === week
          );

          const units = salesRecord ? Number(salesRecord["Sales Units"]) : 0; // Ensure it's a number
          row[`units_${week}`] = units;
          row[`sales_${week}`] = Number(units) * Number(sku.price);
          row[`gmDollars_${week}`] = Number(row[`sales_${week}`]) - Number(units) * Number(sku.cost);
          row[`gmPercent_${week}`] =
            row[`sales_${week}`] && Number(row[`sales_${week}`]) !== 0
              ? `${((Number(row[`gmDollars_${week}`]) / Number(row[`sales_${week}`])) * 100).toFixed(2)}%`
              : "0%";
        })

          newRowData.push(row);
        });
      });

      setRowData(newRowData);
    }, [stores, skus]);

    // AG-Grid Column Definitions
    const columnDefs: ColDef[] = [
      { field: "store", headerName: "Store", pinned: "left", width: 200 },
      { field: "sku", headerName: "SKU", pinned: "left", width: 250 },
      ...calendarData.reduce<{ headerName: string; marryChildren: boolean; children: ColDef[] }[]>((acc, { monthLabel, week }) => {
        let monthGroup = acc.find((group) => group.headerName === monthLabel);
    
        if (!monthGroup) {
          monthGroup = { headerName: monthLabel, marryChildren: true, children: [] }; // Fix: marryChildren
          acc.push(monthGroup);
        }
    
        // Add all week-related fields under month
        monthGroup.children.push(
          { field: `units_${week}`, headerName: "Units", editable: true, width: 100 },
          {
            field: `sales_${week}`,
            headerName: "Sales $",
            valueFormatter: (params) => `$${params.value ? params.value.toFixed(2) : "0.00"}`,
            width: 120,
          },
          {
            field: `gmDollars_${week}`,
            headerName: "GM $",
            valueFormatter: (params) => `$${params.value ? params.value.toFixed(2) : "0.00"}`,
            width: 120,
          },
          {
            field: `gmPercent_${week}`,
            headerName: "GM %",
            width: 100,
            cellStyle: (params) => {
              const value = parseFloat(params.value?.toString() || "0"); // Fix type issue
              if (value >= 40) return { backgroundColor: "green", color: "white" };
              if (value >= 10) return { backgroundColor: "yellow", color: "black" };
              if (value > 5) return { backgroundColor: "orange", color: "black" };
              return { backgroundColor: "red", color: "white" };
            },
          }
        );
    
        return acc;
      }, []),
    ];
    
    

    return (
      <div>
        <div className="ag-theme-alpine" style={{ width: "100%", height: "600px" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            modules={[ClientSideRowModelModule]}
          />
        </div>
      </div>
    );
  };

  export default PlanningScreen;
