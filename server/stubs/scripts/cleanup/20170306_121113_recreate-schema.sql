DECLARE
   
    BEGIN
        FOR ln_cur IN (SELECT sid, serial# FROM v$session WHERE USERNAME IS NOT NULL AND USERNAME <> (select user from dual))
        LOOP
            EXECUTE IMMEDIATE ('ALTER SYSTEM KILL SESSION ''' || ln_cur.sid || ',' || ln_cur.serial# || ''' IMMEDIATE');
        END LOOP;
    END;
/

DECLARE
    u_count number;
    user_name VARCHAR2 (50);
    
    BEGIN
        u_count := 0;
        user_name := 'RESULTDB';
           
        SELECT COUNT (1) INTO u_count FROM dba_users WHERE username = UPPER (user_name);
        IF u_count != 0
        THEN
            EXECUTE IMMEDIATE ('DROP USER ' || user_name || ' CASCADE');
        END IF;

        EXECUTE IMMEDIATE ('CREATE USER ' || user_name || ' IDENTIFIED BY oracle');
        EXECUTE IMMEDIATE ('GRANT DBA TO ' || user_name || ' IDENTIFIED BY oracle');

        u_count := 0;
       
        EXCEPTION
           WHEN OTHERS
              THEN
                DBMS_OUTPUT.put_line (SQLERRM);
                DBMS_OUTPUT.put_line ('   ');
    END;
/