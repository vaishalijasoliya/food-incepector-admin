import React from "react";
import { Typography } from "@mui/material";
import { MainLayout } from "../Layout/Pages_layout/mainLayout";
import Questions_page from "../component/Questions/Questions";

const Questions = (props) => {
  const [listlegveg, setLegvg] = React.useState('')

  React.useEffect(() => {
    const listtebal = localStorage.getItem("language")
    setLegvg(listtebal);
  }, []);
  const data = {
    title: listlegveg=="pl_PL"?"سؤال":"Question",
  };

  return (
    <MainLayout
      data={data}
      Content={() => {
        return <Questions_page props={props} />;
      }}
    />
  );
};

export default Questions;
