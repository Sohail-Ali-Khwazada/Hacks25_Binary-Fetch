import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useAuthContext } from "../context/AuthContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// Import the required locale
import 'dayjs/locale/en';

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

// Extend dayjs with plugins
dayjs.extend(utc);
dayjs.extend(timezone);

export function SchedulePost({ setOpen, open }) {
  const [description, setDescription] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs().tz('Asia/Kolkata'));
  const [selectedTime, setSelectedTime] = useState(
    dayjs().tz('Asia/Kolkata').second(0).millisecond(0)
  );
  const { authToken } = useAuthContext();

  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      // Get the selected date components
      const year = selectedDate.year();
      const month = (selectedDate.month() + 1).toString().padStart(2, '0');
      const day = selectedDate.date().toString().padStart(2, '0');
      const hour = selectedTime.hour().toString().padStart(2, '0');
      const minute = selectedTime.minute().toString().padStart(2, '0');

      // Create the formatted date string
      const istDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000+05:30`;
      
      console.log("Formatted date:", istDateTime); // For debugging

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/posts/create-post`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            brandsWork: "cricket bat and ball",
            monthlyDescription: description,
            occasion: "",
            dateAndTime: istDateTime,
          }),
        }
      );
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create post');
      }
      
      const data = await response.json();
      console.log("Success:", data);
      handleClose();
    } catch (error) {
      console.error("Error submitting post:", error);
    }
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
            Schedule Post
          </Typography>

          <TextField
            fullWidth
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3 }}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
            <DatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(newDate) => setSelectedDate(newDate)}
              sx={{ mb: 3, width: "100%" }}
            />
            <TimePicker
              label="Select Time"
              value={selectedTime}
              onChange={(newTime) => setSelectedTime(newTime)}
              sx={{ mb: 3, width: "100%" }}
            />
          </LocalizationProvider>

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
            Schedule Post
          </Button>
        </Box>
      </Slide>
    </Modal>
  );
}