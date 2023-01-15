
/**
 * This module exports a pop up component
 * for responsive navigation menu
 *
 * author: Hong Duc Anh Nguyen
 */
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
    <PopupState variant="popover" popupId="popup-menu">
      {(popupState) => (
        <>
          <Button
            variant="outlined"
            {...bindTrigger(popupState)}
            size="small"
            className="menu-btn"
          >
            <MenuIcon></MenuIcon>
          </Button>
          <Menu {...bindMenu(popupState)} className="menu-popup">
            <MenuItem onKeyDown={(e) => e.stopPropagation()}>{SearchForm}</MenuItem>
            <MenuItem onClick={popupState.close}>
              {home}
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              {about}
            </MenuItem>
            <MenuItem onClick={popupState.close}>
              {account}
            </MenuItem>
            <MenuItem  onClick={popupState.close}>
              {logout}
            </MenuItem>
          </Menu>
        </>
      )}
    </PopupState>
  );
}
