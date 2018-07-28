# Path of Exaile Helper for Alexa

This is helper Alexa skill for [Path of Exile](https://www.pathofexile.com/).

## What it can do

The skill allows you to price check items and find the rewards for quests.

### Price checking

Items are split into four categories, each supporting different combinations of variables:

| Category | Item types |
| --- | --- |
| Currency | `Currency` and `fragments` |
| Linked items | `Unique weapons` and `unique armours` |
| Skill gems | `Skill gems` |
| Other items | `Divination cards`, `prophecies`, `maps`, `unique maps`, `unique jewels`, `unique flasks`, `unique accessories` |

You can include the league in all queries. If no league is specified, it will default to the current temporary challenge league.

#### Currency

| Type | Variable |
| --- | --- |
| Required | `item name` |
| Optional | `quantity`, `league` |

Example queries:

- Alexa, ask p o e what is the price of a `Mirror of Kalandra` in `Standard`
- Alexa, ask p o e what is the price of `ten` `Exalted Orbs` in `Hardcore` league
- Alexa, ask p o e what is the price of `five hundred` `fusings`
- Alexa, ask p o e what is the price of a `Fragment of the Minotaur`

#### Linked items

| Type | Variable |
| --- | --- |
| Required | `item name` |
| Optional | `links`, `league` |

Example queries:

- Alexa, ask p o e what is the price of a `six linked` `Loreweave` in `Standard`
- Alexa, ask p o e what is the price of a `five linked` `belly`
- Alexa, ask p o e what is the price of a `Starforge`
- Alexa, ask p o e what is the price of a `six linked` `Disfavour`

#### Skill gems

| Type | Variable |
| --- | --- |
| Required | `item name`, `level` |
| Optional | `quality`, `league` |

Example queries:

- Alexa, ask p o e what is the price of a `twenty one` `twenty three` `Kinetic Blast` in `Incursion` league
- Alexa, ask p o e what is the price a `level four` `Empower`

#### Other items

| Type | Variable |
| --- | --- |
| Required | `item name` |
| Optional | `league` |

Example queries:

- Alexa, ask p o e what is the price of a `Headhunter`
- Alexa, ask p o e what is the price of a `Dying Sun` in `Standard`
- Alexa, ask p o e what is the price of a `Pit of the Chimera Map`
- Alexa, ask p o e what is the price of a `House of Mirrors`

### Quest rewards

You can check what is the reward for a quest, e.g.:

- Alexa, ask p o e what is the quest reward for `The Dweller of the Deep`
- Alexa, ask p o e what is the reward for `Kitava's Torments`

---

## Running the project

### Pre-requisites

- Node.js
- Register for an [AWS Account](https://aws.amazon.com/)
- Register for an [Amazon Developer Account](https://developer.amazon.com/)
- Install and Setup [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html)

### Installation

- Install the dependencies

```bash
$ npm install
```

### Deployment

**ASK CLI** will create the skill and the Lambda function for you. The Lambda function will be created in `us-east-1 (Northern Virginia)` by default.

1. Navigate to the project's root directory. you should see a file named 'skill.json' there.

2. Deploy the skill and the Lambda function in one step by running the following command:

```bash
$ ask deploy
```

### Local development

In order to develop locally and see your changes reflected instantly, you will need to create an SSH tunnel or expose somehow your local development server. There are several services that allow you to do this, for example [ngrok](https://ngrok.com/) or [serveo.net](https://serveo.net/).

#### Using servo.net

This is the easiest to setup

1. You need to have an SSH client installed, then simply run

```bash
$ ssh -R 80:localhost:3980 serveo.net
Forwarding HTTP traffic from [https://YOUR_URL]
Press g to start a GUI session and ctrl-c to quit.
```

2. Once you see the URL, copy it and go to your Skill console.

3. Open the `Endpoint` menu and select `HTTPS`

4. Under `Default Region` paste the previous URL you copied.

5. On the select box choose: `My development endpoint is a sub-domain of a domain that has a wildcard certificate from a certificate authority`.

6. You are done! Just run `npm start` to start the local server and begin testing the skill.

#### Using ngrok.io

1. [Install ngrok](https://ngrok.com/download)

2. Run `ngrok http 3980`

3. Copy the URL and follow the same steps above from 3 to 6.

## Developer tasks

| Command | Description |
| --- | --- |
| `clean` | Deletes the `dist` folder |
| `build` | Builds the lambda function and exports it to the `dist` folder |
| `deploy` | Builds the lambda function and deploys EVERYTHING (skill, model, lambda) |
| `deploy:lambda` | Builds the lambda function and deploys it (just the lambda function) |
| `deploy:local` | Deploys the skill details for the local profile, which will update the HTTPS endpoint |
| `start` | Starts the local `express` server using `nodemon` for local development |

To see the actual commands, check `package.json`.

Also check the [ASK CLI Command Reference](https://developer.amazon.com/docs/smapi/ask-cli-command-reference.html) for more details on using the `ASK CLI`.

## Testing

The project contains automated tests using [jest](https://jestjs.io/).

```bash
$ npm run test
```

Taken from [the official hello world project](https://github.com/alexa/skill-sample-nodejs-hello-world/blob/master/instructions/7-cli.md#testing).

1. To test, you need to login to Alexa Developer Console, and **enable the "Test" switch on your skill from the "Test" Tab**.

2. Simulate verbal interaction with your skill through the command line (this might take a few moments) using the following example:

	```bash
	 $ ask simulate -l en-US -t "open greeter"

	 ✓ Simulation created for simulation id: 4a7a9ed8-94b2-40c0-b3bd-fb63d9887fa7
	◡ Waiting for simulation response{
	  "status": "SUCCESSFUL",
	  ...
	 ```

3. Once the "Test" switch is enabled, your skill can be tested on devices associated with the developer account as well. Speak to Alexa from any enabled device, from your browser at [echosim.io](https://echosim.io/welcome), or through your Amazon Mobile App and say :

	```text
	Alexa, start hello world
	```

## Customization

Taken from [the official hello world project](https://github.com/alexa/skill-sample-nodejs-hello-world/blob/master/instructions/7-cli.md#customization).

1. ```./skill.json```

   Change the skill name, example phrase, icons, testing instructions etc ...

   Remember than many information are locale-specific and must be changed for each locale (e.g. en-US, en-GB, de-DE, etc.)

   See the Skill [Manifest Documentation](https://developer.amazon.com/docs/smapi/skill-manifest.html) for more information.

2. ```./lambda/custom/index.ts```

   Modify messages, and data from the source code to customize the skill.

3. ```./models/*.json```

	Change the model definition to replace the invocation name and the sample phrase for each intent.  Repeat the operation for each locale you are planning to support.

4. Remember to re-deploy your skill and Lambda function for your changes to take effect.

	```bash
	$ ask deploy
	```

## Contributing

Feel free to submit a pull request or create a new issue.

## License

Open sourced under the [MIT license](./LICENSE.md).