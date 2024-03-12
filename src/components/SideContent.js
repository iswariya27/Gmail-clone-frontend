import { Box, Button, List, ListItem, styled } from "@mui/material";
import { CreateOutlined } from "@mui/icons-material";
import {
  HiOutlineStar,
  HiOutlineDocument,
  HiOutlineMail,
} from "react-icons/hi";
import { BiSolidInbox, BiTrash } from "react-icons/bi";
import { AiOutlineSend } from "react-icons/ai";
import ComposeMail from "./ComposeMail";
import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import routes from "../routes/route";

const ComposeButton = styled(Button)({
  background: "#c2e7ff",
  color: "#001d35",
  borderRadius: 16,
  padding: 15,
  minWidth: 140,
  textTransform: "none",
  marginTop: 10,
  marginLeft: 10,
  "&:hover": {
    transform: "Scale(1.05)",
  },
});

const Container = styled(Box)({
  padding: 8,
  "&>ul": {
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    "&>a": {
      textDecoration: "none",
      color: "inherit",
    },
  },
  "&>ul>a>li>svg": {
    marginRight: 20,
  },
});

const SideContent = () => {
  const [openDialog, setOpenDialog] = useState(false);

  const { type } = useParams();

  const onComposeClick = () => {
    setOpenDialog(true);
  };

  const sidebarData = [
    {
      id: 1,
      name: "inbox",
      title: "Inbox",
      icon: <BiSolidInbox />,
    },
    {
      id: 2,
      name: "starred",
      title: "Starred",
      icon: <HiOutlineStar />,
    },
    {
      id: 3,
      name: "sent",
      title: "Sent",
      icon: <AiOutlineSend />,
    },
    {
      id: 4,
      name: "drafts",
      title: "Drafts",
      icon: <HiOutlineDocument />,
    },
    {
      id: 5,
      name: "bin",
      title: "Trash",
      icon: <BiTrash />,
    },
    {
      id: 6,
      name: "allmail",
      title: "All Mail",
      icon: <HiOutlineMail />,
    },
  ];
  return (
    <Container>
      <ComposeButton onClick={() => onComposeClick()}>
        <CreateOutlined />
        Compose
      </ComposeButton>

      <List>
        {sidebarData.map(({ id, name, title, icon }) => (
          <NavLink key={name} to={`${routes.emails.path}/${name}`}>
            <ListItem
              style={
                type === name.toLowerCase()
                  ? {
                      backgroundColor: "#bbdefb",
                      borderRadius: "0 16px 16px 0 ",
                    }
                  : {}
              }
            >
              {icon}
              {title}
            </ListItem>
          </NavLink>
        ))}
      </List>
      <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog} />
    </Container>
  );
};

export default SideContent;
