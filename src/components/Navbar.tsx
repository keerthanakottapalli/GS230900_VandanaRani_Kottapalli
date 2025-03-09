import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Box, Menu, MenuItem, Card, CardContent } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  // Open menu when clicking on the profile icon
  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Close menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Logout function
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

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
        <IconButton color="inherit" onClick={handleMenuOpen}>
          <AccountCircleIcon />
        </IconButton>

        {/* Profile Menu (Dropdown) */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Card sx={{ minWidth: 200, p: 1 }}>
            <CardContent>
              <Typography variant="subtitle1">Profile</Typography>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </CardContent>
          </Card>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
