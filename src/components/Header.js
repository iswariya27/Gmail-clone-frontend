import { AppBar, Toolbar, styled, InputBase, Box } from "@mui/material";
import {
  Menu,
  Search,
  Tune,
  HelpOutline,
  SettingsOutlined,
  AppsOutlined,
  AccountCircleOutlined,
} from "@mui/icons-material";
import { gmailLogo } from "../constants/Constant";

const StyledAppBar = styled(AppBar)({
  background: "#f5f5f5",
  boxShadow: "none",
});

const SearchWrapper = styled(Box)({
  marginLeft: 80,
  borderRadius: 20,
  minWidth: 690,
  maxWidth: 720,
  height: 48,
  background: "#f5f5f5",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 20px",
  "&>div": {
    width: "100%",
    padding: "0 5px",
  },
});

const OptionWrapper = styled(Box)({
  width: "100%",
  display: "flex",
  justifyContent: "end",
  "&>svg": {
    marginLeft: 20,
  },
});

const Header = ({ toggleDrawer }) => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Menu
          color="action"
          onClick={toggleDrawer}
          sx={{
            cursor: "pointer",
            padding: 1,
            "&:hover": {
              background: "#e0e0e0",
              borderRadius: 20,
              transform: "scale(1.1)",
            },
          }}
        />
        <img
          src={gmailLogo}
          alt="logo"
          style={{ width: 110, marginLeft: 15 }}
        />
        <SearchWrapper>
          <Search
            color="action"
            sx={{
              cursor: "pointer",
              padding: 1,
              "&:hover": {
                background: "#e0e0e0",
                borderRadius: 20,
                transform: "scale(1.1)",
              },
            }}
          />
          <InputBase placeholder="Search mail" />
          <Tune
            color="action"
            sx={{
              cursor: "pointer",
              padding: 1,
              "&:hover": {
                background: "#e0e0e0",
                borderRadius: 20,
                transform: "scale(1.1)",
              },
            }}
          />
        </SearchWrapper>
        <OptionWrapper>
          <HelpOutline
            color="action"
            sx={{
              cursor: "pointer",
              padding: 1,
              "&:hover": {
                background: "#e0e0e0",
                borderRadius: 20,
                transform: "scale(1.1)",
              },
            }}
          />
          <SettingsOutlined
            color="action"
            sx={{
              cursor: "pointer",
              padding: 1,
              "&:hover": {
                background: "#e0e0e0",
                borderRadius: 20,
                transform: "scale(1.1)",
              },
            }}
          />
          <AppsOutlined
            color="action"
            sx={{
              cursor: "pointer",
              padding: 1,
              "&:hover": {
                background: "#e0e0e0",
                borderRadius: 20,
                transform: "scale(1.1)",
              },
            }}
          />
          <AccountCircleOutlined
            color="action"
            sx={{
              cursor: "pointer",
              padding: 1,
              "&:hover": {
                background: "#e0e0e0",
                borderRadius: 20,
                transform: "scale(1.1)",
              },
            }}
          />
        </OptionWrapper>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
