
function isPrivacyPolicyPage(url) {

    url = url.toLowerCase();

    return (
        url.includes("privacy") ||
        url.includes("privacy policy") ||
        url.includes("data protection") ||
        url.includes("data privacy") ||
        url.includes("information security") ||
        url.includes("data collection") ||
        url.includes("cookie policy") ||
        url.includes("data processing") ||
        url.includes("gdpr") ||
        url.includes("term") ||
        url.includes("term and privacy") ||
        url.includes("terms and conditions") ||
        url.includes("caloppa")
    );
}

const summarizePrivacyPolicy = async () => {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, async (tabs) => {
        document.getElementById("summarize_privacy_button").innerHTML = "Summarizing...";
        document.getElementById("summarize_privacy_button").disabled = true;
        let url = tabs[0].url;
        if (isPrivacyPolicyPage(url)) {
            await generateCompletionAction(url);
        } else {
            alert("This is not a privacy policy page");
        }
        document.getElementById("summarize_privacy_button").innerHTML = "Summarize Privacy Policy";
        document.getElementById("summarize_privacy_button").disabled = false;
    });
};

document.getElementById("summarize_privacy_button").addEventListener("click", summarizePrivacyPolicy);

const generateCompletionAction = async (url) => {

};