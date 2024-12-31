const DONATE_API = "http://localhost:5000/api/orphan/essential";
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const amountInput = document.getElementById("amount");
const button = document.getElementById("buttonn");

async function handleDonation() {
  try {
    const donorName = nameInput.value;
    const email = emailInput.value;
    const amount = amountInput.value;

    await axios.post(DONATE_API, {
      donorName,
      email,
      amount,
    });

    alert("Thank you for your donation!");
  } catch (error) {
    console.error("Error processing donation:", error);
    alert("Failed to process your donation. Please try again.");
  }
}

button.addEventListener("click", function (event) {
  event.preventDefault();
  handleDonation();
});
