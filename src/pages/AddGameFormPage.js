import TrackGameForm from '../components/TrackGameForm.js';
import PropTypes from 'prop-types';
import FormHeader from '../components/FormHeader.js';
import styled from 'styled-components';
AddGameFormPage.propTypes = {
  onTrackGame: PropTypes.func
};

export default function AddGameFormPage({ onTrackGame }) {
  return (
    <FormContainer>
      <FormHeader />
      <TrackGameForm onTrackGame={onTrackGame} />
    </FormContainer>
  );
}

const FormContainer = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 8fr 1fr;
  grid-row-gap: 50px;
`;
