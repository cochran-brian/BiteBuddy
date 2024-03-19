import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import NoPage from "./NoPage";

export default function Survey() {

  const { data } = useLocation();
  console.log(data)

  return (
    <div>{data}</div>
  )
};
