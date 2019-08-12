# PF2e Spell Finder

A spell list for Pathfinder 2E with filters, search, and sort functionality.

The latest version can be consulted [here](https://spellfinder.joffrey.eu/)

## Development

The project is divided in 2 parts:
1. The converter, which reads the spell list source in `data/all.yaml`,
   validates it, and generates a minified JSON file
2. The web application, a single-page app written in React.

### Converter

On top of improvements to the converter itself, running the converter when
altering the data source is also useful as it validates the data format and
checks for common errors.
You will need the following to work on the converter:

- Some version of Python (Python 3.6+ recommended)
- `pip`, the Python package manager

Run the following command to install the required dependencies:
```
pip install -r requirements.txt
```

You should now be able to use the converter. To do so, simply type
`python convert.py ./<OUT_FILE>`.


### Web application

A React-based application that uses [React Bootstrap](https://react-bootstrap.github.io/)
to look pretty.
You will need the following to work on the web application:

- The converter's dependencies
- Node.js (ideally 10+)
- The `yarn` package manager

The `scripts/start-dev.sh` script will take care of installing dependencies and
spin up a development version of the app for you to play with.

## Static build

Static builds create a [Docker image](https://docs.docker.com) that can be
used to spin up containers. A recent version of Docker is required.
Use the following command inside the project's root:

```
docker build -t spellfinder:dev .
```

Once the build is complete, use the following command to publish the build
on `http://localhost:5151`:

```
docker run -p 5151:5151 spellfinder:dev
```
