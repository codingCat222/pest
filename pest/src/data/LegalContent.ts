export interface LegalSection {
    heading: string;
    paras?: string[];
    bullets?: string[];
}

export const LAST_UPDATED = '1 October 2026';
export const COMPANY = 'Orombow Traders (trading as FreePestProducts.com)';
export const COMPANY_ADDRESS = '1 Clyde Road, SM1 2RR';
export const CONTACT_EMAIL = 'support@freepestproducts.co.uk';

export const TERMS_INTRO = `These Terms & Conditions govern your use of the FreePestProducts.com website and your relationship with ${COMPANY}, whose registered office is at ${COMPANY_ADDRESS} ("we", "us", "our" or the "Company"). By using our website, creating an account, requesting a free product, placing an order, booking a professional service or requesting proofing services, you agree to these Terms & Conditions. Please read them carefully before using our services.`;

export const TERMS: LegalSection[] = [
    {
        heading: '1. About Us', paras: ['We operate an online pest-control platform through which eligible customers may:'], bullets: [
            'request selected pest-control products;',
            'pay applicable delivery charges for products supplied under our free-product programme;',
            'receive information and guidance concerning the use of those products;',
            'monitor pest activity through their customer account;',
            'book professional inspection and treatment services;',
            'receive recommendations concerning potential pest entry points; and',
            'request quotations for proofing or other additional services.']
    },
    {
        heading: '1A. Our Role', paras: [
            'We are not the manufacturer of every product supplied through our platform. Products may be manufactured by independent third-party manufacturers and supplied to us for distribution.',
            'Our professional services are carried out by appropriately qualified, trained, experienced and/or certified personnel as applicable to the particular work being undertaken.',
            'Unless expressly stated otherwise, we are not builders, structural engineers, surveyors, architects, electricians, plumbers, roofers or other specialist building contractors. Where such specialist work appears necessary, we may recommend that you obtain advice or services from an appropriately qualified third party.']
    },
    {
        heading: '2. Definitions', bullets: [
            '"Account" means your online customer account.',
            '"Customer", "you" or "your" means the individual or organisation using our website or services.',
            '"Free Product Programme" means our programme under which eligible customers may receive selected products without being charged the product purchase price, subject to payment of applicable delivery charges and compliance with these Terms.',
            '"Professional Service" means our professional inspection and treatment service, currently advertised at £95.99 unless otherwise stated at the time of booking.',
            '"Proofing" means work intended to identify, reduce or address potential pest access or entry points.',
            '"Product" means any pest-control product supplied through our website.',
            '"Services" means our professional inspection, treatment, monitoring, support, proofing-related and other services.']
    },
    {
        heading: '3. Eligibility', paras: [
            'You must provide accurate, complete and current information when using our website.',
            'Eligibility for any free product is determined by our eligibility criteria, product availability, location, the circumstances described by you and any applicable legal or product requirements. Passing an initial eligibility check does not necessarily mean that a particular product will ultimately be supplied.',
            'We may refuse, restrict or cancel an order where:'], bullets: [
                'the requested product is unsuitable for the circumstances described;',
                'the product is unavailable;',
                'the product is not authorised or appropriate for the intended use;',
                'the customer is not eligible;',
                'information provided by the customer is inaccurate or incomplete;',
                'supplying the product would create a safety, regulatory or legal concern; or',
                'we reasonably consider that another form of intervention is more appropriate.']
    },
    {
        heading: '4. The Free Product Programme', paras: [
            'Selected products may be supplied to eligible customers at a product price of £0.00. The customer is responsible for paying the applicable delivery charge shown before the order is completed.',
            'The fact that a product is supplied free of charge does not mean that we manufacture, formulate or independently test that product. Products are supplied in the manufacturer\'s packaging and, where applicable, with the manufacturer\'s instructions and warnings.',
            'We do not guarantee that any Product will eliminate, eradicate, prevent or permanently resolve a pest problem. Pest behaviour, property conditions, access points, food sources, environmental conditions, infestation levels and many other factors can affect the outcome of pest-control measures. Nothing on our website constitutes a promise or guarantee that a particular Product will produce a particular result.']
    },
    {
        heading: '5. Product Manufacturer and Product Quality', paras: [
            'Unless expressly stated otherwise, we are a distributor or supplier of Products and are not the manufacturer. We do not make any representation that a Product will achieve a particular pest-control result.',
            'We will provide the Product identified in your order confirmation, subject to availability and any necessary substitution or correction communicated to you.',
            'Products should only be used in accordance with their label, packaging, supplied instructions and applicable requirements. You must not:'], bullets: [
                'modify a Product;',
                'combine it with another product unless expressly permitted;',
                'use it for a purpose for which it is not authorised;',
                'use a professional-use-only product unless you are legally entitled and appropriately qualified to do so;',
                'ignore safety instructions; or',
                'use it in a manner contrary to the manufacturer\'s instructions.']
    },
    {
        heading: '5A. Misuse and Statutory Rights', paras: [
            'We cannot accept responsibility for problems caused by misuse, incorrect placement, failure to follow instructions, unauthorised modification, improper storage or other misuse by the customer or another person.',
            'Nothing in these Terms excludes or limits any statutory rights you may have in relation to goods supplied to you which cannot lawfully be excluded or restricted.']
    },
    {
        heading: '6. Product Safety', paras: [
            'You must read all product labels, instructions and warnings before using a Product. You are responsible for following all precautions concerning:'], bullets: [
                'children;', 'pets;', 'livestock;', 'wildlife;', 'non-target animals;', 'food;', 'water;', 'ventilation;', 'storage; and', 'disposal.']
    },
    {
        heading: '6A. Safety Information and Refusal', paras: [
            'Where you are uncertain whether a Product is suitable for your circumstances, you should not use it until you have obtained appropriate advice.',
            'You should inform us before professional treatment if there are circumstances that may materially affect the safety of the work, including the presence of children, pets, vulnerable occupants, livestock, protected species or other relevant hazards.',
            'We may refuse to supply or use a Product where we reasonably believe doing so would be unsafe or inappropriate.']
    },
    {
        heading: '7. Delivery', paras: [
            'Delivery charges will be displayed before you complete your order. Delivery times are estimates unless expressly stated otherwise.',
            'We are not responsible for delays caused by circumstances outside our reasonable control, including carrier delays, severe weather, industrial action, technical failures or other events beyond our reasonable control.',
            'You are responsible for providing an accurate delivery address. Where an incorrect address has been supplied by you, additional delivery costs may be payable.']
    },
    {
        heading: '8. Orders and Payments', paras: [
            'An order is not accepted until we issue an order confirmation. We may decline or cancel an order where a Product is unavailable, unsuitable, incorrectly listed or cannot lawfully be supplied.',
            'Any delivery charge must be paid using the payment method available at checkout. Payments may be processed by a third-party payment provider, and your use of that provider may also be subject to its terms and privacy policy.']
    },
    {
        heading: '9. Cancellation and Consumer Rights', paras: [
            'Where you are a consumer, you may have statutory rights to cancel certain distance contracts. These rights depend upon the nature of the contract and the circumstances in which the goods or services are supplied. Where a statutory cancellation right applies, we will provide the information required by applicable consumer legislation.',
            'Nothing in these Terms is intended to remove or restrict any statutory cancellation, refund, repair, replacement, repeat performance or other consumer right that cannot lawfully be excluded.',
            'Where a service is requested to begin during a statutory cancellation period, we may require the express consent and acknowledgement required by applicable law. Certain cancellation rights may cease or be affected once a service has been fully performed or where another statutory exception applies.']
    },
    {
        heading: '10. Customer Responsibilities', paras: ['You agree to provide accurate information about:'], bullets: [
            'the pest problem;', 'what you have observed;', 'where activity has been observed;', 'how long activity has been present;', 'your property;', 'previous treatment;', 'Products already used;', 'relevant hazards; and', 'any other information reasonably requested by us.']
    },
    {
        heading: '10A. Conduct of Information and Instructions', paras: [
            'You must not deliberately provide false or misleading information. You must follow reasonable instructions given by us or our professional personnel.',
            'You are responsible for taking reasonable steps to reduce conditions that may contribute to pest activity, including food availability, waste, hygiene and accessible sources of water where applicable.',
            'You acknowledge that our ability to assess and treat a pest problem may be affected by information that is inaccurate, incomplete or withheld.']
    },
    {
        heading: '11. Monitoring Period', paras: [
            'Where applicable, your customer account may provide a monitoring period, normally seven days. The monitoring period is intended to help you record changes in pest activity following the initial intervention. It is not a guarantee that pest activity will cease within seven days.',
            'You may be asked to report whether activity appears to be absent, reduced, unchanged, increased or uncertain, and to provide photographs or other information. We may use the information provided to determine whether a professional visit or other intervention appears appropriate.']
    },
    {
        heading: '12. Professional Inspection & Treatment — £95.99', paras: [
            'Where available, customers may book our Professional Inspection & Treatment service for the advertised price of £95.99. The Professional Service may include:'], bullets: [
                'inspection of relevant areas;', 'assessment of signs of pest activity;', 'identification of likely activity areas;', 'review of previous treatment;', 'appropriate professional treatment where applicable;', 'identification of potential access points;', 'recommendations for further action; and', 'preparation of a visit record.']
    },
    {
        heading: '12A. Scope of the Professional Service', paras: [
            'The precise work undertaken will depend on the findings at the property and what is reasonably appropriate in the circumstances. A booking for £95.99 does not constitute a guarantee that the pest problem will be eliminated.',
            'Treatment may not be appropriate in every circumstance. Where treatment is inappropriate, unsafe, outside the scope of the service or requires specialist work, we may recommend another course of action.',
            'Where additional services are recommended, you will normally be given the opportunity to decide whether you wish to proceed, unless immediate action is reasonably necessary to protect health or safety.']
    },
    {
        heading: '13. Professional Judgment', paras: [
            'Our personnel will carry out professional work using their training, experience, knowledge and applicable procedures. Pest control involves assessment and professional judgment. There may be circumstances in which the cause, extent or source of activity cannot reasonably be identified during a visit.',
            'Recommendations are based on the information available at the time and the observations made during the inspection. We do not guarantee that every source of pest activity will be identified, or that professional treatment will permanently resolve the problem.',
            'Where activity continues after professional treatment, this does not by itself establish that the service was incorrectly performed. Nothing in this section excludes our statutory obligation to provide services with reasonable care and skill.']
    },
    {
        heading: '14. No Guarantee of a Pest-Free Property', paras: [
            'Pest activity can recur even following apparently successful treatment. Continued or renewed activity may result from factors including:'], bullets: [
                'undiscovered entry points;', 'neighbouring properties;', 'shared structures;', 'drainage or sewer systems;', 'food or waste sources;', 'environmental conditions;', 'building defects;', 'changes in property use;', 'new pest activity; or', 'factors outside our control.']
    },
    { heading: '14A. No General Guarantee', paras: ['We therefore do not provide a general guarantee that your property will remain free from pests following treatment.'] },
    {
        heading: '15. Proofing and Entry Points', paras: [
            'During an inspection we may identify potential pest entry points and may provide recommendations for proofing or exclusion work. Identification of a potential entry point does not necessarily establish that it is the sole cause of pest activity. Proofing recommendations are based on the observations available to us.',
            'Proofing work is additional work unless expressly included in your service. Where proofing is quoted separately, the quotation will identify the proposed work and price. You are under no obligation to accept a proofing quotation unless you separately agree to the work.']
    },
    {
        heading: '16. Building and Structural Work', paras: [
            'We are not professional builders, structural engineers or building surveyors unless expressly stated otherwise. Pest-control work may occasionally require limited practical measures to gain access to, treat or protect an area.',
            'By booking our professional service and permitting access to the property, you authorise us and our personnel to undertake reasonable and proportionate measures that are reasonably necessary for the pest-control work, subject to the scope of the service and applicable law. This permission does not constitute an unlimited authority to alter, demolish or substantially modify your property.',
            'We will not knowingly undertake specialist structural, electrical, plumbing, roofing or other regulated building work outside our competence. Where specialist work appears necessary, we may recommend that you obtain an appropriately qualified contractor.']
    },
    {
        heading: '17. Access to the Property and Permission to Carry Out Work', paras: [
            'You confirm that you have authority to give us access to the property and to authorise the work you request.',
            'If you are a tenant, leaseholder or occupier without full ownership rights, you are responsible for obtaining any permission required from your landlord, managing agent, freeholder or other relevant person.',
            'By authorising our personnel to attend and undertake pest-control work, you agree that they may take reasonable steps necessary to inspect, access and treat the relevant areas. Such permission is subject to the professional judgment of our personnel and applicable safety requirements.',
            'We may decline to undertake work where access would be unsafe, unlawful, technically inappropriate or outside our competence.']
    },
    {
        heading: '18. Property Damage', paras: [
            'Pest-control work can sometimes involve practical intervention, movement of items, opening access areas or other activities that may create a risk of minor incidental damage. You acknowledge this risk when requesting and authorising our services. We will take reasonable care to avoid unnecessary damage.',
            'You should remove or protect valuable, fragile or particularly vulnerable items before our attendance where reasonably possible. You must tell us about concealed services, fragile structures, hazardous materials or other conditions that you know or reasonably suspect may affect the work.',
            'We are not responsible for damage caused by conditions that were concealed, unknown, not reasonably discoverable, inaccurately described by you, or caused by pre-existing defects, deterioration, infestation or structural weakness. We are not responsible for damage resulting from work that you separately authorised where that work was carried out with reasonable care and skill.',
            'Nothing in these Terms excludes or restricts liability to the extent that such exclusion or restriction is prohibited by law.']
    },
    {
        heading: '19. Limits on Our Liability', paras: [
            'Nothing in these Terms excludes or limits liability which cannot legally be excluded or limited. In particular, nothing excludes or limits liability for:'], bullets: [
                'death or personal injury caused by our negligence;', 'fraud or fraudulent misrepresentation;', 'breach of statutory rights that cannot legally be excluded; or', 'any other liability which applicable law prevents us from excluding or limiting.']
    },
    {
        heading: '19A. Losses We Are Not Liable For', paras: ['Subject to the above, we will not be liable for losses that:'], bullets: [
            'were not reasonably foreseeable when the contract was entered into;', 'result from your failure to follow instructions;', 'result from misuse of a Product;', 'result from inaccurate or incomplete information provided by you;', 'result from pre-existing defects or conditions at the property;', 'result from pest activity outside our reasonable control;', 'result from third-party products or services, except to the extent the law provides otherwise;', 'result from the acts or omissions of third parties;', 'are indirect or consequential losses where such exclusion is permitted by law; or', 'result from circumstances outside our reasonable control.']
    },
    {
        heading: '19B. Outcomes', paras: [
            'Where we have complied with our contractual obligations and exercised reasonable care and skill, we do not guarantee any particular outcome from pest-control services. Nothing in this clause removes your statutory rights as a consumer.']
    },
    {
        heading: '20. Third-Party Products', paras: [
            'Products may be manufactured by independent third parties. We do not control the manufacturing process, formulation, manufacturing facilities or quality-control systems of third-party manufacturers. Product information supplied by us may be based upon information supplied by the manufacturer or distributor.',
            'Where a Product is defective or does not conform to the contract, you may have rights against us under applicable consumer law. Nothing in these Terms removes those rights. Where appropriate, we may assist you in raising a product complaint with the relevant manufacturer or supplier.']
    },
    {
        heading: '21. No Guarantee of Product Effectiveness', paras: [
            'Pest-control Products do not necessarily produce the same result in every property. We do not promise that a Product will:'], bullets: [
                'eradicate all pests;', 'prevent future infestation;', 'work within a specified period;', 'work against pests other than those for which it is authorised;', 'overcome structural access problems; or', 'solve the underlying cause of an infestation.']
    },
    { heading: '21A. Circumstances Beyond Our Control', paras: ['The suitability and effectiveness of a Product may depend on circumstances beyond our control.'] },
    {
        heading: '22. Professional Advice and Completion of Our Services', paras: [
            'Our services are intended to address the pest-control issue based on the information and circumstances available to us at the relevant time. We will use reasonable care and skill and our professional experience when assessing and addressing the issue.',
            'We may determine that we have completed the work reasonably available to us within the scope of the service. Where we consider that no further action can reasonably be provided by us within the agreed scope, we may notify you that our service has been completed. The notification may explain what we inspected, what we observed, what action we took, what recommendations we made, what limitations affected the assessment and what further action, if any, we recommend.',
            'Once we have reasonably completed the agreed service and informed you that our service has concluded, our active service engagement may be closed. Closure means that we are not required to continue providing additional visits, treatment, monitoring or investigation unless a new service is separately agreed.',
            'Closure does not remove any legal rights or remedies you may have under applicable law, nor does it exclude liability for a breach of contract, negligence or other liability that cannot legally be excluded. If you wish to request additional services after closure, we may require a new booking or quotation.']
    },
    {
        heading: '23. Customer Acceptance of Professional Judgment', paras: [
            'You acknowledge that pest control is not an exact science and that professional personnel must exercise judgment based on the circumstances observed. You agree that recommendations are not guarantees, and acknowledge that continued pest activity does not automatically mean that our personnel acted improperly.',
            'You remain responsible for decisions concerning additional work, building repairs, hygiene, property maintenance and other matters outside the scope of our agreed services.']
    },
    {
        heading: '24. Photos, Reports and Customer Records', paras: [
            'Where appropriate, we may take photographs during an inspection or treatment visit. Photographs and reports may be uploaded to your customer account. Such records are intended to document the work undertaken and observations made at the time. Photographs may not identify every defect, entry point or source of pest activity.']
    },
    {
        heading: '25. Proofing Quotations', paras: [
            'A proofing quotation is separate from the £95.99 Professional Inspection & Treatment service unless expressly stated otherwise. A quotation will normally state the proposed work, the reason for the recommendation, the price, any relevant assumptions, the quotation expiry date and any relevant conditions.',
            'A quotation is not accepted until you expressly accept it in accordance with the process provided. We may require a deposit or payment before commencing proofing work where this is stated in the quotation. Additional work outside the agreed quotation will require your agreement unless reasonably necessary to address an immediate safety issue.']
    },
    {
        heading: '26. Our Right to Refuse or Stop Work', paras: ['We may refuse, suspend or stop a service where:'], bullets: [
            'conditions are unsafe;', 'there is a risk to people, animals or property;', 'access is unavailable;', 'the customer has provided materially inaccurate information;', 'the work is outside our competence;', 'required permissions have not been obtained;', 'the customer behaves abusively or threatens our personnel;', 'the work would be unlawful; or', 'circumstances materially differ from those described when the booking was made.',
            'Where reasonably possible, we will explain the reason for stopping or refusing work.']
    },
    {
        heading: '27. Customer Conduct', paras: [
            'You must treat our personnel respectfully. We do not tolerate threatening, abusive, discriminatory or intimidating behaviour. Where such behaviour occurs, we may terminate or refuse a service appointment. This does not affect any statutory rights you may have.']
    },
    {
        heading: '28. Complaints', paras: [
            'We want to resolve complaints fairly and promptly. Complaints should be submitted to:',
            `Email: ${CONTACT_EMAIL}`,
            `Address: ${COMPANY_ADDRESS}`,
            'Please provide your name, order or case number, relevant dates and a description of the issue. We will investigate complaints using the information available to us. Nothing in our complaints process prevents you from exercising statutory rights or pursuing any legal remedy available to you.']
    },
    {
        heading: '29. Website Use', paras: ['You may use our website for lawful purposes only. You must not:'], bullets: [
            'misuse the website;', 'attempt unauthorised access;', 'introduce malicious code;', 'interfere with website operation;', 'scrape or reproduce substantial website content without permission;', 'impersonate another person; or', 'use the website to commit or facilitate unlawful activity.',
            'We may suspend accounts or restrict access where reasonably necessary to protect the website, our customers or our business.']
    },
    {
        heading: '30. Website Information', paras: [
            'We aim to keep website information accurate and up to date. However, pest-control information is general information and should not be treated as a substitute for a professional inspection where one is appropriate.',
            'Product availability, prices, delivery charges, appointment availability and service areas may change. Images may be illustrative. Where there is a conflict between general website information and the specific terms of an accepted order or quotation, the specific order or quotation will generally apply.']
    },
    {
        heading: '31. Intellectual Property', paras: [
            'Unless otherwise stated, website content including text, graphics, branding, photographs, layouts and software is owned by or licensed to us. You may access and use the website for personal or legitimate business purposes. You must not reproduce, distribute, modify or commercially exploit our content without our prior written permission.']
    },
    {
        heading: '32. Privacy', paras: [
            'We process personal information in accordance with our Privacy Policy and Privacy Notice, which explain how we collect, use, store and share personal information.']
    },
    {
        heading: '33. Events Outside Our Control', paras: [
            'We will not be responsible for delay or failure caused by circumstances outside our reasonable control, which may include severe weather, flooding, fire, epidemic, infrastructure failure, power failure, telecommunications failure, supplier failure, transport disruption, industrial action, government action or other comparable events. Where such an event affects your service, we will take reasonable steps to notify you and, where practicable, rearrange the service.']
    },
    {
        heading: '34. Changes to These Terms', paras: [
            'We may update these Terms from time to time. Changes will not retrospectively alter rights relating to an order or service already accepted unless permitted by law. The latest version will be published on our website.']
    },
    {
        heading: '35. Severability', paras: [
            'If any provision of these Terms is found to be unlawful, invalid or unenforceable, that provision shall be modified or removed to the minimum extent necessary. The remaining provisions shall continue to apply.']
    },
    {
        heading: '36. No Waiver', paras: [
            'If we do not immediately enforce a provision of these Terms, this does not mean that we waive our right to enforce it later.']
    },
    {
        heading: '37. Entire Agreement', paras: [
            'These Terms, together with the applicable order, booking confirmation, quotation, product information and other documents expressly incorporated into the relevant transaction, constitute the agreement between you and us concerning the relevant service. Nothing in this clause excludes information or statements which are legally required to form part of the contract.']
    },
    {
        heading: '38. Governing Law and Jurisdiction', paras: [
            'These Terms are governed by the law of England and Wales unless applicable law requires otherwise. If you are a consumer, you may have additional statutory rights concerning the jurisdiction in which proceedings may be brought. Nothing in these Terms removes any mandatory consumer protection available to you under applicable law.']
    }
];

export const PRIVACY_INTRO = `This Privacy Policy explains how FreePestProducts.com ("we", "us", "our") collects, uses, stores and protects personal information when you use our website, create an account, order products, book services or otherwise interact with us. We process personal information in accordance with applicable UK data-protection law, including the UK GDPR and the Data Protection Act 2018, as amended from time to time.`;

export const PRIVACY: LegalSection[] = [
    {
        heading: '1. Who We Are', paras: [
            'The organisation responsible for your personal information is Orombow Traders, registered office 1 Clyde Road, SM1 2RR.',
            `Email: ${CONTACT_EMAIL}. For privacy enquiries, please contact us using these details.`]
    },
    {
        heading: '2. Information We Collect', paras: ['Depending on how you use our services, we may collect the following categories of information.'], bullets: [
            'Identity information: name, title, customer/account number, order number and information used to verify your identity where reasonably necessary.',
            'Contact information: email address, telephone and mobile number, postal address and communication preferences.',
            'Property information: property address and type, areas affected by pest activity, location of suspected activity, access information, property conditions relevant to the service, photographs and potential pest entry points.',
            'Pest-control information: type of pest reported, signs observed, dates of activity, previous treatment, Products used, monitoring information, photographs, professional inspection findings, treatment records, recommendations and proofing information.',
            'Transaction information: Products ordered, delivery charges, payment status, order numbers, booking information, invoices, quotations, refunds and transaction records. We generally do not need to store your complete payment-card details where these are processed directly by our payment provider.',
            'Technical information: IP address, browser and device type, operating system, website activity, pages visited, approximate location derived from technical information, login information, cookies and similar technologies, and security logs.',
            'Communications: emails, support requests, messages, complaints, photographs and information provided during telephone or other customer-service interactions.']
    },
    {
        heading: '3. How We Use Your Information', paras: ['We may use personal information to:'], bullets: [
            'create and administer your account;', 'assess eligibility for our services;', 'process orders, arrange delivery and process payments;', 'arrange professional appointments and provide pest-control services;', 'monitor your customer journey and record treatment activity;', 'provide quotations and process proofing requests;', 'communicate with you about your account and respond to enquiries;', 'handle complaints;', 'maintain business records;', 'protect our website and systems and prevent fraud or misuse;', 'comply with legal obligations and enforce our terms and contractual rights;', 'improve our services and analyse website usage where permitted; and', 'send marketing communications where we have a lawful basis to do so.']
    },
    {
        heading: '4. Lawful Bases', paras: ['We will identify an appropriate lawful basis for each processing activity. Depending on the circumstances, these may include:'], bullets: [
            'Contract: where necessary to enter into or perform a contract with you, such as processing your order, arranging delivery, managing your account, arranging appointments, providing professional services and administering quotations.',
            'Legal obligation: where necessary to comply with the law, such as maintaining financial records, responding to lawful requests, complying with regulatory obligations and establishing, exercising or defending legal claims.',
            'Legitimate interests: where those interests are not overridden by your rights and interests, such as operating and improving our business, maintaining website security, preventing fraud, managing customer relationships, protecting our staff and customers, maintaining service records, dealing with complaints and defending legal claims.',
            'Consent: where consent is required, we will request it. You may withdraw consent at any time, although withdrawal will not affect processing that took place before withdrawal.']
    },
    {
        heading: '5. Marketing', paras: [
            'We may send service-related communications that are necessary to administer your account or provide a service. Marketing communications will only be sent where permitted by applicable law.',
            'You may unsubscribe from marketing communications at any time, and may continue to receive essential service communications afterwards. We will not treat your withdrawal from marketing consent as preventing you from using our core services where you remain otherwise eligible.']
    },
    {
        heading: '6. Who We Share Information With', paras: ['We may share personal information with selected third parties where necessary for the purposes described in this Privacy Policy, including:'], bullets: [
            'payment processors;', 'delivery and courier providers;', 'website and hosting providers;', 'customer-management platforms;', 'appointment-booking providers;', 'IT, software, email and communications providers;', 'professional personnel carrying out services;', 'manufacturers or suppliers where necessary to deal with product matters;', 'professional advisers, accountants, insurers and lawyers;', 'regulators and law-enforcement bodies where legally required; and', 'other service providers acting on our instructions.',
            'We require appropriate contractual and security arrangements with processors where required by law.']
    },
    {
        heading: '7. Payment Information', paras: [
            'Payments may be processed by third-party payment providers. Where possible, payment-card information is handled directly by the payment provider rather than stored by us. The provider may process your information in accordance with its own privacy documentation.',
            'Payment provider: Stripe.']
    },
    {
        heading: '8. Delivery Information', paras: [
            'We may provide delivery information to the courier or delivery provider necessary to deliver your Product, including your name, delivery address, telephone number and email address where delivery notifications are required.']
    },
    {
        heading: '9. Professional Service Providers', paras: [
            'Where you book a professional pest-control service, relevant information may be provided to the professional attending the property, including your name, address, contact details, booking information, pest-control history, relevant photographs, information concerning previous treatment and information necessary to carry out the service safely.']
    },
    {
        heading: '10. Photographs', paras: [
            'Customers may be able to upload photographs through their account. Photographs may be used to assess pest activity, monitor progress, document treatment or assist with recommendations. Photographs taken during professional visits may be retained as part of the service record.',
            'Customers should avoid photographing unrelated individuals or unnecessary personal information.']
    },
    {
        heading: '11. Cookies and Similar Technologies', paras: [
            'We may use essential, security, account/login, analytics and marketing cookies. Where consent is required, non-essential cookies will only be used following the appropriate consent process. Further information is provided in our Cookie Policy.']
    },
    {
        heading: '12. Analytics', paras: [
            'Where analytics tools are used, they may collect information about how visitors interact with our website, for purposes including understanding website usage, identifying technical problems, improving website performance and understanding which website features are useful.']
    },
    {
        heading: '13. International Transfers', paras: [
            'Some of our suppliers may process information outside the United Kingdom. Where personal information is transferred internationally, we will use an appropriate legal mechanism where required by applicable data-protection law, such as an adequacy decision, appropriate contractual safeguards or another lawful transfer mechanism.']
    },
    {
        heading: '14. How Long We Keep Information', paras: [
            'We retain personal information only for as long as reasonably necessary for the purposes for which it was collected, subject to legal, regulatory, accounting, insurance and dispute-resolution requirements. We periodically review retained information and delete or anonymise information that we no longer reasonably need, unless there is a lawful reason to retain it.']
    },
    {
        heading: '15. Data Security', paras: [
            'We take reasonable technical and organisational measures to protect personal information against unauthorised access, accidental loss, destruction, alteration, disclosure and other unlawful processing. However, no online system can be guaranteed to be completely secure.']
    },
    {
        heading: '16. Your Rights', paras: ['Depending on the circumstances, you may have rights concerning your personal information, including:'], bullets: [
            'the right to access your personal information;', 'the right to have inaccurate information corrected;', 'the right to request erasure;', 'the right to request restriction of processing;', 'the right to object to certain processing;', 'the right to data portability where applicable;', 'the right to withdraw consent where processing is based on consent; and', 'rights relating to certain automated decision-making and profiling.',
            'These rights are not absolute in every circumstance. For example, we may need to retain information where we have a legal obligation or where it is necessary to establish, exercise or defend legal claims.']
    },
    {
        heading: '17. Right to Object to Direct Marketing', paras: [
            'You have an absolute right to object to the processing of your personal information for direct marketing purposes. If you object, we will stop using your information for that purpose, subject to any limited technical processing required to maintain your suppression preference.']
    },
    {
        heading: '18. Automated Decision-Making', paras: [
            'We do not currently make decisions producing legal or similarly significant effects on you solely through automated processing.']
    },
    {
        heading: "19. Children's Information", paras: [
            'Our services are intended for adults. We do not knowingly collect personal information from children for the purpose of providing our services. If you believe that a child has provided personal information to us, please contact us.']
    },
    {
        heading: '20. Third-Party Websites', paras: [
            'Our website may contain links to third-party websites. We are not responsible for the privacy practices of third-party websites, and you should review the privacy information provided by the relevant third party.']
    },
    {
        heading: '21. Changes to This Privacy Policy', paras: [
            'We may update this Privacy Policy from time to time. The latest version will be published on our website with the relevant "last updated" date.']
    },
    {
        heading: '22. Contact Us', paras: [
            `For privacy questions or requests, contact ${COMPANY} at ${CONTACT_EMAIL}.`]
    },
    {
        heading: '23. Complaints to the ICO', paras: [
            "If you are unhappy with the way we have handled your personal information, please contact us first so that we have an opportunity to investigate. You also have the right to complain to the UK's Information Commissioner's Office (ICO).",
            'ICO website: https://ico.org.uk/',
            'ICO telephone: 0303 123 1113']
    },
    {
        heading: '24. Governing Law', paras: [
            'This Privacy Policy is governed by the law applicable in the United Kingdom, subject to any mandatory rights available to you under applicable data-protection law.']
    }
];

export const PRIVACY_NOTICE = {
    title: 'Privacy Notice (Summary)',
    intro: `When you use FreePestProducts.com, we collect information about you so that we can provide our pest-control products and services. This short notice summarises how we use it; our full Privacy Policy has the detail.`,
    points: [
        'What we collect: your name and contact details, property and delivery address, information about your pest problem and previous treatment, photographs you choose to upload, orders, payments and appointments, professional inspection and treatment records, proofing information and quotations, and technical information about how you use our website.',
        'Why we use it: to assess eligibility, provide Products, arrange delivery, manage your account, arrange professional visits, monitor your pest-control journey, communicate with you, handle payments and support, keep appropriate business records, protect our systems, prevent fraud, comply with legal obligations and improve our services where permitted.',
        'Our legal bases: performance of a contract, steps taken at your request before entering into a contract, legal obligations, legitimate interests, or consent where consent is required. We will not rely on consent where another lawful basis is more appropriate.',
        'Who receives it: payment providers, delivery companies, website and hosting providers, appointment systems, communications providers, professional pest-control personnel, professional advisers, and regulators or authorities where legally required.',
        'How long we keep it: only as long as reasonably necessary, including for legal, accounting, insurance and dispute-resolution requirements.',
        'Your rights: to access, correct, delete, restrict or object to processing, receive your data in a portable format, and withdraw consent. You also have an absolute right to object to direct marketing.'
    ]
};