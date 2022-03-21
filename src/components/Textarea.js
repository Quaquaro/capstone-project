import styled from 'styled-components';
import { InputLabel, InputBox } from './Input.js';
export default function Textarea() {
  return (
    <>
      <InputLabel>Notes</InputLabel>
      <TextareaBox></TextareaBox>
    </>
  );
}

const TextareaBox = styled(InputBox).textarea`
`;
