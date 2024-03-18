import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import NoPage from "./NoPage";

export default function Survey() {

  const { data } = useLocation();

  return (
    <div>{data}</div>
  )
};
