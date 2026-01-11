
import axiosRequest from "./index"
export const getList = (data: any) => axiosRequest({ url: "/menu/list", method: "GET", data: data })