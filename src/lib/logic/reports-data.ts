// Données statiques pour l'outil "Comprendre les Rapports"
// Basé sur les valeurs de Football Manager

export interface ReportEntry {
    textKey: string;
    range: [number, number];
    indicator: 'positive' | 'neutral' | 'negative';
}

export interface ReportCategory {
    key: string;
    entries: ReportEntry[];
}

export const REPORT_CATEGORIES: ReportCategory[] = [
    {
        key: 'adaptability',
        entries: [
            { textKey: 'no_issues', range: [18, 20], indicator: 'positive' },
            { textKey: 'adapt_easily', range: [15, 17], indicator: 'positive' },
            { textKey: 'fairly_well', range: [12, 14], indicator: 'neutral' },
            { textKey: 'no_info', range: [10, 11], indicator: 'neutral' },
            { textKey: 'little_problems', range: [7, 9], indicator: 'negative' },
            { textKey: 'problems', range: [4, 6], indicator: 'negative' },
            { textKey: 'difficulties', range: [1, 3], indicator: 'negative' }
        ]
    },
    {
        key: 'consistency',
        entries: [
            { textKey: 'very_consistent', range: [18, 20], indicator: 'positive' },
            { textKey: 'consistent', range: [15, 17], indicator: 'positive' },
            { textKey: 'fairly_consistent', range: [12, 14], indicator: 'neutral' },
            { textKey: 'no_info', range: [10, 11], indicator: 'neutral' },
            { textKey: 'fairly_inconsistent', range: [7, 9], indicator: 'negative' },
            { textKey: 'inconsistent', range: [4, 6], indicator: 'negative' },
            { textKey: 'very_inconsistent', range: [1, 3], indicator: 'negative' }
        ]
    },
    {
        key: 'big_matches',
        entries: [
            { textKey: 'thrives', range: [18, 20], indicator: 'positive' },
            { textKey: 'relishes', range: [15, 17], indicator: 'positive' },
            { textKey: 'enjoys', range: [12, 14], indicator: 'neutral' },
            { textKey: 'no_info', range: [10, 11], indicator: 'neutral' },
            { textKey: 'doesnt_enjoy', range: [7, 9], indicator: 'negative' },
            { textKey: 'uncomfortable', range: [4, 6], indicator: 'negative' },
            { textKey: 'dreads', range: [1, 3], indicator: 'negative' }
        ]
    },
    {
        key: 'injury',
        entries: [
            { textKey: 'real_problems', range: [18, 20], indicator: 'negative' },
            { textKey: 'might_problems', range: [15, 17], indicator: 'negative' },
            { textKey: 'fairly_susceptible', range: [12, 14], indicator: 'negative' },
            { textKey: 'no_info', range: [1, 11], indicator: 'neutral' }
        ]
    },
    {
        key: 'dirtiness',
        entries: [
            { textKey: 'often', range: [18, 20], indicator: 'negative' },
            { textKey: 'sometimes', range: [15, 17], indicator: 'negative' },
            { textKey: 'occasionally', range: [12, 14], indicator: 'negative' },
            { textKey: 'no_info', range: [1, 11], indicator: 'neutral' }
        ]
    },
    {
        key: 'individual_training',
        entries: [
            { textKey: 'exceptional_improvement', range: [18, 20], indicator: 'positive' },
            { textKey: 'great_improvement', range: [15, 17], indicator: 'positive' },
            { textKey: 'good_improvement', range: [12, 14], indicator: 'positive' },
            { textKey: 'average_improvement', range: [10, 11], indicator: 'neutral' },
            { textKey: 'little_improvement', range: [7, 9], indicator: 'negative' },
            { textKey: 'struggling', range: [4, 6], indicator: 'negative' },
            { textKey: 'no_improvement', range: [1, 3], indicator: 'negative' }
        ]
    }
];

// ========== EFFETS SUR LES NOTES CACHÉES ==========
// Ces événements sont liés à la hiérarchie de vestiaire et aux leaders d'équipe

export interface TrainingEffect {
    messageKey: string;
    causeKey: string;
    consequenceKey: string;
    type: 'positive' | 'negative' | 'neutral';
}

export const TRAINING_EFFECTS: {
    positive: TrainingEffect[];
    negative: TrainingEffect[];
    neutral: TrainingEffect[];
} = {
    positive: [
        {
            messageKey: 'coaching_positive',
            causeKey: 'coaching',
            consequenceKey: 'plus_one_hidden',
            type: 'positive'
        },
        {
            messageKey: 'team_spirit_positive',
            causeKey: 'team_hierarchy',
            consequenceKey: 'plus_one_hidden',
            type: 'positive'
        },
        {
            messageKey: 'welcome_positive',
            causeKey: 'club_welcome',
            consequenceKey: 'plus_one_hidden',
            type: 'positive'
        },
        {
            messageKey: 'playtime_positive',
            causeKey: 'playtime',
            consequenceKey: 'plus_one_prof_temp',
            type: 'positive'
        }
    ],
    negative: [
        {
            messageKey: 'coaching_negative',
            causeKey: 'coaching',
            consequenceKey: 'minus_one_hidden',
            type: 'negative'
        },
        {
            messageKey: 'team_spirit_negative',
            causeKey: 'team_hierarchy',
            consequenceKey: 'minus_one_hidden',
            type: 'negative'
        },
        {
            messageKey: 'welcome_negative',
            causeKey: 'club_welcome',
            consequenceKey: 'minus_one_hidden',
            type: 'negative'
        },
        {
            messageKey: 'contract_complacency',
            causeKey: 'new_contract',
            consequenceKey: 'minus_two_to_five',
            type: 'negative'
        },
        {
            messageKey: 'success_complacency',
            causeKey: 'team_results',
            consequenceKey: 'minus_two_to_five_prof_amb',
            type: 'negative'
        }
    ],
    neutral: [
        {
            messageKey: 'higher_level_experience',
            causeKey: 'playtime',
            consequenceKey: 'no_effect',
            type: 'neutral'
        }
    ]
};

