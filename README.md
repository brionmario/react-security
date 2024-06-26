<p align="center" style="color: #343a40">
  <img
    src="https://github.com/brionmario/react-security/assets/25959096/2de3712c-f340-45f7-a8b0-ba892cf3ea36" alt="Banner" width="auto"
  >
</p>
<p align="center" style="font-size: 1.2rem;">
  This is a simple playground to test out XSS vulnerabilities in a React application. This utilizes the <a href="https://github.com/asgardeo/asgardeo-auth-react-sdk">Asgardeo React SDK</a> to demonstrate how to protect your application with the possible exploits.
</p>

<div align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License"></a>
  <br>
  <br>
</div>

<br>

## Prerequisite Software

To tryout the sample on a local environment, make sure you have the following set of tools on your local machine:

* [Git](https://git-scm.com/downloads) - Open source distributed version control system. For install instructions, refer [this](https://www.atlassian.com/git/tutorials/install-git).
* [Node.js](https://nodejs.org/en/download/) - JavaScript runtime with npm. For install instructions, refer [this](https://nodejs.org/en/download/package-manager/) (`v18 or higher`).
* `Optional` -> [pnpm](https://pnpm.io/) - Alternate npm client for faster package installs. (`v9 or higher`)

## Setup

### Setting up the Source Code

1. [Fork](https://docs.github.com/en/github/getting-started-with-github/fork-a-repo) the repository.
2. Clone your fork to the local machine.

Replace `<github username>` with your own username.

```shell
git clone https://github.com/<github username>/react-security.git
```

3. Optional: Set the original repo as the upstream remote.

```shell
git remote add upstream https://github.com/brionmario/react-security.git
```

### Setting up Asgardeo

Go to the [Asgardeo Console](https://console.asgardeo.io) and sign in.

### Create a SPA Client Application on Asgardeo

1. Click on the **Applications** tab on the left sidebar.
2. Click on the **New Application** button.
3. Select **Single Page Application* as the application type.
4. Give a name to the application and add authorized redirect URLs (In the default case: https://localhost:5173) and click **Create**.
5. Save the `Client ID` generated for the application.

### Create a Node.js Server Application on Asgardeo

1. Click on the **Applications** tab on the left sidebar.
2. Click on the **New Application** button.
3. Select **Traditional Web Application** as the application type.
4. Give a name to the application and select **OpenID Connect** as the protocol.
5. Add authorized redirect URLs (In the default case: http://localhost:3002) and click **Create**.
6. Save the `Client ID` and `Client Secret` generated for the application.

### Setting up the Development Environment

#### Install dependencies.

```bash
npm install
```

If you are using `pnpm`, run the following command.

```bash
pnpm install
```

#### Create `.env.local` files based on the `.env.example` files.

We will use the `.env.local` file to store the environment variables required for the applications.

##### Client

```env
cd apps/client
cp .env.example .env.local
```

Following set of environment variables are required for the application to work.

```env
# The client ID of your Asgardeo application
VITE_ASGARDEO_CLIENT_ID=<CLIENT_ID_TAKEN_FROM_ASGARDEO_CONSOLE>

# The base URL of your Asgardeo organization's services.
# Ex: https://api.asgardeo.io/t/acme
VITE_ASGARDEO_SERVICES_URL=<BASE_URL_TAKEN_FROM_ASGARDEO_CONSOLE>

# The callback URL to redirect to after successful authentication with Asgardeo
# Ex: https://localhost:5173
VITE_ASGARDEO_SIGN_IN_REDIRECT_URL=<SIGN_IN_URL_AFTER_A_SUCCESSFUL_AUTHENTICATION>

# The callback URL to redirect to after successful logout from Asgardeo
# Ex: https://localhost:5173
VITE_ASGARDEO_SIGN_OUT_REDIRECT_URL=<SIGN_OUT_URL_AFTER_A_SUCCESSFUL_AUTHENTICATION>
```

##### Hack Server


```
# The port number that the server will listen to.
# Change this to the desired port number that the server should listen to.
PORT=3002

# The base URLs of clients that are allowed to access the API.
# Separate by commas if there's more than one.
# E.g., http://localhost:3000,http://localhost:3001
CLIENT_BASE_URLS=<add-client-app-base-url-here>
```

## Running the Applications

To start the applications, run the following command from the root of the project.

```bash
npm run dev
```

If you are using `pnpm`, run the following command.

```bash
pnpm dev
```

> [!NOTE]
> Additionally, you can also go inside the respective application, and start.

## License
This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
