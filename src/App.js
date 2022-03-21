import React, { useState } from "react"

// Importação de CSS
import "./App.css";

// Importação das DIV MOTION.
import { motion, AnimatePresence } from "framer-motion"

// Importação de SVG
import SVG_bg_pentagon from "./svg/bg-pentagon.svg";

import SVG_icon_lizard from "./svg/icon-lizard.svg";
import SVG_icon_paper from "./svg/icon-paper.svg";
import SVG_icon_rock from "./svg/icon-rock.svg";
import SVG_icon_scissors from "./svg/icon-scissors.svg";
import SVG_icon_spock from "./svg/icon-spock.svg";

import SVG_icon_close from "./svg/icon-close.svg";
import SVG_rules from "./svg/image-rules-bonus.svg";

// Componente da página principal da aplicação.
function App() {
    const [popupOpen, setPopupOpen] = useState(false);

    return (
        <div className="main-div">
            <div className="header">
                <div className="description">
                    <span>ROCK</span>
                    <span>PAPER</span>
                    <span>SCISSORS</span>
                    <span>LIZARD</span>
                    <span>SPOCK</span>
                </div>
                <div className="score-box">
                    <div className="score-text">SCORE</div>
                    <div className="score">12</div>
                </div>
            </div>
            <div className="select-box">
                <div className="select">
                    <img src={SVG_bg_pentagon} className="select-bg-pentagon"/>

                    <div className="select-button-div" id="scissors">
                        <div className="select-button">
                            <img src={SVG_icon_scissors} />
                        </div>
                    </div>

                    <div className="select-button-div" id="paper">
                        <div className="select-button">
                            <img src={SVG_icon_paper} />
                        </div>
                    </div>

                    <div className="select-button-div" id="rock">
                        <div className="select-button">
                            <img src={SVG_icon_rock} />
                        </div>
                    </div>

                    <div className="select-button-div" id="lizard">
                        <div className="select-button">
                            <img src={SVG_icon_lizard} />
                        </div>
                    </div>

                    <div className="select-button-div" id="spock">
                        <div className="select-button">
                            <img src={SVG_icon_spock} />
                        </div>
                    </div>
                    
                </div>  
            </div>
            <div className="bottom-box">
                <div className="rules-button" onClick={()=>{setPopupOpen(true)}}>
                    RULES
                </div>
            </div>
            <AnimatePresence>
                {(popupOpen)?<React.Fragment>
                <motion.div className="popup-black-screen" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}></motion.div>
                <motion.div 
                    transition={{ease: "easeInOut", duration: 0.08}} 
                    initial={{transform: "scale(0, 0)"}} 
                    animate={{transform: "scale(1, 1)"}} 
                    exit={{transform: "scale(0, 0)"}}
                    className="popup-div"

                    onClick={()=>{setPopupOpen(false)}}
                    >
                    <div className="popup-desc">RULES</div>
                    <div className="popup-rules"><img src={SVG_rules}/></div>
                    <div className="popup-close"><img src={SVG_icon_close}/></div>
                </motion.div>
                </React.Fragment>:""}
            </AnimatePresence>
        </div>
    );
}

export default App;
