# CodLab

A real-time collaborative IDE for seamless pair programming, allowing multiple developers to write, edit, and execute code together live and in sync.

## Live Demo

[https://codlab.vercel.app/](https://codlab.vercel.app/)

Deployed using **Vercel**.

> ⚠️ Important Note
> 
> The frontend of CodLab is deployed, but the backend server is not hosted yet. As a result, real-time collaboration and code execution may not work properly on the live demo.
> If you want to experience the full functionality, please clone the repository and run the backend locally.

## Description

**CodLab** is a real-time collaborative code editor inspired by tools like Google Docs and Replit. It enables developers to collaborate in shared rooms where code changes are instantly synchronized across all participants.

In addition to live editing, CodLab supports real-time communication between clients and allows users to execute code directly in the browser using a remote execution engine.

The goal of this project is to demonstrate real-time systems, WebSocket-based communication, and collaborative application design in a modern full-stack JavaScript environment.

## Key Features

* Real-time collaborative code editing
* Shared rooms for pair or group programming
* Live code execution via Piston API
* Instant code synchronization using Socket.IO
* Simple and intuitive collaborative workflow

## Tech Stack

* React
* JavaScript
* Node.js
* Express
* Socket.IO

**Code Execution:** Piston API

## Usage

1. Open the CodeCollab live demo.
2. Create or join a shared room.
3. Start writing or editing code collaboratively.
4. See changes reflected in real time across all connected users.
5. Run the code to view execution results instantly.

## Contributing

Contributors are welcome. You can help by:

* Reporting bugs
* Suggesting new features
* Improving UI/UX
* Optimizing real-time performance
* Submitting pull requests

### How to contribute

1. Fork the repository
2. Create a feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:

   ```bash
   git commit -m "Add: your feature description"
   ```
4. Push to your fork and open a pull request

## Authors and Acknowledgments

### Author

* [Alnick Clores](https://alnickdev.me/)

### Acknowledgments

* Inspired by collaborative platforms such as Google Docs and Replit
* Code execution powered by the [Piston API](https://github.com/engineer-man/piston)
