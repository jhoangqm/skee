# Skee App

This project is on-going (updating to correct typescript types)

## Primary contributions:

- Database schema creation and seeding
- Calendar booking system
- Login & Signup page
- Signup system

# Description

A ski instructor booking platform, with the intention of helping instructiors connect with new clients more easily.

- This webapp was built using Nextjs, Prisma, Express, postgress, Tailwind.

# Screenshots

![image](https://github.com/Jimmy-b36/skee/blob/main/_docs/resort/screenShots/Screenshot%202022-09-22%20at%208.49.22%20AM.png?raw=true)
![image](https://github.com/Jimmy-b36/skee/blob/main/_docs/resort/screenShots/Screenshot%202022-09-22%20at%208.49.59%20AM.png?raw=true)
![image](https://github.com/Jimmy-b36/skee/blob/main/_docs/resort/screenShots/Screenshot%202022-09-22%20at%208.50.59%20AM.png?raw=true)
![image](https://github.com/Jimmy-b36/skee/blob/main/_docs/resort/screenShots/Screenshot%202022-09-22%20at%208.50.44%20AM.png?raw=true)

# Getting Started

1. Clone form repo
2. Create a user and DB in psql

Client Server:

1. Cd to Client directory
2. npm install
3. Setup .env using the example provided
4. Setup next.config.js using the example provided
5. npm run db:reset
6. npm run dev

Backend Server:

1. Cd into server
2. npm install
3. Setup the env. using the example provided
4. npm run dev

# Dependencies

- @prisma/client: 4.0.0
- axios: ^0.27.2
- bcryptjs: ^2.4.3
- chance: ^1.1.8
- daisyui: ^2.18.1
- date-fns: 2.28.0,
- date-fns-tz: ^1.3.6
- iron-session: 6.1.3

- next: 12.2.1
- react: 18.2.0
- react-calendar: 3.7.0
- react-dom: 18.2.0
- swr: 1.3.0
- postcss: 8.4.14
- prisma: 4.0.0
- tailwindcss: 3.1.5
- typescript: 4.7.4
- ts-node: 10.8.2
- nodemon: 2.0.19
- morgan: 1.10.0
- multer: 1.4.5-lts.1
