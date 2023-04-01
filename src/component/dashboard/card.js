import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import style from '../../styles/dashboard.module.css'
import { useState } from 'react';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { toast } from 'react-toastify';
import { ContactSupportOutlined } from '@mui/icons-material';
// import { log } from 'console';
import MenuItem from '@mui/material/MenuItem';


export default function MediaControlCard(props) {
    const [rows, setRows] = React.useState([])
    const [selectOptions, setselectOptions] = React.useState([])
    const [region, setRegion] = useState([]);
    const [regionlist, setRegionlist] = useState([]);

console.log(region,'region');
    console.log(rows, 'rows');
    console.log(props.props.props.profile.token, 'props123');
    const reviewViewuser = async () => {

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.props.props.profile.token
        }
        var body = {
            // 'status': 'pending'
        }
        props.props.props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.ADMIN_PAYMENT, JSON.stringify(body), headers);
        props.props.props.loaderRef(false)
        console.log(data.data[0].number + ' '+data.data[0].type, 'data123');
        if (!!data) {
            if (data.status == true) {
                console.log(data.data[0]+' '+data[0], 'element');
                // console.log(data.status, 'ssstatuss')
                const arr = [];
                const listfastdata =[]
                const selectArray = [];
                for (let index = 0; index < data.data.length; index++) {
                    const element = data.data[index];
                   
                    const obj = {

                        number: element.number + element.type,
                        payment: element.payment,
                        // type: element.type,

                    }

                    const objSelect = {

                        name: element.number + " "+ element.type,
                        plus: element.payment,
                        // type: element.type,

                    }
                    arr.push(obj)
                    selectArray.push(objSelect)
                    listfastdata.push(data.data[0].number+' '+data.data[0].type)
                }
                setRows(arr)
                setRegion(listfastdata)
                console.log(selectArray, 'selectArray')
                setselectOptions(selectArray)


            }
        }
        setRegion(data.data[0].number + ' '+data.data[0].type)
        setRegionlist(data.data[0].payment)
    }
    React.useEffect(() => {
        if (!!props.props.props.profile && !!props.props.props.profile.token) {

            reviewViewuser()
        }
    }, [])
    const theme = useTheme();
    const [listmonay, setaListmonay] = useState('')
    // const loglist={['list','log','menu']}

    const difolat =region;

    const [value, setValue] = useState('');
    const [age, setAge] = React.useState('');
console.log(value,'value');
    const handleChange = () => {
        // setAge(event.target.value);
        setValue('hgys')
        // setAge(event.target.value);
    };

    // console.log(selectOptions[0].name,'jhduhd');

    var guests = [
        {
          name: "Kait",
          plus: true,
          plusName: "Kitty"
        },
        {
          name: "Séanin",
          plus: true,
          plusName: "Guest"
        }
      ];
    // const handleChange = (event: SelectChangeEvent) => {
    //     setAge(event.target.value as string);
    // };
    // const handleChange = (e) => {
    //     console.log(e.target.value, 'elist');
    //     setValue(value);
    // };
    const getPaymentValue = (value) => {
        var test =  selectOptions.find(o => o.name == value);
        if(!!test){
            return test.plus;
        }
        return regionlist;
    }
    return (
        <Card className={style.cardcompo} >
            <Box className={style.cardmain}>
                <CardContent sx={{ padding: '0px', margin: '0px' }}>
                {/* {selectOptions.map((item1, item2) => ( */}
                    <p className={style.datetxt} id='demo'>{value == '' ? region:value}</p>
                {/* ))} */}
                    <p className={style.moneytxt}>Money Make Last</p>
                    <p className={style.amttxt} >{getPaymentValue(value)}  </p>

                    <Box sx={{ minWidth: 120 }}>
                        <form>
                            
                        
      
                            <select 
                            className={style.selector} 
                            value={value} 
                            onChange={(item) => { 
                                console.log(item.target.value, 'selectitem', item), setValue(item);     setValue('012'); setValue(item.target.value); 
                            }}>
                                {selectOptions.map((item1, item2) => (
                                    <option className={style.opt} value={item1.name} >{item1.name}</option>
                                ))}

                                {/* <option className={style.opt} value="$1050" selected> 7 day</option>
                                <option className={style.opt} value="$1050">30 day</option>
                                <option className={style.opt} value="$1140"> 3 month</option>
                                <option className={style.opt} value="$1200"> 6 month</option>
                                <option className={style.opt} value="$1500">1 year </option> */}
                            </select>
                            {/* <Picker
                                selectedValue={selectedLanguage}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedLanguage(itemValue);
                                    console.log(itemValue, 'itemValueitemValue');
                                }}>
                                <Picker.Item
                                    label={'Please Select The Pattent'}
                                    value={'none'}
                                    key={'none'}
                                    enabled={false}
                                />
                                {!!userSearch
                                    ? userSearch.map(item => {
                                        // console.log(item, 'itemData');
                                        return (
                                            <Picker.Item
                                                label={item.script}
                                                value={item.script}
                                                key={item.script}
                                            />
                                        );
                                    })
                                    : ''}
                            </Picker> */}

                        </form>
                    </Box>
                </CardContent>

                <CardContent style={{ padding: '0px' }}>
                    <img src='./image/offercard.svg' className={style.walletimg} />
                </CardContent>
            </Box>
        </Card>
    );
}
