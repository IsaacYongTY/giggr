## Introduction

"Can you send us your repertoire?"

One of the most common questions musicians get, whether its **closing deals to perform in wedding events** or **auditioning for new gigs**. GIGGR aims to solve the problem where we always scramble to put together a **current and relevant repertoire** to send to clients, and help musicians **accessing key information like key and tempo of songs** easily.

Another value proposition of GIGGR is to allow musicians **to record gigs info**, such as venue, date, time, pay, and etc. If a customer inquire about certain date and times, key it in and it will alert you if there is already an entry, and this helps **prevent double booking** and hence leaving bad impressions to clients and agencies.

For the MVP, I aim to **explore different frameworks and database**, with the focus on **CRUD operations** and **integrating Stripe API** as the payment processor. **An external API** will be created to store part/all of the data, to allow flexibility to have a mobile app in the future. I plan to eventually expand this into a full fledge SaaS, making this product a reliable and useful tool in a musician's toolbox.

## Scope

### Technologies

-   Frontend - ReactJS, **NextJS**, **Typescript**
-   API - Node + Express, Javascript
-   Database - **PostgreSQL, Sequelize, Supabase**
-   Unit Testing
-   Deployment - **Vercel**
-   SCSS

### Scope - MVP

-   Adobe XD low fidelity prototype
-   Adobe XD high fidelity prototype
-   User Authentication - Sign up, Log in , Log out
    -   Local
    -   Facebook
-   CRUD
    -   Manage repertoire
        -   Create own repertoire
        -   Filter songs based on tags, such as wedding
        -   Generate metadata head
        -   Edit entry right at the table
    -   Manage gigs
        -   List View
        -   Date Picker
        -   DashboardCardList if timing clash - avoid double booking
-   Payment
    -   Pricing Table
    -   Stripe API
-   API
    -   CRUD to store master song database

### Stretch Goals

-   Tiered subscription
-   Integration with Google Calendar API
-   Manage Gig - Calendar View
-   Companion Mobile App - React Native
-   Financial Report - Gigs

### Relational Database Sketch

V2. https://drive.google.com/file/d/1Ziy5RiNsiehQfA_4e7NA7ANe2AM_WcHL/view?usp=sharing
Original: https://whimsical.com/giggr-database-schema-4HWe9rs9dkoJRxfmv7WJvy
