import style from '../../styles/dashboard.module.css'
import dynamic from 'next/dynamic';
import React, { Component } from "react";
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { red } from '@mui/material/colors';


const Chartdyanamic = dynamic(() => import("react-apexcharts"), { ssr: false });

const Chart = (props) => {

    const [onlineUserList, setOnlineUserList] = React.useState([]);
    const [onlineDate, setonlineDate] = React.useState([]);

    console.log(props, 'chartprops')
    var options = {

        chart: {
            id: "basic-bar",
            height: 250,
            maxWidth: '500px',
            stacked: true,
            toolbar: {
                show: false
            },
            zoom: {
                enabled: true
            },
            lagend: {
                show: false
            },
            dataLables: {
                enabled: true,
                style: {
                    color: 'red'
                }
            }
        },


        plotOptions: {
            bar: {
                columnWidth: '11px',
                borderRadius: 5,

            },

        },
        fill: {
            type: "gradient",
            gradient: {
                type: "vertical",
                colorStops: [
                    {
                        offset: 0,
                        color: "#0E144A",
                        opacity: 1
                    },
                ]
            }
        },
        xaxis: {
            categories: onlineDate,
        },

    }
    var series = [
        {
            name: "Users",
            data: onlineUserList
        },
    ]
    // const mydata

    const chartloginuser = async (id, status) => {

        // console.log(props, 'myyypropsssss')

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.props.profile.token
        }

        var body = {
            "id_review": id,
            "review_status": status
        }


        props.props.props.loaderRef(true)
        var mydata = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_ONLINEUSER_LIST, JSON.stringify(body), headers);
        props.props.props.loaderRef(false)

        console.log(mydata, 'myyyydata')
        if (!!mydata) {
            if (mydata.status == true) {
                const arr = []
                const date = []
                for (let index = 0; index < mydata.data.length; index++) {
                    const element = mydata.data[index];
                    console.log(element, 'element11')
                    arr.push(element.datecount)
                    date.push(element.date)
                }
                setOnlineUserList(arr)
                setonlineDate(date)
            }
        }



    }
    React.useEffect(() => {
        if (!!props.props.props.profile && !!props.props.props.profile.token) {
            chartloginuser()
        }
    }, [])

    return (
        <div className={style.chartdiv}>
            <div className={style.mainchart}>
                <h3>Active Users</h3>
                <Chartdyanamic
                    options={options}
                    series={series}
                    type="bar"
                    className={style.chart}
                />
            </div>
        </div>
    );
}


// export default Chart
const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Chart);