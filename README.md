Autor: Diego Villarraza - 2020
# Introduccion
El proyecto es la creación una SPA (single web application) que simula el funcionamiento de unos dispositivos teniendo la posibilidad de intercactuar con ellos prendiendo o apagandolos. La SPA consulta y modifica los datos de los dispositivos de una base de datos que corre en un servidor incluído en la aplicación. 

Lo desarrolle para cumplir con el trabajo final de la asignatura Desarrollo de Aplicaciones Web de la Especilizacion de Internet de las cosas.

Para desarrollar la maqueta de la SPA utilizo:
 - HMTL 5.
 - CCS utilizando maquetas de materializecss.
 - JS utilizando un compilador typescript. 

Para el servidor utilizo:
 - NodeJS.
 - Servidor Web Express.
 - Base de datos MySql.
 - Administrador de base de datos PhpMyAdmin.

Toda la aplicación corre con 3 contenedores docker agrupados en un docker compose para ejecutarlos todos con un solo comando.

Los argumentos de ejecución del contenedor del servidor de la base de datos llamado MySQL son:
- MySQL
    - Nombre de la imagen:
        - mysql:5.7
    - Nombre contenedor:
        - mysql-server
    - Network:
        - mysql-net
    - Variables de entorno:
        - MYSQL_ROOT_PASSWORD=userpass
    - Volumenes:
        - HOST_DATABASE_DIR=./db/dumps
        - CONTAINER_DATABASE_DIR=/docker-entrypoint-initdb.d 
        - HOST_DATABASE_DUMP=./db/data
        - CONTAINER_DATABASE_DUMP=/var/lib/mysql

Los argumentos de ejecución del contenedor del administrador de la base de datos PHPMyAdmin son:
- PHPMyAdmin.
    - Nombre de la imagen:
        - phpmyadmin/phpmyadmin
    - Nombre contenedor:
        - phpmyadmin
    - Network:
        - mysql-net
    - Variables de entorno
        - PMA_HOST=mysql-server
        - PMA_PORT=3306
        - MYSQL_ROOT_PASSWORD=userpass
    - Puertos
        - HOSTPORT=8085
        - CONTAINERPORT=80

Los argumentos de ejecución del contenedor del servidor NodeJS+Express llamado Node-app son:
- Node App.
    - Nombre de la imagen: 
        - abassi/nodejs-server:10.0-dev 
    - Nombre contenedor: 
        - node-app
    - Network: 
        - mysql-net
    - Puertos: 
        - HOSTPORT=8000
        - CONTAINERPORT=3000
    - Volumenes:
        - HOST_DIR=./
        - CONTAINER_DIR=/home/node/app

# Correr la aplicación
Para correr la aplicación es necesario ejecutar el siguiente comando:
```sh
docker-compose up
```
Una vez que los contenedores se estan ejecutando, desde un web browser se puede desplegar la SPA ingesando a:

http://localhost:8000 
     
Si es necesario administar la base de datos con PHPMyAdmin desde un web browser ingresando a:

http://localhost:8085 

Para detener la aplicación es necesario ejecutar el siguiente comando:
```sh
docker-compose down
```

# Contribuir
Para contribuir realizar un pull request con las sugerencias.
# Licencia
GPL