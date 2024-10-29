import Products from "./products.json";

// Function to fetch all products
export function getAll() {
  return Promise.resolve(Products);
}

// Function to fetch a product by ID
export function getById(id) {
  // Convert id to a number if it's a string
  const productId = typeof id === "string" ? parseInt(id, 10) : id;
  const product = Products.find((item) => item.id === productId);

  return Promise.resolve(product);
}

export default {
  getAll,
  getById,
};
