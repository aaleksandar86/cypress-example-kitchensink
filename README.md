# Kitchen Sink [![renovate-app badge][renovate-badge]][renovate-app] [![semantic-release][semantic-image] ][semantic-url]


```shell
npm run local:open
```

As an alternative to using the `local:open` and `local:run` scripts, you can also start the server in one step and then run Cypress in a second step.

```shell
npm start # start server on port 8080
```

You can check that the server is running if you open a web browser and navigate to `http://localhost:8080`.

Then in a separate terminal window execute either

```shell
npm run test:pw # headed mode is preconfigured as default
```

To run the entire suite (Gherkin/Cucumber) and open the report:

```shell
npm run test:gherkin
```
This step:

- Starts the Server: It launches the application on http://localhost:8080.
- Runs Tests: It executes the Cucumber tests defined in the .feature files using the step definitions in tests/step-definitions/.
- Generates Report: It processes the data in the allure-results folder.
- Opens Allure: It starts a local web server to display the interactive Allure report in your default browser.

If you want to run the steps individually to debug a specific failure:

Run Cucumber Tests
```shell
npm run test:cucumber
```

Generate the Report
```shell
npm run allure:generate
```

Open the Report
```shell
npm run allure:open
```



#### Script and server structure

The scripts `local:run` and `local:open` use the `start-test` alias of the npm module [start-server-and-test](https://www.npmjs.com/package/start-server-and-test) to run [./scripts/start.js](./scripts/start.js), which starts the webserver, waits for it to become ready, and then launches Cypress.

The `start` script spawns a webserver using the npm module [serve](https://www.npmjs.com/package/serve) and displays the Kitchen Sink App on port `8080`.

### Docker testing

If you have Docker installed locally, for instance using [Docker Desktop](https://docs.docker.com/desktop/), you can run the tests from this repo interactively in a Docker container.
Use [Cypress Docker images](https://github.com/cypress-io/cypress-docker-images), which are built with all the prerequisites for running Cypress. They are available as [base](https://github.com/cypress-io/cypress-docker-images/tree/master/base), [browsers](https://github.com/cypress-io/cypress-docker-images/tree/master/browsers) and [included](https://github.com/cypress-io/cypress-docker-images/tree/master/included) options from [Docker Hub](https://hub.docker.com/u/cypress) and the [Amazon ECR (Elastic Container Registry) Public Gallery](https://gallery.ecr.aws/cypress-io).

As above, start by cloning the repo and installing dependencies:

```shell
git clone https://github.com/cypress-io/cypress-example-kitchensink
cd cypress-example-kitchensink
npm ci
```

NOTE: For simplicity, the Docker examples below use a repository reference such as `cypress/base` with the `latest` version tag. To select an earlier version, replace `latest` with an explicit tag, for example `cypress/base:20.15.1`. Explicit version tags are recommended for production. Usage is further explained in the [Tags](https://github.com/cypress-io/cypress-docker-images/blob/master/README.md#tags) section of the [Cypress Docker Images - README](https://github.com/cypress-io/cypress-docker-images/blob/master/README.md).

#### cypress/base

The following example uses a [cypress/base](https://github.com/cypress-io/cypress-docker-images/tree/master/base) image which itself contains no browsers. You will use the Electron browser bundled with Cypress instead. To run the Docker container, execute the following:

```shell
docker run -it --rm -v .:/app -w /app cypress/base:latest
```

When the container prompt appears, enter:

```shell
npx cypress install     # install Cypress binary
npm run test:ci         # start server and run tests in Electron browser
exit
```

#### cypress/browsers

With a [cypress/browsers](https://github.com/cypress-io/cypress-docker-images/tree/master/browsers) image you have the additional choice of Chrome, Edge and Firefox browsers. Execute the following:

```shell
docker run -it --rm -v .:/app -w /app cypress/browsers:latest
```

When the container prompt appears, enter:

```shell
npx cypress install     # install Cypress binary
npm run test:ci         # start server and run tests in Electron browser
npm run test:ci:chrome  # start server and run tests in Chrome browser
npm run test:ci:edge    # start server and run tests in Edge browser
npm run test:ci:firefox # start server and run tests in Firefox browser
exit
```

#### cypress/included

The [cypress/included](https://github.com/cypress-io/cypress-docker-images/tree/master/included) images add a full Cypress installation compared to [cypress/browsers](https://github.com/cypress-io/cypress-docker-images/tree/master/browsers).
Execute the following to run the container with a one-line command, testing with the Chrome browser:

```shell
docker run -it --rm -v .:/app -w /app --entrypoint bash cypress/included:latest -c 'npm run test:ci:chrome' # use for matching Cypress versions
```

Replace the `latest` tag in the above command using the Cypress version from the repo's [package.json](./package.json), if this repository has not yet been updated to the latest released Cypress version.
Note that mismatched versions will cause errors.

NOTE: Additional browsers Chrome, Edge and Firefox are installed in `linux/amd64` architecture images `cypress/browsers` and `cypress/included`.
Firefox is available pre-installed for `linux/arm64` architecture images based on Firefox `>=136.0.2`.
Refer to the [Cypress Docker images README](https://github.com/cypress-io/cypress-docker-images/blob/master/README.md#browsers) for details.
The Electron browser, which is built-in to Cypress, is available in all images and architectures.

### CI Testing

If you would like to try out running tests in a Continuous Integration (CI) provider then you need to first [fork the repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo) so that you have your own copy. Refer to the [GitHub documentation](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo#configuring-git-to-sync-your-fork-with-the-upstream-repository) to set up aliases for `remote upstream` (to this repo) and `remote origin` (to your fork) correctly.
You will also need to have an account with the CI provider you want to test with.

## Documentation

- Use the [Cypress Documentation](https://on.cypress.io) for instructions on how to use Cypress
- Read the [Command Line Guide](https://on.cypress.io/command-line) for run options
- Refer to the [API](https://on.cypress.io/api/) documents to understand the Cypress API calls tested in this repo
- Read [Installing Cypress](https://on.cypress.io/installing-cypress) for step-by-step information on installing Cypress in your own project


