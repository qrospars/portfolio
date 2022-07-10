import React from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function Cytoo() {
    return (
        <div className={'work-hover'}>
            <h1 className="work-hover-text-title">
                SeekStries
            </h1>
            <div className="work-hover-text-content font--paragraph text--paragraph">
                <p className="work-hover-text-content-p">
                    CYTOO company asked me and some of my schoolmates at university to create an image processing tool
                    to analyse many muscular fibers images at once, and find striations within.<br/><br/>
                    You can see an example of an image that they gave us below :
                </p>
                <Zoom><img className="work-hover-text-content-im" src={`${process.env.PUBLIC_URL}/images/Cytoo_Stries.jpg`}/></Zoom>
                <p className="work-hover-text-content-p">
                    We had one full-time month to develop it, and each one of us had specific tasks to accomplish. <br/>
                    We used Python to develop it, even for the graphic interface.<br/>
                    I used LBP patterns and k-means algorithms to recognize striations inside the images,
                    and it worked pretty well. We improved it using machine learning.<br/>
                    You can find the github link below and clone it if you want to test the software :
                </p>
                <a className="work-hover-text-content-link" href="https://github.com/PierreBlancfat/SeekstriesCytoo"
                   target="_blank">
                    https://github.com/PierreBlancfat/SeekstriesCytoo
                </a>
            </div>
        </div>
    )
}
