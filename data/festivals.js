import { festivals } from "./festivals_data.js"
export const getFestival = (month) => {
  return festivals[month];
}
console.log(getFestival("January"));

