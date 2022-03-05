import Button from './Button.js';
import Input from './Input.js';

import PropTypes from 'prop-types';

TrackGameForm.propTypes = {
  onTrackGame: PropTypes.func
};

import styled from 'styled-components';
export default function TrackGameForm({ onTrackGame }) {
  return (
    <>
      <Form onSubmit={handleTrackGame}>
        <Input
          name="nameOfGame"
          labelText="Name of game"
          placeholder="e.g. Uno"
          autocomplete="on"
          inputmode="text"
          required
        />
        <Button type="submit" />
      </Form>
    </>
  );

  function handleTrackGame(event) {
    event.preventDefault();
    const form = event.target;
    const input = form.elements.nameOfGame;
    onTrackGame(input.value);
    input.value = '';
  }
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
