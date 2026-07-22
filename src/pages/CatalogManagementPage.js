/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import Header from '../components/Header.js';
import PageSwitchAnimation from '../components/PageSwitchAnimation.js';
import DefaultButton from '../components/DefaultButton.js';
import PrimaryButton from '../components/PrimaryButton.js';
import Input from '../components/Input.js';

export default function CatalogManagementPage() {
  const navigate = useNavigate();
  const [boardgames, setBoardgames] = useState([]);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [defaultPlayerCount, setDefaultPlayerCount] = useState('');
  const [message, setMessage] = useState('');

  // Editing state
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editImageUrl, setEditImageUrl] = useState('');
  const [editDefaultPlayerCount, setEditDefaultPlayerCount] = useState('');

  const fetchBoardgames = async () => {
    try {
      const res = await axios.get('/api/boardgames');
      if (res.data && Array.isArray(res.data.games)) {
        setBoardgames(res.data.games);
      }
    } catch (err) {
      console.error('Error fetching catalog:', err);
    }
  };

  useEffect(() => {
    fetchBoardgames();
  }, []);

  const handleAddGame = async (e) => {
    e.preventDefault();
    if (!name || name.trim() === '') return;

    try {
      await axios.post('/api/boardgames', {
        name: name.trim(),
        image_url: imageUrl.trim(),
        default_player_count: defaultPlayerCount ? Number(defaultPlayerCount) : null
      });
      setName('');
      setImageUrl('');
      setDefaultPlayerCount('');
      setMessage('Game successfully added!');
      fetchBoardgames();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error adding game:', err);
      setMessage('Failed to add game.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const startEdit = (game) => {
    setEditingId(game.id);
    setEditName(game.name);
    setEditImageUrl(game.image_url || '');
    setEditDefaultPlayerCount(
      game.default_player_count !== undefined && game.default_player_count !== null
        ? String(game.default_player_count)
        : ''
    );
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditImageUrl('');
    setEditDefaultPlayerCount('');
  };

  const handleSaveEdit = async (e, id) => {
    e.preventDefault();
    if (!editName || editName.trim() === '') return;

    try {
      await axios.put(`/api/boardgames/${id}`, {
        name: editName.trim(),
        image_url: editImageUrl.trim(),
        default_player_count: editDefaultPlayerCount ? Number(editDefaultPlayerCount) : null
      });
      setMessage('Game updated successfully!');
      cancelEdit();
      fetchBoardgames();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error updating game:', err);
      setMessage('Failed to update game.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDeleteGame = async (id) => {
    try {
      await axios.delete(`/api/boardgames/${id}`);
      setMessage('Game deleted from catalog!');
      fetchBoardgames();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Error deleting game:', err);
      setMessage('Failed to delete game.');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <>
      <Header />
      <PageSwitchAnimation>
        <Container>
          <NavContainer>
            <DefaultButton onClick={() => navigate('/')}>BACK TO MATCHES</DefaultButton>
          </NavContainer>

          <Title>BOARD GAME CATALOG</Title>

          {message && <StatusMessage>{message}</StatusMessage>}

          <AddForm onSubmit={handleAddGame}>
            <SubTitle>Add New Board Game</SubTitle>
            <InputGroup>
              <Input
                name="catalogName"
                id="catalogName"
                labelText="Game Name"
                placeholder="e.g. Catan"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputGroup>

            <InputGroup>
              <Input
                name="catalogImageUrl"
                id="catalogImageUrl"
                labelText="Image URL (Optional)"
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </InputGroup>

            <InputGroup>
              <Input
                name="defaultPlayerCount"
                id="defaultPlayerCount"
                labelText="Default Player Count (Optional)"
                placeholder="e.g. 4"
                type="number"
                value={defaultPlayerCount}
                onChange={(e) => setDefaultPlayerCount(e.target.value)}
              />
            </InputGroup>

            <ButtonWrapper>
              <PrimaryButton type="submit">ADD TO CATALOG</PrimaryButton>
            </ButtonWrapper>
          </AddForm>

          <CatalogListSection>
            <SubTitle>Available Games ({boardgames.length})</SubTitle>
            <Grid>
              {boardgames.map((game) => (
                <GameCard key={game.id}>
                  {editingId === game.id ? (
                    <EditForm onSubmit={(e) => handleSaveEdit(e, game.id)}>
                      <InlineInput
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder="Game Name"
                        required
                        aria-label={`edit name for ${game.name}`}
                      />
                      <InlineInput
                        type="text"
                        value={editImageUrl}
                        onChange={(e) => setEditImageUrl(e.target.value)}
                        placeholder="Image URL"
                        aria-label={`edit image url for ${game.name}`}
                      />
                      <InlineInput
                        type="number"
                        value={editDefaultPlayerCount}
                        onChange={(e) => setEditDefaultPlayerCount(e.target.value)}
                        placeholder="Default Players"
                        aria-label={`edit default player count for ${game.name}`}
                      />
                      <ActionGroup>
                        <SaveBtn type="submit">Save</SaveBtn>
                        <CancelBtn type="button" onClick={cancelEdit}>
                          Cancel
                        </CancelBtn>
                      </ActionGroup>
                    </EditForm>
                  ) : (
                    <>
                      {game.image_url ? (
                        <CardImage src={game.image_url} alt={game.name} />
                      ) : (
                        <PlaceholderImage>🎲</PlaceholderImage>
                      )}
                      <GameInfo>
                        <GameTitle>{game.name}</GameTitle>
                        {game.default_player_count ? (
                          <DefaultPlayerTag>
                            👥 {game.default_player_count} Players
                          </DefaultPlayerTag>
                        ) : null}
                        <ActionGroup>
                          <EditBtn
                            type="button"
                            aria-label={`edit ${game.name}`}
                            onClick={() => startEdit(game)}
                          >
                            Edit
                          </EditBtn>
                          <DeleteBtn
                            type="button"
                            aria-label={`delete ${game.name}`}
                            onClick={() => handleDeleteGame(game.id)}
                          >
                            Delete
                          </DeleteBtn>
                        </ActionGroup>
                      </GameInfo>
                    </>
                  )}
                </GameCard>
              ))}
            </Grid>
          </CatalogListSection>
        </Container>
      </PageSwitchAnimation>
    </>
  );
}

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px 40px;
  max-width: 600px;
  margin: 0 auto;
`;

const NavContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

const Title = styled.h2`
  font-family: 'Roboto';
  color: ${({ theme }) => theme.color.neonBlue};
  font-size: 24px;
  margin-bottom: 15px;
  text-align: center;
`;

const SubTitle = styled.h3`
  font-family: 'Roboto';
  color: ${({ theme }) => theme.color.white};
  font-size: 18px;
  margin-bottom: 10px;
  text-align: center;
`;

const StatusMessage = styled.p`
  color: ${({ theme }) => theme.color.neonBlue};
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 8px 16px;
  border-radius: 9999em;
  margin-bottom: 15px;
  font-family: 'Roboto';
`;

const AddForm = styled.form`
  width: 100%;
  background-color: ${({ theme }) => theme.color.secondary};
  border: 1px solid ${({ theme }) => theme.color.white};
  border-radius: 16px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 25px;
`;

const InputGroup = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const CatalogListSection = styled.section`
  width: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  grid-gap: 15px;
  width: 100%;
  margin-top: 15px;
`;

const GameCard = styled.div`
  background-color: ${({ theme }) => theme.color.secondary};
  border: 1px solid ${({ theme }) => theme.color.white};
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
`;

const CardImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 8px;
`;

const PlaceholderImage = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  background-color: ${({ theme }) => theme.color.primary};
  border-radius: 8px;
  margin-bottom: 8px;
`;

const GameInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const GameTitle = styled.span`
  color: ${({ theme }) => theme.color.white};
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 4px;
  word-break: break-word;
`;

const DefaultPlayerTag = styled.span`
  color: ${({ theme }) => theme.color.yellow};
  font-family: 'Roboto';
  font-size: 11px;
  margin-bottom: 8px;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 6px;
  justify-content: center;
  width: 100%;
  margin-top: 4px;
`;

const EditBtn = styled.button`
  background-color: ${({ theme }) => theme.color.blue};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 9999em;
  padding: 4px 10px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const DeleteBtn = styled.button`
  background-color: ${({ theme }) => theme.color.pink};
  color: ${({ theme }) => theme.color.white};
  border: none;
  border-radius: 9999em;
  padding: 4px 10px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 6px;
`;

const InlineInput = styled.input`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.color.white};
  border-radius: 9999em;
  background-color: ${({ theme }) => theme.color.primary};
  color: ${({ theme }) => theme.color.white};
  font-family: inherit;
  font-size: 12px;
  padding: 4px 8px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.color.neonBlue};
  }
`;

const SaveBtn = styled.button`
  background-color: ${({ theme }) => theme.color.green};
  color: ${({ theme }) => theme.color.primary};
  border: none;
  border-radius: 9999em;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: bold;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;

const CancelBtn = styled.button`
  background-color: ${({ theme }) => theme.color.secondary};
  color: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.white};
  border-radius: 9999em;
  padding: 4px 10px;
  font-size: 12px;
  font-family: inherit;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
