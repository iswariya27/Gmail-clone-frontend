import { Drawer, styled } from "@mui/material";
import SideContent from "./SideContent";

const StyledDrawer = styled(Drawer)`
  margin-top: 0px;
`;

const SideBar = ({ openDrawer }) => {
  return (
    <StyledDrawer
      anchor="left"
      open={openDrawer}
      hideBackdrop={true}
      ModalProps={{
        keepMounted: true,
      }}
      variant="persistent"
      sx={{
        "& .MuiDrawer-paper": {
          width: 250,
          borderRight: "none",
          background: "#f5F5F5",
          marginTop: "64px",
          height: "calc(100vh - 64px)",
        },
      }}
    >
      <SideContent />
    </StyledDrawer>
  );
};

export default SideBar;
