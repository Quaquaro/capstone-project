import TrackedGamesList from '../components/TrackedGamesList.js';
import PropTypes from 'prop-types';

GamesPage.propTypes = {
  games: PropTypes.array
};

export default function GamesPage({ games }) {
  return (
    <main>
      <h1>TrackedGames</h1>
      <TrackedGamesList games={games} />
    </main>
  );
}
