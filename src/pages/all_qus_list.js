import Nevbar from "../component/user/newbarlist";
import Header from "../component/user/header";
import Grid from "@mui/material/Grid";
import { Types } from "../constants/actionTypes";
import { connect } from "react-redux";
import Audit_qus_page from "../component/Audit/all_qus_list";
import React from "react";
const index = (props) => {
  const [listlegveg, setLegvg] = React.useState('')

  React.useEffect(() => {
    const listtebal = localStorage.getItem("language")
    setLegvg(listtebal);
  }, []);
  const data = {
    title:listlegveg=="pl_PL"? "Szczegóły audytu":"Audit Details",
  };
  return (
    <>
      <Grid container spacing={0} className="mainDiv">
        <Grid xs={12} sm={4} md={3} className="Gridcontainergrid">
          <Nevbar />
        </Grid>
        <Grid xs={12} sm={8} md={9} className="maenedit">
          <Header data={data} props={props} />
          {/* <Paymenttable props={props} /> */}
          <Audit_qus_page props={props} />
        </Grid>
      </Grid>
    </>
  );
};
// export default index;
const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

const mapDispatchToProps = (dispatch) => ({
  save_user_data: (data) => dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(index);
