# Domain

## Models

Models belong to the domain layer within the application.

The models represent the business entities, basic concepts that anyone who knows the product could understand even without technical knowledge.

A user, an event, a boost, etc. And the actions or relationships between them are ideas that everyone in the company shares.

A user updates his points, a deposit raises a certain level of boost, a boost has an image and a name, etc.

This layer is in charge of translating all this knowledge into code, creating classes with attributes and functions to model the behavior of these entities.
behavior of these entities

## Services

Services are in charge of handling business logic.

They use the domain models, repositories, utils, providers, etc. to realize functional requirements of our application

## Infrastructure

When we talk about `Infrastructure` we refer to external connections that our API needs to make, either to connect to our database, to a messaging service or even to another API.

For these connections to be feasible, there are three other components involved in their operation:

## Providers

This module is in charge of managing the connection with our third-parties.

The code to talk to our database, another API, our buckets or any service will be here.

## Repositories

Here live the modules that communicate with our storage services.

Although we have said that in `Providers` is the code to talk to the database, the buckets and any other storage service, the code contained there is agnostic to our domain, it serves as a bridge between our API and these services at a generic level.

The `Repositories` contain the logic that builds a specific query for our database, the code that knows in which bucket to go to look for the file we need or the code that knows in which cache to look for any data.

It is the connector bridge between the domain logic and our storage services.

## Adapters

If the `Repositories` are bridges between the domain logic and our storage services, the adapters are bridges between our domain entities and anything external in our application.

Do you have to change any attribute of your _User_ entity before saving it in the database? Or before sending it as a response?

Then an `Adapter` is what you are looking for

# Client Communication

## Controllers

The controllers are in charge of handling the conservation with whoever tries to communicate with our API

Validate the request, send HTTP status Codes according to the error and create the response that the client expects are its main objectives.

In our case and as we have described in the [Architecture](tutorial-Architecture.html) section, our `Controllers` also handle business logic as long as it is not too complex, in which case it will be moved to a service.

## Routes

This module is in charge of routing client requests to the different controllers in charge of handling them.
