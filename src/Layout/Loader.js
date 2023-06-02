import { Box, CircularProgress } from "@mui/material";
import React from "react";

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        position: "absolute",
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 10,
      }}
    >
      <CircularProgress color={"primary"} />
    </Box>
  );
};
