import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "../../styles/user/newbar.module.css";
import Navbardata from "./nawbar";
import Grid from "@mui/material/Grid";
// import SideNavBar from "../side-navbar/SideNavBar"
// import TopNavBar from '../top-navbar/TopNavBar';

// const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Navbardata />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Grid container>
      <Grid item xs={12} md={12} className={styles.newbar}>
        <Box sx={{ display: "flex" }}>
          <IconButton
            style={{ width: "70px" }}
            className={styles.buttondrawer}
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              backgroundColor: "#f9f9f9",
              color: "white",
              display: { sm: "none" },
            }}
          >
            <MenuIcon className={styles.iconmenu} />
          </IconButton>

          <Box
            component="nav"
            // sx={{  flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              className={styles.listnewbar}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  background: "#fff",
                },
              }}
            >
              {drawer}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                // display: { xs: 'none', sm: 'block' },

                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  display: { xs: "none", sm: "block" },
                  // width: 320,
                  backgroundColor: "#fff",
                },
              }}
              open
            >
              {drawer}
            </Drawer>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ResponsiveDrawer;
