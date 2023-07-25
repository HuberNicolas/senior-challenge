# Answers

## What has been your favorite programming language / framework so far?

My favourite programming language is Python and my favourite framework is the Symfony framework from PHP.

## Why do you like it and how does it compare to other technologies?

I prefer Python due to its simple and easily readable syntax. It offers a wealth of resources and guides, making it a breeze to learn. This ease of learning contributes to swift progress and the ability to implement functional prototypes.

However, when it comes to production-level applications, I find more sophisticated and state-of-the-art approaches in languages like Java. Java's typing system provides enhanced safety and requires more careful consideration during product development, resulting in a more stable and production-ready output. Additionally, languages like Java and C# emphasize software patterns, whereas Python often feels more like a scripting language.

## What was the hardest challenge you have faced when working with that specific technology and how did you solve it?

The most challenging experience I encountered was during my Masters Project, specifically while working on the ComBaCaL project. Our task involved utilizing the "API" from CHT to distribute relevant data to the respective clients. The challenge arose because CHT utilized CouchDB, a document-based database, which was new to me at the time.

To overcome this, we decided to implement the solution using Symfony and the JWT-Library to manage the entire authentication process. This was necessary because we needed two types of cookies – one for the admin-panel to CHT communication and another for the admin-panel to clients interaction. We also successfully achieved independent CouchDB instances for each client by leveraging the CouchDB API on the admin-panel side.

Our approach to solving this complex problem was to start small, for instance, initiating a simple POST request with Postman to acquire a Cookie from CHT. From there, we incrementally improved and refined the entire process, ultimately achieving a successful outcome.
