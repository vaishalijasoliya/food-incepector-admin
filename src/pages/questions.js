import React from "react";
import { Typography } from "@mui/material";
import { MainLayout } from "../Layout/Pages_layout/mainLayout";
import Questions_page from "../component/Questions/Questions";
const Questions = () => {
  const data = {
    title: "Question",
  };

  return <MainLayout data={data} Content={Questions_page} />;
};

export default Questions;
