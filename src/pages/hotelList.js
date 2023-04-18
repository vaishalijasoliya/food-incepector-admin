import React from "react";
import { MainLayout } from "../Layout/Pages_layout/mainLayout";
import Hotels_list from "../component/Hotel_Page/hotels";
const data = {
  title: "Locations",
};
const Hotel_list = (props) => {
  return <MainLayout data={data} props={props} Content={Hotels_list} />;
};
export default Hotel_list;
