import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
export default function PopUpMenu({
 duplicateBtn,
 deleteBtn,
 infoBtn
}) {
  return (
    <PopupState
      variant="popover"
      popupId="popup-thought"
    >
      {(popupState) => (
        <>
          <Button style={{color:"whitesmoke"}} {...bindTrigger(popupState)} >
          <MoreHorizIcon></MoreHorizIcon>
          </Button>
          <Menu {...bindMenu(popupState)} >
           
            <MenuItem onClick={popupState.close}>{deleteBtn}</MenuItem>
            <MenuItem onClick={popupState.close}>{duplicateBtn}</MenuItem>
            <MenuItem onClick={popupState.close}>{infoBtn}</MenuItem>
            
          </Menu>
        </>
      )}
    </PopupState>
  );
}
