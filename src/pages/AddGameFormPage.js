import TrackGameForm from '../components/TrackGameForm.js';
import PropTypes from 'prop-types';

AddGameFormPage.propTypes = {
  onTrackGame: PropTypes.func
};

export default function AddGameFormPage({ onTrackGame }) {
  return (
    <main>
      <h1>Track game formular</h1>
      <TrackGameForm onTrackGame={onTrackGame} />
    </main>
  );
}
