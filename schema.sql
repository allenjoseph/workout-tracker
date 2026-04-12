DROP TABLE IF EXISTS Workout;
CREATE TABLE IF NOT EXISTS Workout (
    id INTEGER PRIMARY KEY,
    uuid TEXT,
    userId INTEGER, -- oauth id_token sub
    timestamp NUMERIC
);

DROP TABLE IF EXISTS Exercise;
CREATE TABLE IF NOT EXISTS Exercise (
    id INTEGER PRIMARY KEY,
    workout TEXT, -- Workout UUID
    muscle TEXT,
    name TEXT,
    reps INTEGER,
    weight NUMERIC, -- in Kilograms
    rpe INTEGER, -- 1:easy 5:medium 10:hard
    failure NUMERIC, -- 0:false 1:true
    notes TEXT,
    timestamp NUMERIC
);