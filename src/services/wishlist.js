import { myAxios } from "./helper";
export const wishlist_prod=(prod)=>{
    return myAxios.post("/api/wishlist",prod).then((res)=>{ return res.data; });
}