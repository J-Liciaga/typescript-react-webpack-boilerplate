# typescript-react-webpack-boilerplate

## Docker Jenkins
1. Create a bridge network in Docker using the following docker network create command:
```
docker network create jenkins
```

2. In order to execute Docker commands inside Jenkins nodes, download and run the docker:dind Docker image using the following link:https://docs.docker.com/engine/reference/run/ [docker run] command:
```
docker run \
    --name jenkins-typescript-react-boilerplate \
    --rm \
    --detach \
    --privileged \
    --network jenkins \
    --network-alias docker \
    --env DOCKER_TLS_CERTDIR=/certs \
    --volume jenkins-typescript-react-boilerplate-certs:/certs/client \
    --volume jenkins-data:/var/jenkins_home \
    --publish 2376:2376 \
    docker:dind
```

3. Build new docker image
```
docker build -t jenkins-typescript-react-boilerplate:1.1 .
```

4. Stop the current jenkins-typescript-react-boilerplate:1.1 container.
```

```
5. Run yor own jenkins-typescript-react-boilerplate:1.1 image as a container using the following docker run command:
```
docker run --name jenkins-typescript-react-boilerplate --rm --detach \
  --network jenkins --env DOCKER_HOST=tcp://docker:2376 \
  --env DOCKER_CERT_PATH=/certs/client --env DOCKER_TLS_VERIFY=1 \
  --publish 8080:8080 --publish 50000:50000 \
  --volume jenkins-data:/var/jenkins_home \
  --volume jenkins-typescript-react-boilerplate-certs:/certs/client:ro \
  jenkins-typescript-react-boilerplate:1.1
```

6. To accesss the docker container
```
docker exec -it jenkins-typescript-react-boilerplate bash
```

7. To access Docker logs
```
docker logs jenkins-typescript-react-boilerplate
```

8. To access the jenkins home directory
```
docker container exec -it jenkins-typescript-react-boilerplate bash
```

