/** @format */

import axios from "axios";
import { ActionApis } from "./actions";
import { BaseAxiosApis } from "./mixin";

const URLNAME = "http://192.168.25.200:8000";
// const URLNAME = "https://biblio.worldbusiness-magazine.com";
const TOKEN_HEADER = "Bearer";

const axiosInstance = axios.create({
    baseURL: URLNAME,
    timeout: 3000,
});

export const axiosApisRequest = new BaseAxiosApis(axiosInstance, TOKEN_HEADER);
export const apis = new ActionApis(axiosApisRequest);
