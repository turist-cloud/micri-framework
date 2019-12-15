Micri Framework
===============

All services written in TypeScript are hosted under the `srv` directory. The
build config, `package.json`, etc. are common to all services and each service
is built using `make`. The source directories for services are prefixed with
`api-` and all the common library code is located under `lib`.

A `docker-compose.yaml` is provided for local testing and building the Docker
images.

Development
-----------

To build all services for local development without using Docker:

```bash
$ make
```

Dependencies can be installed either by running `yarn install` manually or
by running the build with `make` as the `Makefile` will install TS
dependencies too.

### Adding a new service

1. Create a directory for the service `api-<something>`
2. Add an `index.ts` file under `src/` in that directory
3. Add the endpoint to the `ENDPOINTS` list in the `Makefile` in this directory
5. Add the service to the `docker-compose.yaml`
