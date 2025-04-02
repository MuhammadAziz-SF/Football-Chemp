import { Sequelize } from "sequelize";
import logs from "../config/logs.js";
import defineTournament from "./tournament.js";
import defineTournament_groups from "./tournaments-group.js";
import defineToken from "./token.js";
import defineTeams from "./teams.js";
import definePlayers from "./players.js";
import defineClubs from "./clubs.js";
import defineMatchFixtures from "./match-fixtures.js";
import pool from '../libs/db.js';


const sequelize = new Sequelize("football", "postgres", "1111", {
    host: "localhost",
    dialect: "postgres",
    logging: (msg) => logs.info(msg), 
    define: {
        timestamps: false,
        freezeTableName: true,
    },
});


const Tournament = defineTournament(sequelize);
const Tournament_groups = defineTournament_groups(sequelize);
const Token = defineToken(sequelize);
const Teams = defineTeams(sequelize);
const Players = definePlayers(sequelize);
const Clubs = defineClubs(sequelize);
const MatchFixtures = defineMatchFixtures(sequelize);


Tournament_groups.belongsTo(Tournament, { foreignKey: 'tournament_id' });
Teams.belongsTo(Clubs, { foreignKey: 'club_id' });
Teams.belongsTo(Tournament_groups, { foreignKey: 'group_id' });
Players.belongsTo(Teams, { foreignKey: 'team_id' });
MatchFixtures.belongsTo(Teams, { as: 'HomeTeam', foreignKey: 'home_team_id' });
MatchFixtures.belongsTo(Teams, { as: 'AwayTeam', foreignKey: 'away_team_id' });
MatchFixtures.belongsTo(Tournament, { foreignKey: 'tournament_id' });


const db = {
    sequelize,
    Sequelize,
    Tournament,
    Tournament_groups,
    Token,
    Teams,
    Players,
    Clubs,
    MatchFixtures,
    pool,
    query: (text, params) => pool.query(text, params)
};

export default db;
