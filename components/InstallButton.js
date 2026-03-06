"use client";

import { useEffect, useState } from "react";

export default function InstallButton() {
	const [deferredPrompt, setDeferredPrompt] = useState(null);
	const [isInstalled, setIsInstalled] = useState(false);

	useEffect(() => {
		// Check if already installed
		const isStandalone =
			window.matchMedia("(display-mode: standalone)").matches ||
			window.navigator.standalone;

		if (isStandalone) {
			setIsInstalled(true);
		}

		const handleBeforeInstallPrompt = (e) => {
			e.preventDefault();
			setDeferredPrompt(e);
		};

		const handleAppInstalled = () => {
			setIsInstalled(true);
			setDeferredPrompt(null);
		};

		window.addEventListener(
			"beforeinstallprompt",
			handleBeforeInstallPrompt,
		);
		window.addEventListener("appinstalled", handleAppInstalled);

		return () => {
			window.removeEventListener(
				"beforeinstallprompt",
				handleBeforeInstallPrompt,
			);
			window.removeEventListener("appinstalled", handleAppInstalled);
		};
	}, []);

	const handleInstall = async () => {
		if (!deferredPrompt) return;

		deferredPrompt.prompt();
		const choice = await deferredPrompt.userChoice;

		if (choice.outcome === "accepted") {
			setDeferredPrompt(null);
		}
	};

	if (isInstalled) return null;

	return (
		<button
			onClick={handleInstall}
			className="px-4 py-3 hover:bg-gray-800 cursor-pointer block transition w-full text-start"
		>
			Install SNS
		</button>
	);
}
