- sudo docker stack deploy -c docker-compose.yml terminal
- sudo docker stack rm terminal
- sudo docker service logs terminal_server

- sudo docker stack deploy -c traefik.yml traefik

- sudo docker stop $(sudo docker ps -a -q)
- sudo docker rm $(sudo docker ps -a -q)
- sudo docker rmi $(sudo docker images -q)

- sudo docker-compose up -d
- sudo docker-compose push
- sudo docker-compose down

- sudo docker exec -it <NAME> /bin/bash