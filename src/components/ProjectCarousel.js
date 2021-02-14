import React, {useState} from 'react';
import Carousel from "react-bootstrap/Carousel";
import Artelia from "../pages/Artelia";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

export default function ProjectCarousel() {
    const defaultSpeed = 1000;
    const [carouselIndex, setCarouselIndex] = useState(0);
    const [pauseCarousel, setPauseCarousel] = useState(defaultSpeed);
    const handleSelect = (selectedIndex) => {
        setCarouselIndex(selectedIndex);
    };
    const showOverlay = () => {
        setPauseCarousel(null)
    };
    const currentOverlayContent = <Artelia/>;
    return (
        <>
            <div id={'carouselOverlay'}>
                <div className={'backIcon'}>
                    <FontAwesomeIcon icon={faArrowLeft}/>
                </div>
                {currentOverlayContent}
            </div>
            <Carousel activeIndex={carouselIndex} onSelect={handleSelect} interval={pauseCarousel}
                      onClick={showOverlay}>
                <Carousel.Item className="work-grid-list-item">
                    <img src="../images/Twitch.jpg"/>
                    <Carousel.Caption>
                        <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                        <p className={'text--paragraph'}>Twitch Channel</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="work-grid-list-item">
                    <img src="../images/POCS_1.png"/>
                    <Carousel.Caption>
                        <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                        <p className={'text--paragraph'}>Twitch Channel</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="work-grid-list-item">
                    <img src="../images/Cytoo.png"/>
                    <Carousel.Caption>
                        <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                        <p className={'text--paragraph'}>Twitch Channel</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="work-grid-list-item">
                    <img src="../images/Artelia.jpg"/>
                    <Carousel.Caption>
                        <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                        <p className={'text--paragraph'}>Twitch Channel</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="work-grid-list-item">
                    <img src="../images/Twitch.jpg"/>
                    <Carousel.Caption>
                        <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                        <p className={'text--paragraph'}>Twitch Channel</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className="work-grid-list-item">
                    <img src="../images/Lappart1.png"/>
                    <Carousel.Caption>
                        <h3 className={'text--medium'}>What Do We Mean by Interaction?</h3>
                        <p className={'text--paragraph'}>Twitch Channel</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </>
    )
}