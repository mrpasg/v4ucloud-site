const form = document.getElementById("contactForm");

form.addEventListener("submit", async function(e) {

e.preventDefault();

const status = document.getElementById("status");

const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const message = document.getElementById("message").value;

status.innerText = "Sending message...";

try {

const res = await fetch("/api/contact", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify({
name: name,
email: email,
message: message
})
});

if (res.ok) {
status.innerText = "✅ Message sent successfully!";
form.reset();
} else {
status.innerText = "❌ Failed to send message.";
}

} catch (error) {

status.innerText = "❌ Network error.";

}

});