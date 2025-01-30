import { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import zIndex from "@mui/material/styles/zIndex";
import { withTheme } from "@emotion/react";
import { festivals } from "../store/festivals_data";




const modalStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const boxStyle = {
  width: 420,
  bgcolor: "#f5f5f5", // Light gray background for better contrast
  borderRadius: "12px",
  boxShadow: 24,
  p: 4,
  border: "none",
  outline: "none",
  zIndex: 10,
};

export function MonthlyPost({ setOpen, open }) {
  const [monthlyGoal, setMonthlyGoal] = useState("");
  const [specialDates, setSpecialDates] = useState([]);
  const [fest, setFest] = useState([]);


  const handleClose = () => setOpen(false);

  const handleAddSpecialDate = () => {
    setSpecialDates([...specialDates, { date: null, occasion: "" }]);
  };

  const handleSpecialDateChange = (index, field, value) => {
    const newSpecialDates = [...specialDates];
    newSpecialDates[index][field] = value;
    setSpecialDates(newSpecialDates);
  };

  const handleSubmit = () => {
    
    let dates = specialDates.map((specialDate) => specialDate.date["$d"]);
    dates = dates.map((date) => (new Date(date)).toISOString());
    setSpecialDates(dates);
    let f = festivals[new Date().toLocaleString('default', { month: 'long' })];
    f = f.map((fest) => ({...fest, date: (new Date(fest.date)).toISOString()}));

    setFest(f);
    
    console.log("Monthly Goal:", monthlyGoal);
    console.log("Special Dates:", dates);

    console.log("Festivals:", f);
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
            Create Monthly Plan
          </Typography>
          <TextField
            fullWidth
            label="Monthly Goal"
            variant="outlined"
            value={monthlyGoal}
            onChange={(e) => setMonthlyGoal(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Typography variant="subtitle1" sx={{ mb: 1, color: "#AD46FF", fontWeight: 600 }}>
            Special Dates
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {specialDates.map((specialDate, index) => (
              <Box key={index} sx={{ display: "flex", gap: 2, mb: 2 }}>
                <DatePicker
                  label="Date"
                  value={specialDate.date ? dayjs(specialDate.date) : null}
                  onChange={(newValue) => handleSpecialDateChange(index, "date", newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                <TextField
                  label="Occasion"
                  value={specialDate.occasion}
                  onChange={(e) => handleSpecialDateChange(index, "occasion", e.target.value)}
                  fullWidth
                />
              </Box>
            ))}
          </LocalizationProvider>
          <Button
            onClick={handleAddSpecialDate}
            fullWidth
            sx={{
              backgroundColor: "#AD46FF",
              color: "white",
              borderRadius: "8px",
              mb: 2,
              "&:hover": {
                backgroundColor: "#9B3DE0",
              },
            }}
          >
            + Add Special Date
          </Button>
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
