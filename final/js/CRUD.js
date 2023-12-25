let products = [];

// Fetch the external JSON file using the Live Server address
fetch('/products.json') // Adjust the path based on your file structure
    .then(response => response.json())
    .then(data => {
        products = data.products;
    })
    .catch(error => console.error('Error loading data:', error));

function searchProduct() {
    const productId = document.getElementById('productId').value;
    const product = products.find(p => p.id === parseInt(productId));

    if (product) {
        displayProductDetails(product);
    } else {
        alert('Product not found!');
    }
}

function displayProductDetails(product) {
    const productDetailsDiv = document.getElementById('productDetails');
    productDetailsDiv.innerHTML = `
        <p>ID: ${product.id}</p>
        <p>Name: ${product.name}</p>
        <p>Price: ${product.price}</p>
        <p>Description: ${product.description}</p>
        <p>Category: ${product.category}</p>
        <p>Stock Quantity: ${product.StockQuantity}</p>
        <p>Rating: ${product.rating}</p>
        <img src="${product.image}" alt="Product Image">
    `;
}

function createProduct() {
    const newProductId = parseInt(prompt('Enter product ID:'));
    const productName = prompt('Enter product name:');
    const productPrice = parseFloat(prompt('Enter product price:'));
    const productDescription = prompt('Enter product description:');
    const productCategory = prompt('Enter product category:');
    const stockQuantity = parseInt(prompt('Enter stock quantity:'));
    const productRating = parseFloat(prompt('Enter product rating (0-5):'));
    const productImage = prompt('Enter product image URL:');

    // Check if the entered ID is a valid number
    if (!isNaN(newProductId) && newProductId > 0) {
        // Check if the ID is unique
        if (!products.some(product => product.id === newProductId)) {
            // Check if the rating is within the valid range
            if (!isNaN(productRating) && productRating >= 0 && productRating <= 5) {
                const newProduct = {
                    id: newProductId,
                    name: productName,
                    price: productPrice,
                    description: productDescription,
                    category: productCategory,
                    stockQuantity: stockQuantity,
                    rating: productRating,
                    image: productImage
                };

                products.push(newProduct);
                saveData();
                alert('Product created successfully!');
            } else {
                alert('Invalid rating. Please enter a valid rating between 0 and 5.');
            }
        } else {
            alert('Product with the specified ID already exists. Please choose a different ID.');
        }
    } else {
        alert('Invalid ID. Please enter a valid positive number.');
    }
}


function updateProduct() {
    const productId = document.getElementById('productId').value;
    const product = products.find(p => p.id === parseInt(productId));

    if (product) {
        const updatedID = parseInt(prompt('Enter updated product ID:', product.id));
        const updatedName = prompt('Enter updated product name:', product.name);
        const updatedDescription = prompt('Enter updated product description:', product.description);
        const updatedPrice = parseFloat(prompt('Enter updated product price:', product.price));
        const updatedCategory = prompt('Enter updated product category:', product.category);
        const updatedStockQuantity = parseInt(prompt('Enter updated product Stock Quantity:', product.StockQuantity));
        const updatedRating = parseFloat(prompt('Enter updated product rating:', product.rating));
        const updatedImage = prompt('Enter updated product image path:', product.image);

        product.id = !isNaN(updatedID) ? updatedID : product.id;
        product.name = updatedName || product.name;
        product.description = updatedDescription || product.description;
        product.price = !isNaN(updatedPrice) ? updatedPrice : product.price;
        product.category = updatedCategory || product.category;
        product.StockQuantity = !isNaN(updatedStockQuantity) ? updatedStockQuantity : product.StockQuantity;
        product.rating = !isNaN(updatedRating) ? updatedRating : product.rating;
        product.image = updatedImage || product.image;


        saveData();
        alert('Product updated successfully!');
        displayProductDetails(product);
    } else {
        alert('Product not found!');
    }
}

function deleteProduct() {
    const productId = document.getElementById('productId').value;
    const productIndex = products.findIndex(p => p.id === parseInt(productId));

    if (productIndex !== -1) {
        const confirmation = confirm('Are you sure you want to delete this product?');
        
        if (confirmation) {
            products.splice(productIndex, 1);
            saveData();
            alert('Product deleted successfully!');
            clearProductDetails();
        }
    } else {
        alert('Product not found!');
    }
}

function generateProductId() {
    // Generate a unique ID (for simplicity, you might want to use a more robust approach in production)
    return Math.floor(Math.random() * 1000);
}

function clearProductDetails() {
    document.getElementById('productDetails').innerHTML = '';
}

function saveData() {
    // Save the updated data back to the external JSON file
    const jsonData = { products };
    const jsonString = JSON.stringify(jsonData, null, 2);

    // Perform the save operation, in this case, we'll use a simple alert to simulate saving
    alert('Data saved successfully:\n\n' + jsonString);
}
function Appending_Orders(){
    window.location.href = 'confirm-reject-admin.html';
}
function all_Orders(){
    window.location.href = 'allOrders.html';
}
