import { motion } from 'framer-motion';
import styled from 'styled-components';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2
    }
  },
  end: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const loadingCircleVariants = {
  start: {
    y: '50%'
  },
  end: {
    y: '150%'
  }
};

const loadingCircleTransition = {
  duration: 0.5,
  repeat: Infinity,
  ease: 'easeInOut'
};

export default function ThreeDotsWave() {
  return (
    <LoadingContainer
      as={motion.div}
      variants={loadingContainerVariants}
      initial="start"
      animate="end"
    >
      <LoadingCircle
        as={motion.span}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <LoadingCircle
        as={motion.span}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
      <LoadingCircle
        as={motion.span}
        variants={loadingCircleVariants}
        transition={loadingCircleTransition}
      />
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  width: 2rem;
  height: 2rem;
  display: flex;
  justify-content: space-around;
`;

const LoadingCircle = styled.span`
  display: block;
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${({ theme }) => theme.color.white};
  border-radius: 50%;
`;
