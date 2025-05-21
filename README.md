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
- **Frontend**: [React 19 with TypeScript](https://react.dev/)
- **UI Framework**: [Tailwind CSS](https://tailwindcss.com/), [Material UI components](https://fonts.google.com/icons)
- **Database**: [SQLite](https://sqlite.org/index.html) for developement **and** production (!!)
- **Authentication**: [Devise](https://github.com/heartcombo/devise)
- **SPA Architecture**: [Inertia Rails](https://inertia-rails.dev/) for server-driven single-page applications using Rails as the backend
- **Build Tools**: [Vite Ruby / Rails](https://vite-ruby.netlify.app/guide/rails.html) for frontend assets
- **Deployment**: [Docker](https://www.docker.com/) containerization with [Kamal](https://kamal-deploy.org/)

## Requirements

- Ruby 3.3.5
- Node.js and npm
- SQLite 3
- AWS account to use Active Storage and Active Mailer

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

Refer to [CONTRIBUTING.md](CONTRIBUTING.md) for details on how to contribute to the project.
