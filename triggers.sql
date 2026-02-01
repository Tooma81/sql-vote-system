CREATE TRIGGER Logimine
AFTER UPDATE ON HAALETUS
FOR EACH ROW 
BEGIN
    INSERT INTO LOGI (tegevus, kirje_id, vana_vaartus, uus_vaartus) 
    VALUES ('haaletus', OLD.id, OLD.otsus, NEW.otsus);
END;