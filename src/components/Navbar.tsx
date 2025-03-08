import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Navbar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#ffffff", // White background
        color: "#222", // Dark text
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)", // Light shadow
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left Spacer to center the title */}
        <Box sx={{ width: 48 }}></Box> 

        {/* Center Title */}
        <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center", fontWeight: "bold" }}>
          Data Viewer App
        </Typography>

        {/* Right Section: Profile Icon */}
        <IconButton color="inherit">
          <AccountCircleIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
