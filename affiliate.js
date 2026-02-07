const urlParams = new URLSearchParams(window.location.search);
const affiliateId = urlParams.get("ref");

(async () => {
    if (affiliateId) {
        try {
            const isValid = await checkAndSaveAffiliateId(affiliateId);
            
            if (isValid) {
                console.log(`✅ Valid affiliate: ${affiliateId}`);
                // Seuraa myyntiä tms.
            } else {
                console.log(`❌ Invalid affiliate ID: ${affiliateId}`);
                localStorage.removeItem('affiliateId');
            }
        } catch (error) {
            console.error('Error processing affiliate ID:', error);
        }
    }
})();



async function checkAndSaveAffiliateId(affiliateId) {
    try {

        const response = await fetch('/affiliates.json');
        const data = await response.json();
        
        // Tarkista onko ID affiliates-taulukossa
        const affiliate = data.affiliates && data.affiliates.find(aff => aff.id === affiliateId);

        if (affiliate && affiliate.isActive) {
        // Save all affiliate information
            localStorage.setItem('affiliateId', affiliateId);
            localStorage.setItem('affiliateName', affiliate.name);
            localStorage.setItem('affiliateValidated', new Date().toISOString());
            localStorage.setItem('affiliateIsActive', affiliate.isActive);

            return {
                isValid: true,
                name: affiliate.name
            };
        }
        
        return {
            isValid: false,
            name: null
        };
        
    } catch (error) {
        console.error('Error checking affiliate ID:', error);
        
        // Clear any previous affiliate data on error
        localStorage.removeItem('affiliateId');
        localStorage.removeItem('affiliateName');
        localStorage.removeItem('affiliateValidated');
        localStorage.removeItem('affiliateIsActive');
        
        return {
            isValid: false,
            name: null
        };
    }
}