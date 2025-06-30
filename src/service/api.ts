
import service from "./index"
export const getList = () => service({ method: "get", url: "/menus" })