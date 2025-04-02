-- Tournaments Table
create table if not exists tournaments (
    tournament_id uuid primary key default gen_random_uuid(),
    tournament_name varchar(100) not null unique,
    start_date date not null,
    end_date date not null,
    status varchar(20) not null
);

-- Tournament Groups Table
create table if not exists tournament_groups (
    group_id uuid primary key default gen_random_uuid(),
    group_name varchar(100) not null,
    tournament_id uuid not null,
    foreign key (tournament_id) references tournaments(tournament_id),
    created_at timestamp default current_timestamp
);

-- Football Clubs Table
create table if not exists football_clubs (
    club_id uuid primary key default gen_random_uuid(),
    club_name varchar(100) not null unique,
    city varchar(100) not null,
    country varchar(100) not null,
    founded_year int
);

-- Teams Table
create table if not exists teams (
    team_id uuid primary key default gen_random_uuid(),
    team_name varchar(100) not null,
    club_id uuid not null,
    group_id uuid not null,
    foreign key (club_id) references football_clubs(club_id),
    foreign key (group_id) references tournament_groups(group_id),
    coach_name varchar(100) not null
);

-- Players Table
create table if not exists players (
    player_id uuid primary key default gen_random_uuid(),
    full_name varchar(100) not null,
    date_of_birth date not null,
    position varchar(50) not null,
    team_id uuid not null,
    foreign key (team_id) references teams(team_id),
    jersey_number int not null
);

-- Match Fixtures Table
create table if not exists match_fixtures (
    match_id uuid primary key default gen_random_uuid(),
    match_date date not null,
    venue varchar(100),
    home_team_id uuid not null,
    away_team_id uuid not null,
    tournament_id uuid not null,
    home_score int,
    away_score int,
    foreign key (home_team_id) references teams(team_id),
    foreign key (away_team_id) references teams(team_id),
    foreign key (tournament_id) references tournaments(tournament_id),
    match_status varchar(20) not null
);

-- Tokens Table
create table if not exists tokens (
    access_token varchar(255) primary key,
    refresh_token varchar(255) not null,
    expires_at timestamp not null,
    created_at timestamp default current_timestamp
);
