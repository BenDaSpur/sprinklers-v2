CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create sprinkler table
CREATE TABLE
    sprinkler (
        id SERIAL PRIMARY KEY,
        gpio INTEGER NOT NULL,
        description TEXT
    );

-- Create history table
CREATE TABLE
    history (
        id SERIAL PRIMARY KEY,
        sprinkler_id INTEGER REFERENCES sprinkler (id),
        timestamp TIMESTAMP NOT NULL,
        event VARCHAR(255) NOT NULL
    );

-- Create weather table
CREATE TABLE
    weather (
        id UUID DEFAULT uuid_generate_v4 () PRIMARY KEY,
        temperature DECIMAL(4, 1) NOT NULL,
        description VARCHAR(255) NOT NULL,
        humidity INTEGER NOT NULL,
        precip_chance DECIMAL(4, 2) NOT NULL,
        datetime TIMESTAMP NOT NULL
    );

-- Create zone table
CREATE TABLE
    zone (
        id SERIAL PRIMARY KEY,
        zone_description TEXT,
        sprinkler_id INTEGER REFERENCES sprinkler (id)
    );

-- Create schedule table
CREATE TABLE
    schedules (
        id SERIAL PRIMARY KEY,
        zones JSONB NOT NULL,
        start_time TIME NOT NULL,
        days JSONB NOT NULL,
        is_disabled BOOLEAN NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );