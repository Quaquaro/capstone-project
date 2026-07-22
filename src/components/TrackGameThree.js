import Textarea from './Textarea.js';
import Input from './Input.js';
import { FlexColumnContainer } from './TrackGameTwo.js';
import SteppedProgress from './SteppedProgress.js';
import PropTypes from 'prop-types';

TrackGameThree.propTypes = {
  onHandleChange: PropTypes.func,
  handleOnClickDot: PropTypes.func,
  handleOnClickBack: PropTypes.func,
  notes: PropTypes.string,
  date: PropTypes.string
};

export default function TrackGameThree({
  onHandleChange,
  notes,
  date,
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
        <Input
          name="date"
          id="date"
          labelText="Date"
          type="date"
          value={date}
          onChange={onHandleChange}
        />
        <Textarea onChange={onHandleChange} value={notes} name="notes" />
      </FlexColumnContainer>
    </>
  );
}
