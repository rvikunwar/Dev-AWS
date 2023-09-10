# Docker 
Docker is a platform that provides us a way to package our application in an isolated environment containing all the libraries, tools, and code required to run an application.
It is basically a virtualization tool tahta makes easy to develop, test and deploy our applications by using images and container.
Those packages are known as docker images and when they are running then they are called as container.
https://docker.com

- They are isolated
- They are light-weighted as they don't require hypervisor as virtual machine
- Multiple containers can run on a single host 


## Docker registry
It is an open source platform for storing, maintaining and distributing docker images.
https://dockerhub.com


## Docker commands
- docker -version: for getting the current version of docker
- docker pull <image name>: this pulls an image from docker registry (hub.docker.com)
- docker run -it -d <image_name>: this is used to run an image in a detached mode, here '-i' is used to start the image in an interactive mode allowing us to interact with the conatiner's shell, without this option, the container might start but immediately exit if no foreground process starts on container and '-t' or --tty is used to allocate a pseudo-TTY (pseudo terminal) for a container, it ensures that the container has access to terminal and can handle any input and output in a way that mimics the real terminal.
- docker ps: shows a list of running containers
- docker ps -a: used to show all the running and exited containers
- docker exec -t <container_id> bash or sh:  used to access running container terminal
- docker stop <container_id>: for stopping the container
- docker kill <container_id>: it is used to stop the container immediately 
- docker commit <continer_id> <username/image_name>: used to update an image
- docker login: used to login to docker hub registry
- docker push: used to push an image to docker registry
- docker images: list locally stored images
- docker rm <container_id>: used to remove stopped container
- docker rmi <image_id>: used to remove locally stored image 
- docker rmi -f <container_id>: used to stop and remove running container
- docker build <path_to_docker_file>
- docker history <image_name>: this provides the details for the evolution of docker image
- docker logout <registry_url>
- docker logs <container_id>: it provides the logs of container
- docker network create <network_name>: this creates an newtork for docker container to communicate with each other internally in an isolated and secured environment
- docker restart -it -d <container_id>: restarts the container
- docker volume create volume_name: creates the volumes for persistancy
- docker inspect <container_id>: list the configuration of a container


### Docker port mapping and volumes
Port mapping: It is employed to enable external access to an application within a container. This technique facilitates the mapping of a port from an external network device to a port within the container, thus establishing communication between them.

```sh
docker run -p 8080:80 <image_id>
```
This command is used to map a port (8080) from an external device to an application of container on port 80.

Volumes: It is used to maintain persistant data in a container. When we start a container, they maintain a state for the applications running on it but that state gets destroyed when we stop our container. So in some cases we need to persistant data for our container and this is achieved by docker volumes. Docker volume is an independent file system maintained by docker, they exists on a host system as a normal file or directory where data is persisted.

Creating docker volume
```sh
docker volume create <volume_name>
```

Mouting docker volume to a container
```sh
docker run -v <volume_name>:<destination_inside_of_container> image_name
```

Listing docker volumes
```sh
docker volume ls
```

## Dockerfile
It is a simple text file with a set of instruction. These instruction are used to perform actions on a base image to create a new docker image.
[Dockerfile example](./Dockerfile)

Dockerfile commands
FROM: defines a base image
RUN: executes command in a new image layer
CMD: command to be executed when we start a container
ENTRYPOINT: define a container's executable, similar to CM but without params
ADD: it is used to copy files/data from an URL to an image
ENV: sets environment variables inside the image
EXPOSE: defines a port for external communication
COPY: copies the local files into images
VOLUME: defines which directory in an image should be stored in docker volumes
WORKDIR: defines the working directory for the instructions and commands.

Building docker image using Dockerfile
```sh
docker build -t image_tag <Dockerfile_path>
```

## Docker compose
It a management tool of docker used for maintaining multiple docker containers at once.


