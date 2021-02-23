import logo from './logo.svg';
import './App.css';
import React, {useEffect, useRef, useState} from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectCarousel from "./components/ProjectCarousel";

function App() {
    useEffect(
        () => {
            const sections = [...document.querySelectorAll(".page")];
            let options = {
                rootMargin: "0px",
                threshold: 0.75
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
        },
        [],
    );

    return (
        <div id={'app'} className="App">
            <div className="home">
                <a onClick={() => document.getElementById("page-0").scrollIntoView({behavior: 'smooth'})}>
                    <i id="home-button" className="fas fa-home home-icon"></i>
                </a>
            </div>
            <div id={'canvas'}/>
            <div className={"scroll-container"}>
                <div className={"scroll-container2"}>
                    <div id="page-0" className="page">
                        <div className="menu-wrapper" data-content>
                            <div className="presentation">
                        <span className="presentation-text data">
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
                    <div id="page-1" className="page page--dark">
                        <div className="work-grid data" data-content>
                            <ProjectCarousel />
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
                                <span>Blog coming soon...</span>
                            </div>
                            <div className="blog-container-image">
                            </div>
                        </div>
                    </div>
                    <div id="page-3" className="page page--dark">
                        <img className="about-photo" src={process.env.PUBLIC_URL + "/images/profil.jpg"}/>
                        <div className="about-container">
                            <div className="about-text text--medium data" data-content>
                                <div>
                                    I'm a french computer scientist working as a consultant for <a
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
                                    If you think I am someone interesting to talk to, don't hesitate to send me an email
                                    <a href="mailto:rospars.quentin@outlook.com"
                                       target="_top" style={{color: 'white'}}> rospars.quentin@outlook.com</a> or follow
                                    me on my social media! ❤
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
            </div>
        </div>
    );
}

export default App;
