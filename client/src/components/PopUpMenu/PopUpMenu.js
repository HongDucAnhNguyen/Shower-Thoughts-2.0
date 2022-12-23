import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MenuIcon from "@mui/icons-material/Menu";
export default function PopUpMenu({
  SearchForm,
  home,
  about,
  account,
  logout,
}) {
  return (
    <PopupState
      variant="popover"
      popupId="popup-menu"
      style={{ backgroundColor: "gray" }}
    >
      {(popupState) => (
        <>
          <Button variant="outlined" {...bindTrigger(popupState)}>
            <MenuIcon></MenuIcon>
          </Button>
          <Menu {...bindMenu(popupState)}>
            <MenuItem>{SearchForm}</MenuItem>
            <MenuItem onClick={popupState.close}>{home}</MenuItem>
            <MenuItem onClick={popupState.close}>{about}</MenuItem>
            <MenuItem onClick={popupState.close}>{account}</MenuItem>
            <MenuItem onClick={popupState.close}>{logout}</MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}
