
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
    try {
        const basePromptPrefix = "i am giving you url of website explain its privacy policy in 10 points only give points dont give any extra text and tell how much percentage website is suspious "
        const baseCompletion = await generate(`${basePromptPrefix} ${url}\n`);

        if (baseCompletion) {
            const summary_result = baseCompletion;
            displayPrivacySummary(url, summary_result);
        }
    } catch (error) {
        console.log(error);
    }
};


const displayPrivacySummary = (url, summary_result) => {
    let domain = new URL(url);
    domain = domain.hostname;

    document.getElementById("domain").innerHTML = domain;
    document.getElementById("domain").style.display = "block";
    document.getElementById("privacy_summary").innerHTML = "Suspicious red flags and warning signs:\n" + summary_result;
    document.getElementById("privacy_summary").style.display = "block";
};



const generate = async (urr) => {
    const url = `http://localhost:5000/`;
    try {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify({ data: urr }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById("privacy_summary").innerText=data.message;
        document.getElementById("privacy_summary").style.display = "block";
        
    
    } catch (error) {
        console.error(`Fetch error: ${error.message}`);
    }
};



