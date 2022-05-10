import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Help.scss";
// COMPONENTS
import Scroll from "../../components/Scroll/Scroll";
// MUI
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// REDUX
import { getProdcutHelp } from "../../redux/action";
import { useDispatch, useSelector } from "react-redux";

const Help = () => {
  // help
  const dispatch = useDispatch();
  const help = useSelector((state) => {
    const { productsReducer } = state;
    return productsReducer.help;
  });
  useEffect(() => {
    dispatch(getProdcutHelp());
  }, []);

  return (
    <div className="wrapper">
      <Scroll />
      <Breadcrumbs aria-label="breadcrumb" className="crumbs">
        <Link to="/" className="crumbs_link1">
          Главная
        </Link>
        <p className="crumbs_link2">Помощь</p>
      </Breadcrumbs>
      <div className="help_container">
        <div className="help_block_img">
          <img src={help.img} alt="" />
        </div>
        <div className="help_block_info">
          <p className="interesting_title">Помощь</p>
          <div className="help_container_r">
            {help.questim
              ? help.questim.map((help) => (
                  <Accordion id="accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon fontSize="large" />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <div className="accord_title">{help.title}</div>
                    </AccordionSummary>
                    <AccordionDetails>
                      <div className="accord_text">{help.text}</div>
                    </AccordionDetails>
                  </Accordion>
                ))
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
