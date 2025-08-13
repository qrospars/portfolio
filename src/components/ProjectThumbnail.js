import React, { useRef, useEffect } from "react";
import Zoom from "react-medium-image-zoom";
import 'react-medium-image-zoom/dist/styles.css'

export default function ProjectThumbnail({ image, name, client, tags, year, description }) {

    return (
        <div className={`projectThumbnail`} data-content>
            {image.includes('mp4') ?
                <Zoom><video
                    width={window.width < 769 ? "180" : "300"}
                    autoPlay loop>
                    <source src={image} type="video/mp4">
                    </source>
                    Your browser does not support the video tag.
                </video></Zoom> :
                <Zoom>
                    <img src={image} alt={image} />
                </Zoom>
            }
            <div className={'projectThumbnail__content'}>
                {name && <p className={'font--title'}>{name}</p>}
                {client && <p className={'text--paragraph '}>Client: {client}</p>}
                {tags && <p className={'text--paragraph'}>Tags: {tags}</p>}
                {year && <p className={'text--paragraph'}>Year: {year}</p>}
                {description && <p className={'text--space'} />}
                {description && <p className={'text--paragraph'}>{description}</p>}
            </div>
        </div>
    )
}
