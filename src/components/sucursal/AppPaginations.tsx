import { Pagination } from "@mui/material";
import React, { useState, useEffect } from "react";
import { makeStyles,  } from "@mui/material";

export interface PaginationProps {
  setPage:any;
 NumberPage: any
Page:any;
 }

const AppPagination = (props: PaginationProps) => {
   
  const { setPage,NumberPage,Page } = props;
    
 
  const handleChange = ()=>{
    setPage(Page)
    window.scroll(1,0)
  }
  return (
    <Pagination  
     style={{ 
       display: 'flex',
       justifyContent:'center'
     }}    
    color="primary"
    //@ts-ignore
   onChange={(e)=>handleChange(e.target.textContent)}
     count={NumberPage}
    size="large" 

    />
    )
}

export default AppPagination
