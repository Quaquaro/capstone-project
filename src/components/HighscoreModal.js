import { useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import confetti from 'canvas-confetti';
import PrimaryButton from './PrimaryButton.js';
import { formatDateToDDMMYY } from '../utils/formatDate.js';

HighscoreModal.propTypes = {
  nameOfGame: PropTypes.string.isRequired,
  games: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired
};

export default function HighscoreModal({ nameOfGame, games, onClose }) {
  useEffect(() => {
    // eslint-disable-next-line no-undef
    if (process.env.NODE_ENV !== 'test') {
      try {
        confetti({ particleCount: 60, spread: 60, colors: ['#f2db05', '#00f0ff', '#ffffff'] });
      } catch (e) {
        // ignore in non-browser envs
      }
    }
  }, []);

  // Extract all player scores across matches for this game
  const matchingGames = games.filter(
    (game) => game.nameOfGame && game.nameOfGame.toLowerCase() === nameOfGame.toLowerCase()
  );

  const scoresList = [];
  matchingGames.forEach((game) => {
    if (Array.isArray(game.players)) {
      game.players.forEach((p) => {
        if (p.player && p.score !== undefined && p.score !== null && p.score !== '') {
          const numericScore = Number(p.score);
          if (!isNaN(numericScore)) {
            scoresList.push({
              player: p.player,
              score: numericScore,
              date: game.date || '—'
            });
          }
        }
      });
    }
  });

  scoresList.sort((a, b) => b.score - a.score);
  const topScores = scoresList.slice(0, 5);

  const medals = ['🥇', '🥈', '🥉'];

  return (
    <Overlay onClick={onClose}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalHeader>🏆 {nameOfGame} Highscores</ModalHeader>
        {topScores.length > 0 ? (
          <ScoreTable>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Player</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {topScores.map((item, index) => (
                <tr key={index}>
                  <td>{medals[index] || `#${index + 1}`}</td>
                  <td>{item.player}</td>
                  <td>{item.score}</td>
                  <td>{formatDateToDDMMYY(item.date)}</td>
                </tr>
              ))}
            </tbody>
          </ScoreTable>
        ) : (
          <NoScoresText>No scores recorded yet for {nameOfGame}.</NoScoresText>
        )}
        <ButtonContainer>
          <PrimaryButton type="button" onClick={onClose}>
            CLOSE
          </PrimaryButton>
        </ButtonContainer>
      </ModalContainer>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background: ${({ theme }) => theme.color.glassBg};
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 2px solid ${({ theme }) => theme.color.neonBlue};
  border-radius: 20px;
  padding: 24px;
  width: 330px;
  max-width: 90vw;
  box-shadow: 0 0 30px rgba(0, 240, 255, 0.35);
  text-align: center;
`;

const ModalHeader = styled.h2`
  color: ${({ theme }) => theme.color.yellow};
  font-size: 20px;
  margin-top: 0;
  margin-bottom: 18px;
  text-shadow: 0 0 10px rgba(242, 219, 5, 0.5);
`;

const ScoreTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-family: 'Roboto';
  font-size: 13px;

  th,
  td {
    padding: 8px 4px;
    text-align: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }

  th {
    color: ${({ theme }) => theme.color.neonBlue};
    font-weight: bold;
  }

  tbody tr:nth-child(1) {
    color: ${({ theme }) => theme.color.yellow};
    font-weight: bold;
    font-size: 14px;
  }
`;

const NoScoresText = styled.p`
  color: ${({ theme }) => theme.color.white};
  font-size: 14px;
  margin: 20px 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
