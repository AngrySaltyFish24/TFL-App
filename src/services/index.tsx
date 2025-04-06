import { useFetchAllTubeData, useFetchTubeDataById, Tube } from "./line";
import axios from "axios";
import { makeUseAxios } from "axios-hooks";

export const TFLAxios = axios.create({ baseURL: "https://api.tfl.gov.uk" });
export const useTFLAPI = makeUseAxios({ axios: TFLAxios });

export { useFetchAllTubeData, useFetchTubeDataById };
export type { Tube };
