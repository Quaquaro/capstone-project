import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Header from '../components/Header.js';
import PageSwitchAnimation from '../components/PageSwitchAnimation.js';
import DefaultButton from '../components/DefaultButton.js';
import PrimaryButton from '../components/PrimaryButton.js';
import Input from '../components/Input.js';
import bin from '../img/bin.svg';
import { useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';

GroupsManagementPage.propTypes = {
  groups: PropTypes.array,
  onSaveGroup: PropTypes.func,
  onDeleteGroup: PropTypes.func
};

export default function GroupsManagementPage({
  groups = [],
  onSaveGroup = () => {},
  onDeleteGroup = () => {}
}) {
  const navigate = useNavigate();
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [groupName, setGroupName] = useState('');
  const [playersText, setPlayersText] = useState('');

  const handleStartCreate = () => {
    setEditingGroupId('NEW');
    setGroupName('');
    setPlayersText('');
  };

  const handleStartEdit = (group) => {
    setEditingGroupId(group.id);
    setGroupName(group.name);
    setPlayersText(group.players ? group.players.join(', ') : '');
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!groupName.trim()) return;

    const parsedPlayers = playersText
      .split(',')
      .map((p) => p.trim())
      .filter((p) => p !== '');

    if (parsedPlayers.length === 0) return;

    const newGroup = {
      id: editingGroupId === 'NEW' ? nanoid() : editingGroupId,
      name: groupName.trim(),
      players: parsedPlayers
    };

    onSaveGroup(newGroup);
    setEditingGroupId(null);
    setGroupName('');
    setPlayersText('');
  };

  return (
    <>
      <Header />
      <PageSwitchAnimation>
        <LayoutContainer>
          <PageTitle>PLAYER GROUPS 👥</PageTitle>

          {editingGroupId !== null ? (
            <StyledForm onSubmit={handleSave}>
              <FormTitle>
                {editingGroupId === 'NEW' ? 'Create Player Group' : 'Edit Player Group'}
              </FormTitle>
              <Input
                name="groupName"
                labelText="Group Name"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="e.g. Friday Game Crew"
                required
              />
              <Input
                name="playersText"
                labelText="Players (comma separated)"
                value={playersText}
                onChange={(e) => setPlayersText(e.target.value)}
                placeholder="e.g. Alice, Bob, Charlie"
                required
              />
              <FormButtonContainer>
                <PrimaryButton type="submit">SAVE GROUP</PrimaryButton>
                <DefaultButton type="button" onClick={() => setEditingGroupId(null)}>
                  CANCEL
                </DefaultButton>
              </FormButtonContainer>
            </StyledForm>
          ) : (
            <>
              <TopActionContainer>
                <PrimaryButton type="button" onClick={handleStartCreate}>
                  + NEW GROUP
                </PrimaryButton>
              </TopActionContainer>

              <GroupsList role="list">
                {groups.length > 0 ? (
                  groups.map((group) => (
                    <GroupCard key={group.id}>
                      <CardHeader>
                        <GroupName>{group.name}</GroupName>
                        <CardActions>
                          <ActionButton type="button" onClick={() => handleStartEdit(group)}>
                            ✏️
                          </ActionButton>
                          <ActionButton type="button" onClick={() => onDeleteGroup(group.id)}>
                            <img src={bin} alt="delete group" width="16" height="16" />
                          </ActionButton>
                        </CardActions>
                      </CardHeader>
                      <PlayersList>
                        {group.players?.map((player, idx) => (
                          <PlayerTag key={idx}>{player}</PlayerTag>
                        ))}
                      </PlayersList>
                    </GroupCard>
                  ))
                ) : (
                  <NoGroupsText>No player groups created yet.</NoGroupsText>
                )}
              </GroupsList>
            </>
          )}

          <BottomNavContainer>
            <DefaultButton type="button" onClick={() => navigate('/')}>
              BACK TO MATCHES
            </DefaultButton>
          </BottomNavContainer>
        </LayoutContainer>
      </PageSwitchAnimation>
    </>
  );
}

const LayoutContainer = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
`;

const PageTitle = styled.h2`
  color: ${({ theme }) => theme.color.neonBlue};
  font-size: 20px;
  margin-bottom: 15px;
`;

const TopActionContainer = styled.div`
  margin-bottom: 20px;
`;

const StyledForm = styled.form`
  background-color: ${({ theme }) => theme.color.secondary};
  border: 1px solid ${({ theme }) => theme.color.white};
  border-radius: 15px;
  padding: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const FormTitle = styled.h3`
  color: ${({ theme }) => theme.color.yellow};
  margin: 0 0 10px;
`;

const FormButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

const GroupsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-height: 440px;
  overflow-y: auto;
`;

const GroupCard = styled.div`
  background-color: ${({ theme }) => theme.color.secondary};
  border: 1px solid ${({ theme }) => theme.color.white};
  border-radius: 15px;
  padding: 12px 15px;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const GroupName = styled.h4`
  margin: 0;
  color: ${({ theme }) => theme.color.yellow};
  font-size: 16px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
`;

const PlayersList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

const PlayerTag = styled.span`
  background-color: ${({ theme }) => theme.color.primary};
  border: 1px solid ${({ theme }) => theme.color.neonBlue};
  color: ${({ theme }) => theme.color.white};
  font-family: 'Roboto';
  font-size: 12px;
  padding: 3px 8px;
  border-radius: 9999em;
`;

const NoGroupsText = styled.p`
  color: ${({ theme }) => theme.color.white};
  text-align: center;
  margin: 20px 0;
`;

const BottomNavContainer = styled.div`
  margin-top: 20px;
`;
