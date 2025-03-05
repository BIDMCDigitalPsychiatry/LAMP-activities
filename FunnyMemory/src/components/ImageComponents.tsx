/**
 * @file   src\components\ImageComponents.tsx
 * @brief  Component reponsible for handling rendering of each image
 * @date   Oct , 2024
 * @author ZCO Engineer
 * @copyright (c) 2024, ZCO
 */
import { getMonthIndex } from "src/functions";
import { imagesForMonth1 } from "./ImagesForEachMonth/ImagesForMonth1";
import { imagesForMonth2 } from "./ImagesForEachMonth/ImagesForMonth2";
import { imagesForMonth3 } from "./ImagesForEachMonth/ImagesForMonth3";
import { imagesForMonth4 } from "./ImagesForEachMonth/ImagesForMonth4";
import { imagesForMonth5 } from "./ImagesForEachMonth/ImagesForMonth5";
import { imagesForMonth6 } from "./ImagesForEachMonth/ImagesForMonth6";

const getImages = () =>{
  const monthIndex = getMonthIndex();
  let images = []
  switch(monthIndex){
    case 1 : images = imagesForMonth1;
              break;
    case 2 : images = imagesForMonth2;
              break;
    case 3 : images = imagesForMonth3;
              break;
    case 4 : images = imagesForMonth4;
              break;
    case 5 : images = imagesForMonth5;
              break;
    case 6 : images = imagesForMonth6;
              break;
    default : images = imagesForMonth1
  }
  return images;

}

export const images = getImages()

export const getImage = (currentIndex: number, image: number) =>{
  return images[currentIndex][image]
}