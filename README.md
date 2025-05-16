# RateMyMouth

RateMyMouth is a web application for sharing, rating, and discovering recipes. Users can create accounts, share their favorite recipes, rate others' recipes, and engage in discussions through comments.

The main goal of this app is to create a recipe sharing website that's fun to use, can be self-hosted (my production is currently hosted on a RPi 3B+) and that is fun to play with.

## Features

- **User Authentication**: Secure account creation and login system (no external service connection through OAuth)
- **Recipe Management**: Create, edit, and delete recipes with ingredients and instructions
- **Rating System**: Rate recipes on a 5-star scale with descriptive feedback
- **Comments**: Discuss recipes through a comment system
- **Search Functionality**: Find recipes by name, users, tags,...
- **Achievement System**: Unlock achievements based on user activity
- **Responsive Design**: Modern UI built with React and Tailwind CSS

## Technology Stack

- **Backend**: [Ruby on Rails 8.0](https://rubyonrails.org/)
  - **Storage** : Local storage during development and [Active Storage](https://guides.rubyonrails.org/active_storage_overview.html) with [Amazon S3 bucket](https://aws.amazon.com/fr/s3/) for production
  - **Mailing** : Asynchronous mailing using [Action Mailer](https://guides.rubyonrails.org/action_mailer_basics.html) with [Amazon SES](https://aws.amazon.com/fr/ses/) and [Active Job](https://guides.rubyonrails.org/active_job_basics.html)
- **Frontend**: [React with TypeScript](https://react.dev/)
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/), [Material UI components](https://fonts.google.com/icons)
- **Database**: [SQLite](https://sqlite.org/index.html) for developement **and** production (!!)
- **Authentication**: [Devise](https://github.com/heartcombo/devise)
- **SPA Architecture**: [Inertia Rails](https://inertia-rails.dev/) for server-driven single-page applications using Rails as the backend
- **Build Tools**: [Vite Ruby / Rails](https://vite-ruby.netlify.app/guide/rails.html) for frontend assets
- **Deployment**: [Docker](https://www.docker.com/) containerization with [Kamal](https://kamal-deploy.org/)

## Requirements

- Ruby 3.3.5 or higher
- Node.js and npm
- SQLite 3
- AWS account to use Active Storage and Active Mailer

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/RateMyMouth.git
   cd RateMyMouth
   ```

2. Install dependencies:

   ```bash
   bundle install
   npm install
   ```

3. Set up the database:

   ```bash
   bin/rails db:setup
   ```

4. Start the development server:

   ```bash
   bin/dev
   ```

5. Visit `http://localhost:3100` in your browser

## Development

The application uses a standard Rails structure with React components in the `app/javascript` directory. The development server runs both Rails and Vite in parallel using Foreman.

### Key Directories

- `app/controllers`: Rails controllers
- `app/models`: ActiveRecord models
- `app/javascript`: React components and TypeScript code
- `app/views`: Rails views (mostly for layouts, as content is rendered via Inertia)

## Secret management

Every secret of the project are managed using Rails Credentials

To edit your secrets :  
```bash
VISUAL="code --wait" bin/rails credentials:edit
```

You'll be asked to create a `master.key`, store that key securely because you'll use it everytime you'll need to change any secret in your app.
The secret file is encrypted by Rails and therefore can be securely added in Git.

The content of the credentials file should look something like that :
```yaml
secret_key_base: 26b***365
smtp:
  user_name: A***N4U
  password: BGq***t9zR2
  address: email-smtp.eu-north-1.amazonaws.com
```

## Testing

Run the test suite with:

```bash
bin/rails test
```

## Deployment

The application can be deployed using Docker and [Kamal](https://kamal-deploy.org/):

1. Build the Docker image:

   ```bash
   docker build -t ratemymouth .
   ```

2. Deploy with Kamal:
   ```bash
   bin/kamal deploy
   ```

See `config/deploy.yml` for deployment configuration details.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes following [Conventional Commits](https://www.conventionalcommits.org/) specification
   - Example: `feat: add user profile page` or `fix: resolve recipe rating calculation`
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request with a clear title and description following the conventional commits format

## License

This project is licensed under the MIT License - see the LICENSE file for details.
