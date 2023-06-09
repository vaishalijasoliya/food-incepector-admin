import React from "react";
import { MainLayout } from "../Layout/Pages_layout/mainLayout";
import Hotels_list from "../component/Hotel_Page/hotels";

const Hotel_list = (props) => {
  const [listlegveg, setLegvg] = React.useState('')

  React.useEffect(() => {
    const listtebal = localStorage.getItem("language")
    setLegvg(listtebal);
  }, []);
  const data = {
    title: listlegveg=="pl_PL"?"Lokalizacje":"Locations",
  };
  return (
    <MainLayout
      data={data}
      props={props}
      Content={() => {
        return <Hotels_list props={props} />;
      }}
    />
  );
};
export default Hotel_list;
