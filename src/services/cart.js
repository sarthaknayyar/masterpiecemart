import { myAxios } from "./helper";
export const cart_prod=(prod)=>{
    return myAxios.post("/api/products",prod).then((res)=>{ return res.data; });
}