import useSwr from "swr";
import axios from "axios";

const fetcher = (urlAPI) =>
  axios.get(urlAPI).then((response) => {
    console.log(response.data);
    return response.data;
  });

const urlAPI = "http://localhost:3333/vehicles/locations";
let { data, error } = useSwr(urlAPI, fetcher);
export const vehiclesLocations = data && !error ? data : [];
