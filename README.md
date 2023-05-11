
# Sanity Nextjs Blog

This project is an quick start project, or a template project by the way. Follow the steps above to configure your project.

1. Create an account in [firebase](https://firebase.google.com/). Then create a project and follow the instructions.
2. Create an account in [sanity.io](https://www.sanity.io/). Then create a new project. I'd suggest to create 2 datasets: 1 for development and 1 for production.
3. Edit the ```.env.example``` file with the right values .

## Scripts

Basic configured scripts to develop and deploy.

### Frontend scripts

To start frontend in dev mode
```bash
yarn dev
```

To build frontend
```bash
yarn build
```

To start frontend in preview mode:
```bash
yarn start
```

### Backend scripts

To start backend in dev mode:
```bash
yarn sanity dev
```

To build backend
```bash
yarn sanity build
```

To start backend in preview mode
```bash
yarn sanity start
```

To deploy sanity
```bash
yarn sanity deploy
```

You can view the project [design in figma](https://www.figma.com/file/qHCAHKB9CWTXUULL22RJI5/dev-site?node-id=26%3A590&t=b5NkCyn2PNmIQFK8-1).
