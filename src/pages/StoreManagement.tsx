import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addStore, removeStore } from "../redux/slices/storeSlice";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ModuleRegistry } from "ag-grid-community"; // Import ColDef
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { ClientSideRowModelModule } from "ag-grid-community";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

// Define the Store type
interface Store {
  id: string;
  label: string;
  city: string;
  state: string;
}
ModuleRegistry.registerModules([ClientSideRowModelModule]);
const StoreManagement: React.FC = () => {
  const dispatch = useDispatch();


  // Fetch store data from Redux
  const stores = useSelector((state: RootState) => state.stores.stores);
  console.log("Redux Store Data:", stores); // Debugging: Check if Redux has data

  // Local state for AG-Grid row data
  const [rowData, setRowData] = useState<Store[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Sync Redux store with AG-Grid when Redux state updates
  useEffect(() => {
    console.log("Updated AG-Grid rowData:", stores); // Debugging
    setRowData(stores);
  }, [stores]);

  const [newStore, setNewStore] = useState<Store>({ id: "", label: "", city: "", state: "" });

  const handleAddStore = () => {
    if (newStore.id && newStore.label && newStore.city && newStore.state) {
      dispatch(addStore(newStore));
      setNewStore({ id: "", label: "", city: "", state: "" });
      setDialogOpen(false);
    }
  };

  const handleRemoveStore = (id: string) => {
    dispatch(removeStore(id));
  };

  // Define columnDefs with the correct type
  const columnDefs: ColDef<Store>[] = [
    {
      headerName: "",
      width: 60,
      cellRenderer: (params: any) => (
        <Button onClick={() => handleRemoveStore(params.data.id)}>
          <DeleteForeverOutlinedIcon />
        </Button>
      ),
    },
    { field: "id", headerName: "ID", minWidth: 100, flex: 1 },
    { field: "label", headerName: "Store", minWidth: 250, flex: 2, editable: true },
    { field: "city", headerName: "City", minWidth: 200, flex: 1.5, editable: true },
    { field: "state", headerName: "State", minWidth: 150, flex: 1, editable: true },
  ];


  return (
    <div >
      {/* AG-Grid for Displaying Store Data */}
      <div  style={{ width: "100%", height: "500px" }}>
        <AgGridReact<Store>
          key={rowData.length} // Ensures AG-Grid refreshes when data changes
          rowData={rowData}
          columnDefs={columnDefs}
          
          modules={[ClientSideRowModelModule]}
        />
      </div>

      <Button variant="contained" style={{backgroundColor: '#F1A1A8', marginTop: '20px'}} onClick={() => setDialogOpen(true)}>
        New Store
      </Button>
      {/* Form to Add a New Store */}
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Add Store</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column", gap: 10, padding: 20 }}>
          <TextField label="ID" value={newStore.id} onChange={(e) => setNewStore({ ...newStore, id: e.target.value })} />
          <TextField label="Store Name" value={newStore.label} onChange={(e) => setNewStore({ ...newStore, label: e.target.value })} />
          <TextField label="City" value={newStore.city} onChange={(e) => setNewStore({ ...newStore, city: e.target.value })} />
          <TextField label="State" value={newStore.state} onChange={(e) => setNewStore({ ...newStore, state: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddStore}>
            Add Store
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StoreManagement;
