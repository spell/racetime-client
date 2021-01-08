## Getting Started

Before you begin, make sure that you have [Node.js and NPM](https://nodejs.org/en/) installed. Also make sure you got
[racetime-app](https://github.com/spell/racetime-app) running and working, following the instructions in the README.md
file in the root of this repository.

1. Navigate to `localhost:8000/admin` and create a new confidential OpenID Client using the `id_token`
   authorization flow. Make sure it has access to at least the `openid` claim and register the
   `http://localhost:3000` callback URL.
1. Copy the file called `.env.local.example` in the root of the project to `.env.local`, and set the values
   appropriately to point to the correct addresses. Please refer to the section below for detailed instructions.
1. Change `NEXT_PUBLIC_AUTH_CLIENT_ID` to the client ID of the created client in the first step.
1. Restart the services by issuing `docker-compose down && docker-compose up -d`.
1. (Optional) If you are developing on Windows, please read the section on Windows in the caveats below.

Open [http://localhost:3000](http://localhost:3000) with your browser and have a look around.

## Contributing

Contributors are welcome, please refer to the [issues page](https://github.com/spell/racetime-client/issues) or join us
at our [Discord](https://discord.racetime.gg) to see what you can do, or just start hacking away!

## Caveats

### Next.js and Docker on Windows.

Next.js uses HMR (Hot Module Replacement) to allow rapid development, when you save your code the Next.js server picks
this up and reloads your code in-place without ever restarting. This means that often your changes appear immediately
as replacing a single module takes only a few milliseconds.

If you are using Docker on Windows together with this client, you will quickly find out that this does not work. This
is a regression in the WSL2 based backend for Docker and probably has to do with an incompatibility between how Linux
and Windows handle filesystem events. There are workarounds for this, one involving 'polling' which is a lot slower,
the other workaround is to just develop directly on Windows.

We recommend the latter option, but if you wish to do the former, simply searching with your favourite search machine
for `docker next.js hmr windows` will quickly find you instructions on how to set this up.

To work directly on Windows, make sure you have [Node.js](https://nodejs.org/en/) installed locally. Then follow the
instructions below:

1. In the root of this repository, create a `docker-compose.override.yml` file with the following contents:
   ```yaml
   version: '3.6'

   services:
     racetime.client:
       command: ["echo", "Service disabled."]
       restart: "no"
   ```
1. Issue `docker-compose up --build -d` to reflect the changes.
1. In the `client` directory, make sure that the `node_modules` directory does not exist, and delete it if it does, as
   the Linux dependencies are incompatible with Windows.
1. Issue the following command from the `client` directory to install dependencies:
   ```bash
   # Using yarn (recommended):
   npm install -g yarn
   yarn install

   # Using NPM
   npm install
   ```
1. Open `.env.local` (or copy `.env.local.example` to `.env.local`) and make the following changes:
   1. Set `API_SERVER` and `NEXT_PUBLIC_API_SERVER` to `http://localhost:<PORT>/api`, where <PORT> is the port on which
      the racetime.web service runs, by default that would be 8000.
   1. Change `NEXT_PUBLIC_AUTH_AUTHORITY` to `http://localhost:<PORT>` where <PORT> is the port on which the
      racetime.web service runs (8000 by default).

You can now start the development server by issuing `yarn run dev` or `npm run dev`. To stop the dev server, simply
press `CTRL+C` to issue the interrupt command.
