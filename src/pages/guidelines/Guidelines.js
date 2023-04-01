import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import NativeSelect from '@mui/material/NativeSelect';
import Divider from '@mui/material/Divider';
import React, { useState } from 'react';
import { Card } from "react-bootstrap";
import styles from './Guidelines.module.scss';
import dynamic from "next/dynamic";
import { connect } from 'react-redux';
import { Types } from '../../constants/actionTypes';
import ApiServices from '../../config/ApiServices';
import ApiEndpoint from '../../config/ApiEndpoint';
import { toast } from 'react-toastify';
import { EditorState, ContentState } from 'draft-js';
import { convertToRaw } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import draftToHtml from 'draftjs-to-html';
import { stateFromHTML } from 'draft-js-import-html';
import moment from 'moment';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useRouter } from 'next/router';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
// import htmlToDraft from 'html-to-draftjs';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Checkbox from '@mui/material/Checkbox';
import $ from 'jquery';
import InputLabel from '@mui/material/InputLabel';


const DynamicComponent = dynamic(() =>
    import('react-draft-wysiwyg').then((mod) => mod.Editor), { ssr: false }
)

const TermsAndCondition = () => {

    return (
        <Grid container className="formgroup" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item sm={12} md={8}>
                <div className={styles.guideline_container}>
                    <div className={styles.guideline_content}>
                        Attention All - Terms and Condition<br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.<br />
                        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.<br /><br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.<br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt.
                        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.<br /><br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.<br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt.
                    </div>
                </div>
                <div>
                    <Button variant="outlined" className='me-2 float-end' sx={{ borderColor: '#E3E3E3', color: '#ffffff', textTransform: 'none', backgroundColor: '#50369C', marginTop: '60px', width: '120px' }}>
                        Save
                    </Button>
                </div>
            </Grid>
            <Grid item sm={12} md={4} >
                <div className="guideline-content-2">
                    <div>
                        <p className="date">December 23, 2021</p>
                        <p className="update-logs">Update Logs</p>
                        <p className="date-value">09/12/2021</p>
                        <p className="sub-text">Terms and Conditions - updated!</p>
                        <hr />
                        <p className="date-value">06/19/2021</p>
                        <p className="sub-text">Terms And Condition</p>
                        <hr />
                    </div>
                </div>

            </Grid>
        </Grid>
    )
}

const PrivacyPolicy = () => {
    return (
        <Grid container className="formgroup" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item sm={12} md={8}>
                <div className="guideline-container">
                    <div className="guideline-content">
                        Attention All - Privacy Policy<br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.<br />
                        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.<br /><br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.<br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt.
                        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.<br /><br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.<br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt.
                    </div>
                </div>
                <div>
                    <Button variant="outlined" className='me-2 float-end' sx={{ borderColor: '#E3E3E3', color: '#ffffff', textTransform: 'none', backgroundColor: '#50369C', marginTop: '60px', width: '120px' }}>
                        Save
                    </Button>
                </div>
            </Grid>
            <Grid item sm={12} md={4} >
                <div className="guideline-content-2">
                    <div>
                        <p className="date">December 23, 2021</p>
                        <p className="update-logs">Update Logs</p>
                        <p className="date-value">09/12/2021</p>
                        <p className="sub-text">Terms and Conditions - updated!</p>
                        <hr />
                        <p className="date-value">06/19/2021</p>
                        <p className="sub-text">Privacy Policy</p>
                        <hr />
                    </div>
                </div>

            </Grid>
        </Grid>
    )
}

const FAQ = () => {
    return (
        <Grid container className="formgroup" spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item sm={12} md={8}>
                <div className="guideline-container">
                    <div className="guideline-content">
                        Attention All - FAQ<br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.<br />
                        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.<br /><br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.<br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt.
                        Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cillum dolor.<br /><br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.<br />
                        Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt.
                    </div>
                </div>
                <div>
                    <Button variant="outlined" className='me-2 float-end' sx={{ borderColor: '#E3E3E3', color: '#ffffff', textTransform: 'none', backgroundColor: '#50369C', marginTop: '60px', width: '120px' }}>
                        Save
                    </Button>
                </div>
            </Grid>
            <Grid item sm={12} md={4} >
                <div className="guideline-content-2">
                    <div>
                        <p className="date">December 23, 2021</p>
                        <p className="update-logs">Update Logs</p>
                        <p className="date-value">09/12/2021</p>
                        <p className="sub-text">Terms and Conditions - updated!</p>
                        <hr />
                        <p className="date-value">06/19/2021</p>
                        <p className="sub-text">FAQ</p>
                        <hr />
                    </div>
                </div>

            </Grid>
        </Grid>
    )
}


const Guidelines = (props) => {
    const [guideline, setGuideline] = React.useState('terms');
    const [guidelinelist, setGuidelineList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true)
    const [terms, setTerms] = React.useState('');
    const [privacy, setPrivacy] = React.useState('');
    const [faq, setFAQ] = React.useState('');
    const [selectGuildline, setSelectGuidline] = React.useState('terms_conditions');
    const [logList, setLoglist] = React.useState([]);
    const [showFAQList, setshowFAQList] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [faqList, setFAQList] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [FAQEdit, setFAQEdit] = React.useState({
        id: 0,
        name: "",
        description: "",
    });

    const router = useRouter();


    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    const [editorState, seteditorState] = useState(
        () => EditorState.createEmpty()
    );
    const [desc, setDesc] = useState();
    const [guildlineData, setGuildline] = useState({
        terms_conditions: "",
        privacy: "",
        faq: ""
    });

    const onSelected = (event) => {
        setGuideline(event.target.value)
        const guildValue = event.target.value;
        const name = event;
        setSelectGuidline(guildValue);
        let dataValue;
        if (guildValue == 'terms_conditions') {
            dataValue = terms;
        } else if (guildValue == 'privacy') {
            dataValue = privacy;
        }
        // else{
        //     dataValue = faq;
        // }
        if (guildValue == 'terms_conditions' || guildValue == 'privacy') {
            seteditorState(() => EditorState.createWithContent(stateFromHTML(dataValue)))
            console.log(event.target.value, name, 'setGuideline', guildlineData)
            setshowFAQList(false);
        }
        if (guildValue == 'faq') {
            setshowFAQList(true);

        }
    }

    const handleOpenDialog = (id) => {

        setOpen(true);
        var filteredData = faqList.find(o => o.id == id);
        console.log(filteredData, 'filteredData');
        formik.setFieldValue('faqtitle', (filteredData) ? filteredData.name : "");
        formik.setFieldValue('faqdesc', (filteredData) ? filteredData.description : "");
        setFAQEdit(filteredData);

    }
    const handleCloseDialog = () => {
        setOpen(false);
        setError(false)
        formik.resetForm()
    };

    const getGuideline = async () => {

        console.log('getAddress cALLED', props);

        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var ListUser = [];
        var data = await ApiServices.GetApiCall(ApiEndpoint.GUILDLINE_LIST + "/terms_conditions", headers);
        if (!!data) {
            if (data.status == true) {

                toast.success(data.message)
                console.log(data);

                const respnseList = await data.data.map(async value => {
                    const individual = {
                        id: value.id,
                        name: value.name,
                        type: value.type,
                        description: value.description
                    }
                    ListUser.push(individual)
                    setTerms(value.description);
                    console.log('setTerms', terms);
                    seteditorState(() => EditorState.createWithContent(stateFromHTML(individual.description)))
                })

                //data.map(item)
                // setEndUserData(ListUser)
                // setIsLoading(false)

                // setSubAdminData(ListUser);
                // setFilteredSubAdminData(ListUser);
                // setfulllistSub(ListUser)
                // setIsLoading(false);
            } else {
                toast.error(data.message)
            }
        } else {

        }


        var data = await ApiServices.GetApiCall(ApiEndpoint.GUILDLINE_LIST + "/privacy", headers);
        if (!!data) {
            if (data.status == true) {
                const respnseList = await data.data.map(async value => {
                    const individual = {
                        id: value.id,
                        name: value.name,
                        description: value.description
                    }
                    ListUser.push(individual)
                    setPrivacy(value.description);
                })
            } else {
                toast.error(data.message)
            }
        } else {

        }

        var data = await ApiServices.GetApiCall(ApiEndpoint.GUILDLINE_LIST + "/faq", headers);
        if (!!data) {
            if (data.status == true) {
                setFAQList(data.data);
            } else {
                toast.error(data.message)
            }
        } else {

        }
        setGuidelineList(ListUser)
        setIsLoading(false)

    }

    const getGuideLog = async () => {
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        const body = {}
        var data = await ApiServices.PostApiCall(ApiEndpoint.GUILDLINE_LIST_LOG, body, headers);
        if (!!data) {
            if (data.status == true) {
                //toast.success(data.message)
                console.log(data);
                setLoglist(data.data);

            } else {
                toast.error(data.message)
            }
        } else {

        }
    }

    React.useEffect(() => {
        getGuideline()
        getGuideLog()
    }, [])



    const onEditGuildline = async () => {
        //console.log(editorState, 'editorState', desc);

        let dataValue;
        const guildValue = selectGuildline;
        if (guildValue == 'terms_conditions') {
            dataValue = terms;
        } else if (guildValue == 'privacy') {
            dataValue = privacy;
        } else {
            dataValue = faq;
        }
        console.log('guildValue', dataValue, selectGuildline);
        // return;
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var body1 = {
            "description": dataValue,
            "type": guildValue,
            //"name": "Test"
        }

        console.log(body1, 'body1');
        //props.loaderRef(true)
        var data = await ApiServices.PostApiCall(ApiEndpoint.GUILDLINE_FAQ_SAVE, JSON.stringify(body1), headers);
        //console.log(data, 'data');
        //props.loaderRef(false)
        if (!!data) {
            if (data.status) {
                //router.push('/draft');
                toast.success("Succesfully edited Guildline")
            } else {
                toast.error(data.message)
            }
        } else {
        }
    }


    const onEditorStateChange = (editorState) => {
        seteditorState(editorState)

        let dataValue;
        const guildValue = selectGuildline;
        if (guildValue == 'terms_conditions') {
            setTerms(stateToHTML(editorState.getCurrentContent()));
        } else if (guildValue == 'privacy') {
            setPrivacy(stateToHTML(editorState.getCurrentContent()));
        } else if (guildValue == 'faq') {
            setFAQ(stateToHTML(editorState.getCurrentContent()));
        }
        // formik.setFieldValue("description", stateToHTML(editorState.getCurrentContent()))
        setDesc(stateToHTML(editorState.getCurrentContent()))
        // console.log(stateToHTML(editorState.getCurrentContent()), 'stateToHTML(editorState.getCurrentContent())');
    };

    const setFAQTitleChange = (event) => {
        console.log('setFAQTitleChange', event.target.value);

    }
    const todaytime = new Date().getTime();
    const today = moment.utc().format('MMMM  DD, YYYY');

    const updateFAQList = () => {
        let latestFAQ;
        setError(false)
        if (!!FAQEdit && FAQEdit.id != 0) {
            const findobject = faqList.find(o => o.id == FAQEdit.id);
            const finndindex = faqList.indexOf(findobject);
            const faqOld = faqList;

            const newFAQ = {
                id: FAQEdit.id,
                name: formik.values.faqtitle,
                description: formik.values.faqdesc
            }

            if (finndindex != -1) {
                faqOld[finndindex] = newFAQ;
                latestFAQ = faqOld;
            } else {
                latestFAQ = [...faqList, newFAQ];
            }

            console.log(faqOld, 'faqOld', finndindex);
        } else {
            console.log('iam erre');
            const findFaq = faqList.find(o => o.name == formik.values.faqtitle)
            console.log(findFaq, faqList, 'findFaq');
            if (!!findFaq) {
                setError(true)
                latestFAQ = [...faqList, faqList];
                return;
            } else {
                const newFAQ = {
                    id: 0,
                    name: formik.values.faqtitle,
                    description: formik.values.faqdesc
                }
                latestFAQ = [...faqList, newFAQ];
            }
        }
        formik.resetForm()
        setFAQList(latestFAQ);
        setOpen(false)
        FormControl.reset()
    }
    // const [fields, handleFieldChange] = UseFormFields({
    //     faqtitle: "",
    //     faqdesc: "",
    // });

    const formik = useFormik({
        initialValues: {
            faqtitle: '',
            faqdesc: '',
        },
        validationSchema: Yup.object({
            faqtitle: Yup
                .string()
                .max(255)
                .required(
                    'Title is required'),
            faqdesc: Yup
                .string()
                .min(2)
                .required(
                    'Descriptions is required'),
        }),
        onSubmit: async () => {
            updateFAQList();
        },
    });

    const removeFAQ = (id) => {
        let latestFAQ;
        for (let index = 0; index < checkBox.length; index++) {
            const element = checkBox[index];
            console.log(checkBox, 'myckeckbox')
            const findobject = faqList.find(o => o.id == element);
            const finndindex = faqList.indexOf(findobject);
            const faqOld = faqList;
            console.log(faqList, 'finndindex');
            if (finndindex != -1) {
                faqOld.splice(finndindex, 1);
                latestFAQ = [...faqList, faqOld];
            } else {
                latestFAQ = [...faqList];
                setFAQList(latestFAQ);
            }
        }
        const oldCheck = [];


        setCheckbox(oldCheck)
        console.log(checkBox, 'checkBox');
        console.log(latestFAQ, 'latestFAQ');


        console.log(faqList, 'myfaq');
    }
    const saveFAQ = async () => {

        let dataValue;
        var body;
        const guildValue = selectGuildline;
        if (guildValue == 'terms_conditions') {
            dataValue = terms;
            body = {
                "description": dataValue,
                "type": guildValue,
                //"name": "Test"
            }
        } else if (guildValue == 'privacy') {
            dataValue = privacy;
            body = {
                "description": dataValue,
                "type": guildValue,
                //"name": "Test"
            }
        } else {
            dataValue = faq;

            const bodyFAQ = [];
            faqList.map((item) => {
                const faqData = {
                    "title": item.name,
                    "description": item.description
                }
                bodyFAQ.push(faqData);
            })
            console.log(bodyFAQ, 'bodyFAQ');
            body = {
                faqData: bodyFAQ,
                type: "faq"
            }

        }
        var headers = {
            "Content-Type": "application/json",
            "x-access-token": props.profile.token
        }
        var data = await ApiServices.PostApiCall(ApiEndpoint.GUILDLINE_FAQ_SAVE, JSON.stringify(body), headers);
        if (!!data) {
            if (data.status == true) {
                toast.success(data.message)
                // router.push("/guidelines")
                console.log(data);
                getGuideLog()
            } else {
                toast.error(data.message)
            }
        } else {

        }
    }

    const [checkBox, setCheckbox] = React.useState([])

    const handlesubmitform = () => {
        FormControl.reset()
    }

    const handlecheckChange = (e) => {
        let hobbies = [];
        const checkboxss = $('#checkbox:checked');
        for (let index = 0; index < checkboxss.length; index++) {
            if (checkboxss[index].checked == true) {
                hobbies.push(checkboxss[index].value);
            }
        }
        console.log(hobbies, "hobby")
        setCheckbox(hobbies)
    }

    console.log('formik', formik)
    return (
        <div className={styles.guidelines}>
            <form onSubmit={formik.handleSubmit}>
                <NativeSelect
                    defaultValue="terms"
                    sx={{ width: '300px' }}
                    className={styles.inputfield}
                    disableUnderline
                    onChange={onSelected}>
                    <option value="terms_conditions">Terms &amp; Condition</option>
                    <option value="privacy">Privacy Policy</option>
                    <option value="faq">FAQ</option>
                </NativeSelect>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={8}>
                        {showFAQList &&
                            <>
                                <div className={styles.mainfaq}>
                                    <div className={styles.btndiv}>
                                        <div className={styles.btndiv2}>
                                            <Button className={styles.adv_btn_reject} onClick={() => removeFAQ(checkBox)}><DeleteOutlinedIcon /></Button>
                                            <Button className={styles.add_more_btn}
                                                onClick={() => handleOpenDialog(-1)}><AddOutlinedIcon /></Button>
                                        </div>
                                    </div>
                                    <Box style={{ background: 'white', marginTop: '32px' }}>

                                        {faqList.map((faq, index) => {
                                            return (
                                                <>

                                                    {faq.name &&
                                                        <>
                                                        <div></div>
                                                            <div className={styles.paneldiv}>
                                                                
                                                                <div className={styles.faqlist}>
                                                                
                                                                    <Accordion className={styles.accordian} expanded={expanded === 'panel' + faq.id} onChange={handleChange('panel' + faq.id)}>

                                                                        <AccordionSummary className={styles.accordiansummary}
                                                                            expandIcon={expanded === 'panel' + faq.id ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}
                                                                            aria-controls={"panel" + faq.id + "bh-content"}
                                                                            id={"panel" + faq.id + "bh-header"}
                                                                        >
                                                                            <Typography sx={{ color: 'text.secondary' }}>
                                                                            <div className={styles.checkdiv}>
                                                                                <form id='myform'>
                                                                                    <Checkbox value={faq.id} id='checkbox' className={styles.inputcheck} onChange={handlecheckChange} />
                                                                                </form>
                                                                            </div>

                                                                                {faq.name}
                                                                            </Typography>
                                                                        </AccordionSummary>
                                                                        <AccordionDetails className={styles.advaccdetails}>
                                                                            <Typography className={styles.advaccdetailstxt}>

                                                                                {faq.description}
                                                                            </Typography>
                                                                            <Box sx={{ display: 'flex', gap: '15px', justifyContent: 'end', mt: 5 }}>
                                                                                {/* <Button className={styles.adv_btn_reject} size="large" variant="contained" onClick={() => removeFAQ(faq.id)}>Delete</Button> */}
                                                                                {faq.id > 0 &&
                                                                                    <Button className={styles.adv_btn_approve} size="large" variant="contained" onClick={() => handleOpenDialog(faq.id)}>Edit</Button>}
                                                                            </Box>
                                                                        </AccordionDetails>
                                                                    </Accordion>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </>
                                            )
                                        })}
                                    </Box>
                                </div>
                            </>
                        }

                        {!showFAQList &&
                            <div className={styles.guideline_container}>
                                <div className={styles.guideline_content}>
                                    <Box style={{ background: 'white', minHeight: '300px' }}>
                                        <DynamicComponent
                                            editorState={editorState}
                                            toolbarClassName="toolbarClassName"
                                            wrapperClassName="wrapperClassName"
                                            editorClassName="editorClassName"
                                            onEditorStateChange={onEditorStateChange}
                                            onChange={(e) => {
                                                console.log(e.blocks[0].text);
                                            }}
                                        />
                                    </Box>
                                </div>
                            </div>
                        }
                        <Box sx={{ pt: 5, display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>


                            <Box sx={{ width: '160px', mt: 3 }}>
                                <Button
                                    onClick={saveFAQ}
                                    color="primary"
                                    fullWidth
                                    size="large"
                                    variant="contained"
                                    className={styles.submitBtn}
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <div className={styles.guideline_content_2}>
                            <div>
                                <p className={styles.date}>{today}</p>
                                <p className={styles.update_logs}>Update Logs</p>
                                {
                                    logList.map(log => {
                                        var nameLog = "";
                                        if (log.type == 'terms_conditions') {
                                            nameLog = "Terms & Conditions";
                                        }
                                        else if (log.type == 'privacy') {
                                            nameLog = "Privacy";
                                        } else {
                                            nameLog = "FAQ";
                                        }
                                        return (
                                            <>
                                                <p className={styles.date_value}>{new Date(log.date).toLocaleDateString()}</p>
                                                <p className={styles.sub_text}>{nameLog} - updated!</p>
                                                <hr />
                                            </>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </form>

            <Dialog
                open={open}
                onClose={handleCloseDialog}
                aria-labelledby="advertisement-title"
                aria-describedby="advertisement-description"
                fullWidth={true}
                maxWidth={'sm'}
                PaperProps={{ style: { borderRadius: 20 } }}
            >
                <DialogTitle id="alert-dialog-title" >
                    <div className={styles.adv_header_align_row} style={{ display: 'flex', justifyContent: 'space-between', padding: '0 15px' }}>
                        <Typography gutterBottom variant="h5" component="span" className={styles.dislogtitel}>NEW FAQ </Typography>
                        <IconButton className={styles.ntnclose} onClick={handleCloseDialog}>
                            <CloseIcon />
                        </IconButton>
                    </div>
                </DialogTitle>
                <DialogContent sx={{ p: 5 }}>
                    <DialogContentText id="alert-dialog-description">

                    </DialogContentText>
                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                        }}
                    >
                        <InputLabel htmlFor="outlined-required" className={styles.lable}>Title</InputLabel>
                        <FormControl sx={{ mt: 2, minWidth: 120 }}>
                            <TextField
                                error={Boolean(formik.touched.faqtitle && formik.errors.faqtitle)}
                                type="text"
                                helperText={formik.touched.faqtitle && formik.errors.faqtitle}
                                id="outlined-required"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="faqtitle"
                                value={formik.values.faqtitle}
                                className={styles.inputtxt}
                                placeholder="Title"
                                focused={true}
                            />
                            {error ? <Typography className={styles.errorMsg}>Already exit</Typography> : ''}
                            {/* <TextField
                            id="title"
                            label="Title"
                            // value={FAQEdit?.name}
                        /> */}
                        </FormControl>
                        <InputLabel htmlFor="outlined-required" className={styles.lable}>Descriptions</InputLabel>
                        <FormControl sx={{ mt: 2, minWidth: 120 }}>

                            <TextareaAutosize
                                
                                helperText={formik.touched.faqdesc && formik.errors.faqdesc}
                                id="outlined-required"
                                onBlur={formik.handleBlur}
                                onChange={formik.handleChange}
                                name="faqdesc"
                                value={formik.values.faqdesc}
                                // variant="standard"
                                focused={true}
                                minRows={4}
                                maxRows={5}
                                className={styles.textinpt}
                                placeholder="Description"
                            />

                            {/* <TextField
                            id="description"
                            label="Description"
                            multiline
                            rows={7}
                            // value={FAQEdit?.description}
                           
                        /> */}
                            { (Boolean(formik.touched.faqdesc && formik.errors.faqdesc))? <Typography className={styles.errorMsg}>{formik.errors.faqdesc}</Typography> : ''}
                            <TextField
                                id="title"
                                type="hidden"
                                name="faqid"
                                value={FAQEdit?.id}
                                style={{ display: 'none' }}
                                className={styles.textfield}
                            />
                        </FormControl>
                        <Box sx={{ mt: 2, justifyContent: 'center', display: 'flex' }}>
                            <Button className={styles.adv_btn_push} type='submit' onClick={formik.handleSubmit} size="large" variant="contained"> Add</Button>
                        </Box>

                    </Box>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', mb: 2 }}>

                </DialogActions>
            </Dialog>
        </div >
    )
}
const mapStateToProps = (state) => ({
    profile: state.user.profile
});

const mapDispatchToProps = (dispatch) => ({
    save_user_data: (data) =>
        dispatch({ type: Types.LOGIN, payload: data }),
});
export default connect(mapStateToProps, mapDispatchToProps)(Guidelines);

//export default 