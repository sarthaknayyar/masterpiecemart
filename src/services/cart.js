import { myAxios } from "./helper";
export const cart_prod=(prod)=>{
    console.log(prod);
    return myAxios.post("/api/products",prod).then((res)=>{ return res.data; });
}