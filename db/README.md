# Running liquibase migrations

This project uses liquibase to manage database changes. The easiest way to handle this is to run liquibase using the docker image.

To do this use the folloowing, replacing <command> with the liquibase command. Typically you will use `update` to apply new changes.

`docker run -v /home/changelog:/liquibase/changelog liquibase/liquibase 
--url=jdbc:postgresql://<DATABASE_IP>:5432/postgres 
--changelog-file=/liquibase/changelog/changelog.xml --username=postgres 
--password=postgres <command>`


View the liquibase docs for commands and more information.