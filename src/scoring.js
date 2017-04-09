const SCORE = {
	undef_risk: 0,
	no_risk: 1,
	mid_risk: 2,
	high_risk: 3,
};

const COLORS = {
	0: 'neutral',
	1: 'success',
	2: 'warning',
	3: 'danger',
};

const scores = {
	use: {
		use_1: {
			use_1_1: SCORE.no_risk,
			use_1_2: SCORE.high_risk,
			use_1_3: SCORE.mid_risk,
			use_1_4: SCORE.mid_risk,
			use_1_5: SCORE.high_risk,
			use_1_6: SCORE.high_risk,
		},
	},
	share: {
		share_1: {
			share_1_1: SCORE.mid_risk,
			share_1_2: SCORE.mid_risk,
			share_1_3: SCORE.mid_risk,
			share_1_4: SCORE.high_risk,
			share_1_5: SCORE.high_risk,
			share_1_6: SCORE.no_risk,
		},
		share_2: {
			share_2_1: SCORE.mid_risk,
			share_2_2: SCORE.mid_risk,
			share_2_3: SCORE.mid_risk,
			share_2_4: SCORE.high_risk,
			share_2_5: SCORE.high_risk,
			share_2_6: SCORE.no_risk,
		},
	},
	sell: {
		sell_1: {
			sell_1_1: SCORE.high_risk,
			sell_1_2: SCORE.mid_risk,
			sell_1_3: SCORE.no_risk,
		},
		sell_3: {
			sell_3_1: SCORE.high_risk,
			sell_3_2: SCORE.mid_risk,
			sell_3_3: SCORE.no_risk,
		},
	},
	store: {
		store_1: {
			store_1_1: SCORE.no_risk,
			store_1_2: SCORE.mid_risk,
			store_1_3: SCORE.undef_risk,
		},
	},
	encryption: {
		encryption_1: {
			encryption_1_1: SCORE.no_risk,
			encryption_1_2: SCORE.mid_risk,
			encryption_1_3: SCORE.high_risk,
			encryption_1_4: SCORE.undef_risk,
		},
		encryption_3: {
			encryption_3_1: SCORE.no_risk,
			encryption_3_2: SCORE.mid_risk,
			encryption_3_3: SCORE.high_risk,
			encryption_3_4: SCORE.undef_risk,
		},
		encryption_5: {
			encryption_5_1: SCORE.no_risk,
			encryption_5_2: SCORE.mid_risk,
			encryption_5_3: SCORE.high_risk,
			encryption_5_4: SCORE.undef_risk,
		},
	},
	privacy: {
		privacy_1: {
			privacy_1_1: SCORE.mid_risk,
			privacy_1_2: SCORE.no_risk,
		},
		privacy_2: {
			privacy_2_1: SCORE.high_risk,
			privacy_2_2: SCORE.mid_risk,
			privacy_2_3: SCORE.no_risk,
		},
		privacy_1_options: {
			privacy_1_options_1: SCORE.mid_risk,
			privacy_1_options_2: SCORE.mid_risk,
			privacy_1_options_3: SCORE.mid_risk,
			privacy_1_options_4: SCORE.mid_risk,
		},
	},
	useroptions: {
		useroptions_1: {
			useroptions_1_1: SCORE.no_risk,
			useroptions_1_2: SCORE.high_risk,
		},
		useroptions_1_options: {
			useroptions_1_options_1: SCORE.no_risk,
			useroptions_1_options_2: SCORE.no_risk,
			useroptions_1_options_3: SCORE.no_risk,
			useroptions_1_options_5: SCORE.no_risk,
		},
	},
	deactivation: {
		deactivation_1: {
			deactivation_1_1: SCORE.no_risk,
			deactivation_1_2: SCORE.mid_risk,
			deactivation_1_3: SCORE.high_risk,
			deactivation_1_4: SCORE.mid_risk,
		},
	},
	policychanges: {
		policychanges_1: SCORE.undef_risk,
	},
	breach: {
		breach_1: SCORE.undef_risk,
	},
};

const results = {
	use: {},
	share: {},
	sell: {},
	store: {},
	encryption: {},
	privacy: {},
	useroptions: {},
	deactivation: {},
	policychanges: {},
	breach: {},
};

const getScore = (answers) => {
	Object.keys(answers).map((question) => {
		let questionScore = 0;
		const answer = answers[ question ];
		const category = question.split('_')[ 0 ];
		if (results[ category ]) {
			if (answer.constructor === Array) {
				let score = 0;
				answer.map((option) => {
					score = scores[ category ][ question ][ option ];
					if (score > questionScore) {
						questionScore = score;
					}
				});
				results[ category ].score = COLORS[ questionScore / answers.length ];
			} else if (scores[ category ][ question ]) {
				questionScore = scores[ category ][ question ][ answer ];
			}
			results[ category ][ question ] = COLORS[ questionScore ];
			results[ category ].score = COLORS[ questionScore ];
		}
	});
	return results;
};

module.exports = getScore;
