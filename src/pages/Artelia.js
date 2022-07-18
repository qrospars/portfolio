import React from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function Artelia() {
    return (
        <div className={'work-hover'}>
            <h1 className="work-hover-text-title">
                Artelia
            </h1>
            <div className="work-hover-text-content font--paragraph text--paragraph">
                <p className="work-hover-text-content-p">
                    In 2018, I developed a maritime traffic tool for Artelia and Total groups. They asked me to make in
                    3 months
                    a complete tool that would analyse AIS data, turn it into a database and finally analyse it using a
                    web-based application.

                    <br/>I used web technologies like d3.js for making charts and mapbox / leaflet to create the maps
                </p>
                <Zoom><img className="work-hover-text-content-im"
                           src={`${process.env.PUBLIC_URL}/images/Artelia_2.png`}/></Zoom>
                <p className="work-hover-text-content-p">
                    The database was created using web scraping techniques, where I gathered information on about 1300 ships on three different websites.
                    I mostly used BeautifulSoup, a Python's library, to do the web scraping.
                </p>
                <Zoom><img className="work-hover-text-content-im"
                           src={`${process.env.PUBLIC_URL}/images/Artelia_6.png`}/></Zoom>
                <p className="work-hover-text-content-p">
                    I am really proud of the final result. The data visualizations created during this project still inspires me today, and I would love to design
                    something more creative out of those.
                    Due to confidentiality, I
                    cannot elaborate further on the behind the scenes or the final purpose,
                    but you will find some screenshots
                    below :
                </p>
                <Zoom><img className="work-hover-text-content-im"
                           src={`${process.env.PUBLIC_URL}/images/Artelia_3.png`}/></Zoom>
                <Zoom><img className="work-hover-text-content-im"
                           src={`${process.env.PUBLIC_URL}/images/Artelia_4.png`}/></Zoom>
                <Zoom><img className="work-hover-text-content-im"
                           src={`${process.env.PUBLIC_URL}/images/Artelia_5.png`}/></Zoom>
                <Zoom><img className="work-hover-text-content-im"
                           src={`${process.env.PUBLIC_URL}/images/Artelia_7.png`}/></Zoom>
                <div>
                    <a className="work-hover-text-content-link"
                       href="https://www.arteliagroup.com/en" target="_blank">
                        Artelia Group
                    </a>
                </div>
            </div>
        </div>
    )
}
