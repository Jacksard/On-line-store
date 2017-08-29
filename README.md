# On-line-store

- Still under work 
- See Issues for current screenshots

A concept of an on-line store with Admin Control, Technologies used: NodeJS, Express, MongoDB-MLab services, EJS view Engine.

Instructions how to use:
1. clone the repository
2. run npm install
3. open MLAB account, create a database with the collections: products, mycart, categories.
4. In each of these files: index.js, mycart.js, categories.js, products.js, add the link to your database as given to you, example:

var db = mongojs('mongodb://username:password@ds999999.mlab.com:29043/online-store-products', collections);

