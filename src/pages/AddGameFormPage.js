import TrackGameForm from '../components/TrackGameForm.js';
import PropTypes from 'prop-types';
import FormHeader from '../components/FormHeader.js';
AddGameFormPage.propTypes = {
  onTrackGame: PropTypes.func
};

export default function AddGameFormPage({ onTrackGame }) {
  return (
    <>
      <FormHeader />
      <TrackGameForm onTrackGame={onTrackGame} />
    </>
  );
}
