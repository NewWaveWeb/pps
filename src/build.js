const fs = require('fs');
const fse = require('fs-extra');
const dot = require('dot');
const texts = require('./texts');
const utils = require('./utils');

const getTemplateData = (answers, scoring) => {
	return {
		breach: answers.breach_1,
		privacy_policy_change: answers.policychanges_1,
		application: answers.about_1,
		legal_entity_name: answers.contact_1,
		privacy_policy_link: answers.contact_2,
		contact_link: answers.contact_3,
		email: answers.contact_4,
		phone: answers.contact_5,
		address: answers.contact_6,
		primary_service: answers.about_2,
		snapshot: {
			use: {
				score: scoring.use.score,
				label: 'Use',
				label_long: 'Use',
				subtitle: 'How we use your data internally',
				content: [
					{
						label: texts.use.use_1.label,
						answers: utils.getUse(answers),
						label_negative: utils.getNotUse(answers),
						score: scoring.use.use_1,
					},
				],
			},
			share: {
				score: scoring.share.score,
				label: 'Share',
				label_long: 'Share',
				subtitle: 'How we share your data externally',
				content: [
					{
						label: utils.getShareLabel(answers, 'share_1'),
						answers: utils.getShare(answers, 'share_1'),
						label_negative: utils.getNotShare(answers, 'share_1'),
						score: scoring.share.share_1,
					},
					{
						label: utils.getShareLabel(answers, 'share_2'),
						answers: utils.getShare(answers, 'share_2'),
						label_negative: utils.getNotShare(answers, 'share_2'),
						score: scoring.share.share_2,
					},
				],
			},
			sell: {
				score: scoring.sell.score,
				label: 'Sell',
				label_long: 'Sell',
				subtitle: 'Who we sell your data to',
				content: [
					{
						label: texts.sell.sell_1.label,
						answers: utils.getWeDo(answers.sell_1, texts.sell.sell_1.options, answers.about_2),
						label_negative: '',
						score: scoring.sell.sell_1,
					},
					{
						label: texts.sell.sell_3.label,
						answers: utils.getWeDo(answers.sell_3, texts.sell.sell_3.options, answers.about_2),
						label_negative: '',
						score: scoring.sell.sell_3,
					},
				],
			},
			store: {
				score: scoring.store.score,
				label: 'Store',
				label_long: 'Store',
				subtitle: 'How we store your data',
				content: [
					{
						label: texts.store.store_1.label,
						answers: utils.getWeDo(answers.store_1, texts.store.store_1.options),
						label_negative: '',
						score: scoring.store.store_1,
					},
				],
			},
			encryption: {
				score: scoring.encryption.score,
				label: 'Encryption',
				label_long: 'Encryption',
				subtitle: 'How we encrypt your data',
				content: [
					{
						label: texts.encryption.encryption_1.label,
						answers: utils.getEncryption(answers, 'encryption_1'),
						label_negative: '',
						score: scoring.encryption.encryption_1,
					},
					{
						label: texts.encryption.encryption_3.label,
						answers: utils.getEncryption(answers, 'encryption_3'),
						label_negative: '',
						score: scoring.encryption.encryption_3,
					},
					{
						label: texts.encryption.encryption_5.label,
						answers: utils.getEncryption(answers, 'encryption_5'),
						label_negative: '',
						score: scoring.encryption.encryption_5,
					},
				],
			},
			privacy: {
				score: scoring.privacy.score,
				label: 'Privacy',
				label_long: 'Privacy',
				subtitle: 'How this technology accesses other data',
				content: [
					{
						label: texts.privacy.privacy_1.label,
						answers: utils.getPrivacy(answers, 'privacy_1'),
						label_negative: '',
						score: scoring.privacy.privacy_1,
					},
					{
						label: texts.privacy.privacy_2.label,
						answers: utils.getPrivacy(answers, 'privacy_2'),
						label_negative: '',
						score: scoring.privacy.privacy_2,
					},
				],
			},
			user_options: {
				score: scoring.useroptions.score,
				label: 'Options',
				label_long: 'User Options',
				subtitle: 'What you can do with the data that we collect',
				content: [
					{
						label: texts.user_options.user_options_1.label,
						answers: utils.getUserOptions(answers),
						label_negative: '',
						score: scoring.useroptions.useroptions_1,
					},
				],
			},
			deactivation: {
				score: scoring.deactivation.score,
				label: 'Deactivation',
				label_long: 'Deactivation',
				subtitle: 'What happens to your data when your account is deactivated',
				content: [
					{
						label: texts.deactivation.deactivation_1.label,
						answers: utils.getWeDo(answers.deactivation_1, texts.deactivation.deactivation_1.options),
						label_negative: '',
						score: scoring.deactivation.deactivation_1,
					},
				],
			},
		},
	};
};

const build = (answers, scoring) => {
	const data = getTemplateData(answers, scoring);
	const dots = dot.process({ path: './src/templates', });
	const template = dots.index(data);
	let output = '';
	fse.copy('./src/assets/images', './dist/images', (err) => {
		output = (err) ? `There was an error generating your files: \n${err}` : '';
	});
	fse.copy('./src/assets/js', './dist/js', (err) => {
		output = (err) ? `There was an error generating your files: \n${err}` : '';
	});
	fse.copy('./src/assets/scss', './dist/scss', (err) => {
		output = (err) ? `There was an error generating your files: \n${err}` : '';
	});
	fs.writeFile('./dist/index.html', template, 'utf-8', (error) => {
		output = (error) ? `There was an error generating your files: \n${err}` : '\nPrivacy Policy Snapshot successfuly generated! the files were saved to the /dist folder.';
		console.log(output); // eslint-disable-line no-console
	});
};

module.exports = build;
