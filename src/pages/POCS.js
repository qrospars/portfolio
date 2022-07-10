import React from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

export default function POCS() {
    return (
        <div className={'work-hover'}>
            <h1 className="work-hover-text-title">
                Data visualization project<br/>
                "What do we mean by interaction?"

            </h1>
            <div className="work-hover-text-content font--paragraph text--paragraph">
                <p className="work-hover-text-content-p">
                    In 2019, I developed a web application allowing the user to explore a dataset of the last 35 years of research papers
                    in the field of Human-Computer Interaction. It took me 6 months to make it.
                    <br/>
                        I used technologies such as React and D3 to make it. Making it taught me a lot about User Experience design within
                        a web app development.
                </p>
                <Zoom><img className="work-hover-text-content-im" src={`${process.env.PUBLIC_URL}/images/POCS_1.png`}/></Zoom>
                <p className="work-hover-text-content-p">
                    It was text-related data, so I had to find meaningful ways of representing that type of data. But also give powerful
                    exploration tools to the user. For example, the user can analyze the dataset in its whole or at a paper-level.
                    I used Python for data cleaning and Javascript (JSON objects) for making the objects that D3 will use to make the graphs.
                </p>
                <Zoom><img className="work-hover-text-content-im" src={`${process.env.PUBLIC_URL}/images/POCS_2.png`}/></Zoom>
                <p className="work-hover-text-content-p">
                    I also implemented an OAuth connexion system to give the website's access only to a few people since the dataset
                    is confidential.
                </p>
                <Zoom><img className="work-hover-text-content-im" src={`${process.env.PUBLIC_URL}/images/POCS_3.png`}/></Zoom>
                <Zoom><img className="work-hover-text-content-im" src={`${process.env.PUBLIC_URL}/images/POCS_4.png`}/></Zoom>
            </div>
        </div>
    )
}
