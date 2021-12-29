
# Deployment

Para el deploy de la aplicación se requiere tener docker swarm configurado.



## Clonar el repositorio

```bash
git clone https://github.com/Bruno540/Proyecto-Pasantia-TISJ.git
```
Una vez clonados los archivos de deployment se encuentran en la rama Agustin, dentro de la carpeta llamada Deploy.


## Repositorios de docker

Se deben crear dos repositorios publicos en https://hub.docker.com/, uno para el backend de la aplicación y otro para el frontend de la misma.

## Configuracion

Para llevar a cabo el deploy se deben realizar las siguientes modificaciones dentro de los archivos de la carpeta **Deploy**:

- Cambiar la palabra DNS por el nombre de dominio correspondiente en: 
    - **docker-compose.yml**: uno para el **backend** (server) asi como el correspondiente a la base de datos en la sección de **envirornment**, y otro para el **frontend** (client).
    - **traefik.ypl**: uno para el dashboard de traefik.
- Cambiar la url del backend utilizada en el frontend de la aplicación.
    - Ingresar a PasantiaFront\src\environments\proyect-config.ts
    - Modificar http://localhost:3000 por la url correspondiente al backend. Por ejemplo: https://terminalback.
- Cambiar el valor del tag image de los servicios server y client en el archivo docker-compose.yml en la raíz del proyecto y el que se encuentra en la carpeta de Deploy. Por ejemplo: agu458/terminal-front por repo/terminal-front.

## Push a docker

Dentro de la raíz del proyecto se debe ejecutar lo siguiente para publicar a los repositorios de docker:
```bash
sudo docker-compose up -d
sudo docker-compose push
sudo docker-compose down
```


## Deploy de la app

Para llevar a cabo el deploy de la app, hay que ingresar los siguientes comandos desde la carpeta de Deploy:
```bash
sudo docker stack deploy -c traefik.yml traefik
sudo docker stack deploy -c docker-compose.yml terminal
```

Para ver si la conexión del backend con la base de datos fue exitosa puede utilizarse el siguiente comando: 
```bash
sudo docker service logs terminal_server
```

Para remover el deploy puede utilizarse el siguiente comando:
```bash
sudo docker stack rm terminal
sudo docker stack rm traefik
```