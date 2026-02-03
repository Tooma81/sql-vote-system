CREATE TABLE HAALETUS (
    id INT PRIMARY KEY AUTO_INCREMENT,
    eesnimi VARCHAR(50) NOT NULL,
    perenimi VARCHAR(50) NOT NULL,
    haalestuse_aeg TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    otsus ENUM('ootel', 'poolt', 'vastu') NOT NULL DEFAULT 'ootel'
);

CREATE TABLE TULEMUSED (
    id INT PRIMARY KEY AUTO_INCREMENT,
    h_alguse_aeg DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    haaletanute_arv INT DEFAULT 0,
    poolt_haalte_arv INT DEFAULT 0,
    vastu_haalte_arv INT DEFAULT 0
);

CREATE TABLE LOGI (
    id INT PRIMARY KEY AUTO_INCREMENT,
    tegevus VARCHAR(50), 
    kirje_id INT,
    vana_vaartus TEXT,
    uus_vaartus TEXT,
    muutmise_aeg TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);