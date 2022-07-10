import React, {useEffect, useState} from 'react';
import Carousel from "react-bootstrap/Carousel";
import Artelia from "../pages/Artelia";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import POCS from "../pages/POCS";
import Cytoo from "../pages/Cytoo";

const carouselContent = {
    artelia: {
        img: '/images/Artelia.jpg',
        caption: {
            title: 'Maritime Traffic Tool',
            subtitle: 'Explore the maritime traffic in the Abidjan\'s port.',
        },
        overlayContent: <Artelia/>
    },
    pocs: {
        img: '/images/POCS_1.png',
        caption: {
            title: 'What do we mean by interaction?',
            subtitle: 'A visual exploration of a century of Human-Computer Interaction.',
        },
        overlayContent: <POCS/>
    },
    cytoo: {
        img: '/images/Cytoo.png',
        caption: {
            title: 'Muscle Fibers Finder',
            subtitle: 'An image processing application to predict a drug efficiency.',
        },
        overlayContent: <Cytoo/>
    },
};

export default function ProjectCarousel({
                                        }) {
    const defaultSpeed = 10000;
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [pauseCarousel, setPauseCarousel] = useState(defaultSpeed);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [currentOverlayContent, setCurrentOverlayContent] = useState(<Artelia/>);
    const handleSelect = (selectedIndex) => {
        setCarouselIndex(selectedIndex);
    };
    const showOverlay = () => {
        document.querySelector('.scroll-container').classList.toggle('noscroll');
        try {
            setCurrentOverlayContent(Object
                .values(carouselContent)
                .find((project, index) => index === carouselIndex)
                .overlayContent
            );
        } catch (e) {
            setCurrentOverlayContent(<Artelia/>)
        }
        setIsOverlayVisible(true);
        setPauseCarousel(null);
    };
    const hideOverlay = () => {
        document.querySelector('.scroll-container').classList.toggle('noscroll');
        setIsOverlayVisible(false);
        setPauseCarousel(defaultSpeed)
    };
    useEffect(() => {
        window.onpopstate = e => {
            if(isOverlayVisible) {
                console.log('test')
                e.preventDefault();
                hideOverlay();
            }
        }
    });
    return (
        <>
            <div id={`carouselOverlay`} className={`${isOverlayVisible ? 'visible' : ''}`}>
                <div className={'backIcon'} onClick={hideOverlay}>
                    <div style={{position:'sticky'}}>
                    <FontAwesomeIcon icon={faArrowLeft}/></div>
                </div>
                {currentOverlayContent}
            </div>
            <Carousel activeIndex={carouselIndex} onSelect={handleSelect} interval={pauseCarousel}>
                {
                    Object.values(carouselContent).map((project, index) => {
                        return (
                            <Carousel.Item className="work-grid-list-item" onClick={showOverlay}
                                           key={Object.keys(carouselContent)[index]}>
                                <img src={process.env.PUBLIC_URL + project.img}/>
                                <Carousel.Caption>
                                    <h3 className={'text--medium font--title'}>{project.caption.title}</h3>
                                    <p className={'text--subtitle'}>{project.caption.subtitle}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </>
    )
}
