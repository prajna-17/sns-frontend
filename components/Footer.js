import React from "react";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="footer-grid">
				{/* ------------ COL 1 ------------- */}
				<div className="footer-col">
					<h3 className="footer-title">Stay Connected</h3>
					<p className="footer-text">
						Subscribe to our newsletter for the latest updates
						and exclusive offers.
					</p>

					<div className="newsletter">
						<input
							type="email"
							placeholder="Enter your email address"
							suppressHydrationWarning
						/>
						<button
							className="arrow-btn"
							suppressHydrationWarning
						>
							→
						</button>
					</div>

					<div className="social-icons">
						{/* <img src="/yt.svg" alt="YouTube" />
						<img src="/fb.svg" alt="Facebook" />
						<img src="/insta.svg" alt="Instagram" />
						<img src="/linkedin.svg" alt="LinkedIn" />
						<img src="/twitter.svg" alt="Twitter" /> */}
					</div>
				</div>

				{/* ------------ COL 2 ------------- */}
				<div className="footer-col">
					<h4 className="footer-subtitle">Company</h4>
					<ul>
						<li>Site Map</li>
						<li>Blogs</li>
						<li>Careers At Favobliss</li>
						<li>Terms Of Use</li>
						<li>Disclaimer</li>
						<li>Privacy Policy</li>
						<li>Unboxed</li>
						<li>Gift Card</li>
						<li>Favobliss E-Star</li>
					</ul>
				</div>

				{/* ------------ COL 3 ------------- */}
				<div className="footer-col">
					<h4 className="footer-subtitle">Products</h4>
					<ul>
						<li>Televisions & Accessories</li>
						<li>Home Appliances</li>
						<li>Phones & Wearables</li>
						<li>Computers & Tablets</li>
						<li>Kitchen Appliances</li>
						<li>Audio & Video</li>
						<li>Health & Fitness</li>
						<li>Grooming & Personal Care</li>
						<li>Cameras & Accessories</li>
						<li>Smart Devices</li>
						<li>Gaming</li>
						<li>Accessories</li>
						<li>Top Brands</li>
						<li>Kitchen Appliances</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
