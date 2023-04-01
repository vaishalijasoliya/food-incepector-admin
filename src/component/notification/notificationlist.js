import React, { useContext } from "react";
import style from "../../styles/notification.module.css";
import { Avatar, Grid, Typography } from "@mui/material";
import Nevbar from "../user/nawbar";
import Header from "../user/header";
import ApiServices from "../../config/ApiServices";
import ApiEndpoint from "../../config/ApiEndpoint";
import { toast } from "react-toastify";
import moment from "moment";

const List = (props) => {
  const data = {
    title: "Notification",
  };

  console.log(props, "useloist");

  // const [supportListData, setSupportListData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [resData, setResData] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const [userSearch, setUserSearch] = React.useState([]);
  const [supportListData, setSupportListData] = React.useState([]);
  //   const [countUser, setCountuser] = React.useState(20);
  const [notifyArr, setNotifyarr] = React.useState([]);

  console.log(notifyArr.length, "notifyarr");

  const getSupportList = async () => {
    console.log(props, "myprops");
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };

    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.USER_NOTIFICATION_LIST,
      null,
      headers
    );
    props.props.loaderRef(false);
    console.log(data.data, "1w");
    if (!!data) {
      if (data.status == true) {
        const arr = [];
        const notifyCount = [];
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          console.log(element, "myyy");
          const obj = {
            id: element.id,
            description: element.description,
            time: element.createdAt,
            status: element.status,
            profile_photo: element.userDetail.profile_photo,
          };
          const userId = element.id;
          arr.push(obj);
          notifyCount.push(userId);
        }
        setSupportListData(arr);
        setResData(arr);
        setIsLoading(false);
        setUserList(arr);
        setUserSearch(arr);
        console.log(userList, "arr");
        setNotifyarr(notifyCount);
      } else {
        toast.error(data.message);
      }
    } else {
      toast.error("Something went wrong.");
    }
  };

  const getNotificationread = async (id) => {
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.profile.token,
    };
    var body = {
      notificationId: [id]
    }
    props.props.loaderRef(true);
    var data = await ApiServices.PostApiCall(
      ApiEndpoint.USER_NOTIFICATION_READ,
      JSON.stringify(body),
      headers
    );
    props.props.loaderRef(false);
    console.log(data, "pendiongcount");
    if (!!data) {
      if (data.status == true) {
        getSupportList();
      }
    } else {
      toast.error("Something went wrong.");
    }
    // console.log(userCountlist, "mydaaatssa");
  };

  React.useEffect(() => {
    getSupportList();
    setUserList(resData);
    setUserSearch(resData);
    // getUserstatus()
  }, []);

  const date = moment("2022-08-15T19:05:00").fromNow();
  console.log(date, "mydate");

  console.log(resData, "mydata");

  const mySerchbtn = (e) => {
    const value = e.target.value;
    console.log(userList, "hello");

    if (typeof value !== "object") {
      if (!value || value == "") {
        setUserList(userSearch);
      } else {
        var filteredData = userSearch.filter((item) => {
          console.log(item.description, "filtrer");
          let searchValue = item.description.toLowerCase();
          return searchValue.includes(value.toString().toLowerCase());
        });
        setUserList(filteredData);
      }
    } else "";
  };

  //   const getCountlist = async () => {
  //     console.log(props, "myusercount");
  //     var headers = {
  //       "Content-Type": "application/json",
  //       "x-access-token": props.props.profile.token,
  //     };
  //     props.props.loaderRef(true);
  //     var data = await ApiServices.GetApiCall(
  //       ApiEndpoint.USER_NOTIFICATION_COUNT,
  //       headers
  //     );
  //     props.props.loaderRef(false);
  //     console.log(data, "mydaaata");
  //     if (!!data) {
  //       if (data.status == true) {
  //         setUserCount(data.data);
  //       } else {
  //         toast.error(data.message);
  //       }
  //     } else {
  //       toast.error("Something went wrong.");
  //     }
  //     console.log(userCount, "mydaaatssa");
  //   };

  console.log(userList, "myvalue");
  console.log(resData, "elemenet");

  return (
    <>
      <div className={style.body}>
        <Grid container spacing={0}>
          <Grid item md={12} sm={12} xs={12}>
            <div className={style.containerdiv}>
              <div className={style.srchdiv}>
                <input
                  type="text"
                  id="myserchbtn"
                  name="search"
                  placeholder="Search"
                  className={style.searchbtn}
                  autoComplete="off"
                  onChange={mySerchbtn}
                />
              </div>
              <div className={style.maindiv}>
                <div>
                  <>
                    {!isLoading ? (
                      supportListData && supportListData.length > 0 ? (
                        userList.map((row) => {
                          return (
                            <div className={style.mainlist} id={style.left} onClick={() => getNotificationread(row.id)}>
                              <div className={style.lefttxtdiv}>
                                <div className="list-item-left">
                                  <Avatar
                                    className={style.avtar}
                                    src={
                                      !!row.profile_photo
                                        ? row.profile_photo
                                        : ""
                                    }
                                  ></Avatar>
                                </div>
                                <div className={style.namediv}>
                                  <div className={style.namecmt}>
                                    <Typography
                                      variant="p"
                                      className={style.name}
                                    >
                                      <Typography
                                        variant="span"
                                        className={style.message}
                                      >
                                        {row.description}
                                      </Typography>
                                    </Typography>
                                  </div>
                                  <div className={style.timediv}>
                                    <Typography
                                      variant="p"
                                      className={style.timetxt}
                                      id={style.datetime}
                                    >
                                      {moment(row.time).fromNow()}
                                    </Typography>
                                  </div>
                                </div>
                              </div>
                              <div className={style.status}>
                                {row.status == 'pending' ? <p className={style.statusbtn}></p> : ""}
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="loading">
                          <h4>Empty...</h4>
                        </div>
                      )
                    ) : (
                      <div className="loading">
                        <h3>Loading...</h3>
                      </div>
                    )}
                  </>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default List;
