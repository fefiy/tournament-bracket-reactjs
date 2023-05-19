import React, { useState } from 'react';

const TournamentBracket = () => {
  const [teams, setTeams] = useState([{ name: '', rank: '' }]);
  const [matches, setMatches] = useState([]);

  const handleAddTeam = () => {
    setTeams((prevTeams) => [...prevTeams, { name: '', rank: '' }]);
  };

  const handleRemoveTeam = (index) => {
    if (teams.length > 1) {
      setTeams((prevTeams) => {
        const updatedTeams = [...prevTeams];
        updatedTeams.splice(index, 1);
        return updatedTeams;
      });
    }
  };

  const handleTeamInputChange = (index, event) => {
    const { name, value } = event.target;
    setTeams((prevTeams) => {
      const updatedTeams = [...prevTeams];
      updatedTeams[index][name] = value;
      return updatedTeams;
    });
  };

  const handleGenerateBracket = () => {
    const sortedTeams = [...teams].sort((a, b) => a.rank - b.rank);
    const numMatches = sortedTeams.length / 2;
    const generatedMatches = [];

    for (let i = 0; i < numMatches; i++) {
      const match = {
        team1: sortedTeams[i * 2].name,
        team2: sortedTeams[i * 2 + 1].name,
        result: null,
      };
      generatedMatches.push(match);
    }

    setMatches(generatedMatches);
  };

  return (
    <div>
      <h2>Enter Teams and Ranks</h2>
      {teams.map((team, index) => (
        <div key={index}>
          <input
            type="text"
            name="name"
            value={team.name}
            placeholder="Team name"
            onChange={(event) => handleTeamInputChange(index, event)}
          />
          <input
            type="number"
            name="rank"
            value={team.rank}
            placeholder="Rank"
            onChange={(event) => handleTeamInputChange(index, event)}
          />
          {index === teams.length - 1 && (
            <button onClick={() => handleRemoveTeam(index)}>-</button>
          )}
        </div>
      ))}
      <button onClick={handleAddTeam}>+</button>
      <button onClick={handleGenerateBracket}>Generate Bracket</button>
      <h2>Tournament Bracket</h2>
      {matches.map((match, index) => (
        <div key={index}>
          <div>{match.team1}</div>
          <input type="text" value={match.result || ''} disabled />
          <div>{match.team2}</div>
        </div>
      ))}
    </div>
  );
};

export default TournamentBracket;
