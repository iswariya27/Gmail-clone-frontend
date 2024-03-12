import { useOutletContext, useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api-url";
import { useEffect, useState } from "react";
import { Box, Checkbox, List } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import Email from "./Email";
import NoMails from "./NoMails";
import { EMPTY_TABS } from "../constants/Constant";

const Emails = () => {
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [refreshScreen, setRefreshScreen] = useState(false);

  const { openDrawer } = useOutletContext();

  const { type } = useParams();

  const getEmailService = useApi(API_URLS.getEmailFromType);

  const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);

  const deleteEmailService = useApi(API_URLS.deleteEmail);

  useEffect(() => {
    getEmailService.call({}, type);
  }, [type, refreshScreen]);

  const selectedAllEmails = (e) => {
    if (e.target.checked) {
      const emails = getEmailService?.response?.map((email) => email._id);
      setSelectedEmails(emails);
    } else {
      setSelectedEmails([]);
    }
  };

  const deleteSelectedEmails = (e) => {
    if (type === "bin") {
      deleteEmailService.call(selectedEmails);
      setRefreshScreen((prevState) => !prevState);
    } else {
      moveEmailsToBinService.call(selectedEmails);
      setRefreshScreen((prevState) => !prevState);
    }
  };

  return (
    <Box
      style={
        openDrawer
          ? { marginLeft: 250, width: "calc(100%-250px)" }
          : { width: "auto" }
      }
    >
      <Box
        style={{
          padding: "10px 10px 0 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox
          size="small"
          onChange={(e) => selectedAllEmails(e)}
          sx={{
            "&:hover": {
              background: "#e0e0e0",
            },
          }}
        />
        <DeleteOutline
          color="action"
          onClick={(e) => deleteSelectedEmails(e)}
          sx={{
            fontSize: 22,
            cursor: "pointer",
            padding: 0.7,
            "&:hover": {
              background: "#e0e0e0",
              borderRadius: 20,
              transform: "scale(1.1)",
            },
          }}
        />
      </Box>
      <List>
        {getEmailService?.response?.map((email) => (
          <Email
            key={email._id}
            email={email}
            selectedEmails={selectedEmails}
            setSelectedEmails={setSelectedEmails}
            setRefreshScreen={setRefreshScreen}
          />
        ))}

        {getEmailService?.response?.length === 0 && (
          <NoMails message={EMPTY_TABS[type]} />
        )}
      </List>
    </Box>
  );
};

export default Emails;
