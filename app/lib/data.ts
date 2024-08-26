import { count } from "console";
import { countries, books, animals,sports, series,movies } from "./constant"
import { randomFillSync } from "crypto";

//FILTER THE DATA, I CAN ONLY RECIEVE DATA THAT HAS TWO WORLDS
let COUNTRIES = countries.filter(value=>{
   if(value.name.split(" ").length <= 2){
     return value;
   }
})

let SPORT = sports.filter(value=>{
   if(value.split(" ").length <= 2){
     return value;
   }
})

let BOOKS = books.filter(value=>{
   if(value.title.split(" ").length <= 2){
     return value;
   }
})
let ANIMALS = animals.filter(value=>{
   if(value.split(" ").length <= 3){
     return value;
   }
})
export function fetchRandomMovie(){
   let randomMovie = movies[Math.floor(Math.random() * movies.length)].title
   return(randomMovie.toLowerCase())
}
export function fetchRandomSeries(){
   let randomSeries = series[Math.floor(Math.random() * series.length)].title 
   return(randomSeries.toLowerCase())
}
//Merge all of this
export function fetchRandomCountry() {
    let randomCountry = COUNTRIES[Math.floor(Math.random() * COUNTRIES.length)].name
    return randomCountry.toLowerCase()
}
export function fetchRandomBook() {
    let randomBook = BOOKS[Math.floor(Math.random() * BOOKS.length)].title
    return  randomBook.toLowerCase()
}

export function fetchRandomAnimal() {
    let randomAnimal = ANIMALS[Math.floor(Math.random() * ANIMALS.length)]
    return  randomAnimal.toLowerCase();
}

export function fetchRandomSport() {
    let randomSport = SPORT[Math.floor(Math.random() * SPORT.length)]
    return randomSport.toLowerCase();
}
