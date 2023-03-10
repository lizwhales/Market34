const mongoose = require('mongoose');
require('dotenv').config();

const { Item } = require('../models/item');
const { Category } = require('../models/category');
const { Group } = require('../models/group');
const { User } = require('../models/user');
const { Comment } = require('../models/comment');
const { Favourites } = require('../models/favourites');
const { Cart } = require('../models/cart');

const itemService = require('../services/item');
const cartService = require('../services/cart');
const userService = require('../services/user');

describe('CartService', () => {
  let connection = null;

  let cart = null;
  let cartInfo = null;

  let item1 = null;
  let item1Info = null;

  let item2 = null;
  let item2Info = null;

  let user1 = null;
  let user1Info = {
    first_name: "Sue",
    last_name: "Green",
    email: "2@spacewax.com",
    password: "magna",
  }

  let user2 = null;
  let user2Info = {
    first_name: "Joanna",
    last_name: "Xue",
    email: "3@spacewax.com",
    password: "magna",
  }

  jest.setTimeout(15000);

  beforeAll(async () => {
    connection = mongoose.connect(process.env.MONGO_URI_TEST);
    await Item.deleteMany({});
    await Cart.deleteMany({});
    await Comment.deleteMany({});
    await Favourites.deleteMany({});
    await Category.deleteMany({});
    await Group.deleteMany({});
    await User.deleteMany({});

    user1 = await userService.create(user1Info);
    user2 = await userService.create(user2Info);

    item1Info = {
      name: "Chair",
      description: "Sturdy",
      price: 300,
      group_ids: [],
      category_ids: [],
      public_visibility: true,
      seller_id: user2._id,
    }

    item2Info = {
      name: 'Apple',
      description: 'Crunchy',
      price: 5,
      category_ids: [],
      group_ids: [],
      public_visibility: true,
      seller_id: user2._id,
    }

    item1 = await itemService.create(item1Info);
    item2 = await itemService.create(item2Info);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('Create Cart', async () => {
    const cartRead = await cartService.readByUserId(user1._id);
    const cartdb = await Cart.findById(cartRead._id);

    expect(cartRead).not.toBeNull();
    expect(cartdb).not.toBeNull();
    expect(cartdb.user.toString()).toBe(user1._id.toString());
    expect(cartdb.subtotal).toBe(0);
  });

  test('Read by userId', async () => {
    const cartRead = await cartService.readByUserId(user1._id);
    const cartdb = await Cart.findById(cartRead._id);

    expect(cartRead).not.toBeNull();
    expect(cartdb).not.toBeNull();
    expect(cartdb.items.length).toBe(0);
    expect(cartdb.subtotal).toBe(0);
  });

  test('Read all carts', async () => {
    const cartRead = await cartService.readAll();
    expect(cartRead.length).toBe(2);
    //console.log(cartRead);
  });

  test('Add item1 to cart', async () => {
    await cartService.addItem(user1._id, item1._id);
    const cartRead = await cartService.readByUserId(user1._id);
    const cartdb = await Cart.findById(cartRead._id);

    expect(cartRead).not.toBeNull();
    expect(cartdb).not.toBeNull();
    expect(cartdb.items.length).toBe(1);
    expect(cartdb.subtotal).toBe(item1Info.price);
  });

  test('Delete an item1 from cart', async () => {
    await cartService.deleteItem(user1._id, item1._id);
    const cartRead = await cartService.readByUserId(user1._id);
    const cartdb = await Cart.findById(cartRead._id);

    expect(cartRead).not.toBeNull();
    expect(cartdb).not.toBeNull();
    expect(cartdb.items.length).toBe(0);
    expect(cartdb.subtotal).toBe(0);
  });

  test('Delete all items from cart', async () => {
    await cartService.addItem(user1._id, item1._id);
    await cartService.addItem(user1._id, item2._id);

    await cartService.removeAllItems(user1._id);
    const cartRead = await cartService.readByUserId(user1._id);
    const cartdb = await Cart.findById(cartRead._id);

    expect(cartRead).not.toBeNull();
    expect(cartdb).not.toBeNull();
    expect(cartdb.items.length).toBe(0);
    expect(cartdb.subtotal).toBe(0);
  });
  
  test('Checkout items from cart', async () => {
    await cartService.addItem(user1._id, item1._id);
    const cart = await cartService.addItem(user1._id, item2._id);

    const cartdb1 = await Cart.findById(cart._id);

    expect(cartdb1.subtotal).toBe(item1Info.price + item2Info.price);

    const cartRead = await cartService.checkout(user1._id);

    const cartdb2 = await Cart.findById(cartRead._id);
    const item1db = await Item.findById(item1._id);
    const item2db = await Item.findById(item2._id);
  
    expect(cartRead).not.toBeNull();
    expect(item1db.sold).toBe(true);
    expect(item2db.sold).toBe(true);
    expect(cartdb2).not.toBeNull();
    expect(cartdb2.items.length).toBe(0);
    expect(cartdb2.subtotal).toBe(0);
  });
});