import { Request,Response,NextFunction } from "express"
export const catchAsync = (foo:any)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        foo(req,res,next).catch((err: any)=>next(err))  // or .catch(next)
    }
}