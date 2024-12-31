  // API endpoint for fetching essentials
  const ESSENTIALS_API = "http://localhost:5000/api/orphan";
  const DONATE_API = "http://localhost:5000/api/orphan/essential";

  const essentialList = document.getElementById("essential-list");
  const cartItems = document.getElementById("cart-items");
  const totalAmountEl = document.getElementById("total-amount");
  const donateBtn = document.getElementById("donate-btn");

  let cart = [];

  // Fetch essentials from the backend
  async function fetchEssentials() {
    try {
      const response = await axios.get(ESSENTIALS_API);
      const essentials = response.data;
      renderEssentials(essentials);
    } catch (error) {
      console.error("Error fetching essentials:", error);
    }
  }

  // Render the essentials on the page
  function renderEssentials(essentials) {
    essentialList.innerHTML = essentials.map((essential, index) => `
      <div class="essential">
        <h3>${essential.name}</h3>
        <p>${essential.description || "No description available."}</p>
        <p>Price: $${essential.price}</p>
        <p>Available: ${essential.quantityAvailable}</p>
        <button data-essential='${encodeURIComponent(JSON.stringify(essential))}' class="add-to-cart">
          Add to Cart
        </button>
      </div>
    `).join("");
  
    // Add event listeners for the buttons
    document.querySelectorAll('.add-to-cart').forEach((button) => {
      button.addEventListener('click', (event) => {
        const essential = JSON.parse(decodeURIComponent(event.target.dataset.essential));
        addToCart(essential);
      });
    });
  }
  

  // Add an item to the cart
  function addToCart(essential) {
    const existingItem = cart.find(item => item._id === essential._id);
    if (existingItem) {
      if (existingItem.quantity < essential.quantityAvailable) {
        existingItem.quantity++;
      } else {
        alert("we have this item.");
      }
    } else {
      cart.push({ ...essential, quantity: 1 });
    }
    updateCart();
  }
  
  // Update the cart UI
  function updateCart() {
    cartItems.innerHTML = cart.map((item, index) => `
      <li>
        ${item.name} - $${item.price} x ${item.quantity}
        <button class="remove" onclick="removeFromCart(${index})">Remove</button>
      </li>
    `).join("");
  
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    totalAmountEl.textContent = totalAmount.toFixed(2);
  
    donateBtn.disabled = cart.length === 0;
  }
  

  // Remove an item from the cart
  function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
  }

  // Handle the donation submission
  async function handleDonation() {
    const donorName = prompt("Enter your name:");
    const email = prompt("Enter your email:");
  
    if (!donorName || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please provide a valid name and email to proceed.");
      return;
    }
  
    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
      await axios.post(DONATE_API, {
        donorName,
        email,
        amount: totalAmount,
        items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
      });
  
      alert("Thank you for your donation!");
      cart = [];
      updateCart();
    } catch (error) {
      console.error("Error processing donation:", error);
      alert("Failed to process your donation. Please try again.");
    }
  }
  

  // Add event listener to the donate button
  donateBtn.addEventListener("click", handleDonation);

  // Fetch and display essentials on page load
  fetchEssentials();