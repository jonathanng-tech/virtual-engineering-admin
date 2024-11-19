# React + TypeScript + ThreeJS + Vite

TBU
Hello world 

## Build Docker & Push to Docker Hub
- Build the Docker Image (run this command):
```
docker build --platform linux/amd64 -t jonathanngtech/ve-kitchen-fe:latest .
```

- Push & Pull Docker Image:
```
docker tag jonathanngtech/ve-kitchen-fe:latest jonathanngtech/ve-kitchen-fe:latest

docker push jonathanngtech/ve-kitchen-fe:latest
```

- Run the Docker Container on Server
```
docker pull jonathanngtech/ve-kitchen-fe:latest
docker run -d --name ve-kitchen-fe -p 8080:80 jonathanngtech/ve-kitchen-fe:latest


```


- Run postgres image
```
docker run --name ve-postgres-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=VE@12345678 -e POSTGRES_DB=ve_kitchen_dev -p 5432:5432 -d ve-postgres:latest

docker exec -it ve-postgres-db psql -U admin -d ve_kitchen_dev
```