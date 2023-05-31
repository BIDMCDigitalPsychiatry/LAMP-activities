import "./layout.css"
import React, { useEffect, useState } from "react";
import {Col, Container,  Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import i18n from "../i18n";
import Emotions from "src/components/Emotions";
import ModalPopup from './uielements/ModalPopup';

const Layout = ({...props} : any) =>{  
    const [level, setLevel] = useState(1)  
    const [currentEmotion, setCurrentEmotion] = useState<any>({})
    const [routes, setRoutes] = useState<any>([])
    const time = new Date().getTime()
    const [gameOver, setGameOver] = useState(false)
    const [settings, setSettings] = useState<any>(null) 
    const [totalLevels, setTotalLevels] = useState(0)
    const [exitModalShow, setExitModalShow] = useState(false)

      useEffect(() => {  
        const configuration = props.data.configuration;
        const data = props.data.activity?.settings ? props.data.activity?.settings : null ;
        i18n.changeLanguage(!!configuration ? configuration.language : "en-US");    
        const newArray = data?.map ((em: any)=>{

          return {
            ...em,
            "selected" : ""
          }
        })    
        setSettings(newArray) 
        setTotalLevels(data?.length)   
      }, [props.data])

      useEffect(()=>{
        if(settings!== null){
          if(level <= totalLevels+1) {
            setCurrentEmotion(settings[level-1]) 
          }
          
        }
      }, [level, settings])

      useEffect(()=>{
        if(gameOver){sentResult()}   

      }, [gameOver])

      const sentResult = () => {
        setTimeout(()=>{
          parent.postMessage(routes.length > 0 ? JSON.stringify({
            timestamp: new Date().getTime(),
            duration: new Date().getTime() - time,
            temporal_slices: JSON.parse(JSON.stringify(routes)),
            static_data: {},
          }) : null, "*") 
      }, 2000)}   

      const handleLevelCompleted = (selected : any, duration: any, text: string) => {        
          if(!routes.find((item:any)=>item.item===level))  {         
            const route = {
              "duration": duration,
              "item": level,
              "level": currentEmotion?.emotionText ,
              "type": selected?.emotion.toLowerCase() === currentEmotion?.emotion.toLowerCase() ? true : false,
              "value": selected?.emotion
            }      
            setRoutes([...routes,route])  
            const newArray = settings.map ((em: any)=>{
              if(currentEmotion.emotion.toLowerCase() === em.emotion.toLowerCase()){
                  em.selected = selected.emotion
                  return em
              }else{
                return em
              }
            }) 
            setSettings(newArray)
            }
            if(text=== "previous"){
              setLevel(level-1)
            } 
            else if(text==="save"){
              setGameOver(true)
            }  
            else {
              setLevel(level+1)
            }
          
      }


      return(
        <div className="main-class">   
        {exitModalShow && 
          <ModalPopup
              show={exitModalShow}
              onHide={(e : any) =>{
                setExitModalShow(false)
                setTimeout(()=>{
                  parent.postMessage(null, "*")
                }, 5000)    
              }}
              message={i18n.t("DO_YOU_WANT_TO_SAVE_YOUR_GAME_RESULTS_BEFORE_PROCEEDING")+'?'}
              handleConfirm={(e: any) => {
                setExitModalShow(false)
                sentResult()   
                        
              }}
              action="mindLamp"
            />      
          }          
          <nav className="back-link">
              <FontAwesomeIcon icon={faArrowLeft} onClick={() => {routes.length>0 ? setExitModalShow(true) : 
              setTimeout(()=>{
                parent.postMessage(null, "*")
              }, 5000)  }} />
            </nav>             
            <div className="heading">{i18n.t<string>("EMOTIONS")}</div>            
          <Container> 
            <Row>
                <Col>
                    <p className='error-class'>{gameOver ? i18n.t<string>("GAME_OVER") : ""}</p>
                </Col>
              </Row>                          
              <Row>
              <Col>  
                   <Emotions 
                   data={currentEmotion}
                   handleLevelCompleted={handleLevelCompleted}
                   totalLevels={totalLevels} 
                   level={level<=totalLevels ? level : totalLevels}
                   setLevel={setLevel}
                   />                
              </Col>
            </Row>
           
          </Container>         
          
         </div>
      )
}
export default Layout
