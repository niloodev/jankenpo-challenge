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
    // Popup aberto?
    const [popupOpen, setPopupOpen] = useState(false);

    //////////////////////////////////////////////////// Funções do jogo em si.
    const [handSelected, setHandSelected] = useState("");
    const [homeHand, setHomeHand] = useState("");
    const [matchStatus, setMatchStatus] = useState(0);

    // Checa a vitória ou derrota da primeira mão em relação a segunda.
    function handCheck(handOne, handTwo){
        if(handOne == handTwo) {setMatchStatus(3); return "draw";}
        switch(handOne){
            case "scissors":
                if(handTwo == "paper" || handTwo == "lizard") {setMatchStatus(1); return "win";}
                else {setMatchStatus(2); return "lose";}
                break;
            case "paper":
                if(handTwo == "rock" || handTwo == "spock") {setMatchStatus(1); return "win";}
                else {setMatchStatus(2); return "lose";}
                break;
            case "rock":
                if(handTwo == "lizard" || handTwo == "scissors") {setMatchStatus(1); return "win";}
                else {setMatchStatus(2); return "lose";}
                break;
            case "lizard":
                if(handTwo == "paper" || handTwo == "spock") {setMatchStatus(1); return "win";}
                else {setMatchStatus(2); return "lose";}
                break;
            case "spock":
                if(handTwo == "scissors" || handTwo == "rock") {setMatchStatus(1); return "win";}
                else {setMatchStatus(2); return "lose";}
                break;
        }
    }

    // Gera uma mão aleatória para o bot do jogo.
    function homeHandAltSelect(handSelected){
        var array = ["scissors", "paper", "rock", "lizard", "spock"];
        var location = Math.floor(5  *Math.random());
        
        let index = (location != 0)? location - 1 : location;

        setHomeHand(array[index]);
        setTimeout(()=>{
            handCheck(handSelected, array[index]);
        }, 1000);
    }

    // Define a mão do jogador.
    function setHand(handId){
        setHandSelected(handId);
        setTimeout(()=>{
            homeHandAltSelect(handId);
        }, 1500);
    }

    // Pega o id de uma mão e retorna seu componente modificado.
    function showHand(hand, autor){
        return (
            (hand != "")?
            <motion.div key={hand + "0"} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="select-button-div" id={hand} style={{position: "relative"}}>
                <div className="select-button">
                    {
                        (hand == "scissors")?     
                        <img src={SVG_icon_scissors} />:
                        (hand == "paper")?
                        <img src={SVG_icon_paper} />:
                        (hand == "rock")?
                        <img src={SVG_icon_rock} />:
                        (hand == "lizard")?
                        <img src={SVG_icon_lizard} />:
                        (hand == "spock")?
                        <img src={SVG_icon_spock} />:
                        ""
                    }
                </div>
                <div className="game-tag">
                    {
                        (autor == "you")?"YOU PICKED":"THE HOUSE PICKED"
                    }
                </div>
            </motion.div>:
            <motion.div key={hand + "1"} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="select-button-div select-empty-button-div" style={{position: "relative"}}>
                <div className="select-button select-empty-button">
                </div>
                <div className="game-tag">
                    {
                        (autor == "you")?"YOU PICKED":"THE HOUSE PICKED"
                    }
                </div>
            </motion.div>
        );
    }

    return (
        <div className="main-div">

            {/* Cabeçalho principal */}
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

            {/* Container principal, onde as páginas do jogo serão incluídas. */}
            <div className="select-box">
                <AnimatePresence exitBeforeEnter>
                {
                    (handSelected == "")?
                    <motion.div 
                        key="select"
                        initial={{transform: "scale(0.3, 0.3)", opacity: 0}}
                        animate={{transform: "scale(1, 1)", opacity: 1}}
                        exit={{transform: "scale(0.3, 0.3)", opacity: 0}}

                        className="select">
                        <img src={SVG_bg_pentagon} className="select-bg-pentagon"/>

                        <div className="select-button-div" id="scissors" onClick={()=>{setHand("scissors")}} style={{top: "-35px"}}>
                            <div className="select-button">
                                <img src={SVG_icon_scissors} />
                            </div>
                        </div>

                        <div className="select-button-div" id="paper" onClick={()=>{setHand("paper")}} style={{right: "-35px", top: "19%"}}>
                            <div className="select-button">
                                <img src={SVG_icon_paper} />
                            </div>
                        </div>

                        <div className="select-button-div" id="rock" onClick={()=>{setHand("rock")}} style={{right: "4%", bottom: "-35px"}}>
                            <div className="select-button">
                                <img src={SVG_icon_rock} />
                            </div>
                        </div>

                        <div className="select-button-div" id="lizard" onClick={()=>{setHand("lizard")}} style={{left: "4%", bottom: "-35px"}}>
                            <div className="select-button">
                                <img src={SVG_icon_lizard} />
                            </div>
                        </div>

                        <div className="select-button-div" id="spock" onClick={()=>{setHand("spock")}} style={{left: "-35px", top: "19%"}}>
                            <div className="select-button">
                                <img src={SVG_icon_spock} />
                            </div>
                        </div>     
                    </motion.div>:
                    <React.Fragment>
                        <motion.div
                            onClick={()=>{console.log(matchStatus)}}
                            key="game"
                            className="game-box"
                            initial={{transform: "scale(0.3, 0.3)", opacity: 0}}
                            animate={{transform: "scale(1, 1)", opacity: 1}}
                            exit={{transform: "scale(0.3, 0.3)", opacity: 0}}>
                            <AnimatePresence exitBeforeEnter>
                                {showHand(handSelected, "you")}
                            </AnimatePresence> <AnimatePresence exitBeforeEnter>
                                {showHand(homeHand)}
                            </AnimatePresence>
                        </motion.div>
                        {
                            (matchStatus != 0)?
                            <motion.div
                                key="game-results"
                                className="game-results-box"
                                initial={{transform: "scale(0.3, 0.3)", opacity: 0}}
                                animate={{transform: "scale(1, 1)", opacity: 1}}
                                exit={{transform: "scale(0.3, 0.3)", opacity: 0}}>
                                {
                                    (matchStatus == 1)?"vitória o bravo":(matchStatus == 2)?"derrota lixo":"empata foda"
                                }
                            </motion.div>:""
                        }
                        
                    </React.Fragment>
                }
                </AnimatePresence>
            </div>

            {/* ----------- Botão de Regras ----------- */}
            <div className="bottom-box">
                <div className="rules-button" onClick={()=>{setPopupOpen(true)}}>
                    RULES
                </div>
            </div>
            {/* --------------------------------------- */}

            
            {/* Popup de regras com AnimatePresence para regular a animação de entrada e saída */}
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
