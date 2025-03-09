import React, { useState } from "react";
import { Container, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addSKU, removeSKU, updateSKU } from "../redux/slices/skuSlice";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry } from "ag-grid-community";
import { ClientSideRowModelModule } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

// ✅ Use the correct SKU interface
interface SKU {
  id: string;
  label: string;
  price: number;
  cost: number;
}

const SKUManagement: React.FC = () => {
  const dispatch = useDispatch();
  const skus: SKU[] = useSelector((state: RootState) => state.skus); // ✅ Ensure `skus` is typed correctly

  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [skuData, setSkuData] = useState<SKU>({ id: "", label: "", price: 0, cost: 0 });

  // ✅ Fix handleOpen - Ensure type safety
  const handleOpen = (index: number | null = null) => {
    setEditIndex(index);
    setSkuData(index !== null && skus[index] ? { ...skus[index] } : { id: "", label: "", price: 0, cost: 0 });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      dispatch(updateSKU({ index: editIndex, sku: skuData }));
    } else {
      dispatch(addSKU(skuData));
    }
    handleClose();
  };

  // ✅ Fix Inline Editing in AG-Grid
  const handleCellValueChange = (params: any) => {
    const { data, rowIndex, colDef } = params;
    const updatedSKU = { ...data, [colDef.field]: parseFloat(data[colDef.field]) || 0 };
    dispatch(updateSKU({ index: rowIndex, sku: updatedSKU }));
  };

  // ✅ Define AG-Grid columns
  const columnDefs: ColDef<SKU>[] = [
    {
      headerName: "",
      cellRenderer: (params: any) => (
        <Button onClick={() => dispatch(removeSKU(params.node.rowIndex))}>
          <DeleteForeverOutlinedIcon />
        </Button>
      ),
      width: 60,
    },
    { field: "label", headerName: "Label", width: 250 },
    {
      field: "price",
      headerName: "Price",
      width: 150,
      editable: true,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
    {
      field: "cost",
      headerName: "Cost",
      width: 150,
      editable: true,
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
    },
  ];

  return (
    <Container>

      <div
        className="ag-theme-alpine"
        style={{
          width: "100%",   // Adjust width as needed
          height: "500px", // Fixed height
          overflow: "auto" // Enable scrolling within the grid
        }}
      >
        <AgGridReact<SKU>
          rowData={skus}
          columnDefs={columnDefs}
          domLayout="normal" // Ensures scrolling works properly
          modules={[ClientSideRowModelModule]}
          onCellValueChanged={handleCellValueChange}
        />
      </div>


      <Button variant="contained" style={{backgroundColor: '#F1A1A8', marginTop: '20px'}} onClick={() => handleOpen()}>
        Add SKU
      </Button>

      {/* Dialog for adding/editing SKU */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editIndex !== null ? "Edit SKU" : "Add SKU"}</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column", gap: 10, padding: 20 }}>
          <TextField
            label="Label"
            name="label"
            value={skuData.label}
            onChange={(e) => setSkuData({ ...skuData, label: e.target.value })}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={skuData.price}
            onChange={(e) => setSkuData({ ...skuData, price: parseFloat(e.target.value) || 0 })}
            fullWidth
          />
          <TextField
            label="Cost"
            name="cost"
            type="number"
            value={skuData.cost}
            onChange={(e) => setSkuData({ ...skuData, cost: parseFloat(e.target.value) || 0 })}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default SKUManagement;
