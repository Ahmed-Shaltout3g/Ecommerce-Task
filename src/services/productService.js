const STORAGE_KEY = "admin_products";

// ✅ Get all products from localStorage
export function getProducts() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// ✅ Add a new product to localStorage
export function addProduct(product) {
  const products = getProducts();
  const newProduct = { ...product, id: Date.now() }; // Add unique ID
  products.push(newProduct);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// ✅ Update a product by its ID
export function updateProduct(updatedProduct) {
  const products = getProducts().map((product) =>
    product.id === updatedProduct.id ? updatedProduct : product
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

// ✅ Delete a product by its ID
export function deleteProduct(id) {
  const updatedProducts = getProducts().filter((product) => product.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
}
