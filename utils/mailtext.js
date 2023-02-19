
export const mailtext = (name, email, password) => {
    return `Dear ${name},

    Thank you for registering with our Raise a Voice Portal. We are delighted to have you on board and excited to convey your social issues you may encounter. Our portal provides an effective and efficient way for you to submit, track, and resolve any social issues you may face.
    
    Your login details are as follows:
    
    Username: ${email}
    Password: ${password}

    (Note: do not share your credentials with anybody else)
    
    You can now log in to the portal and start submitting social issues of your town. higher authorities of your town and district will be notified and will work diligently to resolve your concerns in a timely manner. You can also track the status of your issues and receive updates on their progress.
    
    We encourage you to explore the portal and take advantage of its features. If you have any queries or require further assistance, please do not hesitate to contact our support team at raiseavoice@duhacks.com.
    
    Best regards`
}

export const mailApplication = (name, issue) =>{
    return `Dear ${name},

    Thank you for submitting your social issue on our portal. We appreciate your efforts to raise awareness of this important issue and your commitment to creating a positive change in society.

    Your Issue : ${issue}
    
    We have received your submission and are reviewing it to understand the impact of the issue and the potential solutions. We assure you that your issue will be treated with the utmost care and attention. Our team will conduct an investigation and research to identify the best approach to address the issue.
    
    We will keep you updated on the progress of your submission and any actions taken on our end. We may also contact you for additional information or clarification if needed.
    
    We value your contribution and invite you to continue using our portal to submit social issues that you believe require attention. Together, we can create a positive impact in society and make the world a better place.
    
    Thank you again for your submission. If you have any questions or concerns, please do not hesitate to contact us at [support email].
    
    Best regards,
    Government Authority of Gujarat
    `
}