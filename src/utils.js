const Texts = require('./texts');

const getWeDo = (answers, texts, service) => {
	const selected = [];
	if (answers.constructor === Array) {
		answers.map((option) => {
			selected.push(texts[ option ].replace('[service]', service));
		});
	} else {
		selected.push(texts[ answers ].replace('[service]', service));
	}
	return selected;
};

const getWeDoNot = (answers, texts, service = '') => {
	const selected = Object.keys(texts);
	const statements = [];
	if (answers.constructor === Array) {
		answers.map((option) => {
			const item = selected.indexOf(option);
			if (item !== -1) {
				selected.splice(item, 1);
			}
		});
	} else {
		const item = selected.indexOf(answers);
		if (item !== -1) {
			selected.splice(item, 1);
		}
	}
	selected.map((text) => {
		statements.push(texts[ text ]);
	});
	return statements.join(', ').replace('[service]', service);
};

const getUse = (answers) => {
	const selected = [];
	answers.use_1.map((option) => {
		if (option === 'use_1_6') {
			selected.push(answers.use_1_other);
		} else {
			selected.push(Texts.use.use_1.options[ option ].replace('[service]', answers.about_2));
		}
	});
	return selected;
};

const getNotUse = (answers) => {
	const statements = [];
	const selected = Object.keys(Texts.use.use_1.options);
	if (answers.use_1.length >= 5) {
		return '';
	}
	answers.use_1.map((option) => {
		const item = selected.indexOf(option);
		if (item !== -1) {
			selected.splice(item, 1);
		}
	});
	selected.map((text) => {
		statements.push(Texts.use.use_1.options[ text ]);
	});
	return `${Texts.use.use_1.label_negative} ${statements.join(', ').replace('[service]', answers.about_2)}`;
};

const getShare = (answers, prefix) => {
	const selected = [];
	answers[ prefix ].map((option) => {
		if (option === `${prefix}_6`) {
			selected.push(Texts.share[ prefix ].label_negative);
		} else if (option === `${prefix}_5`) {
			selected.push(answers[ `${prefix}_other` ]);
		} else if (answers[ `${prefix}` ].indexOf(`${prefix}_6`) === -1) {
			selected.push(Texts.share[ prefix ].options[ option ].replace('[service]', answers.about_2));
		}
	});
	return selected;
};

const getShareLabel = (answers, prefix) => {
	let label = Texts.share[ prefix ].label;
	answers[ prefix ].map((option) => {
		if (option === `${prefix}_6`) {
			label = '';
		}
	});
	return label;
};

const getNotShare = (answers, prefix) => {
	const statements = [];
	const selected = Object.keys(Texts.share[ prefix ].options);
	if (answers[ prefix ].length >= 4 || answers[ prefix ].indexOf(`${prefix}_6`) !== -1) {
		return '';
	}
	answers[ prefix ].map((option) => {
		const item = selected.indexOf(option);
		if (item !== -1) {
			selected.splice(item, 1);
		}
	});
	selected.map((text) => {
		statements.push(Texts.share[ prefix ].options[ text ].replace('[service]', answers.about_2));
	});
	return `${Texts.share[ prefix ].label_negative} ${statements.join(', ').replace('[service]', answers.about_2)}`;
};

const getEncryption = (answers, prefix) => {
	const selected = [];
	if (answers[ prefix ] === `${prefix}_2`) {
		let link = '';
		if (prefix === 'encryption_1') {
			link = answers.encryption_2;
		} else if (prefix === 'encryption_3') {
			link = answers.encryption_4;
		} else {
			link = answers.encryption_6;
		}
		selected.push(Texts.encryption[ prefix ].options[ `${prefix}_2` ].replace('[how]', link));
	} else {
		selected.push(Texts.encryption[ prefix ].options[ answers[ prefix ] ]);
	}
	return selected;
};

const getPrivacy = (answers, prefix) => {
	const selected = [];
	let link = '';
	if (answers[ prefix ] === 'privacy_1_1' || answers[ prefix ] === 'privacy_2_1' || answers[ prefix ] === 'privacy_2_2') {
		if (answers[ prefix ] === 'privacy_1_1') {
			let connects = '';
			if (answers.privacy_1_options === 'privacy_1_options_7') {
				connects = `Other. <a href="${answers.privacy_1_options_7_other}" target="_blank">Here</a> is how you can check your settings, including permissions set as a default.
`;
			} else {
				const statements = [];
				answers.privacy_1_options.map((option) => {
					statements.push(Texts.privacy.privacy_1_options[ option ]);
				});
				connects = statements.join(', ');
			}
			selected.push(Texts.privacy.privacy_1.options.privacy_1_1.replace('[connects]', connects));
		} else if (answers[ prefix ] === 'privacy_2_1') {
			link = answers.privacy_3;
			selected.push(Texts.privacy.privacy_2.options.privacy_2_1.replace('[here]', link));
		} else {
			link = answers.privacy_4;
			selected.push(Texts.privacy.privacy_2.options.privacy_2_2.replace('[here]', link));
		}
	} else {
		selected.push(Texts.privacy[ prefix ].options[ answers[ prefix ] ]);
	}
	return selected;
};

const getUserOptions = (answers) => {
	const selected = [];
	if (answers.useroptions_1 === 'useroptions_1_1') {
		const statements = [];
		const link = answers.useroptions_1_options_1_1;
		answers.useroptions_1_options.map((option) => {
			statements.push(Texts.user_options.user_options_1_options[ option ]);
		});
		const actions = statements.join(', ');
		const text = Texts.user_options.user_options_1.options.user_options_1_1.replace('[here]', link);
		selected.push(text.replace('[actions]', actions));
	} else {
		selected.push(Texts.user_options.user_options_1.options.user_options_1_2);
	}
	return selected;
};

module.exports = {
	getWeDo,
	getWeDoNot,
	getUse,
	getNotUse,
	getShare,
	getNotShare,
	getShareLabel,
	getEncryption,
	getPrivacy,
	getUserOptions,
};
