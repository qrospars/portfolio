import React, { useEffect, useState } from 'react';
import Carousel from "react-bootstrap/Carousel";

import Artelia from "../pages/Artelia";
import POCS from "../pages/POCS";
import Cytoo from "../pages/Cytoo";
import KPIFramework from "../pages/KPI";

const carouselContent = {
    artelia: {
        img: '/images/Artelia.jpg',
        caption: {
            title: 'Maritime Traffic Tool',
            subtitle: 'Explore the maritime traffic in the Abidjan\'s port.',
        },
        overlayContent: <Artelia />
    },
    kpi: {
        img: '/images/kpi_thumbnail.png',
        caption: {
            title: 'KPI Frameworks for UX Optimisations',
            subtitle: 'From goals to signals: building a KPI framework that teams use',
        },
        overlayContent: <KPIFramework />
    },
    pocs: {
        img: '/images/POCS_1.png',
        caption: {
            title: 'What do we mean by interaction?',
            subtitle: 'A visual exploration of a century of Human-Computer Interaction.',
        },
        overlayContent: <POCS />
    },
    cytoo: {
        img: '/images/Cytoo.png',
        caption: {
            title: 'Muscle Fibers Finder',
            subtitle: 'An image processing application to predict a drug efficiency.',
        },
        overlayContent: <Cytoo />
    },
};

export default function ProjectCarousel({ showOverlay, pauseCarousel }) {
    const [carouselIndex, setCarouselIndex] = useState(0);
    const handleSelect = (selectedIndex) => {
        setCarouselIndex(selectedIndex);
    };
    const setContentAndShowOverlay = () => {
        try {
            showOverlay(
                Object
                    .values(carouselContent)
                    .find((project, index) => index === carouselIndex)
                    .overlayContent
            );
        } catch (e) {
            showOverlay(<Artelia />)
        }
    };
    return (
        <>
            <Carousel activeIndex={carouselIndex} onSelect={handleSelect} interval={pauseCarousel}>
                {
                    Object.values(carouselContent).map((project, index) => {
                        return (
                            <Carousel.Item className="work-grid-list-item" onClick={setContentAndShowOverlay}
                                key={Object.keys(carouselContent)[index]}>
                                <img src={process.env.PUBLIC_URL + project.img} />
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
