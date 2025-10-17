document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("contactForm");

	form.addEventListener("submit", (e) => {
		e.preventDefault(); // prevent page reload
		const name = document.getElementById("name").value;
		const email = document.getElementById("email").value;
		const message = document.getElementById("message").value;

		alert(
			`Thank you, ${name}! Your message has been sent.\nWe will contact you at ${email}.`
		);

		form.reset();
	});
});
