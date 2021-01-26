function SubjectIndicators(props) {

    let { subjects } = props;

    if (!subjects) {
        subjects = [];
    }


    return (
        <>
            <h3>Photo Subjects</h3>
            <div className={`data-container`}>
                <ul className={`subject-indicators`}>

                    {subjects.includes('abandoned') && <li className={`abandoned`}>Abandoned</li>}

                    {subjects.includes('architecture') && <li className={`architecture`}>Architecture</li>}

                    {subjects.includes('astro') && <li className={`astro`}>Astrophotography</li>}

                    {subjects.includes('indoors') && <li className={`indoors`}>Indoors</li>}

                    {subjects.includes('landscape') && <li className={`landscape`}>Landscape</li>}

                    {subjects.includes('sunrise') && <li className={`sunrise`}>Sunrise</li>}

                    {subjects.includes('sunset') && <li className={`sunset`}>Sunset</li>}

                    {subjects.includes('transport') && <li className={`transport`}>Transport</li>}

                    {subjects.includes('people') && <li className={`people`}>People</li>}

                    {subjects.includes('urban') && <li className={`urban`}>Urban</li>}

                    {subjects.includes('water') && <li className={`water`}>Water Feature</li>}

                </ul>
            </div>
        </>
    )

}

export default SubjectIndicators;