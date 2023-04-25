import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import LocalMallRoundedIcon from "@mui/icons-material/LocalMallRounded";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { useNavigate } from "@remix-run/react";

interface Page {
  name: string;
  href: string;
}

const pages: Page[] = [
  {
    name: "Catalog",
    href: "/catalog",
  },
  {
    name: "Cart",
    href: "/cart",
  },
  {
    name: "Orders",
    href: "/orders",
  },
];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClickPage = (page: Page) => {
    navigate(page.href);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <LocalMallRoundedIcon
          sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
        />
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            color: "inherit",
            textDecoration: "none",
          }}
        >
          PolyShop
        </Typography>

        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleOpenNavMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorElNav}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
            sx={{
              display: { xs: "block", md: "none" },
            }}
          >
            {pages.map((page) => (
              <MenuItem key={page.href} onClick={() => handleClickPage(page)}>
                <Typography textAlign="center">{page.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
        <LocalMallRoundedIcon
          sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
        />
        <Typography
          variant="h5"
          noWrap
          component="a"
          href=""
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          PolyShop
        </Typography>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          {pages.map((page) => (
            <Button
              key={page.href}
              onClick={() => handleClickPage(page)}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              {page.name}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
