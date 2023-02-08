import React from "react";
import { Button, Typography } from "@mui/material";
import TouchAppOutlinedIcon from "@mui/icons-material/TouchAppOutlined";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
const AccountNav = ({ user }) => {
  const navigate = useNavigate();
  const ColorForAvatarGenerator = (username) => {
    //hex is based 16
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      //left shift <<
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    console.log(color);
    return color;
  };
  return (
    <>
      <li>
        <Button
          onClick={
            !user?.result
              ? () => {
                  navigate("/auth");
                }
              : () => {}
          }
        >
          {user?.result ? (
            <Avatar
              sx={{
                bgcolor: ColorForAvatarGenerator(user?.result?.name),
              }}
            >
              {user.result.name.charAt(0)}
            </Avatar>
          ) : (
            <Typography>GUEST</Typography>
          )}

          {user?.result?.name ? (
            <></>
          ) : (
            <TouchAppOutlinedIcon></TouchAppOutlinedIcon>
          )}
        </Button>
      </li>
    </>
  );
};

export default AccountNav;
