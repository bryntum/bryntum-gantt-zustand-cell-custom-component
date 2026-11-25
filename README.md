# How to use Zustand with Bryntum Gantt in React

 Demo of a custom assignee badge rendered inside a Bryntum Gantt column. The `main` branch shows how external React state changes don't re-render the badge. The `zustand` branch shows the fix.

## Install dependencies

Run the following command to install the project dependencies:

```bash
npm install
```

Bryntum packages are on the public npm registry, so you don't need to log in. The Enterprise tier runs as a fully functional trial for 14 days without a license key. [Request a free trial key](https://bryntum.com/download/) to extend the trial to 45 days. If you have a Bryntum license, add your license key as described in the [licensing guide](https://bryntum.com/docs/guide/Core/licensing).

## Run the development server

Run the Vite development server:

```bash
npm run dev
```

The server will start on `http://localhost:5173`.