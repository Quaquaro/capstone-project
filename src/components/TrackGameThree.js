import Textarea from './Textarea.js';
import { FlexColumnContainer } from './TrackGameTwo.js';
import SteppedProgress from './SteppedProgress.js';
import PropTypes from 'prop-types';

TrackGameThree.propTypes = {
  onHandleChange: PropTypes.func,
  handleOnClickDot: PropTypes.func,
  handleOnClickBack: PropTypes.func,
  notes: PropTypes.string
};

export default function TrackGameThree({
  onHandleChange,
  notes,
  handleOnClickDot,
  handleOnClickBack
}) {
  return (
    <>
      <FlexColumnContainer>
        <SteppedProgress
          step={3}
          handleOnClick={handleOnClickDot}
          handleBackClick={handleOnClickBack}
        />
        <Textarea onChange={onHandleChange} value={notes} name="notes" />
      </FlexColumnContainer>
    </>
  );
}
