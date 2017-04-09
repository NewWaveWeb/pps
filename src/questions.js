/* eslint camelcase: 0 */
const inquirer = require('inquirer');
const isURL = (url) => {
	const expression = '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})';
	const re = new RegExp(expression);
	return re.test(url);
};
const isEmail = (email) => {
	const expression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	const re = new RegExp(expression);
	return re.test(email);
};
const questions = {
	/*
	 * About the app
	 */
	about_1: {
		type: 'input',
		name: 'about_1',
		message: 'What is the name of your app or technology?',
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	about_2: {
		type: 'input',
		name: 'about_2',
		message: 'What is its primary service?',
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	about_3: {
		type: 'list',
		name: 'about_3',
		message: 'Does it belong to a covered entity?\n',
		choices: [
			{
				name: 'Yes',
				value: 'about_3_1',
			},
			{
				name: 'No',
				value: 'about_3_2',
			},
		],
		validate: function(input) {
			return (!input.length) ? 'Select Yes or No' : true;
		},
	},
	about_4: {
		type: 'checkbox',
		name: 'about_4',
		message: 'Please select one of the following statements to be inserted in the privacy notice:\n',
		choices: [
			{
				name: 'Please note that the health data we collect as part of [application] are not protected by HIPAA and our company’s HIPAA Notice of Privacy Practices does not apply.',
				value: 'about_4_1',
			},
			{
				name: 'Some of the health data we collect as part of [application] also are protected by HIPAA. Read our HIPAA Notice of Privacy Practices [policy] for more information.',
				value: 'about_4_2',
			},
		],
		validate: function(input) {
			return (!input.length) ? 'Please select an option' : true;
		},
		when: function(answers) {
			return answers.about_3.indexOf('about_3_1') !== -1;
		},
	},
	/*
	 * Contact us
	 */
	contact_1: {
		type: 'input',
		name: 'contact_1',
		message: 'Legal Entity Name',
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	contact_2: {
		type: 'input',
		name: 'contact_2',
		message: 'Link to full privacy policy',
		validate: function(input) {
			return (isURL(input)) ? true : 'Please enter a valid URL';
		},
	},
	contact_3: {
		type: 'input',
		name: 'contact_3',
		message: 'Link to Online Comment/Contact form',
		validate: function(input) {
			return (isURL(input)) ? true : 'Please enter a valid URL';
		},
	},
	contact_4: {
		type: 'input',
		name: 'contact_4',
		message: 'Email Address',
		validate: function(input) {
			return (isEmail(input)) ? true : 'Please enter a valid email address';
		},
	},
	contact_5: {
		type: 'input',
		name: 'contact_5',
		message: 'Phone Number',
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	contact_6: {
		type: 'input',
		name: 'contact_6',
		message: 'Address; minimum, Country',
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	/*
	 * Use
	 */
	use_1: {
		type: 'checkbox',
		name: 'use_1',
		message: 'How do you USE the consumers\' identifiable data* internally?\n  You collect and use consumer\'s identifiable data*:\n',
		choices: [
			{
				name: 'To provide the primary service of the app or technology',
				value: 'use_1_1',
			},
			{
				name: 'To develop marketing materials for our products',
				value: 'use_1_2',
			},
			{
				name: 'To conduct scientific research',
				value: 'use_1_3',
			},
			{
				name: 'For company operations (e.g., quality control or fraud detection)',
				value: 'use_1_4',
			},
			{
				name: 'To develop and improve new and current products and services (e.g., analytics)',
				value: 'use_1_5',
			},
			{
				name: 'Other',
				value: 'use_1_6',
			},
			new inquirer.Separator('* Identifiable data means: data, such as your name, phone number, email, address, health services, information on your physical or mental health conditions, or your social security number, that can be used on its own or with other information to identify you.'),
		],
		validate: function(input) {
			return (!input.length) ? 'Select at least one' : true;
		},
	},
	use_1_other: {
		type: 'editor',
		name: 'use_1_other',
		message: 'Describe how do you collect and use indentifiable data',
		when: function(answers) {
			return answers.use_1.indexOf('use_1_6') !== -1;
		},
	},
	/*
	 * Share
	 */
	share_1: {
		type: 'checkbox',
		name: 'share_1',
		message: 'How do you SHARE consumers\' data externally with other companies or entities?\n  You share consumers\' identifiable data*:\n',
		choices: [
			{
				name: 'To provide the primary service of the app or technology',
				value: 'share_1_1',
			},
			{
				name: 'To conduct scientific research',
				value: 'share_1_2',
			},
			{
				name: 'For company operations (e.g. quality control or fraud detection)',
				value: 'share_1_3',
			},
			{
				name: 'To develop and improve new and current products and services (e.g., analytics)',
				value: 'share_1_4',
			},
			{
				name: 'Other',
				value: 'share_1_5',
			},
			{
				name: 'We DO NOT share consumers\' identifiable data*',
				value: 'share_1_6',
			},
			new inquirer.Separator('* Identifiable data means: data, such as your name, phone number, email, address, health services, information on your physical or mental health conditions, or your social security number, that can be used on its own or with other information to identify you.'),
		],
		validate: function(input) {
			return (!input.length) ? 'Select at least one' : true;
		},
	},
	share_1_other: {
		type: 'editor',
		name: 'share_1_other',
		message: 'Describe how do you share consumers\' data externally with other companies or entities',
		when: function(answers) {
			return answers.share_1.indexOf('share_1_5') !== -1;
		},
	},
	share_2: {
		type: 'checkbox',
		name: 'share_2',
		message: 'How do you SHARE consumers\' data externally with other companies or entities?\n  You share consumers\' data AFTER removing identifiers (note that remaining data may not be anonymous):\n',
		choices: [
			{
				name: 'For the primary purpose of the app or technology',
				value: 'share_2_1',
			},
			{
				name: 'To conduct scientific research',
				value: 'share_2_2',
			},
			{
				name: 'For company operations (e.g. quality control or fraud detection)',
				value: 'share_2_3',
			},
			{
				name: 'To develop and improve new and current products and services (e.g., analytics)',
				value: 'share_2_4',
			},
			{
				name: 'Other',
				value: 'share_2_5',
			},
			{
				name: 'We DO NOT share consumers\' data after removing identifiers',
				value: 'share_2_6',
			},
		],
		validate: function(input) {
			return (!input.length) ? 'Select at least one' : true;
		},
	},
	share_2_other: {
		type: 'editor',
		name: 'share_2_other',
		message: 'Describe how do you share consumers\' data externally with other companies or entities AFTER removing identifiers',
		when: function(answers) {
			return answers.share_2.indexOf('share_2_5') !== -1;
		},
	},
	/*
	 * Sell
	 */
	sell_1: {
		type: 'list',
		name: 'sell_1',
		message: 'Who you SELL consumers\' data\n  Will you sell consumers\' identifiable data* to data brokers**, marketing, advertising networks, or analytics firms?',
		choices: [
			{
				name: 'Yes',
				value: 'sell_1_1',
			},
			{
				name: 'Yes, only with consummers\' permission',
				value: 'sell_1_2',
			},
			{
				name: 'No',
				value: 'sell_1_3',
			},
			new inquirer.Separator('* Identifiable data means: data, such as your name, phone number, email, address, health services, information on your physical or mental health conditions, or your social security number, that can be used on its own or with other information to identify you.'),
			new inquirer.Separator('** Data broker means: companies that collect personal information about consumers from a variety of public and non-public sources and resell the information to other companies (From FTC: https://www.ftc.gov/news-events/press-releases/2012/12/ftc-study-data-broker-industrys-collectionuse-consumer-data).'),
		],
	},
	sell_2: {
		type: 'input',
		name: 'sell_2',
		message: 'Please explain consumers how they can adjust permissions. Insert text or link',
		when: function(answers) {
			return answers.sell_1.indexOf('sell_1_2') !== -1;
		},
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	sell_3: {
		type: 'list',
		name: 'sell_3',
		message: 'Will you sell consumers\' data AFTER removing identifiers (note that remaining data may not be anonymous) to data brokers*, marketing, advertising networks, or analytics firms?',
		choices: [
			{
				name: 'Yes',
				value: 'sell_3_1',
			},
			{
				name: 'Yes, only with consumers\' permission',
				value: 'sell_3_2',
			},
			{
				name: 'No',
				value: 'sell_3_3',
			},
			new inquirer.Separator('* Data broker means: companies that collect personal information about consumers from a variety of public and non-public sources and resell the information to other companies (From FTC: https://www.ftc.gov/news-events/press-releases/2012/12/ftc-study-data-broker-industrys-collectionuse-consumer-data).'),
		],
	},
	sell_4: {
		type: 'input',
		name: 'sell_4',
		message: 'Please explain consumers how they can adjust permissions. Insert text or link',
		when: function(answers) {
			return answers.sell_1.indexOf('sell_3_2') !== -1;
		},
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	/*
	 * Store
	 */
	store_1: {
		type: 'list',
		name: 'store_1',
		message: 'Where will you\'ll STORE consumers\' data?\n  Consumers\' data are stored:\n',
		choices: [
			{
				name: 'On the device',
				value: 'store_1_1',
			},
			{
				name: 'Outside the device at our company or through a third party.',
				value: 'store_1_2',
			},
			{
				name: 'N/A',
				value: 'store_1_3',
			},
		],
	},
	/*
	 * Encryption
	 */
	encryption_1: {
		type: 'list',
		name: 'encryption_1',
		message: 'How you ENCRYPT consumers\' data\n  Does the app or technology use encryption* to…\n  encrypt consumer data in the device or app?\n',
		choices: [
			{
				name: 'Yes, by default',
				value: 'encryption_1_1',
			},
			{
				name: 'Yes, when you take certain steps',
				value: 'encryption_1_2',
			},
			{
				name: 'No',
				value: 'encryption_1_3',
			},
			{
				name: 'N/A',
				value: 'encryption_1_4',
			},
			new inquirer.Separator('* Encryption means: A method of converting an original message of regular text into encoded text in such a way that only authorized parties can read it.'),
		],
		validate: function(input) {
			return (!input.length) ? 'Please select an option' : true;
		},
	},
	encryption_2: {
		type: 'input',
		name: 'encryption_2',
		message: 'Please explain how. Insert text or link:',
		when: function(answers) {
			return answers.encryption_1.indexOf('encryption_1_2') !== -1;
		},
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	encryption_3: {
		type: 'list',
		name: 'encryption_3',
		message: 'How you ENCRYPT consumers\' data\n  Does the app or technology use encryption* to…\n encrypt consumers\' data when stored on our company servers or with an outside cloud computing** services provider?',
		choices: [
			{
				name: 'Yes, by default',
				value: 'encryption_3_1',
			},
			{
				name: 'Yes, when you take certain steps',
				value: 'encryption_3_2',
			},
			{
				name: 'No',
				value: 'encryption_3_3',
			},
			{
				name: 'N/A',
				value: 'encryption_3_4',
			},
			new inquirer.Separator('* Encryption means: A method of converting an original message of regular text into encoded text in such a way that only authorized parties can read it.'),
			new inquirer.Separator('** Cloud computing means: Storing and managing data exclusively online, without the use of a physical server.'),
		],
	},
	encryption_4: {
		type: 'input',
		name: 'encryption_4',
		message: 'Please explain how. Insert text or link:',
		when: function(answers) {
			return answers.encryption_3.indexOf('encryption_3_2') !== -1;
		},
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	encryption_5: {
		type: 'list',
		name: 'encryption_5',
		message: 'How you ENCRYPT consumers\' data\n  Does the app or technology use encryption* to…\n  encrypt consumers\' data while it is transmitted?',
		choices: [
			{
				name: 'Yes, by default',
				value: 'encryption_5_1',
			},
			{
				name: 'Yes, when you take certain steps',
				value: 'encryption_5_2',
			},
			{
				name: 'No',
				value: 'encryption_5_3',
			},
			{
				name: 'N/A',
				value: 'encryption_5_4',
			},
		],
	},
	encryption_6: {
		type: 'input',
		name: 'encryption_6',
		message: 'Please explain how. Insert text or link:',
		when: function(answers) {
			return answers.encryption_5.indexOf('encryption_5_2') !== -1;
		},
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	/*
	 * Privacy
	 */
	privacy_1: {
		type: 'list',
		name: 'privacy_1',
		message: 'Privacy: How this technology accesses other data\n  Will this technology or app request access to other device data or applications, such as consumer\'s phone camera, photos, or contacts?',
		choices: [
			{
				name: 'Yes, only with the consumer\'s permission.',
				value: 'privacy_1_1',
			},
			{
				name: 'No',
				value: 'privacy_1_2',
			},
		],
	},
	privacy_1_options: {
		type: 'checkbox',
		name: 'privacy_1_options',
		message: 'Privacy: How this technology accesses other data\n  It connects to...',
		choices: [
			{
				name: 'Camera',
				value: 'privacy_1_options_1',
			},
			{
				name: 'Photos',
				value: 'privacy_1_options_2',
			},
			{
				name: 'Contacts',
				value: 'privacy_1_options_3',
			},
			{
				name: 'Location Services',
				value: 'privacy_1_options_4',
			},
			{
				name: 'Microphone',
				value: 'privacy_1_options_5',
			},
			{
				name: 'Health Monitoring Devices',
				value: 'privacy_1_options_6',
			},
			{
				name: 'Other',
				value: 'privacy_1_options_7',
			},
		],
		validate: function(input) {
			return (!input.length) ? 'Select at least one' : true;
		},
		when: function(answers) {
			return answers.privacy_1.indexOf('privacy_1_1') !== -1;
		},
	},
	privacy_1_options_7_other: {
		type: 'input',
		name: 'privacy_1_options_7_other',
		message: 'Please insert a link to instructions on how consumers can check their settings, including permissions set as a default:',
		when: function(answers) {
			return answers.privacy_1.indexOf('privacy_1_1') !== -1 && answers.privacy_1_options.indexOf('privacy_1_options_7') !== -1;
		},
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	privacy_2: {
		type: 'list',
		name: 'privacy_2',
		message: 'Privacy: How this technology accesses other data\n  Does this technology or app allow consumers to share the collected data with your social media accounts, like Facebook?',
		choices: [
			{
				name: 'Yes',
				value: 'privacy_2_1',
			},
			{
				name: 'Yes, only with consumer\' permission',
				value: 'privacy_2_2',
			},
			{
				name: 'No',
				value: 'privacy_2_3',
			},
		],
	},
	privacy_3: {
		type: 'input',
		name: 'privacy_3',
		message: 'Please insert link to instructions on how the consumer can check their settings:',
		when: function(answers) {
			return answers.privacy_2.indexOf('privacy_2_1') !== -1;
		},
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	privacy_4: {
		type: 'input',
		name: 'privacy_4',
		message: 'Please insert instructions or a link to instructions on how consumers can check their settings:',
		when: function(answers) {
			return answers.privacy_2.indexOf('privacy_2_2') !== -1;
		},
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	/*
	 * User Options
	 */
	useroptions_1: {
		type: 'list',
		name: 'useroptions_1',
		message: 'USER OPTIONS: What consumes can do with the data that you collect\n  Can consumers access, edit, share, or delete the data you have about them?',
		choices: [
			{
				name: 'Yes',
				value: 'useroptions_1_1',
			},
			{
				name: 'No',
				value: 'useroptions_1_2',
			},
		],
	},
	useroptions_1_options: {
		type: 'checkbox',
		name: 'useroptions_1_options',
		message: 'USER OPTIONS: What consumes can do with the data that you collect\n  Can consumers access, edit, share, or delete the data you have about them?\n  Yes. They can...',
		choices: [
			{
				name: 'Access their data',
				value: 'useroptions_1_options_1',
			},
			{
				name: 'Edit their data',
				value: 'useroptions_1_options_2',
			},
			{
				name: 'Share their data',
				value: 'useroptions_1_options_3',
			},
			{
				name: 'Delete their data',
				value: 'useroptions_1_options_4',
			},
		],
		validate: function(input) {
			return (!input.length) ? 'Select at least one' : true;
		},
		when: function(answers) {
			return answers.useroptions_1.indexOf('useroptions_1_1') !== -1;
		},
	},
	useroptions_1_options_1_1: {
		type: 'input',
		name: 'useroptions_1_options_1_1',
		message: 'Please insert instructions or a link to instructions on how consumers can perform the selected actions:',
		when: function(answers) {
			return (answers.useroptions_1_options.indexOf('useroptions_1_options_1') !== -1 || answers.useroptions_1_options.indexOf('useroptions_1_options_2') !== -1 || answers.useroptions_1_options.indexOf('useroptions_1_options_3') !== -1 || answers.useroptions_1_options.indexOf('useroptions_1_options_4') !== -1);
		},
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	deactivation_1: {
		type: 'list',
		name: 'deactivation_1',
		message: 'What happens to the consumer\'s data when their account is DEACTIVATED*?\n  When a consumer\'s account is deactivated/terminated by the company, or by themselves, their data is…',
		choices: [
			{
				name: 'Deleted immediately',
				value: 'deactivation_1_1',
			},
			{
				name: 'Deleted after x years',
				value: 'deactivation_1_2',
			},
			{
				name: 'Permanently retained and used',
				value: 'deactivation_1_3',
			},
			{
				name: 'Retained and used until you request deletion',
				value: 'deactivation_1_4',
			},
			new inquirer.Separator('* Deactivation means: An individual takes action or a company ceases operation or deactivates an individual’s account due to inactivity.'),
		],
	},
	/*
	 * Policy changes
	 */
	policychanges_1: {
		type: 'editor',
		name: 'policychanges_1',
		message: 'Describe how/if the company will notify consumers of privacy policy changes (e.g. merger or acquisition) and provide link to section in privacy policy.',
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
	/*
	 * Breach
	 */
	breach_1: {
		type: 'editor',
		name: 'breach_1',
		message: 'BREACH*: How will you notify consumers and protect their data in case of an improper disclosure? \n  [company] complies with all applicable laws regarding breaches.\n  Describe how the company will protect consumers\' data in the case of a breach and provide link to section in privacy policy.\n  * Breach means: an unauthorized disclosure.',
		validate: function(input) {
			return (!input.length) ? 'This information is required' : true;
		},
	},
};

module.exports = questions;
