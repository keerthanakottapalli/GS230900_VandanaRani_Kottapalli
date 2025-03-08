import React from "react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box } from "@mui/material";
import StoreIcon from "@mui/icons-material/Store";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BarChartIcon from "@mui/icons-material/BarChart";
import Logo from "../assets/GSLogo.svg"; // Ensure your logo is in the assets folder
import { useNavigate, useLocation } from "react-router-dom";

const sidebarItems = [
  { text: "Store", icon: <StoreIcon />, path: "/" },
  { text: "SKU", icon: <InventoryIcon />, path: "/sku" },
  { text: "Planning", icon: <AssessmentIcon />, path: "/planning" },
  { text: "Charts", icon: <BarChartIcon />, path: "/chart" },
];

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": { width: 240, boxSizing: "border-box", backgroundColor: "#ffffff" }, // Light background
      }}
    >
      <Toolbar>
        <Box component="img" src={Logo} alt="Company Logo" sx={{ height: 50, margin: "auto" }} />
      </Toolbar>
      <List>
        {sidebarItems.map(({ text, icon, path }) => (
          <ListItem key={text} disablePadding>
            <ListItemButton
              onClick={() => navigate(path)}
              sx={{
                backgroundColor: location.pathname === path ? "#e0e0e0" : "transparent", // Highlight active tab
                "&:hover": { backgroundColor: "#ddd" },
              }}
            >
              <ListItemIcon sx={{ color: "#222" }}>{icon}</ListItemIcon>
              <ListItemText primary={text} sx={{ color: "#222", fontWeight: location.pathname === path ? "bold" : "normal" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
