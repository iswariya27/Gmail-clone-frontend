import { ArrowBack, DeleteOutline } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useLocation, useOutletContext } from "react-router-dom";
import { emptyProfilePic } from "../constants/Constant";
import styled from "@emotion/styled";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api-url";

const Subject = styled(Typography)({
  fontSize: 22,
  margin: "0 0 20px 65px",
  display: "flex",
});

const Indicator = styled(Box)({
  fontSize: 12,
  background: "#ddd",
  color: "#222",
  padding: "2px 4px",
  marginLeft: 6,
  borderRadius: 4,
  alignSelf: "center",
});

const Container = styled(Box)({
  width: "100%",
  "&>div": {
    display: "flex",
    "&>p>span": {
      fontSize: 12,
      color: "#5E5E5E",
    },
  },
});

const Image = styled("img")({
  borderRadius: "50%",
  width: 40,
  height: 40,
  margin: "5px 10px 0 10px",
  background: "black",
});

const Date = styled(Box)({
  margin: "10px 50px 0 auto !important",
  fontSize: 12,
  color: "#5E5E5E",
});

const ViewEmail = () => {
  const { openDrawer } = useOutletContext();

  const { state } = useLocation();
  const { email } = state;

  const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);

  const deleteEmail = () => {
    moveEmailsToBinService.call([email._id]);
    window.history.back();
  };

  return (
    <Box
      style={
        openDrawer
          ? { marginLeft: 250, width: "calc(100%-250px)" }
          : { width: "auto" }
      }
    >
      <Box style={{ padding: 15 }}>
        <ArrowBack
          onClick={() => window.history.back()}
          color="action"
          fontSize="small"
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
        <DeleteOutline
          fontSize="small"
          color="action"
          style={{ marginLeft: 10 }}
          onClick={() => deleteEmail()}
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
      </Box>
      <Box style={{ padding: "10px 10px" }}>
        <Subject>
          {email.subject} <Indicator component="span">Inbox</Indicator>
        </Subject>
        <Box>
          <Box style={{ display: "flex" }}>
            <Image src={emptyProfilePic} alt="dp" />
            <Container>
              <Box>
                <Typography style={{ marginTop: 13 }}>
                  {email.name}
                  <Box component="span">&nbsp;&#60;{email.to}&#62;</Box>
                </Typography>

                <Date>
                  {new window.Date(email.date).getDate()}
                  {new window.Date(email.date).toLocaleString("default", {
                    month: "long",
                  })}
                  &nbsp;
                  {new window.Date(email.date).getFullYear()}
                </Date>
              </Box>
              <Typography style={{ marginTop: 20, fontSize: 15 }}>
                {email.body}
              </Typography>
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ViewEmail;
