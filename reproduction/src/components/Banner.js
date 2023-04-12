import { useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import hedearing from "../assets/img/header-img.svg"
import 'animate.css';
import TrackVisibility from 'react-on-screen';



export const Banner = () => {
    const [loopNum, setLoopNum] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const toRotate = ["web Developer", "web Designer", "UI/UX designer"];
    const [text, setTexte] = useState('');
    const [delta, setDelta ] = useState(300 - Math.random() * 100)
    const period = 2000;



    useEffect(()=> {
       let ticker = setInterval(() => {
        tick()
       }, delta);

       
       return () => {clearInterval(ticker)}
    }, [text])

    const tick = () => {
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText= isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)

        setTexte(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta / 2)
        }
         if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        }else if (isDeleting && updatedText === ""){
            setIsDeleting(false);
            setLoopNum(loopNum + 1)
            setDelta(500);
        }
    }

    return(
        <section className="banner" id="home">
            <Container>
                <Row className="align-items-center">
                    <Col xs={12} md={6} xl={7} >
                        <TrackVisibility>
                        {({ isVisible }) => 
                            <div className={isVisible ? "animate__animated animate__fadeIn" : ""}>
                                <span className="tagline">Welcome to my Portfolio</span>
                                <h1>{`Hi i am a webdecoder`} <span className="wrap">{text}</span></h1>
                                <p>Lorem ipsum is a simply dummy text of the printing typesetting industry, lorem ipsum has been the industry's standard dummy since 1500s, when an unknown printer took a gallery of type and scramble it to make a type speimen book</p>
                                <button onClick={() => console.log('connect')}>Let's connect <ArrowRightCircle size={25} /></button>
                            </div>}
                        </TrackVisibility>
                    </Col>
                    <Col xs={12} md={6} xl={5} >
                        <img src={hedearing} alt="Header Img" />
                    </Col>
                </Row>
            </Container>
        </section>
    )
}