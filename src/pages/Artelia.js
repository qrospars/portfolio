import React from 'react';

function Artelia() {
    return (
        <div className={'work-hover'}>
            <h1 className="work-hover-text-title">
                Artelia
            </h1>
            <div className="work-hover-text-content">
                <p className="work-hover-text-content-p">
                    In 2018, I developed a maritime traffic tool for Artelia and Total groups. They asked me to make in
                    3 months
                    a complete tool that would analyse AIS data, turn it into a database and finally analyse it using a
                    web-based application.

                    <p>I used web technologies like d3.js for making charts and mapbox / leaflet for making maps</p>
                </p>
                <img className="work-hover-text-content-im" src={`/images/Artelia_2.png`}/>
                <p className="work-hover-text-content-p">
                    I had to make a web scraping of about 1300 ships on three different websites to take
                    information about these ships.
                    For that, I mainly used BeautifulSoup, a Python's library.
                </p>
                <img className="work-hover-text-content-im" src={`images/Artelia_6.png`}/>
                <p className="work-hover-text-content-p">
                    I am really proud of the final result, even if it is still in development. Unfortunately, I
                    can't tell you more about
                    the way I made it or the final purpose of the project because it is completely confidential,
                    but you will find some screenshots
                    below :
                </p>
                <img className="work-hover-text-content-im" src={`images/Artelia_3.png`}/>
                <img className="work-hover-text-content-im" src={`images/Artelia_4.png`}/>
                <img className="work-hover-text-content-im" src={`images/Artelia_5.png`}/>
                <img className="work-hover-text-content-im" src={`images/Artelia_7.png`}/>
                <a className="work-hover-text-content-link"
                   href="https://www.arteliagroup.com/en" target="_blank">
                    Artelia Group
                </a>
            </div>
        </div>
    )
}

export default Artelia;