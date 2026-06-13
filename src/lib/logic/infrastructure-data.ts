export interface InfrastructureLevel {
    key: string;
    range: [number, number];
}

export interface InfrastructureCategory {
    key: string;
    icon: string;
    levels: InfrastructureLevel[];
}

export const INFRASTRUCTURE_CATEGORIES: InfrastructureCategory[] = [
    {
        key: 'training_center',
        icon: '🏋️',
        levels: [
            { key: 'state_of_the_art', range: [20, 20] }, // Ultramoderne
            { key: 'superb', range: [18, 19] },           // Superbe
            { key: 'excellent', range: [16, 17] },        // Excellent
            { key: 'very_good', range: [14, 15] },        // Très bon
            { key: 'good', range: [12, 13] },             // Bon
            { key: 'adequate', range: [10, 11] },         // Correct
            { key: 'average', range: [8, 9] },            // Moyen
            { key: 'basic', range: [6, 7] },              // Basique
            { key: 'mediocre', range: [4, 5] },           // Médiocre
            { key: 'poor', range: [2, 3] },               // Mauvais
            { key: 'very_poor', range: [1, 1] }           // Très mauvais
        ]
    },
    {
        key: 'facilities',
        icon: '🏟️',
        levels: [
            { key: 'state_of_the_art', range: [20, 20] },
            { key: 'superb', range: [18, 19] },
            { key: 'excellent', range: [16, 17] },
            { key: 'very_good', range: [14, 15] },
            { key: 'good', range: [12, 13] },
            { key: 'adequate', range: [10, 11] },
            { key: 'average', range: [8, 9] },
            { key: 'basic', range: [6, 7] },
            { key: 'mediocre', range: [4, 5] },
            { key: 'poor', range: [2, 3] },
            { key: 'very_poor', range: [1, 1] }
        ]
    },
    {
        key: 'coaching',
        icon: '📋',
        levels: [
            { key: 'legendary', range: [20, 20] },
            { key: 'exceptional', range: [18, 19] },
            { key: 'excellent', range: [16, 17] },
            { key: 'very_good', range: [14, 15] },
            { key: 'good', range: [12, 13] },
            { key: 'adequate', range: [10, 11] },
            { key: 'average', range: [8, 9] },
            { key: 'developmental', range: [6, 7] }, // En développement
            { key: 'weak', range: [4, 5] },
            { key: 'very_weak', range: [2, 3] },
            { key: 'non_existent', range: [1, 1] }
        ]
    },
    {
        key: 'youth_recruitment',
        icon: '🌱',
        levels: [
            { key: 'exceptional', range: [20, 20] },
            { key: 'excellent', range: [18, 19] },
            { key: 'very_good', range: [16, 17] },
            { key: 'good', range: [14, 15] },
            { key: 'above_average', range: [12, 13] }, // Au-dessus de la moyenne
            { key: 'average', range: [10, 11] },       // Moyen
            { key: 'below_average', range: [8, 9] },   // En dessous de la moyenne
            { key: 'weak', range: [6, 7] },            // Faible
            { key: 'very_weak', range: [4, 5] },       // Très faible
            { key: 'poor', range: [2, 3] },            // Mauvais
            { key: 'non_existent', range: [1, 1] }     // Inexistant
        ]
    }
];
