import Textarea from './Textarea.js';
import { FlexColumnContainer } from './TrackGameTwo.js';
import SteppedProgress from './SteppedProgress.js';
import PropTypes from 'prop-types';

TrackGameThree.propTypes = {
  onHandleChange: PropTypes.func,
  notes: PropTypes.string
};

export default function TrackGameThree({ onHandleChange, notes }) {
  return (
    <>
      <FlexColumnContainer>
        <SteppedProgress step={3} />
        <Textarea onChange={onHandleChange} value={notes} name="notes" />
      </FlexColumnContainer>
    </>
  );
}
