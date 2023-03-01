# Saloon database collection indexes

## user
```javascript
db.getCollection('users').createIndex( { "address": 1 } )
db.getCollection('users').createIndex( { "email": 1 } )
```
