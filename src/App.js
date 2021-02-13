import logo from './logo.svg';
import './App.css';
import React, {useEffect, useRef, useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel'

function App() {
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const pageRefs = [
        useRef(null),
        useRef(null),
        useRef(null),
        useRef(null),
    ];
    const [scrollTop, setScrollTop] = useState(0);
    let scrolling = true;
    useEffect(() => {
        const onScroll = e => {
            if (scrolling) return;
            console.log(scrollTop);
            scrolling = true;
            const newScrollValue = e.target.documentElement.scrollTop;
            if (newScrollValue > scrollTop) {
                pageRefs[currentPageIndex + 1].current.scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                    inline: "nearest"
                });
                pageRefs[currentPageIndex + 1].current.focus({preventScroll: true});
                setCurrentPageIndex(currentPageIndex + 1)
            }
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop]);
    return (
        <div className="App">
            <div className="home">
                <a className="js-scrollTo" href="#page-0">
                    <i id="home-button" className="fas fa-chart-pie home-icon"></i>
                </a>
            </div>
            <div id={'canvas'}/>
            <div id="page-0" className="page" ref={pageRefs[0]}>
                <div className="menu-wrapper">
                    <div className="presentation">
                        <span className="presentation-text">
                            Hi, I'm Quentin. You can find some of my work here, just have a look _
                        </span>
                    </div>
                </div>
                <div className="menu">
                    <ul className="menu-list">
                        <li className="menu-list-item">
                            <a className="js-scrollTo" href="#page-1"><span>Work</span></a>
                        </li>
                        <li className="menu-list-item">
                            <a className="js-scrollTo" href="#page-2"><span>Blog</span></a>
                        </li>
                        <li className="menu-list-item">
                            <a className="js-scrollTo" href="#page-3"><span>About</span></a>
                        </li>
                    </ul>
                    <div className="menu-icon">
                        <div className="menu-icon-arrow">
                            <a className="js-scrollTo" href="#page-1">
                                <i className="fas fa-long-arrow-alt-down"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div id="page-1" className="page page--dark" ref={pageRefs[1]}>
                <div className="work-grid">
                    <Carousel>
                        <Carousel.Item className="work-grid-list-item">
                            <img src="images/Twitch.jpg"/>
                            <Carousel.Caption>
                                <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                                <p className={'text--paragraph'}>Twitch Channel</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="work-grid-list-item">
                            <img src="images/POCS_1.png"/>
                            <Carousel.Caption>
                                <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                                <p className={'text--paragraph'}>Twitch Channel</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="work-grid-list-item">
                            <img src="images/Cytoo.png"/>
                            <Carousel.Caption>
                                <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                                <p className={'text--paragraph'}>Twitch Channel</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="work-grid-list-item">
                            <img src="images/Artelia.jpg"/>
                            <Carousel.Caption>
                                <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                                <p className={'text--paragraph'}>Twitch Channel</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="work-grid-list-item">
                            <img src="images/Twitch.jpg"/>
                            <Carousel.Caption>
                                <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                                <p className={'text--paragraph'}>Twitch Channel</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item className="work-grid-list-item">
                            <img src="images/Lappart1.png"/>
                            <Carousel.Caption>
                                <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                                <p className={'text--paragraph'}>Twitch Channel</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
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
            <div ref={pageRefs[2]} id="page-2" className="page page--light">
                <div className="blog-container">
                    <div className="blog-container-text">
                        <span>Blog coming soon...</span>
                    </div>
                    <div className="blog-container-image">

                    </div>
                </div>
            </div>
            <div ref={pageRefs[3]} id="page-3" className="page page--dark">
                <img className="about-photo" src="images/profil.jpg"/>
                <div className="about-container">
                    <div className="about-text text--medium">
                        <div>
                            I'm a french computer science and applied mathematics student based in Copenhagen.
                        </div>
                        <div>
                            I'm a huge fan of Art though. So I'm trying to link these two fields within my work.
                            Don't hesitate to take a look to my Data Visualization work!
                        </div>
                        <div>If you want to contact me, you can send me an email at :
                            <a href="mailto:rospars.quentin@outlook.com" target="_top">rospars.quentin@outlook.com</a>
                        </div>
                    </div>
                    <div className="about-logos-container">
                        <a href="https://www.linkedin.com/in/quentin-rospars-a073b6150/" target="_blank"><i
                            className="fab fa-linkedin-in"></i></a>
                        <a href="https://www.facebook.com/RosparsQuentin/" target="_blank"><i
                            className="fab fa-facebook-f"></i></a>
                        <a href="https://twitter.com/Miionu" target="_blank"><i className="fab fa-twitter"></i></a>
                        <a href="https://github.com/qrospars" target="_blank"><i
                            className="fab fa-github-alt"></i></a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
