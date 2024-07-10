// Core Imports
import React, { useState } from "react"
import {
    Typography,
    makeStyles,
    Box,
    Fab,
    Grid,
    IconButton,
    AppBar,
    Toolbar,
    TextField,
    Icon,
    MenuItem
} from "@material-ui/core"
import { useTranslation } from "react-i18next"
import GameInstruction from './GameInstruction'
const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        "& h3": {
            fontSize: 26,
            fontWeight: "bold",
            marginTop: 40
        },
        "& h4": {
            fontSize: 22,
            fontWeight: "normal",
            marginTop: 40,
            marginBottom: 40
        }
    },
    textfieldStyle: {
        background: "none",
        "&:hover": { background: "none" },
        "& input": { backgroundColor: "#f5f5f5", borderRadius: 10 },
        "& .MuiSelect-select": { backgroundColor: "#f5f5f5", borderRadius: 10 },
        "& fieldset": { border: 0 },
        "&::before": {
            display: "none"
        },
        "&::after": {
            display: "none"
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

    blueLine: {height: 5,
        background: "#86B6FF",
        width: "100%",
        marginTop: 20,
        marginBottom: 40
    }
}))
export default function BasicInfo({ ...props }) {
    const classes = useStyles()
    const [noBack] = useState(false)
    const { t } = useTranslation()
    const [view, setView] = useState("instruction");

    const handleNextClick = () => {
      setView("continue");
    };
   

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
            {view === "instruction" && (
                            <Box px={2}>

                <Grid container direction="row" justify="center" alignItems="center">
                    <Grid item lg={3} sm={10} xs={12}>
                        <Typography variant="h3" align="center" >
                            {t("Basic information")}
                        </Typography>
                        <Box className={classes.blueLine}></Box>
                        <Box sx={{ mb: 2 }}>
                            <TextField
                                fullWidth
                                required
                                name="id"
                                type="email"
                                label="Age"
                                variant="filled"
                                placeholder={`${t("Age")}`}
                                InputProps={{
                                    classes: {
                                        root: classes.textfieldStyle,
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 2 }}>
                        <TextField
                            select
                            label={`${t("Gender")}`}
                            fullWidth
                            variant="filled"
                            InputProps={{
                                classes: {
                                    root: classes.textfieldStyle,
                                }
                            }}
                        >
                            <MenuItem>Male</MenuItem>
                            <MenuItem>Female</MenuItem>
                        </TextField>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                        <TextField
                            select
                            label={`${t("Handedness")}`}
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
                        <Box sx={{ mb: 2 }}>
                        <TextField
                            select
                            label={`${t("Device")}`}
                            fullWidth
                            variant="filled"
                            InputProps={{
                                classes: {
                                    root: classes.textfieldStyle,
                                }
                            }}
                        >
                            <MenuItem>Device 1</MenuItem>
                            <MenuItem>Device 2</MenuItem>
                        </TextField>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                        <TextField
                            select
                            label={`${t("Choose Your Own Adventure")}`}
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
                        <Box textAlign="center" pt={4} mt={2}>
                            <Fab className={classes.btnblue} onClick={handleNextClick}>
                                <Typography variant="h6">{t("Continue")}</Typography>
                            </Fab>
                        </Box>
                    </Grid>
                </Grid>
                </Box>

            )}
            
            {view === "continue" && (
                <GameInstruction />
            )}
        </div>
    )
}
