import logo from './logo.svg';
import './App.css';
import React, {useEffect, useRef, useState} from 'react';
import {Parallax} from 'react-scroll-parallax';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectCarousel from "./components/ProjectCarousel";
import Artelia from "./pages/Artelia";
import POCS from "./pages/POCS";
import Cytoo from "./pages/Cytoo";
import Discover from "./pages/Discover";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

function App() {
    // const { ref2 } = useParallax({ speed: 10 });
    // const { ref3 } = useParallax({ speed: 20 });
    useEffect( // make the content visible
        () => {
            const sections = [...document.querySelectorAll(".page")];
            let options = {
                rootMargin: "0px", threshold: 0.75
            };

            const callback = (entries, observer) => {
                entries.forEach(entry => {
                    const {target} = entry;
                    if (entry.intersectionRatio >= 0.75) {
                        target.classList.add("is-visible");
                    } else {
                        target.classList.remove("is-visible");
                    }
                });
            };

            const observer = new IntersectionObserver(callback, options);

            sections.forEach((section, index) => {
                const sectionChildren = [...section.querySelector("[data-content]").children];

                sectionChildren.forEach((el, index) => {
                    el.style.setProperty("--delay", `${index * 250}ms`);
                });

                observer.observe(section);
            });
        }, []);

    // function logit() {
    //     console.log(window.scrollY)
    //     let homeButton = document.getElementById("homeButton")
    //     if (window.scrollY > window.innerHeight) {
    //         homeButton.button.classList.toggle("textColor--white")
    //     }
    // }
    //
    // useEffect(() => {
    //     console.log("watch")
    //     function watchScroll() {
    //         document.getElementById("scrollContainer").addEventListener("scroll", logit);
    //     }
    //
    //     watchScroll();
    //     return () => {
    //         console.log("remove")
    //         document.getElementById("scrollContainer").removeEventListener("scroll", logit);
    //     };
    // })

    /* Overlay Logic */

    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [additionalClass, setAdditionalClass] = useState('');
    const [currentOverlayContent, setCurrentOverlayContent] = useState(<Artelia/>);
    const defaultSpeed = 10000;
    const [pauseCarousel, setPauseCarousel] = useState(defaultSpeed);
    const myRef = useRef(null)
    const showOverlay = (overlayContent, additionalClass = '') => {
        document.getElementById("carouselOverlay").scroll(0, 0)
        setAdditionalClass(additionalClass);
        document.querySelector('.scroll-container').classList.toggle('noscroll');
        setCurrentOverlayContent(overlayContent);
        setIsOverlayVisible(true);
    };
    const hideOverlay = () => {
        document.querySelector('.scroll-container').classList.toggle('noscroll');
        setIsOverlayVisible(false);
        setPauseCarousel(defaultSpeed);
    };
    useEffect(() => {
        window.onpopstate = e => {
            if (isOverlayVisible) {
                e.preventDefault();
                hideOverlay();
            }
        }
    });

    const overlayClasses = (isOverlayVisible ? 'visible ' : ' ') + additionalClass

    return (
        <div id={'app'} className="App">
            <div className="home text--paragraph font--title textColor--white">
                <a onClick={() => document.getElementById("page-0").scrollIntoView({behavior: 'smooth'})}>
                    <span id={"homeButton"}>Quentin Rospars</span>
                </a>
            </div>
            <div className="home contact text--paragraph font--title textColor--white">
                <a onClick={() => document.getElementById("page-3").scrollIntoView({behavior: 'smooth'})}>
                    <span>Contact</span>
                </a>
            </div>
            <div id={'canvas'}/>
            <div className={"scroll-container"}>
                <div id={"scrollContainer"} className={"scroll-container2"}>
                    <div id="page-0" className="page">

                        <div className="menu-wrapper" data-content>
                            <div className="presentation">
                                <p className="presentation-text font--title data">
                                    Hi, I'm Quentin.
                                </p>
                                <p className="text--subtitle data">
                                    You can find some of my work here; have a look _
                                </p>
                            </div>
                        </div>
                        <div className="menu">
                            <ul className="menu-list text--paragraph font--title">
                                <li className="menu-list-item">
                                    <a className="js-scrollTo" href="#page-1"><span>Work</span></a>
                                </li>
                                <li className="menu-list-item">
                                    <a className="js-scrollTo" href="#page-2"><span>My Universe</span></a>
                                </li>
                                <li className="menu-list-item">
                                    <a className="js-scrollTo" href="#page-3"><span>About</span></a>
                                </li>
                            </ul>
                            {/*<div className="menu-icon">*/}
                            {/*    <div className="menu-icon-arrow">*/}
                            {/*        <a className="js-scrollTo" href="#page-1">*/}
                            {/*            <i className="fas fa-long-arrow-alt-down"></i>*/}
                            {/*        </a>*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                    <div id="page-1" className="page page--dark">
                        <div className="work-grid data" data-content>
                            <ProjectCarousel
                                isOverlayVisible={isOverlayVisible}
                                hideOverlay={hideOverlay}
                                currentOverlayContent={currentOverlayContent}
                                showOverlay={showOverlay}
                                pauseCarousel={pauseCarousel}
                            />
                        </div>
                        <div id="js-work-hover" className="work-hover">
                            <div id="js-work-hover-text" className="work-hover-text">
                                <div w3-include-html="pages/projects_sumUp/POCS.html"></div>
                            </div>
                            <div className="work-hover-return"
                                // onClick="removeOverlay()"
                            >
                                <i className="fas fa-caret-right"></i>
                            </div>
                        </div>
                    </div>
                    <div id="page-2" className="page page--light">
                        <div className="blog-container">
                            <div className="blog-container-text data" data-content>
                                <span>My Universe</span>
                            </div>
                            <div className="blog-container-image">
                                <img className={"img1"}
                                     src={process.env.PUBLIC_URL + "/images/my_universe/petri photography work.png"}
                                     alt={"My_Universe_1"}/>
                                <img className={"img2"}
                                     src={process.env.PUBLIC_URL + "/images/my_universe/attraction 1.png"}
                                     alt={"My_Universe_2"}/>
                                <img className={"img3"}
                                     src={process.env.PUBLIC_URL + "/images/my_universe/Photography  series programatic deformation.png"}
                                     alt={"My_Universe_3"}/>
                                <div className={"button--square text--subtitle"}
                                     onClick={() => showOverlay(<Discover myRef={myRef}/>, 'discoverOverlay')}>
                                    Discover
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="page-3" className="page page--dark">
                        <img className="about-photo" src={process.env.PUBLIC_URL + "/images/profil.jpg"}/>
                        <div className="about-container">
                            <div className="about-text text--medium font--paragraph data" data-content>
                                <div>
                                    I'm a french computer scientist working as a UX optimisation consultant for <a
                                    href={'https://ecapacity.com/'} target={'_blank'}
                                    style={{color: 'white'}}>eCapacity</a>_<a
                                    href={'https://www.valtech.com'} target={'_blank'}
                                    style={{color: 'white'}}>Valtech</a> in Copenhagen.
                                </div>
                                <div>
                                    I always have been passionate about Art & Coding, and I try to link these two
                                    worlds in my work. My strongest skills are probably data visualization, UX
                                    optimization and web development.
                                </div>
                                <div>
                                    If you think I am someone interesting to talk to, don't hesitate to send me an
                                    email
                                    <a href="mailto:rospars.quentin@outlook.com"
                                       target="_top" style={{color: 'white'}}> rospars.quentin@outlook.com</a> or
                                    follow
                                    me on my social media! ❤
                                </div>
                            </div>
                            <div className="about-logos-container">
                                <a href="https://www.linkedin.com/in/quentin-rospars-a073b6150/" target="_blank"><i
                                    className="fab fa-linkedin-in"></i></a>
                                <a href="https://www.facebook.com/RosparsQuentin/" target="_blank"><i
                                    className="fab fa-facebook-f"></i></a>
                                <a href="https://twitter.com/Miionu"
                                   target="_blank"><i className="fab fa-twitter"></i></a>
                                <a href="https://github.com/qrospars" target="_blank"><i
                                    className="fab fa-github-alt"></i></a>
                            </div>
                        </div>
                    </div>
                    <div id={`carouselOverlay`} className={overlayClasses}>
                        <div className={'backIcon'} onClick={hideOverlay}>
                            <div style={{position: 'sticky'}}>
                                <FontAwesomeIcon icon={faArrowLeft}/></div>
                        </div>
                        {currentOverlayContent}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
