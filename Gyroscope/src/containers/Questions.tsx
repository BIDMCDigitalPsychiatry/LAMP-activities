// Core Imports
import React, { useState } from "react"
import {
    Typography,
    makeStyles,
    Box,
    Grid,
    IconButton,
    AppBar,
    Toolbar,
    Icon,
    TextField,
    MenuItem,
    Fab
} from "@material-ui/core"
import { useTranslation } from "react-i18next"
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& h3": {
            fontSize: 26,
            fontWeight: "bold"
        },
        "& h4": {
            fontSize: 22,
            fontWeight: "normal",
            marginTop: 40,
            marginBottom: 40
        }
    },
    btnblue: {
        background: "#7599FF",
        padding: "15px 25px 15px 25px",
        borderRadius: "40px",
        minWidth: "200px",
        boxShadow: " 0px 10px 15px rgba(255, 172, 152, 0.25)",
        lineHeight: "22px",
        display: "inline-block",
        cursor: "pointer",
        "& h6": {
            textTransform: "capitalize",
            fontSize: "16px",
            color: "#FFFFFF",
            fontWeight: "bold",
        },
        "& span": { cursor: "pointer" },
        "&:hover": {
            background: "#5783ff",
            boxShadow:
                "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        },
    },
    toolbardashboard: {
        minHeight: 65,
        padding: "0 10px",
        "& h5": {
            color: "rgba(0, 0, 0, 0.75)",
            textAlign: "center",
            fontWeight: "600",
            fontSize: 18,
            width: "calc(100% - 96px)",
        },
    },
    container: {

    },
    innercontainer: {
        display: "flex",
        height: "100%",
        borderTop: "#F5F5F5 solid 1px"
    },
    formlabel: {
        marginBottom: 10,
        display: "block"
    },
    textfieldStyle: {
        background: "none",
        "&:hover": { background: "none" },
        "& input": { backgroundColor: "#f5f5f5", borderRadius: 10, padding: 18 },
        "& .MuiSelect-select": { backgroundColor: "#f5f5f5", borderRadius: 10 },
        "& fieldset": { border: 0 },
        "&::before": {
            display: "none"
        },
        "&::after": {
            display: "none"
        }
    },
}))
export default function Questions({ ...props }) {
    const classes = useStyles()
    const [noBack] = useState(false)
    const { t } = useTranslation()

    return (
        <div className={classes.root}>
            {/* <AppBar position="static" style={{ background: "#fff", boxShadow: "0px 1px 1px #00000014" }}>
                <Toolbar className={classes.toolbardashboard}>
                    {!noBack && <IconButton color="default" aria-label="Menu">
                        <Icon>arrow_back</Icon>
                    </IconButton>}
                    <Typography variant="h5">{t("Cognitive Test")}</Typography>
                    <IconButton>
                        <Icon>refresh</Icon>
                    </IconButton>
                </Toolbar>
            </AppBar> */}
            <Box p={4} className={classes.container}>
                <Typography variant="h3">A few more questions before you see your results</Typography>
            </Box>

            <Grid container className={classes.innercontainer}>
                <Grid item lg={6} sm={10} xs={12}>
                    <Box p={5}>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>How many times have you participated in this experiment?</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>Please rate the experiment you just completed:</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>If you had technical difficulties or complaints, please describe in this box (Optional):</label>
                            <TextField
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>What is the highest level of education you completed?</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>Which option best describes your ethnicity?</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>Email (Optional):</label>
                            <TextField
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>Would you like to receive emails about future experiments?</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>Do you have normal or corrected vision?</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>Could you see the items in the screen display clearly?</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                    </Box>
                </Grid>
                <Grid item lg={6} sm={10} xs={12}>
                    <Box p={5}>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>"I frequently play video games."</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>"I am clumsy"</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>What was your area of study?</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>Have you been diagnosed with neurological disease (Optional)?</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>If you indicated "Yes, Other" in the previous question, please describe your diagnosis (Optional):</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>How many hours do you sleep on average:</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>How many hours do you use the computer each day:</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ mb: 3 }}>
                            <label className={classes.formlabel}>Any other information you would like to share with us:</label>
                            <TextField
                                select
                                fullWidth
                                variant="filled"
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            >
                                <MenuItem>Option 1</MenuItem>
                                <MenuItem>Option 2</MenuItem>
                            </TextField>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Box textAlign="center" pb={4} mt={2}>
                            <Fab className={classes.btnblue}>
                                <Typography variant="h6">{t("See My Results")}</Typography>
                            </Fab>
                        </Box>
        </div>
    )
}
