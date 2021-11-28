'use strict'

const Api = require('claudia-api-builder');
const api = new Api();
const getPizzas = require('./handlers/get-pizzas');
const createOrder = require('./handlers/create-order');
const deleteOrder = require('./handlers/delete-order');
const updateOrder = require('./handlers/update-order');

api.get('/', () => 'Welcome to Pizza Api');
api.get('/pizzas', () => getPizzas());
api.get('/pizzas/{id}', request => getPizzas(request.pathParams.id), { error: 404 });
api.post('/orders', request => createOrder(request.body), {
    success: 201,
    error: 400
});
api.put('/orders/{id}', request => updateOrder(request.pathParams.id, request.body), {
    error: 400
});
api.delete('/orders/{id}', request => deleteOrder(request.pathParams.id), {
    error: 400
});
module.exports = api;