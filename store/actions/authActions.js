import axios from "axios";
import jwt_decode from "jwt-decode";

import * as actionTypes from "./actionTypes";
const instance = axios.create({
  baseURL: "http://"
});
