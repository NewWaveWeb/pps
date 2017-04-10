const inquirer = require('inquirer');
const questions = require('./questions');
const build = require('./build');
const getScore = require('./scoring');

inquirer.prompt([
	questions.contact_1,
	questions.contact_2,
	questions.about_1,
	questions.about_2,
])
.then((answers) => {
	questions.about_4.choices[ 0 ].name = questions.about_4.choices[ 0 ].name.replace('[application]', answers.about_1);
	questions.about_4.choices[ 1 ].name = questions.about_4.choices[ 1 ].name.replace('[application]', answers.about_1);
	questions.about_4.choices[ 1 ].name = questions.about_4.choices[ 1 ].name.replace('[policy]', answers.contact_2);
	return inquirer.prompt([
		questions.about_3,
		questions.about_4,
	]).then((aboutAnswers) => {
		return Promise.resolve(Object.assign(answers, aboutAnswers));
	});
})
.then((answers) => {
	return inquirer.prompt([
		questions.contact_3,
		questions.contact_4,
		questions.contact_5,
		questions.contact_6,
	]).then((contactAnswers) => {
		return Promise.resolve(Object.assign(answers, contactAnswers));
	});
})
.then((answers) => {
	return inquirer.prompt([
		questions.use_1,
		questions.use_1_other,
	]).then((useAnswers) => {
		return Promise.resolve(Object.assign(answers, useAnswers));
	});
})
.then((answers) => {
	return inquirer.prompt([
		questions.share_1,
		questions.share_1_other,
		questions.share_2,
		questions.share_2_other,
	]).then((shareAnswers) => {
		return Promise.resolve(Object.assign(answers, shareAnswers));
	});
})
.then((answers) => {
	return inquirer.prompt([
		questions.sell_1,
		questions.sell_2,
		questions.sell_3,
		questions.sell_4,
	]).then((sellAnswers) => {
		return Promise.resolve(Object.assign(answers, sellAnswers));
	});
})
.then((answers) => {
	return inquirer.prompt([
		questions.store_1,
	]).then((storeAnswers) => {
		return Promise.resolve(Object.assign(answers, storeAnswers));
	});
})
.then((answers) => {
	return inquirer.prompt([
		questions.encryption_1,
		questions.encryption_2,
		questions.encryption_3,
		questions.encryption_4,
		questions.encryption_5,
		questions.encryption_6,
	]).then((storeAnswers) => {
		return Promise.resolve(Object.assign(answers, storeAnswers));
	});
})
.then((answers) => {
	return inquirer.prompt([
		questions.privacy_1,
		questions.privacy_1_options,
		questions.privacy_1_options_7_other,
		questions.privacy_2,
		questions.privacy_3,
		questions.privacy_4,
	]).then((privacyAnswers) => {
		return Promise.resolve(Object.assign(answers, privacyAnswers));
	});
})
.then((answers) => {
	return inquirer.prompt([
		questions.useroptions_1,
		questions.useroptions_1_options,
		questions.useroptions_1_options_1_1,
	]).then((userOptionsAnswers) => {
		return Promise.resolve(Object.assign(answers, userOptionsAnswers));
	});
})
.then((answers) => {
	return inquirer.prompt([
		questions.deactivation_1,
	]).then((deactivationAnswers) => {
		return Promise.resolve(Object.assign(answers, deactivationAnswers));
	});
})
.then((answers) => {
	return inquirer.prompt([
		questions.policychanges_1,
	]).then((policyChangesAnswers) => {
		return Promise.resolve(Object.assign(answers, policyChangesAnswers));
	});
})
.then((answers) => {
	questions.breach_1.message = questions.breach_1.message.replace('[company]', answers.contact_1);
	return inquirer.prompt([
		questions.breach_1,
	]).then((breachAnswers) => {
		return Promise.resolve(Object.assign(answers, breachAnswers));
	});
})
.then((answers) => {
	const score = getScore(answers);
	build(answers, score);
});
