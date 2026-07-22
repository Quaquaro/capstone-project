import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import Header from '../components/Header.js';
import PageSwitchAnimation from '../components/PageSwitchAnimation.js';
import DefaultButton from '../components/DefaultButton.js';

StatsPage.propTypes = {
  games: PropTypes.array
};

const NEON_COLORS = ['#00f0ff', '#f631a7', '#f2db05', '#31cc62', '#0597f2', '#ff6b6b', '#a78bfa'];

export default function StatsPage({ games = [] }) {
  const navigate = useNavigate();
  const trackedGames = games.filter(
    (g) => g.id !== '1' && Array.isArray(g.players) && g.players.length > 0
  );

  const [selectedGame, setSelectedGame] = useState('ALL');

  // ── 1. Win-Rate per player ──────────────────────────────────────────────
  const winCounts = {};
  trackedGames.forEach((match) => {
    const winner = match.players[0];
    if (winner?.player) {
      winCounts[winner.player] = (winCounts[winner.player] || 0) + 1;
    }
  });
  const winRateData = Object.entries(winCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, wins]) => ({ name, wins }));

  // ── 2. Most played games ────────────────────────────────────────────────
  const gameCounts = {};
  trackedGames.forEach((match) => {
    if (match.nameOfGame) {
      gameCounts[match.nameOfGame] = (gameCounts[match.nameOfGame] || 0) + 1;
    }
  });
  const mostPlayedData = Object.entries(gameCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, count]) => ({ name, count }));

  // ── 3. Average score per player ─────────────────────────────────────────
  const playerScores = {};
  trackedGames.forEach((match) => {
    match.players.forEach((p) => {
      if (p.player && p.score !== '' && p.score !== null) {
        const num = Number(p.score);
        if (!isNaN(num)) {
          if (!playerScores[p.player]) playerScores[p.player] = { total: 0, count: 0 };
          playerScores[p.player].total += num;
          playerScores[p.player].count += 1;
        }
      }
    });
  });
  const avgScoreData = Object.entries(playerScores)
    .map(([name, { total, count }]) => ({ name, avg: Math.round((total / count) * 10) / 10 }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 8);

  // ── 4. Score trend over time ─────────────────────────────────────────────
  const uniqueGames = [...new Set(trackedGames.map((g) => g.nameOfGame))];
  const filteredForTrend =
    selectedGame === 'ALL'
      ? trackedGames
      : trackedGames.filter((g) => g.nameOfGame === selectedGame);

  const trendData = filteredForTrend
    .filter((m) => m.date && m.players[0]?.score !== '')
    .sort((a, b) => (a.date > b.date ? 1 : -1))
    .map((m) => ({
      date: m.date,
      score: Number(m.players[0]?.score),
      player: m.players[0]?.player,
      game: m.nameOfGame
    }))
    .filter((d) => !isNaN(d.score));

  const noData = trackedGames.length === 0;

  return (
    <>
      <Header />
      <PageSwitchAnimation>
        <Container>
          <PageTitle>STATISTICS 📊</PageTitle>
          <NavRow>
            <DefaultButton onClick={() => navigate('/')}>BACK TO MATCHES</DefaultButton>
          </NavRow>

          {noData ? (
            <EmptyState>
              <EmptyEmoji>🎲</EmptyEmoji>
              <EmptyText>
                No matches recorded yet. Start tracking games to see statistics!
              </EmptyText>
            </EmptyState>
          ) : (
            <>
              {/* ── Win Rate ── */}
              <Section>
                <SectionTitle>🏅 Win Rate per Player</SectionTitle>
                <ChartBox>
                  <ResponsiveContainer width="100%" height={260}>
                    <PieChart>
                      <Pie
                        data={winRateData}
                        dataKey="wins"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={90}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {winRateData.map((_, index) => (
                          <Cell key={index} fill={NEON_COLORS[index % NEON_COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: '#1f1f33',
                          border: '1px solid #00f0ff',
                          borderRadius: '8px'
                        }}
                        labelStyle={{ color: '#00f0ff' }}
                        itemStyle={{ color: '#eefffd' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', color: '#eefffd' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartBox>
              </Section>

              {/* ── Most Played Games ── */}
              <Section>
                <SectionTitle>🎲 Most Played Games</SectionTitle>
                <ChartBox>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart
                      data={mostPlayedData}
                      layout="vertical"
                      margin={{ left: 10, right: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis type="number" tick={{ fill: '#eefffd', fontSize: 11 }} />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={90}
                        tick={{ fill: '#eefffd', fontSize: 11 }}
                      />
                      <Tooltip
                        contentStyle={{
                          background: '#1f1f33',
                          border: '1px solid #00f0ff',
                          borderRadius: '8px'
                        }}
                        labelStyle={{ color: '#00f0ff' }}
                        itemStyle={{ color: '#eefffd' }}
                      />
                      <Bar dataKey="count" name="Matches" radius={[0, 6, 6, 0]}>
                        {mostPlayedData.map((_, index) => (
                          <Cell key={index} fill={NEON_COLORS[index % NEON_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartBox>
              </Section>

              {/* ── Avg Score per Player ── */}
              <Section>
                <SectionTitle>📊 Average Score per Player</SectionTitle>
                <ChartBox>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={avgScoreData} margin={{ left: 0, right: 20 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                      <XAxis dataKey="name" tick={{ fill: '#eefffd', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#eefffd', fontSize: 11 }} />
                      <Tooltip
                        contentStyle={{
                          background: '#1f1f33',
                          border: '1px solid #00f0ff',
                          borderRadius: '8px'
                        }}
                        labelStyle={{ color: '#00f0ff' }}
                        itemStyle={{ color: '#eefffd' }}
                      />
                      <Bar dataKey="avg" name="Ø Score" radius={[6, 6, 0, 0]}>
                        {avgScoreData.map((_, index) => (
                          <Cell key={index} fill={NEON_COLORS[index % NEON_COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </ChartBox>
              </Section>

              {/* ── Score Trend over Time ── */}
              <Section>
                <SectionTitle>📈 Score Trend over Time</SectionTitle>
                <FilterRow>
                  <FilterLabel>Filter by Game:</FilterLabel>
                  <StyledSelect
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                  >
                    <option value="ALL">All Games</option>
                    {uniqueGames.map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </StyledSelect>
                </FilterRow>
                <ChartBox>
                  {trendData.length > 1 ? (
                    <ResponsiveContainer width="100%" height={220}>
                      <LineChart data={trendData} margin={{ left: 0, right: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
                        <XAxis dataKey="date" tick={{ fill: '#eefffd', fontSize: 10 }} />
                        <YAxis tick={{ fill: '#eefffd', fontSize: 11 }} />
                        <Tooltip
                          contentStyle={{
                            background: '#1f1f33',
                            border: '1px solid #00f0ff',
                            borderRadius: '8px'
                          }}
                          labelStyle={{ color: '#00f0ff' }}
                          itemStyle={{ color: '#eefffd' }}
                          formatter={(value) => [value, 'Score']}
                        />
                        <Line
                          type="monotone"
                          dataKey="score"
                          stroke="#00f0ff"
                          strokeWidth={2}
                          dot={{ fill: '#f2db05', r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <EmptyText>Track at least 2 matches to see the score trend.</EmptyText>
                  )}
                </ChartBox>
              </Section>
            </>
          )}
        </Container>
      </PageSwitchAnimation>
    </>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 16px 60px;
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
`;

const PageTitle = styled.h2`
  color: ${({ theme }) => theme.color.neonBlue};
  font-size: 22px;
  margin: 8px 0 4px;
  text-shadow: 0 0 12px rgba(0, 240, 255, 0.4);
`;

const NavRow = styled.div`
  margin-bottom: 16px;
`;

const Section = styled.section`
  width: 100%;
  margin-bottom: 28px;
  background: ${({ theme }) => theme.color.glassBg};
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid ${({ theme }) => theme.color.glassBorder};
  border-radius: 16px;
  padding: 16px;
  box-shadow: ${({ theme }) => theme.color.glassShadow};
`;

const SectionTitle = styled.h3`
  color: ${({ theme }) => theme.color.yellow};
  font-size: 15px;
  margin: 0 0 14px;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const ChartBox = styled.div`
  width: 100%;
`;

const FilterRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`;

const FilterLabel = styled.label`
  font-family: 'Roboto';
  font-size: 12px;
  color: ${({ theme }) => theme.color.neonBlue};
  font-weight: bold;
`;

const StyledSelect = styled.select`
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.glassBorder};
  border-radius: 8px;
  padding: 5px 10px;
  font-family: 'Roboto';
  font-size: 12px;
  cursor: pointer;
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-top: 60px;
`;

const EmptyEmoji = styled.div`
  font-size: 48px;
`;

const EmptyText = styled.p`
  color: ${({ theme }) => theme.color.white};
  font-family: 'Roboto';
  font-size: 14px;
  text-align: center;
  opacity: 0.75;
  max-width: 260px;
`;
