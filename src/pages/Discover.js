import React, {useEffect, useRef, useState} from 'react';
import ProjectThumbnail from "../components/ProjectThumbnail";

const projects = [
    {
        image: '/images/my_universe/attraction 3.png',
        name: 'Molecular Attraction',
        client: 'SRAPS',
        tags: [
            'Generative Art, Abstract'
        ],
        year: '2021',
        description: 'This piece has been created using different attractors with their position following a molecule structure.'
    },
    {
        image: '/images/my_universe/Album cover concept.png',
        name: 'Mobepist Cover',
        client: 'SRAPS',
        tags: [
            'Generative Art, Abstract, Programmatic Deformation'
        ],
        year: '2022',
        description: 'The inspiration for this project came from the heat that I felt while travelling. ' +
            'I wanted to make the viewer experience the blurriness coming from high temperature. ' +
            'This has been generated using a set of filters and deformations programmatically applied to a picture.'
    },
    {
        image: '/images/my_universe/mobileDesign 2.png',
        name: 'Grasped',
        client: 'Grasped',
        tags: [
            'UX Design, Full-Stack & Mobile App Development'
        ],
        year: '2021-2022',
        description: 'The first company I created with two friends. ' +
            'We are working hard to create a mobile app on the side of our full-time jobs, ' +
            'and we expect to launch the beta version of the app around the end of 2022. ' +
            'Brand guidelines, prototyping in Figma, ' +
            'back-end development and the creation of the app using the Ionic framework are some of my responsabilities in this project'
    },
    {
        image: '/images/my_universe/IMG_20180912_181055_396.jpg',
        name: 'Drawing & Sketches',
    },
    {
        image: '/images/my_universe/WP_000630.jpg',
        name: 'Designs & Concept Art',
        year: '2017',
        description: 'Realized many design projects at Bellecour and Emile Cohl schools in Lyon. ' +
            'Introduction to product design, fashion design, interior design or other art areas. ' +
            'I focused mainly on courses that would lead me to become a matte painter or concept artist ' +
            '(anatomy, digital painting, storyboarding, etc.) '
    },
    {
        image: '/images/my_universe/Data visualization diversity and inclusion report.png',
        name: 'Diversity & Inclusion Report',
        client: 'Valtech',
        tags: [
            'Data Visualization, UX Design'
        ],
        year: '2022',
        description: 'In Valtech, the questions of diversity and inclusion are essential. ' +
            'This is why the need of a report describing its current state was important. ' +
            'I designed and help analyzing the results of a yearly report in the different regions where Valtech is based.'
    },
    {
        image: '/images/my_universe/Data Visualization Quote Co-occurences.png',
        name: 'Data Visualization in the Field of HCI',
        client: 'University of Copenhagen',
        tags: [
            'Data Visualization, UX Design, HCI'
        ],
        year: '2018',
        description: 'This was a 6-months project where I helped developing a visualization tool to explore more than 50 years of HCI papers. ' +
            'One of the main goals was to analyze the evolution of the interaction types in the HCI research papers.'
    },
    {
        image: '/images/my_universe/Motion Matching FeatureVectorsSuperposition.png',
        name: 'Motion Matching System',
        client: 'Copenhagen Film School',
        tags: [
            'Game Development, Machine Learning'
        ],
        year: '2020',
        description: 'Another 6-months project where I developed a motion matching system that would create animations based on motion capture records. ' +
            'We recorded different types of animation using a motion capture suit, then we plugged them in a machine learning that generates 3d animations. ' +
            'The model was built from scratch and it was mostly based on the Ubisoft conference on that topic. After building the model, ' +
            'the most difficult part was to make it render smooth animations that could cover all types of animations ' +
            'included in the mobile game we were building with the team.'
    },
    {
        image: '/images/my_universe/blackhole concept series 3.png',
        name: 'Black Hole Concept',
    },
    {
        image: '/images/my_universe/attraction 1.png',
        name: 'Texture Concept',
    },
    {
        image: '/images/my_universe/petri photography work.png',
        name: 'Bacteria',
    },
    {
        image: '/images/my_universe/image 10.png',
        name: 'Dashboard Design',
        client: 'Rolex, Pandora, etc.',
        tags: [
            'Dashboard, Data Visualization'
        ],
        year: '2020-Now',
        description: 'Designing data visualizations and dashboards was one my main roles in Valtech. ' +
            'I designed and created tens of dashboards using Google Data Studio, Power BI, Tableau or even completely custom mades using web technologies or Python.'
    }
]

function Discover() {
    // useEffect( // make the content visible
    //     () => {
    //         const sections = [...document.querySelectorAll(".projectThumbnail")];
    //         let options = {
    //             rootMargin: "0px", threshold: 0.75
    //         };
    //
    //         const callback = (entries, observer) => {
    //             entries.forEach(entry => {
    //                 const {target} = entry;
    //                 if (entry.intersectionRatio >= 0.75) {
    //                     target.classList.add("is-visible");
    //                 } else {
    //                     target.classList.remove("is-visible");
    //                 }
    //             });
    //         };
    //
    //         const observer = new IntersectionObserver(callback, options);
    //
    //         sections.forEach((section, index) => {
    //             const sectionChildren = [...section.querySelector("[data-content]").children];
    //
    //             sectionChildren.forEach((el, index) => {
    //                 el.style.setProperty("--delay", `${index * 250}ms`);
    //             });
    //
    //             observer.observe(section);
    //         });
    //     }, []);
    return (
        <div className={'work-hover discover__container'}>
            <h1 className="work-hover-text-title">
                Discover
            </h1>
            {projects.map(e => {
                return (
                    <ProjectThumbnail
                        image={process.env.PUBLIC_URL + e.image}
                        name={e.name}
                        client={e.client}
                        tags={e.tags}
                        year={e.year}
                        description={e.description}
                    />
                )
            })}
        </div>
    )
}
export default Discover;
