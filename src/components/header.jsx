import { Outlet, Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../Context";


export default () => {
  const [loguejat, setLoguejat] = useState(null)
  const {check} = useContext(Context) 


  const dades = {loguejat, setLoguejat}
  return (
    <>
      
    </>
  );
};
