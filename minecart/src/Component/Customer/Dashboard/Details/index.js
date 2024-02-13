import React from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";

const ProductDetails = (props) => {
  return (
    <React.Fragment>
      <Dialog open={props.open} onClose={() => props.handleClose()}>
        <DialogContent sx={{ width: "auto" }}>
          <Typography>{props.data.description}</Typography>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => props.handleClose()}>
            <CloseOutlinedIcon /> Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ProductDetails;
