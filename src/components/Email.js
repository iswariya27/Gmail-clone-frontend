import styled from "@emotion/styled";
import { Star, StarBorder } from "@mui/icons-material";
import { Box, Checkbox, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import routes from "../routes/route";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api-url";

const Wapper = styled(Box)({
  padding: "0 0 0 10px",
  background: "#f5f5f5",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  "&>div": {
    display: "flex",
    width: "100%",
    "&>p": {
      fontSize: 14,
    },
  },
});

const Indicator = styled(Typography)({
  fontSize: "12px !important",
  background: "#ddd",
  color: "#222",
  padding: "0 4px",
  borderRadius: 6,
  margin: "2px 6px 0 6px",
});

const Date = styled(Typography)({
  marginLeft: "auto",
  marginRight: 20,
  fontSize: 12,
  color: "#5F6368",
});

const Email = ({
  email,
  selectedEmails,
  setRefreshScreen,
  setSelectedEmails,
}) => {
  const navigate = useNavigate();

  const toggleStarredService = useApi(API_URLS.toggleStarredEmail);

  const toggleStarredEmails = () => {
    toggleStarredService.call({ id: email._id, value: !email.starred });
    setRefreshScreen((prevState) => !prevState);
  };

  const onValueChange = () => {
    if (selectedEmails.includes(email._id)) {
      setSelectedEmails((prevState) =>
        prevState.filter((id) => id !== email._id)
      );
    } else {
      setSelectedEmails((prevState) => [...prevState, email._id]);
    }
  };

  return (
    <Wapper
      style={{
        width: "calc(100%-250px)",
      }}
      sx={{
        "&:hover": {
          transform: "scale(1.01)",
          boxShadow: "5px 5px 10px 5px #bdbdbd",
        },
      }}
    >
      <Checkbox
        size="small"
        checked={selectedEmails.includes(email._id)}
        onChange={() => onValueChange()}
        sx={{
          "&:hover": {
            background: "#e0e0e0",
          },
        }}
      />
      {email.starred ? (
        <Star
          fontSize="small"
          style={{ marginRight: 10, color: "#FFF200" }}
          onClick={() => toggleStarredEmails()}
        />
      ) : (
        <StarBorder
          size="small"
          style={{ marginLeft: 10 }}
          onClick={() => toggleStarredEmails()}
        />
      )}

      <Box
        onClick={() => navigate(routes.view.path, { state: { email: email } })}
      >
        <Typography style={{ width: 200, overflow: "hidden" }}>
          {email.name}
        </Typography>
        <Indicator>Inbox</Indicator>
        <Typography>
          {email.subject} {email.subject && "-"}
          {email.body}
        </Typography>
        <Date>
          {new window.Date(email.date).getDate()}
          {new window.Date(email.date).toLocaleString("default", {
            month: "long",
          })}
        </Date>
      </Box>
    </Wapper>
  );
};

export default Email;
