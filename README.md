# RateMyMouth

RateMyMouth is a web application for sharing, rating, and discovering recipes. Users can create accounts, share their favorite recipes, rate others' recipes, and engage in discussions through comments.

## Features

- **User Authentication**: Secure account creation and login system
- **Recipe Management**: Create, edit, and delete recipes with ingredients and instructions
- **Rating System**: Rate recipes on a 5-star scale with descriptive feedback
- **Comments**: Discuss recipes through a comment system
- **Search Functionality**: Find recipes by name or filter by user
- **Achievement System**: Unlock achievements based on user activity
- **Responsive Design**: Modern UI built with React and Tailwind CSS

## Technology Stack

- **Backend**: Ruby on Rails 8.0
- **Frontend**: React with TypeScript
- **UI Framework**: Tailwind CSS, Material UI components
- **Database**: SQLite (development), configurable for production
- **Authentication**: Devise
- **SPA Architecture**: Inertia.js for server-driven single-page applications
- **Build Tools**: Vite Rails for frontend assets
- **Deployment**: Docker containerization with Kamal

## Requirements

- Ruby 3.3.5 or higher
- Node.js and npm
- SQLite 3

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

5. Visit `http://localhost:3000` in your browser

## Development

The application uses a standard Rails structure with React components in the `app/javascript` directory. The development server runs both Rails and Vite in parallel using Foreman.

### Key Directories

- `app/controllers`: Rails controllers
- `app/models`: ActiveRecord models
- `app/javascript`: React components and TypeScript code
- `app/views`: Rails views (mostly for layouts, as content is rendered via Inertia)

## Testing

Run the test suite with:

```bash
bin/rails test
```

## Deployment

The application can be deployed using Docker and Kamal:

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
