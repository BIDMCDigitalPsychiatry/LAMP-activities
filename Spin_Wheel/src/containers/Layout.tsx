
import React, {useEffect, useState} from 'react';
import {Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import SpinWheel from '../components/spinwheel/SpinWheel';
import { convertObjtoArray , shuffleArray} from '../helper/helper';
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
import DialogMessage from './DialogMessage';

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
  const [isGameOver, setIsGameOver] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [total,setTotal] = useState(props.data.activity?.settings?.balance)  
  const [routes, setRoutes] = useState<any>([])
  const time = new Date().getTime()
  const [buttonIndex, setButtonIndex] = useState(0)
  const [complete, setComplete] = useState(false)
  const [conditionsForRed, setConditionsForRed] = useState<any>([])
  const [conditionsForYellow, setConditionsForYellow] = useState<any>([])
  const [conditionsForBlue, setConditionsForBlue] = useState<any>([])
  const [conditionsForGreen, setConditionsForGreen] = useState<any>([])
  const highRiskConditionsLoseWheel = convertObjtoArray(settingsData?.high_risk[0]?.loose, settingsData?.high_risk[0]?.zero?.probability)
  const highRiskConditionsWinWheel = convertObjtoArray(settingsData?.high_risk[0]?.win, settingsData?.high_risk[0]?.zero?.probability) 
  const lowRiskConditionsLoseWheel = convertObjtoArray(settingsData?.low_risk[0]?.loose, settingsData?.low_risk[0]?.zero?.probability) 
  const lowRiskConditionsWinWheel = convertObjtoArray(settingsData?.low_risk[0]?.win, settingsData?.low_risk[0]?.zero?.probability) 
  const riskArray = ['highrisk', 'highrisk', 'lowrisk','lowrisk']
  const [selectedCondition, setSelectedCondition] = useState<any>(null)
  const [disableButtons, setDisableButtons] = useState(false)
  
  const [showResult, setShowResult] = useState(false)
  const [open, setOpen] = useState(false)

 
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

  useEffect(() => { 
    if(settingsData !== null && settingsData!== undefined) {      
      shuffleArray(riskArray)
      setConditionsForRed(riskArray[0]) 
      setConditionsForYellow(riskArray[1])
      setConditionsForGreen(riskArray[2])  
      setConditionsForBlue(riskArray[3])   

    }  
  }, [settingsData])

  const selectItem =(values1 : any, values2 : any) =>{
    if(totalSpins>0) {   
        setClicked(true)      
        const selectedItemTemp1 = getRandomWithProbability(values1)
        setSelectedItem1(selectedItemTemp1)
        const selectedItemTemp2 = getRandomWithProbability(values2)
        setSelectedItem2(selectedItemTemp2)
        setTotalSpins(totalSpins-1)
        setSpinIndex(spinIndex+1)
        setShowResult(false)               
      }
  }  
  useEffect(() => {
    if(complete) {
      const route = {'type': 'manual_exit', 'value': true} 
      routes.push(route)
      setTimeout(()=>{
        parent.postMessage(routes.length > 0 ? JSON.stringify({
          timestamp: new Date().getTime(),
          duration: new Date().getTime() - time,
          temporal_slices: JSON.parse(JSON.stringify(routes)),
          static_data: {},
         }) : null, "*") 
      }, 2000)   
    }
    setOpen(true)
  }, [complete])

  useEffect(() => {
    if(isGameOver) {
      const route = {'type': 'manual_exit', 'value': false} 
      routes.push(route)
      setTimeout(()=>{
        parent.postMessage(routes.length > 0 ? JSON.stringify({
          timestamp: new Date().getTime(),
          duration: new Date().getTime() - time,
          temporal_slices: JSON.parse(JSON.stringify(routes)),
          static_data: {},
         }) : null, "*") 
      }, 3000)     

    }
  }, [isGameOver])

  const handleLevelComplete = () => {

    setTotal(total+parseInt(selectedItem1, 10)-parseInt(selectedItem2, 10))        
      const route = {
          "duration": timeTaken/1000+"s",
          "item": spinIndex,
          "level": buttonIndex, 
          "type": total+parseInt(selectedItem1, 10)-parseInt(selectedItem2, 10),
          "value": selectedCondition
      }
      setRoutes([...routes,route])
      setTimeout(()=>{
        setDisableButtons(false)   
      },1000)
      
  }


  const displayTotal = () =>{
    if(Math.sign(total) === -1) {
      return "-$"+Math.abs(total)
    }
    else{
      return "$"+ Math.abs(total)
    }
  }

  const setConditions = (condition : any) =>{
    if(!clicked){
    if(condition === 'highrisk'){
      setSelectedCondition(1)
      selectItem(highRiskConditionsWinWheel, highRiskConditionsLoseWheel)
    }
    else {
      setSelectedCondition(0)
      selectItem(lowRiskConditionsWinWheel, lowRiskConditionsLoseWheel)
    }
    }
  }

    return (
      <div className="layout">        
        <AppBar position="static" style={{ background: "rgba(53,159,254,1)", boxShadow: "none" }}>
          <Toolbar className={classes.toolbardashboard}>
            <IconButton onClick={() => setComplete(true)} color="default" aria-label="Menu">
              <ArrowBackIcon />
            </IconButton>
            <Typography variant="h5">{i18n.t("GAME")}</Typography>
          </Toolbar>
        </AppBar>
        <Container>          
          <Row>
            <Col>
              <h1 className='wheel-score'>{i18n.t("TOTAL_BALANCE")} : {displayTotal()}</h1>
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
              handleLevelComplete={handleLevelComplete}
              setTimeTaken={setTimeTaken}
              totalSpins={totalSpins}
              setIsGameOver={setIsGameOver}
              />            
              <div className='h-35px'>{spinIndex > 0 ? (<p>{i18n.t("YOU_WON")} : {showResult && selectedItem2 !=null ? `${selectedItem1}` : ""}</p>) : <p/>}</div>
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
              handleLevelComplete={handleLevelComplete}
              setShowResult={setShowResult}
              setTimeTaken={setTimeTaken}
              totalSpins={totalSpins}
              setIsGameOver={setIsGameOver}
              />
            
            <div className='h-35px'>{spinIndex > 0 ? <p>{i18n.t("YOU_LOSE")} : {showResult && selectedItem2 !=null ? `${selectedItem2}` : ""}</p> : <p/>}</div>
            </Col>
          </Row> 
          <Row>
            <Col xs={12} className="button-group">
              <Button className='button-class'
               type="button"
               disabled={disableButtons}               
               onClick={()=>{     
                setDisableButtons(true) 
                setButtonIndex(1);
                setConditions(conditionsForRed)
               }}>
 1              </Button>
              <Button
               className='button-class'
               disabled={disableButtons}   
               type="button"
               onClick={()=>{ 
                setDisableButtons(true) 
                setButtonIndex(2);
               setConditions(conditionsForYellow)}}>
                2
              </Button>
              <Button
               className='button-class' 
               type="button"
               disabled={disableButtons}  
               onClick={()=>{ 
                setDisableButtons(true) 
                setButtonIndex(3);
                setConditions(conditionsForGreen)}}>
                3
              </Button>
              <Button 
                className='button-class' 
                type="button" 
                disabled={disableButtons} 
                onClick={()=>{ 
                  setDisableButtons(true) 
                  setButtonIndex(4);                   
                  setConditions(conditionsForBlue)
                  }}>
                4
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <h3 className='wheel-score'>{i18n.t("TOTAL_SPINS")} : {totalSpins}</h3>   
            </Col>
          </Row> 
          {isGameOver && <Row>
              <Col>
                <p className='error-class'>{i18n.t("GAME_OVER")}</p>   
              </Col>
            </Row>}         
        </Container> 
        <DialogMessage open={open}  setOpen={setOpen}  />
      </div>
    );
  
}

export default Layout
