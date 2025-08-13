// File: KPIFrameworkUX.js
import React from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

export default function KPIFrameworkUX() {
    return (
        <div className="project project--kpi work-hover">
            <h1 className="project__title work-hover-text-title">
                KPI Frameworks for UX Optimisation
            </h1>

            <div className="project__content work-hover-text-content font--paragraph text--paragraph">

                {/* What is a KPI framework (UX context) */}
                <section className="project__section project__definition">
                    <h2 className="project__subtitle">What it is</h2>
                    <p className="project__paragraph work-hover-text-content-p">
                        A KPI framework is a simple map from <strong>vision</strong> to <strong>actions</strong>.
                        It links business goals to a small set of KPIs, then to the metrics and events we can measure.
                        In UX optimisation, it answers one question: <em>what change improves the experience and by how much?</em>
                    </p>
                </section>

                {/* Slide 1: matrix from vision to KPIs */}
                <figure className="project__figure project__figure--matrix">
                    <Zoom>
                        <img
                            className="project__img work-hover-text-content-im"
                            src={`${process.env.PUBLIC_URL}/images/kpi_answer.png`}
                            alt="Matrix from vision and goals to KPI candidates"
                            loading="lazy"
                        />
                    </Zoom>
                    <figcaption className="project__caption">
                        From vision → goals → categories → KPI candidates. Keep a few. Make them testable.
                    </figcaption>
                </figure>

                {/* Why it matters */}
                <section className="project__section project__value">
                    <h2 className="project__subtitle">Why it’s useful</h2>
                    <ul className="project__list project__list--bullets">
                        <li className="project__list-item">One language for product, design, data, and marketing.</li>
                        <li className="project__list-item">Faster prioritisation: ideas must name a target KPI.</li>
                        <li className="project__list-item">Cleaner dashboards: fewer numbers, clearer stories.</li>
                        <li className="project__list-item">Better experiments: we ship what moves the KPI.</li>
                    </ul>
                </section>

                {/* Slide 5: hierarchy pyramid */}
                <figure className="project__figure project__figure--hierarchy">
                    <Zoom>
                        <img
                            className="project__img work-hover-text-content-im"
                            src={`${process.env.PUBLIC_URL}/images/kpi_vision.png`}
                            alt="Pyramid showing Vision, Goals, Categories, KPIs"
                            loading="lazy"
                        />
                    </Zoom>
                    <figcaption className="project__caption">
                        The hierarchy: Vision → 3–4 Goals → Focus categories → A handful of KPIs.
                    </figcaption>
                </figure>

                {/* How I build it across clients */}
                <section className="project__section project__method">
                    <h2 className="project__subtitle">How I build it</h2>
                    <ul className="project__list project__list--bullets">
                        <li className="project__list-item"><strong>Map goals:</strong> align leaders on what “good” looks like.</li>
                        <li className="project__list-item"><strong>Choose KPIs:</strong> few signals, clear owners, review cadence.</li>
                        <li className="project__list-item"><strong>Define metrics & events:</strong> stable names, required properties, QA.</li>
                        <li className="project__list-item"><strong>Wire dashboards:</strong> role-based views + glossary to avoid debates.</li>
                        <li className="project__list-item"><strong>Use it weekly:</strong> ideas → target KPI → test → decision.</li>
                    </ul>
                </section>

                {/* Slide 2: personas focus */}
                <figure className="project__figure project__figure--personas">
                    <Zoom>
                        <img
                            className="project__img work-hover-text-content-im"
                            src={`${process.env.PUBLIC_URL}/images/kpi_identify.png`}
                            alt="How to identify key personas using the KPI framework"
                            loading="lazy"
                        />
                    </Zoom>
                    <figcaption className="project__caption">
                        Aim the work: link personas and journeys to a KPI. Focus beats volume.
                    </figcaption>
                </figure>

                {/* Slide 3: pain point analysis */}
                <section className="project__section project__ppa">
                    <h2 className="project__subtitle">Turning it into action</h2>
                    <p className="project__paragraph work-hover-text-content-p">
                        I run a short <strong>Pain Point Analysis</strong> to move from framework to roadmap.
                    </p>
                    <ul className="project__list project__list--bullets">
                        <li className="project__list-item">Collect history and journey signals.</li>
                        <li className="project__list-item">Ideate hypotheses tied to KPIs.</li>
                        <li className="project__list-item">Prioritise by impact × effort and plan tests.</li>
                    </ul>
                </section>

                {/* Slide 4: build-test-learn */}
                <figure className="project__figure project__figure--loop">
                    <Zoom>
                        <img
                            className="project__img work-hover-text-content-im"
                            src={`${process.env.PUBLIC_URL}/images/kpi_test.jpg`}
                            alt="Build, Test, Learn circular loop with monitoring"
                            loading="lazy"
                        />
                    </Zoom>
                    <figcaption className="project__caption">
                        Loop it: Build → Test → Learn. Keep what moves the KPI. Drop the rest.
                    </figcaption>
                </figure>

                {/* What clients got (anonymised, no numbers) */}
                <section className="project__section project__outcomes">
                    <h2 className="project__subtitle">What teams gained</h2>
                    <ul className="project__list project__list--bullets">
                        <li className="project__list-item">Clear priorities across countries and products.</li>
                        <li className="project__list-item">Shared definitions, fewer metric disputes.</li>
                        <li className="project__list-item">A steady testing pipeline tied to real goals.</li>
                        <li className="project__list-item">Dashboards people actually use.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
