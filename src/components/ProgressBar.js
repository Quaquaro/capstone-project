import styled from 'styled-components';
import PropTypes from 'prop-types';

ProgressBar.propTypes = {
  progress: PropTypes.string,
  bgcolor: PropTypes.func
};

ProgressBar.defaultProps = {
  progress: '100',
  bgcolor: ({ theme }) => theme.color.green
};

export default function ProgressBar({ progress, bgcolor }) {
  return (
    <Parentdiv>
      <Childdiv width={`${progress}%`} bgcolor={bgcolor}>
        <ProgressText>{`${progress}%`}</ProgressText>
      </Childdiv>
    </Parentdiv>
  );
}
const Parentdiv = styled.div`
  height: 20px;
  width: 200px;
  border-radius: 40px;
  margin: 50px;
  background-color: ${({ theme }) => theme.color.white};
`;

const Childdiv = styled.div`
  height: 100%;
  width: ${(props) => props.width};
  background-color: ${(props) => props.bgcolor};
  border-radius: 40px;
  text-align: right;
`;

const ProgressText = styled.span`
  padding: 10px;
  color: ${({ theme }) => theme.color.primary};
  font-variation-settings: 'wght' 800;
`;
