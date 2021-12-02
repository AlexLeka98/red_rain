

// const stripeHandler = StripeCheckout.configure({
//     key: stripePublicKey,
//     locale: 'auto',
//     token: function (token) {
//         console.log(token);
//     }
// })

console.log("Script event-page.js is running..");
const buttons = document.querySelectorAll('.purchaseButton');
console.log("Buttons:  ", buttons);
buttons.forEach(button => {
    button.addEventListener("click", function () {
        purchaseClicked(button);
    });
});

function purchaseClicked(button) {
    price = button.querySelector('h2');
    price = price.innerText.slice(0, price.innerText.length - 1);
    console.log(price);
    stripeHandler.open({
        amount: price * 100
    });

    fetch('/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            stripeTokenId: token.id,
            items: items
        })
    });
}








// Create an instance of the Stripe object with your publishable API key
var stripe = Stripe("pk_test_51IHdaaEZLf0IIvPkNgEJIyW5AcNNfPCh4QdoLCRgamSOQQjnY3GgEN3h0Xro4seobh53OTMMo79lZKyOm4KzVa7200ThEjXw0y");
console.log("Stripe Public Key: ", stripe)
var checkoutButton = document.getElementById('checkout-button');

checkoutButton.addEventListener('click', function () {
    // Create a new Checkout Session using the server-side endpoint you
    // created in step 3.
    fetch('/create-checkout-session', {
        method: 'POST',
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (session) {
            return stripe.redirectToCheckout({ sessionId: session.id });
        })
        .then(function (result) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, you should display the localized error message to your
            // customer using `error.message`.
            if (result.error) {
                alert(result.error.message);
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
});