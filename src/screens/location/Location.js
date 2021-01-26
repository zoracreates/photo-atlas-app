import PhotoSlider from '../../components/slider/PhotoSlider'
import PropTypes from 'prop-types';
import SubjectIndicators from '../../components/SubjectIndicators';


function Location(props) {

    let { title, distance, saves, lat, lon, imageList, subjects } = props;
    title = "Place Holder"
    distance = 2.1

    if (!saves) {
        saves = 0;
    }

    return (
        <div className={`container location mobile-padding`}>
            <PhotoSlider imageList={imageList} />

            <h2 className={`title`}>{title}</h2>
            <div className={`gird-70-30`}>
                <div className={`col-70`}>
                    <p className={`meta-data saved`}>Saved by: {saves} {(saves > 1 || saves < 1) ? 'photographers' : 'photographer'}</p>
                    {distance && <p className={`meta-data distance`}>Distance: {distance}mi</p>}
                </div>
                <div className={`col-30`}>
                    <a href={`https://maps.google.com/?q=${lat},${lon}`} className={`action-button directions`}>Directions</a>
                </div>

            </div>
            
            {subjects && <SubjectIndicators subjects={subjects} />}

        </div>

    )
}

Location.propTypes = {
    imageList: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string,
    saves: PropTypes.number,
    distance: PropTypes.number,
    lon: PropTypes.number,
    lat: PropTypes.number,
    subjects: PropTypes.arrayOf(PropTypes.string)
}


export default Location;
