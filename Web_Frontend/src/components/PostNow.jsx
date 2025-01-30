import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const boxStyle = {
  width: 420,
  bgcolor: "#f5f5f5",
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  border: "none",
  outline: "none",
  zIndex: 10,
};

export function PostNow({ setOpen, open }) {
  const [description, setDescription] = useState("");

  const handleClose = () => setOpen(false);

  const handleSubmit = () => {
    console.log("Description:", description);
    handleClose();
  };



  return (
    <Modal
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
      sx={modalStyle}
    >
      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box sx={boxStyle}>
          <Typography
            variant="h5"
            fontWeight={600}
            textAlign="center"
            sx={{ color: "#AD46FF", mb: 3 }}
          >
            Post Now
          </Typography>
          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button
            fullWidth
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#AD46FF",
              color: "white",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#9B3DE0",
              },
            }}
          >
            Generate
          </Button>
        </Box>
      </Slide>
    </Modal>
  );
}
