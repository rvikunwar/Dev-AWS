<div style="display: flex;">
  <img width="20%" src="/public/docker.svg" alt="docker"/>
  <img width="20%" src="/public/aws.svg" alt="aws"/>
  <img width="20%" src="/public/apache.svg" alt="apache"/>
  <img width="20%" src="/public/gitlab.svg" alt="gitlab"/>
</div>

# Docker 
[Docker](https://docker.com) is a platform that provides us a way to package our application in an isolated environment containing all the libraries, tools, and code required to run an application.
It is basically a virtualization tool tahta makes easy to develop, test and deploy our applications by using images and container.
Those packages are known as docker images and when they are running then they are called as container.


- They are isolated
- They are light-weighted as they don't require hypervisor as virtual machine
- Multiple containers can run on a single host 


## [Docker registry](https://dockerhub.com)
It is an open source platform for storing, maintaining and distributing docker images.


## Docker commands
- ***docker -version***  // *for getting the current version of docker*
- ***docker pull <image name>***   // *this pulls an image from [docker registry](hub.docker.com)*
- ***docker run -it -d <image_name>***  // *this is used to run an image in a detached mode, here '-i' is used to start the image in an interactive mode allowing us to interact with the conatiner's shell, without this option, the container might start but immediately exit if no foreground process starts on container and '-t' or --tty is used to allocate a pseudo-TTY (pseudo terminal) for a container, it ensures that the container has access to terminal and can handle any input and output in a way that mimics the real terminal*
- ***docker ps***   // *shows a list of running containers*
- ***docker ps -a***   // *used to show all the running and exited containers*
- ***docker exec -t <container_id> bash or sh***   // *used to access running container terminal*
- ***docker stop <container_id>***   // *for stopping the container*
- ***docker kill <container_id>***   // *it is used to stop the container immediately*
- ***docker commit <continer_id> <username/image_name>***   // *used to update an image*
- ***docker login***   // *used to login to docker hub registry*
- ***docker push***   // *used to push an image to docker registry*
- ***docker images***   // *list locally stored images*
- ***docker rm <container_id>***   // *used to remove stopped container*
- ***docker rmi <image_id>***   // *used to remove locally stored image* 
- ***docker rmi -f <container_id>***   // *used to stop and remove running container*
- ***docker build <path_to_docker_file>***
- ***docker history <image_name>***   // *this provides the details for the evolution of docker image*
- ***docker logout <registry_url>***
- ***docker logs <container_id>***   // *it provides the logs of container*
- ***docker network create <network_name>***   // *this creates an newtork for docker container to communicate with each other internally in an isolated and secured environment*
- ***docker restart -it -d <container_id>***   // *restarts the container*
- ***docker volume create volume_name***   // *creates the volumes for persistancy*
- ***docker inspect <container_id>***   // *list the configuration of a container*


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

## Gitlab CI/CD
Gitlab

### GitLab runner 
Gitlab runner is an application which is used run jobs over a machine and sends result back to gitlab.

Installation on aws ubuntu machine

1. Log into aws remote server using ssh
```sh
ssh -i <private_key> ubuntu@server_ip
```

2. Download gitlab repo and run the script
```sh
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh > script.deb.sh
less script.deb.sh

sudo bash script.deb.sh
```

3. Now install gitlab runner
```sh
sudo apt install gitlab-runner
```

4. Atlast check the status
```sh
systemctl status gitlab-runner
```

After installing GitLab Runner, you need to register it with your GitLab account. Here are the steps:

1. Within your GitLab project, navigate to Settings > CI/CD > Runners.
2. Add a new runner specific to your project. Configure the settings as needed, and assign a tag. A tag is a user-defined keyword used to identify GitLab runners uniquely for your project.
3. Once you've configured the runner, you will receive a GitLab URL and a registration token. You'll use these later when setting up an AWS EC2 instance and registering it as a GitLab runner.
4. Now on ubuntu machine, execute the following command
```sh
sudo gitlab-runner register
```
  - This command will prompt you for the following information, which you obtained in the last step:
    - GitLab URL
    - Registration token
  - Additionally, it will ask you to specify an executor, which determines how jobs are run. You can choose from options like shell, docker, bash, and more, depending on your requirements.
5. Now that GitLab runner is ready on your Ubuntu machine, make sure to update and configure it as necessary.


## Configuring .gitlab-ci.yml file
It's now time to set up CI/CD for your Node.js application for deploying it to aws using docker and docker registry. In this example, we'll use GitLab Container Registry. Follow and checkout the steps in order to setup yml file for ci/cd pipeline:

1. Build docker image:
  - Define your Dockerfile, which includes the configuration for building your application Docker image
  - then execute the following for building image
```sh
docker build -t <project-name>:<image-tag> .
```

2. Publish image to docker registry
  - Publish our image to docker registry (gitlab container registry), you can explore the GitLab Container Registry by going to Packages & Registries > Container Registry in your GitLab project. Here, you can view and manage Docker images stored in the registry.
```sh
docker push <image_id>
```

3. SSH into your AWS EC2 machine or you can use gitlab runner tag for logging/running jobs on AWS machine.
  - Here, remove the old Docker image and container if necessary.
  - Pull the latest Docker image from the GitLab Container Registry:
```sh
docker pull <registry-url>/<project-name>:<image-tag>
```
  - Start a new container with the latest Docker image:
```sh
docker run -d -p <host-port>:<container-port> <registry-url>/<project-name>:<image-tag>
```

By following these steps, you can configure yml CI/CD file to build and push Docker images to GitLab Container Registry and then deploy the latest image on your AWS EC2 machine.


  Dockerfile
```sh
FROM node:16.20  // this will pull an image from docker registry with node 16 as it's environment
RUN mkdir -p /home/app  // creates a directory in our pulled docker image
WORKDIR /home/app // set /home/app as our working directory in our image
COPY . /home/app // copies everything from our current local location to working directory of image
RUN npm install  // install dependencies for our node application defined in our package.json

EXPOSE 9001  // exposes port 9001 for our application for port mapping with external network
CMD ["node", "index.js"]  // run node index.js command when we start our container
```