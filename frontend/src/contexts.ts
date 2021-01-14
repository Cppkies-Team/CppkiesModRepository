import React from "react"
import CCRepoAPI from "../../apiLibrary/"

export const defaultApi = new CCRepoAPI("")
export const ApiContext = React.createContext(defaultApi)
