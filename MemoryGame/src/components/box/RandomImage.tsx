import * as React from 'react';
import Background01 from "../photos/Background-01"
import Background02 from "../photos/Background-02"
import Background03 from "../photos/Background-03"
import Background04 from "../photos/Background-04"

import Background05 from "../photos/Background-05"
import Background06 from "../photos/Background-06"
import Background07 from "../photos/Background-07"
import Background08 from "../photos/Background-08"

import Background09 from "../photos/Background-09"
import Background10 from "../photos/Background-10"
import Background11 from "../photos/Background-11"
import Background12 from "../photos/Background-12"

import Background13 from "../photos/Background-13"
import Background14 from "../photos/Background-14"
import Background15 from "../photos/Background-15"
import Background16 from "../photos/Background-16"

import Background17 from "../photos/Background-17"
import Background18 from "../photos/Background-18"
import Background19 from "../photos/Background-19"
import Background20 from "../photos/Background-20"

import Background21 from "../photos/Background-21"
import Background22 from "../photos/Background-22"
import Background23 from "../photos/Background-23"
import Background24 from "../photos/Background-24"

import Background25 from "../photos/Background-25"
import Background26 from "../photos/Background-26"
import Background27 from "../photos/Background-27"
import Background28 from "../photos/Background-28"

import Background29 from "../photos/Background-29"
import Background30 from "../photos/Background-30"
import Background31 from "../photos/Background-31"
import Background32 from "../photos/Background-32"

import Background33 from "../photos/Background-33"
import Background34 from "../photos/Background-34"
import Background35 from "../photos/Background-35"
import Background36 from "../photos/Background-36"

import Background37 from "../photos/Background-37"
import Background38 from "../photos/Background-38"
import Background39 from "../photos/Background-39"
import Background40 from "../photos/Background-40"

import Background41 from "../photos/Background-41"
import Background42 from "../photos/Background-42"
import Background43 from "../photos/Background-43"
import Background44 from "../photos/Background-44"

import Background45 from "../photos/Background-45"
import Background46 from "../photos/Background-46"
import Background47 from "../photos/Background-47"
import Background48 from "../photos/Background-48"

const images = [
  [
    <Background01 key="01"/>,
    <Background02 key="02"/>,
    <Background03 key="03"/>,
    <Background04 key="04"/>,
  ],
 [
  <Background05 key="05"/>,
  <Background06 key="06"/>,
  <Background07 key="07"/>,
  <Background08 key="08"/>,
 ],
 [
<Background09 key="09"/>,
  <Background10 key="10"/>,
  <Background11 key="11"/>,
  <Background12 key="12"/>,
   ]
 ,[
  <Background13 key="13"/>,
  <Background14 key="14"/>,
  <Background15 key="15"/>,
  <Background16 key="16"/>,
 ],
 [
  <Background17 key="17"/>,
  <Background18 key="18"/>,
  <Background19 key="19"/>,
  <Background20 key="20"/>,
 ],
 [
  <Background21 key="21"/>,
  <Background22 key="22"/>,
  <Background23 key="23"/>,
  <Background24 key="24"/>,
 ],
 [
  <Background25 key="25"/>,
  <Background26 key="26"/>,
  <Background27 key="27"/>,
  <Background28 key="28"/>,
 ],
 [
  <Background29 key="29"/>,
  <Background30 key="30"/>,
  <Background31 key="31"/>,
  <Background32 key="32"/>,
 ],
 [
  <Background33 key="33"/>,
  <Background34 key="34"/>,
  <Background35 key="35"/>,
  <Background36 key="36"/>,
 ],
 [ 
  <Background37 key="37"/>,
  <Background38 key="38"/>,
  <Background39 key="39"/>,
  <Background40 key="40"/>,
 ],
 
   [
    <Background41 key="41"/>,
    <Background42 key="42"/>,
    <Background43 key="43"/>,
    <Background44 key="44"/>,
   ]
 ,
 [
  <Background45 key="45"/>,
  <Background46 key="46"/>,
  <Background47 key="47"/>,
  <Background48 key="48"/>,

 ]
]

function getKeys(limit:number) {
  const keys = Array.from(Array(12).keys())
  const keysSelected:Array<number> = []
  for (let i = 0; i < limit ; i++){
    const randomKey = Math.floor(Math.random() * keys.length)
    if(!keysSelected.includes(randomKey)) {
      keysSelected.push(randomKey)
    } else {
      i=i-1
    }
  }
  return keysSelected
}


export default function getImages(limit:number) {
    const result = []
    const allImages = []
    const keysSelected:Array<number> = getKeys(limit)
    let randomAllSelected:Array<number> 
    randomAllSelected = []
    const imageSelctions:Array<any>  = []
    for(let i = 0; i < limit; i++) {
      const random = Math.floor(Math.random() * 4)
        result.push(images[keysSelected[i]][random])

        allImages.push(images[keysSelected[i]][random])
        randomAllSelected = []
        for (let j = 0; j < 2 ;j++) {
          const randomKey = Math.floor(Math.random() * 4)
          if(randomKey !== random && !randomAllSelected.includes(randomKey)) {
            randomAllSelected.push(randomKey)
            allImages.push(images[keysSelected[i]][randomKey])
          } else {
            j = j - 1
          }
        }
        imageSelctions.push({"category": keysSelected[i] + 1, "index": random + 1 }) 

    }
    return {images : result, resultImages: shuffle(allImages), imageIndexes:imageSelctions  }
}

function shuffle(array: any) {
  let currentIndex = array.length  
  let randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

