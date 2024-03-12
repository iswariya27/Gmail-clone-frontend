import styled from "@emotion/styled";
import { Close, DeleteOutline } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  InputBase,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api-url";

const dialogStyle = {
  height: "90%",
  width: "80%",
  maxWidth: "100%",
  maxHeight: "100%",
  boxShadow: "none",
  borderRadius: 5,
};

const Header = styled(Box)({
  display: "flex",
  padding: "10px 15px ",
  justifyContent: "space-between",

  "&>p": {
    fontSize: 14,
    fontWeight: 600,
    borderBottom: "2px solid #e0e0e0 ",
    marginTop: 10,
  },
});

const RecipientWrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  padding: 15,
  "&>div": {
    fontSize: 14,
    borderBottom: "2px solid #e0e0e0 ",
  },
});

const Footer = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  padding: "10px 15px",
});

const SendButton = styled(Button)({
  background: "#40c4ff",
  color: "#fafafa",
  borderRadius: 20,
  padding: "5px 20px",
  textTransform: "none",
  fontWeight: 500,
  width: 100,
});

const ComposeMail = ({ openDialog, setOpenDialog }) => {
  const [data, setData] = useState({});

  const sentEmailService = useApi(API_URLS.saveSentEmail);

  const saveDraftService = useApi(API_URLS.saveDraftEmails);

  const closeComposemail = (e) => {
    e.preventDefault();

    const payload = {
      to: data.to,
      from: "codingpractice814@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "coding practice",
      starred: false,
      type: "drafts",
    };
    saveDraftService.call(payload);

    if (!saveDraftService.error) {
      setOpenDialog(false);
      setData({});
    } else {
    }
  };

  const sendMail = (e) => {
    e.preventDefault();

    if (window.Email) {
      window.Email.send({
        SecureToken: "87bf569c-b073-427c-a886-d4e8f8d8872c",
        To: data.to,
        From: "codingpractice814@gmail.com",
        Subject: data.subject,
        Body: data.body,
      }).then((message) => alert("Email sent successfully"));
    }

    const payload = {
      to: data.to,
      from: "codingpractice814@gmail.com",
      subject: data.subject,
      body: data.body,
      date: new Date(),
      image: "",
      name: "coding practice",
      starred: false,
      type: "sent",
    };

    sentEmailService.call(payload);

    if (!sentEmailService.error) {
      setOpenDialog(false);
      setData({});
    } else {
    }

    setOpenDialog(false);
  };

  const onValueChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <Dialog open={openDialog} PaperProps={{ sx: dialogStyle }}>
      <Header>
        <Typography sx={{ width: "100%" }}>New Message</Typography>
        <Close
          sx={{
            "&:hover": {
              padding: "3px",
              background: "#e0e0e0",
              borderRadius: 20,
              transform: "scale(1.01)",
            },
          }}
          onClick={(e) => closeComposemail(e)}
        />
      </Header>

      <RecipientWrapper>
        <InputBase
          placeholder="To"
          name="to"
          onChange={(e) => onValueChange(e)}
        />
        <InputBase
          placeholder="Subject"
          name="subject"
          onChange={(e) => onValueChange(e)}
        />
      </RecipientWrapper>

      <TextField
        multiline
        rows={17}
        sx={{ "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
        name="body"
        onChange={(e) => onValueChange(e)}
      />
      <Footer>
        <SendButton
          onClick={(e) => sendMail(e)}
          sx={{
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          Send
        </SendButton>
        <DeleteOutline
          onClick={() => setOpenDialog(false)}
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
      </Footer>
    </Dialog>
  );
};

export default ComposeMail;
