import React, { useEffect, useState } from "react";
import {Button, Col, Container, Form,Image, Row } from "react-bootstrap";
import i18n from "../i18n";


const Emotions = ({...props} : any) => {   
  const [image, setImage] = useState(props?.data?.image)
  const [num, setNum] = useState(props.level)
  const [emotions, setEmotions] = useState<any>([])  
  const [error, setError] = useState("")
  const duration =  new Date().getTime()
  const totalLevels = props.totalLevels



  const initialize = (data: any) => {
    const newArray = props.emotions.map ((em: any)=>{
        return {
        ...em,
        "selected" : (em.emotion.toLowerCase() === data?.selected?.toLowerCase()) ? true : false
      }
    })
    setEmotions(newArray)
  }
  useEffect(()=>{
    setImage(props?.data?.image)
    setNum(props.level)  
    initialize(props.data)  
  },[props.data, props.level])


  const handleOnCick = (e: any) => {
    const newArray = emotions
    setEmotions(newArray.map((em : any)=>{
      if(e.target.id === em.emotion){
        em.selected = true
      }
      else {
        em.selected = false
      }
      return em
    }))
    
  }

  const handleSave = (text: string) => {
    const selected = emotions.find((em : any)=> em.selected === true)
    if(selected === undefined) {
      setError(i18n.t("SELECT AN OPTION BEFORE PROCEEDING"))
    }
    else {
      setError("")
      props.handleLevelCompleted(selected, (new Date().getTime() - duration)/1000, text)
    }
  }

    return(    
        <div> 
          <Container> 
          <Row>
              <Col> 
                <p className="index">{num} {i18n.t("OF")} {totalLevels}</p>              
              </Col>
            </Row>          
            <Row className="image">
              <Col>                            
              <Image              
                src=
                {image}
                thumbnail={true}
                />
              </Col>
            </Row> 
            <Row>
              <Col>                            
                <p className="question">{i18n.t("WHAT EMOTION IS THIS")}?</p>
              </Col>
            </Row>
           {error !== "" && <Row>
              <Col>                            
                <p className='error-message'>{error} </p>
              </Col>
            </Row>  }          
            <Row>
              <Col className="begin">
                <Form>                  
                  {emotions.map((emotion: any, index: number)=>{
                    return <div key={index} className="emotions">
                      <input
                        type="checkbox"
                        id={emotion.emotion}
                        name={emotion.emotion}
                        value={emotion.emotion}
                        checked={emotion.selected}
                        onChange={(e: any)=>handleOnCick(e)}
                      />
                      {i18n.t(emotion?.emotion?.toUpperCase())}
                    </div>
                  })}
                                  
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>                            
               {num !== 1 && <><Button  className="start-button" onClick={()=>handleSave("previous")}>
                  {i18n.t("PREVIOUS")}
              </Button><span>&nbsp;&nbsp;</span></>}
              <Button  className="start-button" onClick={()=>handleSave(num !== totalLevels ? "next" : "save")}>
                  {num !== totalLevels ? i18n.t("NEXT") : i18n.t("SAVE")}
              </Button>              
              </Col>
            </Row>
          </Container>         
          
         </div>
      )
}
export default Emotions
