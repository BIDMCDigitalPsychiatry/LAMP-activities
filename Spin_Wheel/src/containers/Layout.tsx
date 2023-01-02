
import React, {useEffect, useState} from 'react';
import {Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import BluebuttonSVG from 'src/components/ImageComponents/blueButtonSVG';
import  GreenButtonSVG from "../components/ImageComponents/greenButtonSVG";
import  RedButtonSVG from "../components/ImageComponents/redButtonSVG";
import  YellowButtonSVG from "../components/ImageComponents/yellowButtonSVG";
import SpinWheel from '../components/spinwheel/SpinWheel';
import { convertObjtoArray } from '../helper/helper';
import i18n from "../i18n";
import {
  makeStyles,
  AppBar,
  IconButton,
  Toolbar,  
  Typography,
} from "@material-ui/core"
import  ArrowBackIcon from '@material-ui/icons/ArrowBack'
import './layout.css';


const useStyles = makeStyles((theme) => ({
  toolbardashboard: {
    minHeight: 65,
    padding: "0 15px",
    "& h5": {
      color: "rgb(255,255,255)",
      textAlign: "center",
      fontWeight: "600",
      fontSize: 18,
      width: "calc(100% - 96px)",
    },
  },   
}))

const Layout = ({...props}) => {  
  const classes = useStyles()
  const [settingsData, setSettingsData] = useState<any>(null)    
  const spins = props.data.activity?.settings?.spins_per_game
  const [timeTaken, setTimeTaken] = useState(0)
  const [totalSpins, setTotalSpins] = useState(spins)
  const [spinIndex, setSpinIndex] = useState(0)
  const [selectedItem1, setSelectedItem1] = useState<any>(null)
  const [selectedItem2, setSelectedItem2] = useState<any>(null)
  const [clicked, setClicked] = useState(false)
  const [total,setTotal] = useState(props.data.activity?.settings?.balance)  
  const [routes, setRoutes] = useState<any>([])
  const time = new Date().getTime()
  const [buttonIndex, setButtonIndex] = useState(0)
  // const [loading, setLoading] = useState(true)
  const [complete, setComplete] = useState(false)
  const highRiskConditionsLoseWheel = convertObjtoArray(settingsData?.high_risk[0]?.loose, settingsData?.high_risk[0]?.zero?.probability)
  const highRiskConditionsWinWheel = convertObjtoArray(settingsData?.high_risk[0]?.win, settingsData?.high_risk[0]?.zero?.probability) 
  const lowRiskConditionsLoseWheel = convertObjtoArray(settingsData?.low_risk[0]?.loose, settingsData?.low_risk[0]?.zero?.probability) 
  const lowRiskConditionsWinWheel = convertObjtoArray(settingsData?.low_risk[0]?.win, settingsData?.low_risk[0]?.zero?.probability) 

  
  const [showResult, setShowResult] = useState(false)

 
  function getRandomWithProbability(array : any) {
    const filled = array.flatMap(([value, prob] : any) => {
      const length = prob.toFixed(2) * 100;
      return Array.from({ length }).fill(value)
    });
  
    const random = Math.floor(Math.random() * filled.length);
    return filled[random]
  }  

  useEffect(() => {  
    const configuration = props.data.configuration;
    const settings = props.data.activity?.settings ?? (props.data.settings ?? null);
    i18n.changeLanguage(!!configuration ? configuration.language : "en-US");
    setSettingsData(settings)     
  }, [])
  

  const selectItem =(values1 : any, values2 : any) =>{
    if(totalSpins>0) {        
        const selectedItemTemp1 = getRandomWithProbability(values1)
        setSelectedItem1(selectedItemTemp1)
        const selectedItemTemp2 = getRandomWithProbability(values2)
        setSelectedItem2(selectedItemTemp2)
        setTotalSpins(totalSpins-1)
        setSpinIndex(spinIndex+1)
        setShowResult(false)
        setClicked(true)      
                
      }
  }  
  useEffect(() => {
    if(complete) {
      parent.postMessage(JSON.stringify({ completed: true }), "*")      
    }
  }, [complete])

  useEffect(() => {
    if(totalSpins<=0) {
      parent.postMessage(routes.length > 0 ? JSON.stringify({
        timestamp: new Date().getTime(),
        duration: new Date().getTime() - time,
        temporal_slices: JSON.parse(JSON.stringify(routes)),
        static_data: {},
       }) : null, "*")   

    }
  }, [totalSpins])
  
  useEffect(()=>{    
    if(showResult){
      setTotal(total+parseInt(selectedItem1, 10)-parseInt(selectedItem2, 10))      
      const route = {
          "duration": timeTaken/1000+"s",
          "item": spinIndex,
          "level": buttonIndex, 
          "type": total+parseInt(selectedItem1, 10)-parseInt(selectedItem2, 10),
          "value": null
      }
      setRoutes([...routes,route])
    } 
 
  },[showResult])

  const displayTotal = () =>{
    if(Math.sign(total) === -1) {
      return "-$"+Math.abs(total)
    }
    else{
      return "$"+ Math.abs(total)
    }
  }

    return (
      <div className="layout">        
        <AppBar position="static" style={{ background: "rgba(53,159,254,1)", boxShadow: "none" }}>
          <Toolbar className={classes.toolbardashboard}>
            <IconButton onClick={() => setComplete(true)} color="default" aria-label="Menu">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">{i18n.t<string>("GAME")}</Typography>
          </Toolbar>
        </AppBar>
        <Container>          
          <Row>
            <Col>
              {/* <h1 className='wheel-score'>{i18n.t<string>("TOTAL_BALANCE")} : ${total}</h1> */}
              <h1 className='wheel-score'>{i18n.t<string>("TOTAL_BALANCE")} : {displayTotal()}</h1>
            </Col>
          </Row>
          <Row>
            <Col xs = {12} lg={6}>
              <SpinWheel
              centerX = {250}
              centerY = {250}
              canvasId = "canvas1"
              wheelId="wheel1"
              selectedItem = {selectedItem1}
              clicked={clicked}
              setClicked={setClicked}
              setShowResult={setShowResult}
              setTimeTaken={setTimeTaken}
              />            
              {spinIndex > 0 ? (<p>{i18n.t<string>("YOU_WON")} : {showResult && selectedItem2 !=null ? `${selectedItem1}` : ""}</p>) : <p/>}
            </Col>
            <Col xs = {12} lg={6}>
              <SpinWheel
              centerX = {250}
              centerY = {250}
              canvasId = "canvas2"
              wheelId="wheel2"
              selectedItem = {selectedItem2}
              clicked={clicked}
              setClicked={setClicked}
              setShowResult={setShowResult}
              setTimeTaken={setTimeTaken}
              />
            
              {spinIndex > 0 ? <p>{i18n.t<string>("YOU_LOSE")} : {showResult && selectedItem2 !=null ? `${selectedItem2}` : ""}</p> : <p/>}
            </Col>
          </Row> 
          <Row>
            <Col xs={12} className="button-group">
              <Button className='button-class'
               type="button"               
               onClick={()=>{ setButtonIndex(1); selectItem(highRiskConditionsWinWheel, highRiskConditionsLoseWheel)}}>
                <RedButtonSVG/>
              </Button>
              <Button
               className='button-class'
               type="button"
               onClick={()=>{ setButtonIndex(2); selectItem(highRiskConditionsWinWheel, highRiskConditionsLoseWheel)}}>
                <YellowButtonSVG/>
              </Button>
              <Button
               className='button-class' 
               type="button" 
               onClick={()=>{ setButtonIndex(3); selectItem(lowRiskConditionsWinWheel, lowRiskConditionsLoseWheel)}}>
                <GreenButtonSVG/>
              </Button>
              <Button 
                className='button-class' 
                type="button" 
                onClick={()=>{ setButtonIndex(4); selectItem(lowRiskConditionsWinWheel, lowRiskConditionsLoseWheel)}}>
                <BluebuttonSVG/>
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className='wheel-score'>{i18n.t<string>("TOTAL_SPINS")} : {totalSpins}</h3>   
            </Col>
          </Row> 
          {totalSpins<=0 && <Row>
              <Col>
                <p className='error-class'>{i18n.t<string>("GAME_OVER")}</p>   
              </Col>
            </Row>}         
        </Container> 
      </div>
    );
  
}

export default Layout
