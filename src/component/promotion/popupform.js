import { Grid, Box, Button, Typography } from '@mui/material'
import { useState } from 'react';
import React from 'react'
import TextField from '@mui/material/TextField';
import styles from '../../styles/promotion/popupform.module.css';
import { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import InputLabel from '@mui/material/InputLabel';
import "react-datepicker/dist/react-datepicker.css";
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@material-ui/core/IconButton";
import { styled } from '@mui/material/styles';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import SwitchUnstyled, { switchUnstyledClasses } from '@mui/base/SwitchUnstyled';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';
import moment from 'moment'
// import Switch from '@mui/material/Switch';
// import Switch from '@mui/joy/Switch';
import Switch, { switchClasses } from '@mui/joy/Switch';
import $ from 'jquery';
// import { fileTypeFromFile } from 'file-type';


const blue = {
  500: '#36DAB2',
};

const grey = {
  400: '#BFC7CF',
  500: '#AAB4BE',
  600: '#6F7E8C',
};

const Root = styled('span')(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 10px;
  cursor: pointer;

  &.${switchUnstyledClasses.disabled} {
    opacity: 0.4;
    cursor: not-allowed;
  }

  & .${switchUnstyledClasses.track} {
    background: ${theme.palette.mode === 'dark' ? grey[600] : grey[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 22px;
      top: 3px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background: ${blue[500]};
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `,
)




const DataGridDemo = (props) => {

  // console.log(props, 'header')


  const [checked, setChecked] = React.useState(false);
  const [switchCheck, setSwitchcheck] = React.useState([])
  const [idItem, setIditem] = React.useState("")
  const [userData, setUserdata] = React.useState([])
  const [imgUpload, setImgupload] = React.useState([])
  const [imagePreview, setImagePreview] = React.useState([])
  // const [fileType, setFileType] = React.useState([])
  const [imageAsFile, setImageAsFile] = React.useState('');
  const [imageAsUrl, setImageAsUrl] = React.useState('');
  const ref = useRef(null);

  // const handleClicklias = () => {
  //   // 👇️ get checkbox value with ref
  //   console.log(ref.current.checked);
  // };
  console.log(idItem, "idItem");
  React.useEffect(() => {
    if (!!props.props.props.profile && !!props.props.props.profile.token) {
      // uploadItem()
      setImagePreview([]);

    }
  }, [])

  const saveFAQ = async () => {
    console.log(props, 'proppsssave')
    var headers = {
      "Content-Type": "application/json",
      "x-access-token": props.props.props.profile.token
    }
    // idItem
    var body = {
      "id_item": idItem,
      "name": formik.values.password,
      "start_date": moment(formik.values.datepikar).format('MM/DD/YYYY'),
      "end_date": moment(formik.values.enddatepikar).format('MM/DD/YYYY'),
      "public": checked,
      "duration": formik.values.inputfilad,
      "type": imgUpload,

    }
    console.log(body.public, "public");
    console.log(body, 'boddy')
    props.props.props.loaderRef(true)
    var data = await ApiServices.PostApiCall(ApiEndpoint.USER_ADVERTISEMENT_CREATE, JSON.stringify(body), headers);
    props.props.props.loaderRef(false)
    console.log(data, 'mydatatatata')

    if (!!data) {
      if (data.status == true) {
        data.token = data.token
        props.closePop()
        props.advCreate()
        console.log(data.token, 'dataDATAtata')
        toast.success(data.message)
        // setIditem(data.data.id)
      } else {
        toast.error(data.message)
      }
    } else {
      toast.error('Something went wrong.')
    }
    console.log(data, 'myda11ta')

  }

  const uploadItem = async (file, type) => {

    var myHeaders = new Headers();
    myHeaders.append("x-access-token", props.props.props.profile.token);
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("type", type);
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    var reader = new FileReader();
    props.props.props.loaderRef(true);
    const data = await fetch(ApiEndpoint.USER_UPLOAD_IMAGE, requestOptions)
      .then((response) => response.json())
      .then(result => {
        return result
      })
      .catch(error => console.log('error', error));
    console.log(data, 'datata')
    props.props.props.loaderRef(false)
    if (!!data) {
      if (data.status == true) {
        console.log(data.id, "id")
        console.log(data, 'damydata');
        setIditem(data.data.id)
      }
    }
    console.log(formdata, "iditems")
  }
  console.log(userData, "usereeer")

  const label = { componentsProps: { input: { 'aria-label': 'Demo switch' } } };
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  });

  const onChange = (checked) => {
    console.log(`${checked}`);
  };
  const switchchange = (e) => {
    // isChecked: !e.target.checked
    setChecked(e.target.checked)
    setSwitchcheck(e.target.checked)
    console.log(switchCheck, 'myvaxrlueee')
  }
  // console.log(switchchange,"public")
  const handleChange = (prop) => (event) => {
    console.log(props, 'myprops')
    setValues({ ...values, [prop]: event.target.value });
  };
  const formik = useFormik({
    initialValues: {
      // username: '',
      password: '',
      datepikar: '',
      enddatepikar: '',
      inputfilad: '',
    },
    validationSchema: Yup.object({
      // username: Yup
      //   .string()
      //   .required(
      //     'Upload images or videos is required'),
      password: Yup
        .string()
        .max(255)
        .required(
          'Ad name is required'),
      datepikar: Yup
        .string()
        .max(255)
        .required(
          'Start date is required'),
      enddatepikar: Yup
        .string()
        .max(255)
        .required(
          'End date is required'),
      inputfilad: Yup
        .string()
        .required(
          'Duration is required'),
    }),
    onSubmit: () => {
      saveFAQ()
    },
  });
  const inputRef = useRef(null);

  function handleClick() {
    console.log(inputRef.current.value);
  }

  // const extensionCheck = () => {
  //   const fileName = document.querySelector('#sendfile').value;
  //   const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
  //   // console.log(extension, 'myextenssion')

  // }
  // console.log(fileType, "filetype")

  // const handleChangePdf = (e) => {
  //   console.log(e.target.files[0]);
  //   //setFile(URL.createObjectURL(e.target.files[0]));
  //   uploadItem(e.target.files[0], fileType)
  // }

  const handleChangeImage = (e) => {
    console.log(e.target.files[0], "myfile");
    // console.log(e.target.files[0].type,"myfiletype");
    const filetypes = e.target.files[0].type;
    const extension = filetypes.substring(0, 5)
    setImgupload(extension)
    console.log(extension, "filetypes");
    console.log(e.target.files[0], "myfiletype");
    uploadItem(e.target.files[0], extension)
    // extensionCheck()
  }
  console.log(imgUpload, 'imgUpload');
  console.log(uploadItem, "uploadItem");
  return (
    <Grid container className={styles.cantenarform}>

      <Grid xs={12} md={12} className={styles.gridinputbox} >
        <Typography className={styles.hadingteg}>New Advertisement</Typography>
      </Grid>
      <Grid xs={12} md={6} className={styles.gridinputbox} justifyContent={'end'}>
        <InputLabel className={styles.hedingpeg}>Ad name</InputLabel>
        <div className={styles.mindivinput}>
          <TextField
            id='nametext'
            error={Boolean(formik.touched.password && formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            name="password"
            placeholder='Enter ad name '
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.password}
            lable='password'
            className={styles.userinput}
            type="text"
            style={{
              margin: '0px'
            }}
          />
        </div>
      </Grid>
      <Grid xs={12} md={6} >
        <div className={styles.fileinputs}>
          <InputLabel className={styles.hedingpeg}>Upload images or videos</InputLabel>
          <TextField
            error={Boolean(formik.touched.username && formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
            name="username"
            placeholder='Image'
            onBlur={formik.handleBlur}
            onChange={handleChangeImage}
            value={formik.values.username}
            className={styles.userinput1}
            type="file"
            // accept="image/png, image/gif, image/jpeg"
            id='sendfile'
            InputProps={{
              endAdornment: (
                <InputAdornment>
                  <IconButton>
                    <LocalSeeIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </div>
      </Grid>

      <div className={styles.canatenardatepikar}></div>
      <Grid xs={12} md={6} className={styles.gridinputbox}  >
        <InputLabel className={styles.hedingpeg}>Start date</InputLabel>
        <TextField
          error={Boolean(formik.touched.datepikar && formik.errors.datepikar)}
          helperText={formik.touched.datepikar && formik.errors.datepikar}
          name="datepikar"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.datepikar}
          style={{
            margin: '0px'
          }}
          className={styles.DatePicker1}
          type="date"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid xs={12} md={6} className={styles.gridinputbox}  >
        <InputLabel className={styles.hedingpeg}>End date</InputLabel>
        <TextField
          error={Boolean(formik.touched.enddatepikar && formik.errors.enddatepikar)}
          helperText={formik.touched.enddatepikar && formik.errors.enddatepikar}
          name="enddatepikar"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.enddatepikar}
          style={{
            margin: '0px'
          }}
          className={styles.DatePicker2}
          type="date"
          sx={{ width: 220 }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>

      <Grid xs={12} md={6} display={'flex'} >
        <div className={styles.comswisa}>
          <div>
            <Typography className={styles.paregaraft}>
              Publication
            </Typography>
          </div>
          <div className={styles.swiss}>
            <SwitchUnstyled
              //  defaultChecked={true}
              onChange={switchchange}
              component={Root} {...label}
              checked={checked}
            />
            {/* defaultChecked */}
            {/* SwitchUnstyled */}
            {/* <Switch 
             defaultChecked onChange={onChange}
              //  component={Root} {...label}
            //  checked={checked} 
             id='switch'
              // onChange={switchchange} 
              // onChange={(isActive) => console.log(`I'm ${isActive ? 'truthy' : 'falsy'}.`)}
              /> */}
            {/* <Switch
              // defaultChecked onChange={onChange}
      color={checked ? 'success' : 'danger'}
      checked={checked}
      onChange={switchchange} 
      defaultChecked onChange={(event) => setChecked(event.target.checked)}
      sx={{
        '--Switch-thumb-size': '16px',
        '--Switch-track-width': '40px',
        '--Switch-track-height': '24px',
        '--Switch-track-background': '#EE5E52',
        '&:hover': {
          '--Switch-track-background': '#EE5E52',
        },
        [`&.${switchClasses.checked}`]: {
          '--Switch-track-background': '#5CB176',
          '&:hover': {
            '--Switch-track-background': '#5CB176',
          },
        },
      }}
    /> */}
          </div>
        </div>
      </Grid>
      <Grid xs={12} md={6} >
        <InputLabel className={styles.hedingpeg}>Duration</InputLabel>
        <TextField
          className={styles.selekatnabar}
          error={Boolean(formik.touched.inputfilad && formik.errors.inputfilad)}
          helperText={formik.touched.inputfilad && formik.errors.inputfilad}
          name="inputfilad"
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          value={formik.values.inputfilad}
          style={{
            margin: '0px'
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <IconButton>
                  s
                </IconButton>
              </InputAdornment>
            )
          }}
        />

      </Grid>
      <Grid xs={12} md={12} display={'flex'} justifyContent={'center'} >
        <div className={styles.submitbtn}>
          <Button className={styles.singbtn} onClick={saveFAQ} >Submit</Button>
        </div>
      </Grid>
    </Grid >
  )
}

export default DataGridDemo;