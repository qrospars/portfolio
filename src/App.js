import logo from './logo.svg';
import './App.css';
import React from 'react';

function App() {
    return (
        <div className="App">
            <div className="home">
                <a className="js-scrollTo" href="#page-0">
                    <i id="home-button" className="fas fa-chart-pie home-icon"></i>
                </a>
            </div>
            <div id={'canvas'}/>
            <div id="page-0" className="page">
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
            <div id="page-1" className="page page--dark">
                <div className="work-grid">
                    <ul id="js-work-grid" className="work-grid-list">
                        <li id="js-work-grid-item-1" className="work-grid-list-item">
                            <img src="images/Twitch.jpg"/>
                        </li>
                        <li id="js-work-grid-item-2" className="work-grid-list-item  work-grid-list-item-courant"
                            // onClick="addOverlay('POCS')"
                        >
                            <img src="images/POCS_1.png"/>
                        </li>
                        <li id="js-work-grid-item-3" className="work-grid-list-item">
                            <img src="images/Cytoo.png"/>
                        </li>
                        <li id="js-work-grid-item-4" className="work-grid-list-item">
                            <img src="images/Artelia.jpg"/>
                        </li>
                        <li id="js-work-grid-item-5" className="work-grid-list-item">
                            <img src="images/Twitch.jpg"/>
                        </li>
                        <li id="js-work-grid-item-6" className="work-grid-list-item">
                            <img src="images/Lappart.png"/>
                        </li>
                    </ul>
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
                    <div className="blog-container-text">
                        <span>Blog coming soon...</span>
                    </div>
                    <div className="blog-container-image">

                    </div>
                </div>
            </div>
            <div id="page-3" className="page page--dark">
                <div className="about-container">
                    <div className="about-text">
                        <p>
                            I'm a french computer science and applied mathematics student based in Copenhagen.
                        </p>
                        <p>
                            I'm a huge fan of Art though. So I'm trying to link these two fields within my work.
                            Don't hesitate to take a look to my Data Visualization work!
                        </p>
                        If you want to contact me, you can send me an email at :
                        <a href="mailto:rospars.quentin@outlook.com" target="_top">rospars.quentin@outlook.com</a>
                    </div>
                    <div className="about-logos">
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
                <div className="about-photo-container">
                    <img className="about-photo" src="images/profil.jpg"/>
                </div>
            </div>
        </div>
    );
}

export default App;
