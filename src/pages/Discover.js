import React from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function Discover() {
    return (
        <div className={'work-hover discover__container'}>
            <h1 className="work-hover-text-title">
                Discover
            </h1>
            <div className="work-hover-text-content font--paragraph text--paragraph">
                <p className="work-hover-text-content-p">
                    In 2018, I developed a maritime traffic tool for Artelia and Total groups. They asked me to make in
                    3 months
                    a complete tool that would analyse AIS data, turn it into a database and finally analyse it using a
                    web-based application.

                    <br/>I used web technologies like d3.js for making charts and mapbox / leaflet for making maps
                </p>
                <Zoom><img className="work-hover-text-content-im" src={`${process.env.PUBLIC_URL}/images/Artelia_2.png`}/></Zoom>
                <p className="work-hover-text-content-p">
                    I had to make a web scraping of about 1300 ships on three different websites to take
                    information about these ships.
                    For that, I mainly used BeautifulSoup, a Python's library.
                </p>
                <Zoom><img className="work-hover-text-content-im" src={`${process.env.PUBLIC_URL}/images/Artelia_6.png`}/></Zoom>
                <p className="work-hover-text-content-p">
                    I am really proud of the final result, even if it is still in development. Unfortunately, I
                    can't tell you more about
                    the way I made it or the final purpose of the project because it is completely confidential,
                    but you will find some screenshots
                    below :
                </p>
                <Zoom><img className="work-hover-text-content-im" src={`${process.env.PUBLIC_URL}/images/Artelia_3.png`}/></Zoom>
                <Zoom><img className="work-hover-text-content-im" src={`${process.env.PUBLIC_URL}/images/Artelia_4.png`}/></Zoom>
                <Zoom><img className="work-hover-text-content-im" src={`${process.env.PUBLIC_URL}/images/Artelia_5.png`}/></Zoom>
                <Zoom><img className="work-hover-text-content-im" src={`${process.env.PUBLIC_URL}/images/Artelia_7.png`}/></Zoom>
                <a className="work-hover-text-content-link"
                   href="https://www.arteliagroup.com/en" target="_blank">
                    Artelia Group
                </a>
            </div>
        </div>
    )
}
