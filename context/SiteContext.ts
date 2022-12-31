import { createContext } from "react";
import { siteDataType } from "../typings";

export const SiteContext=createContext<siteDataType>({
    user:false,
    uid:null,
    login:false
})