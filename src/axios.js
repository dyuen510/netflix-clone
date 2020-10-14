import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export default instance;

//if export default you can use any alias in other files for it.
// but if you do export const instance then you would need to use import instance
