CREATE TABLE pessoas (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pessoas (nome) VALUES
('Gabriel Alves'),
('Ana Oliveira'),
('Bruno Souza'),
('Eduardo Ribeiro'),
('Igor Mendes'),
('Daniela Martins'),
('Fernanda Castro'),
('Helena Dias'),
('Juliana Rocha'),
('Carlos Lima');