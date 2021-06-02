# Dockerized Postgresql, Typeorm with Migrations and Transactions Nest Config

## 1. Create a .env file

In it you should have something like this

```
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=testDB
PORT=5000
```

## 2. Create a docker.env file

In this you should have something like this

```
POSTGRES_USER=admin
POSTGRES_PASSWORD=admin
POSTGRES_DB=testDB
PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin
```

## 3. Spin Up Your Docker Container

run `docker compose up -d`

When you are done working on your project you can run `docker compose down` to end the docker container

## 4 (optional): Connect to PGAdmin

Technically since we have swaggerUI, you may not necessarily have the need for PGAdmin, but its probably a good idea to hook it up. Go ahead and open up the docker app, click "open in browser" on the pgAdmin image in the docker image created.

You will need to login using the email and password provided in the docker.env file.

Once logged in, right click on the Servers row in the explorer on the left. --> Create --> Server. This should pop open a window

Call the name whatever you want then go to the connection page. Here is where things get a little bit tricky.

You will need to find the IP address that docker created for your postgres image. Type in `docker network ls` and you should get back something that looks like this:

```txt
NETWORK ID     NAME                           DRIVER    SCOPE
a031bac1f556   bridge                         bridge    local
0588834baa33   host                           host      local
92e955f995fd   none                           null      local
254d3d3171d8   rebuild-connection_postgres    bridge    local
78d8c8c8ddb4   simple-many-to-many_default    bridge    local
17fdc3aa2fb9   simple-many-to-many_postgres   bridge    local
```

The hash for our postgres image is 17f... so we can now inspect that network specifically using `docker network inspect 17`. **Note** *you only need enough letters from the hash to differentiate it from the others. In this case 17 is unique so it will work fine, and you don't have to type out the whole hash.*

You should get back something like this:

```txt
[
    {
        "Name": "simple-many-to-many_postgres",
        "Id": "17fdc3aa2fb9f0d597a92e84c757c22f64307582e6f7ded6ed05de8b7ae8ad88",
        "Created": "2021-06-02T04:20:07.3002283Z",
        "Scope": "local",
        "Driver": "bridge",
        "EnableIPv6": false,
        "IPAM": {
            "Driver": "default",
            "Options": null,
            "Config": [
                {
                    "Subnet": "172.22.0.0/16",
                    "Gateway": "172.22.0.1"
                }
            ]
        },
        "Internal": false,
        "Attachable": false,
        "Ingress": false,
        "ConfigFrom": {
            "Network": ""
        },
        "ConfigOnly": false,
        "Containers": {
            "65d18556598c91915cfbf1047d8e8e2c2f0531c9aace31f882918270ee03650d": {
                "Name": "pgadmin",
                "EndpointID": "c02204144acfe2de827cf3be29c74556d8cc703ad1545f0a18ecf6fe974ea9b7",
                "MacAddress": "02:42:ac:16:00:03",
                "IPv4Address": "172.22.0.3/16",
                "IPv6Address": ""
            },
            "a4d909f09b7b79cd5f324632f334d43b879946ffe1024d2d9bd4e6fc8933e752": {
                "Name": "postgres",
                "EndpointID": "f152477b5324cd0e3ac625516b23118a99aa72dd75c0c0204993f08f8e01f23c",
                "MacAddress": "02:42:ac:16:00:02",
                "IPv4Address": "172.22.0.2/16",
                "IPv6Address": ""
            }
        },
        "Options": {},
        "Labels": {
            "com.docker.compose.network": "postgres",
            "com.docker.compose.project": "simple-many-to-many",
            "com.docker.compose.version": "1.0-alpha"
        }
    }
]
```

In this case the postgres ip address is 172.22.0.2 that is what you wil use to connect to pg admin, along with the other credentials defined in the .env file.

## A couple of notes

I think a fundamental problem with NestJS is getting the initial setup for people who are beginners. This template is a good starting point for a real api. I did a whole bunch of work on some code with synchronize set to true. Because typeorm can generate migrations for you, I'd reccomend making migrations as you go. This is hands down the best video series I've seen [here](https://www.youtube.com/watch?v=sNosL578ECo&list=PLlaDAvA2MhR2jb8zavu6I-w1BA878aHcB&index=3)
