# Introduction

This is my first public repository open to contribution. Please forgive me if I take a long time before giving you some feedback about the contribution or fail to review it at all.

Please know that any contribution, of any kind, is greatly appreciated.

# Prerequisites

### Code quality

Please make sure you know the technologies used in this project before submitting a pull request. You can find a list of the technologies used in the [README](README.md) file.

Your contributions should follow best development practices or it will be rejected. Don't be afraid to submit code you're not sure of quality, I will review it and give you feedback.

### OS (Windows only)

If you would like to contribute on Windows, you will need to install WSL2 and use it to run the project. I have not yet tested the project on Windows and therefore can't guarantee it will work.

### Rails / Ruby

The project uses Rails 8 and Ruby 3.3.5. Make sure you install the right version before doing anything or it could cause some issues.

You can use [RVM](https://github.com/rvm/rvm) to install the desired version.

### React / TypeScript

The project uses React / TypeScript and `npm` to manage the frontend. I currently use NodeJS v23 and can't guarantee any lower version will be able to run the project / install the dependencies.

### AWS Account (optional)

Please make sure you're familiar with AWS before proceeding. If you're not you can simply use local configuration (see last paragraph).

The project uses AWS for Active Storage (file storage) and Active Mailer (mail notifications). You will need to connect to your AWS console and create the appropriate IAM users / services. You will need to create an S3 bucket and use SES to send emails. Once that's done you can configure the credentials in the Rails credentials file if you want to run the "production" version of the project.

In development, you can use the local storage instead of S3 for file storage. At the moment, no solution was introduced in the project to test emails locally.

### Secret management

Every secret of the project are managed using Rails Credentials

To edit your secrets :

```bash
VISUAL="code --wait" bin/rails credentials:edit
```

You'll be asked to create a `master.key`, store that key securely because you'll use it everytime you'll need to change any secret in your app.
The secret file is encrypted by Rails and therefore can be securely added in Git.

The content of the credentials file should look like that :

```yaml
secret_key_base: 26b****a1365
smtp:
  user_name: AK****N4U
  password: BGqQb****9zR2
  address: email-smtp.eu-north-1.amazonaws.com
aws:
  access_key_id: AKI****O5OS
  secret_access_key: IiJ****tGt
```

# Running the project

1. Install dependencies:

   ```bash
   bundle install
   npm install
   ```

1. Set up the database:

   ```bash
   bin/rails db:setup
   ```

1. Start the development server:

   ```bash
   bin/dev
   ```

1. Visit `http://localhost:3100` in your browser

# Testing

Please add some unit tests if you added a contribution that needs it.

Run the test suite with :

```bash
bin/rails test
```

# Contribute

### Conventional commits

To make sure the commit history stays clear and readable, please use [Conventional Commits](https://www.conventionalcommits.org/) specification.

Types list:

- `feat`: A new feature
- `impr`: An improvement to an existing feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white- space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a- feature, but makes the code easier to read, understand, or- improve
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external- dependencies (example scopes: gulp, broccoli, npm)
- `revert`: Reverts a previous commit
- `chore`: Other changes that don't apply to any of the above

### Pull Requests

1. Fork the repository
1. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/) specification as described above.
1. Push to the branch
1. Open a Pull Request with a clear title and description following the conventional commits format (`type: subject (Github username)`)
