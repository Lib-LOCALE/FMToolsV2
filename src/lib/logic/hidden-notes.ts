// Types et données pour l'outil des notes cachées
// Basé sur les recherches de Kinito et DoctorDim
// Porté depuis https://github.com/Gilgiltsu/FMTools

export interface HiddenAttributes {
    professionalism: number | [number, number];
    pressure: number | [number, number];
    temperament: number | [number, number];
    ambition: number | [number, number];
    loyalty: number | [number, number];
    sportsmanship: number | [number, number];
    controversy: number | [number, number];
}

export interface PersonalityConfig {
    key: string;
    detMin?: number;
    detMax?: number;
    minPro?: number;
    midPro?: number;
    maxPro?: number;
    minPre?: number;
    midPre?: number;
    maxPre?: number;
    minTemp?: number;
    midTemp?: number;
    maxTemp?: number;
    minAmb?: number;
    midAmb?: number;
    maxAmb?: number;
    minFid?: number;
    midFid?: number;
    maxFid?: number;
    minFp?: number;
    midFp?: number;
    maxFp?: number;
    minPol?: number;
    midPol?: number;
    maxPol?: number;
    deter?: number[];
    cas?: number[];
}

export interface MediaConfig {
    key: string;
    minTemp?: number;
    midTemp?: number;
    maxTemp?: number;
    minPre?: number;
    maxPre?: number;
    minPro?: number;
    maxPro?: number;
    minFp?: number;
    maxFp?: number;
    minFid?: number;
    maxFid?: number;
    minPol?: number;
    maxPol?: number;
    med?: number[];
}

// Toutes les personnalités avec leurs configurations
export const PERSONALITIES: PersonalityConfig[] = [
    { key: 'Amb', detMax: 17, minAmb: 16, maxAmb: 19, minFid: 7, maxFid: 9, deter: [2], cas: [0, 1] },
    { key: 'AsAmb', detMax: 14, minAmb: 15, maxPro: 14, deter: [2, 3, 4, 5], cas: [0, 2, 5] },
    { key: 'AsDe', detMin: 15, detMax: 17, maxPro: 14, minFp: 5, maxPre: 16, cas: [0, 2, 3, 4, 5] },
    { key: 'AsFP', detMax: 14, maxPro: 14, minFp: 15, maxFid: 14, maxAmb: 14, deter: [1, 2, 3, 4], cas: [0, 5] },
    { key: 'AsLo', detMax: 14, minAmb: 6, maxAmb: 14, maxPro: 14, minFid: 15, deter: [1, 2, 3, 4, 5], cas: [0, 4, 5] },
    { key: 'AsPro', detMax: 14, minPro: 15, deter: [1, 3, 4, 5], cas: [1, 2, 3, 4, 5] },
    { key: 'CiMo', detMin: 14, minAmb: 12, minPro: 15, minFp: 15, minFid: 15, minPre: 14, minTemp: 15 },
    { key: 'Dec', detMax: 9, minPro: 2, maxPro: 4, minTemp: 5 },
    { key: 'Del', detMin: 11, detMax: 17, midFp: 1, cas: [0, 1, 2, 3] },
    { key: 'Det', detMin: 15, detMax: 17, minPro: 15, minFp: 5, maxPre: 16, cas: [1, 2, 3, 4, 5] },
    { key: 'Dev', detMin: 6, detMax: 17, minAmb: 6, maxAmb: 7, midFid: 20, deter: [2, 5], cas: [0, 1] },
    { key: 'Ef', detMin: 15, detMax: 17, minFp: 5, midPre: 20, deter: [1, 3, 4, 5], cas: [0, 1, 2, 3, 4] },
    { key: 'Enj', detMax: 17, maxPro: 17, minFp: 15, minPre: 15, minTemp: 10, deter: [1, 2, 4, 6], cas: [2, 3, 4] },
    { key: 'Ent', detMax: 17, minPro: 11, maxPro: 17, maxFp: 14, minPre: 15, minTemp: 10, deter: [1, 4, 5, 6], cas: [2, 3, 4] },
    { key: 'Eq', detMax: 14, maxAmb: 14, maxPro: 14, maxFp: 14, maxFid: 14, deter: [1, 2, 3, 5], cas: [0, 3, 5] },
    { key: 'Fac', detMax: 1, maxAmb: 9, minPro: 5, maxFp: 17, cas: [0, 1, 3] },
    { key: 'FaDe', detMin: 2, detMax: 5, maxAmb: 9, minPro: 5, maxFp: 17, cas: [0, 1, 3] },
    { key: 'FaCo', detMax: 9, minPro: 5, maxFp: 17, minPre: 2, maxPre: 3, deter: [1], cas: [0, 1, 2, 3, 4] },
    { key: 'FP', detMax: 9, minPro: 5, minFp: 18, maxFp: 19, cas: [0, 1, 2, 3] },
    { key: 'Fo', maxPro: 10, maxTemp: 4 },
    { key: 'Fri', detMax: 9, minPro: 5, maxFp: 17, midPre: 1, deter: [1], cas: [0, 1, 2, 3, 4] },
    { key: 'Ho', detMax: 9, minPro: 5, midFp: 20, cas: [0, 1, 2, 3] },
    { key: 'In', detMax: 9, minTemp: 5, midPro: 1 },
    { key: 'Jo', detMax: 17, maxPro: 10, maxFp: 14, minPre: 15, minTemp: 10, deter: [1, 2, 4, 5, 6], cas: [2, 3, 4] },
    { key: 'Le', minPro: 1 },
    { key: 'Lene', detMin: 20, minPro: 1 },
    { key: 'LeCh', minFp: 18, minTemp: 18 },
    { key: 'Lo', detMin: 6, detMax: 17, minAmb: 6, maxAmb: 7, minFid: 18, maxFid: 19, deter: [2, 5], cas: [0, 1] },
    { key: 'Me', detMax: 17, minAmb: 16, maxFid: 3, deter: [2], cas: [0, 1] },
    { key: 'Modpro', midPro: 20, minTemp: 10 },
    { key: 'Mot', detMin: 18, minAmb: 12 },
    { key: 'Ob', detMin: 18, maxAmb: 11 },
    { key: 'Per', detMin: 14, minAmb: 14, minPro: 14, maxTemp: 9 },
    { key: 'Pro', minPro: 18, minTemp: 10 },
    { key: 'Rea', detMin: 11, detMax: 17, minFp: 2, maxFp: 4, cas: [0, 1, 2, 3] },
    { key: 'Res', detMin: 15, detMax: 17, minFp: 5, minPre: 17, maxPre: 19, cas: [0, 1, 2, 3, 4] },
    { key: 'SAmb', detMax: 17, maxAmb: 5, minFid: 11, deter: [2], cas: [0, 1] },
    { key: 'TreAmb', detMax: 17, midAmb: 20, maxFid: 9, minFid: 7, deter: [2], cas: [0, 1] },
    { key: 'TreLoy', detMin: 6, detMax: 17, minAmb: 6, maxAmb: 7, midFid: 20, deter: [2, 5], cas: [0, 1] },
    { key: 'Vers', detMax: 17, minAmb: 16, minFid: 4, maxFid: 6, deter: [2], cas: [0, 1] }
];

// Médias compatibles par personnalité
export const PERSONALITY_MEDIA_MAP: Record<string, string[]> = {
    'Amb': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon'],
    'TreAmb': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon'],
    'Vers': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon'],
    'Me': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon'],
    'CiMo': ['', 'Equi', 'EvaImp', 'Imp', 'Re', 'Spo', 'SpoImp'],
    'AsAmb': ['', 'ApMe', 'ApMeCon', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Ir', 'IrCon', 'Spo', 'SpoCon', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'AsDe': ['', 'ApMe', 'ApMeCon', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Ir', 'IrCon', 'Spo', 'SpoCon', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Eq': ['', 'ApMe', 'ApMeCon', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Ir', 'IrCon', 'Spo', 'SpoCon', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'AsLo': ['', 'ApMe', 'ApMeCon', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Ir', 'IrCon', 'Spo', 'SpoCon', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'AsFP': ['', 'ApMe', 'ApMeIr', 'ApMeVer', 'Equi', 'Ir', 'Spo', 'SpoIr', 'SpoVer', 'Ver'],
    'Dec': ['', 'ApMe', 'ApMeCon', 'ApMeVer', 'ApMeVerCon', 'Equi', 'Spo', 'SpoCon', 'SpoVer', 'SpoVerCon', 'Ver'],
    'In': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeVer', 'ApMeVerCon', 'Equi', 'Imp', 'Spo', 'SpoCon', 'SpoImp', 'SpoVer', 'SpoVerCon', 'Ver'],
    'Jo': ['', 'ApMe', 'ApMeImp', 'Equi', 'Imp', 'Spo', 'SpoImp'],
    'FaCo': ['', 'ApMe', 'ApMeCon', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Fri': ['', 'ApMe', 'ApMeCon', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Enj': ['', 'ApMe', 'ApMeImp', 'Equi', 'Eva', 'EvaImp', 'EvaRes', 'Imp', 'Spo', 'SpoImp'],
    'Ent': ['', 'ApMe', 'ApMeImp', 'Equi', 'Eva', 'EvaImp', 'EvaRes', 'Imp', 'Spo', 'SpoImp'],
    'Modpro': ['', 'ApMe', 'ApMeImp', 'ApMeRe', 'Equi', 'Eva', 'EvaImp', 'EvaRes', 'Imp', 'Re', 'Spo', 'SpoImp'],
    'Pro': ['', 'ApMe', 'ApMeImp', 'ApMeRe', 'Equi', 'Eva', 'EvaImp', 'EvaRes', 'Imp', 'Re', 'Spo', 'SpoImp'],
    'SAmb': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'FP': ['', 'ApMe', 'ApMeImp', 'ApMeIr', 'ApMeRe', 'ApMeVer', 'Equi', 'Eva', 'EvaImp', 'EvaIr', 'EvaRes', 'EvaVer', 'Imp', 'Ir', 'Re', 'Spo', 'SpoImp', 'SpoIr', 'SpoVer', 'Ver'],
    'Ho': ['', 'ApMe', 'ApMeImp', 'ApMeIr', 'ApMeRe', 'ApMeVer', 'Equi', 'Eva', 'EvaImp', 'EvaIr', 'EvaRes', 'EvaVer', 'Imp', 'Ir', 'Re', 'Spo', 'SpoImp', 'SpoIr', 'SpoVer', 'Ver'],
    'Per': ['', 'ApMe', 'ApMeCon', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Fo': ['', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon', 'Ir', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver'],
    'Lo': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'TreLoy': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'AsPro': ['', 'ApMe', 'ApMeCon', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Del': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIrCon', 'ApMeRe', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIrCon', 'EvaRes', 'EvaVerCon', 'Imp', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIrCon', 'SpoVerCon', 'VerCon'],
    'Ef': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Dev': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Fac': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'FaDe': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Le': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Lene': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Mot': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Ob': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Rea': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIrCon', 'ApMeRe', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIrCon', 'EvaRes', 'EvaVerCon', 'Imp', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoImp', 'SpoIrCon', 'SpoVerCon', 'VerCon'],
    'Res': ['', 'ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaImp', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Imp', 'Ir', 'IrCon', 'Spo', 'SpoCon', 'SpoImp', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'Det': ['', 'ApMe', 'ApMeCon', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon', 'Con', 'Equi', 'Eva', 'EvaCon', 'EvaIr', 'EvaIrCon', 'EvaRes', 'EvaVer', 'EvaVerCon', 'Ir', 'IrCon', 'Re', 'Spo', 'SpoCon', 'SpoIr', 'SpoIrCon', 'SpoVer', 'SpoVerCon', 'Ver', 'VerCon'],
    'LeCh': ['', 'ApMe', 'ApMeImp', 'ApMeRe', 'Equi', 'Imp', 'Re', 'Spo', 'SpoImp']
};

// Tous les rapports médias
export const MEDIA_HANDLINGS: MediaConfig[] = [
    { key: 'ApMe', minTemp: 7, maxPol: 14, med: [1, 2, 3, 4] },
    { key: 'ApMeCon', midTemp: 7, maxPol: 14, maxFp: 7, med: [1] },
    { key: 'ApMeImp', minTemp: 15, maxPol: 14, minPre: 15 },
    { key: 'ApMeIr', maxTemp: 2, maxPol: 14, minFp: 8, minPro: 11, med: [1] },
    { key: 'ApMeIrCon', maxTemp: 2, maxPol: 14, maxFp: 7, minPro: 11, med: [1] },
    { key: 'ApMeRe', minPro: 15, minTemp: 7, maxPol: 5, maxPre: 14, maxFid: 10, med: [2, 3] },
    { key: 'ApMeVer', minTemp: 3, maxTemp: 6, maxPol: 14, minFp: 8, med: [1] },
    { key: 'ApMeVerCon', minTemp: 3, maxTemp: 6, maxPol: 14, maxFp: 7, med: [1] },
    { key: 'Con', midTemp: 7, maxFp: 7, maxPol: 14, minFid: 11, minPro: 13, med: [1] },
    { key: 'Equi', minTemp: 7, maxPol: 14, minFid: 11, med: [1, 2, 3, 4] },
    { key: 'Eva', minPro: 15, maxPol: 14, minPol: 6, minPre: 15, minTemp: 7, maxTemp: 15, med: [2, 3] },
    { key: 'EvaCon', minPro: 15, maxPol: 14, minPre: 15, midTemp: 7, maxFp: 7 },
    { key: 'EvaImp', minPro: 15, maxPol: 14, minPre: 15, midTemp: 15 },
    { key: 'EvaIr', minPro: 15, maxPol: 14, minPre: 15, maxTemp: 2, minFp: 8 },
    { key: 'EvaIrCon', minPro: 15, maxPol: 14, minPre: 15, maxTemp: 2, maxFp: 7 },
    { key: 'EvaRes', minPro: 15, maxPol: 5, minPre: 15, maxTemp: 15, minTemp: 7, med: [2, 3] },
    { key: 'EvaVer', minPro: 15, maxPol: 14, minPre: 15, maxTemp: 6, minTemp: 3, minFp: 8 },
    { key: 'EvaVerCon', minPro: 15, maxPol: 14, minPre: 15, maxTemp: 6, minTemp: 3, maxFp: 7 },
    { key: 'Imp', minPre: 15, minTemp: 15, minFid: 11, maxPol: 14 },
    { key: 'Ir', maxTemp: 2, minFid: 11, minPro: 11, maxPol: 14, minFp: 8, med: [1] },
    { key: 'IrCon', maxTemp: 2, maxFp: 7, minFid: 11, minPro: 13, maxPol: 14, med: [1] },
    { key: 'Re', minPro: 15, minTemp: 7, maxPol: 5, minFid: 11, med: [1, 2] },
    { key: 'Spo', minPol: 15, minTemp: 7, med: [2, 3] },
    { key: 'SpoCon', minPol: 15, maxFp: 7, midTemp: 7, med: [2, 3] },
    { key: 'SpoImp', minPol: 15, minPre: 15, minTemp: 15 },
    { key: 'SpoIr', minPol: 15, maxTemp: 2, minFp: 8, minPro: 11 },
    { key: 'SpoIrCon', minPol: 15, maxTemp: 2, maxFp: 7, minPro: 11 },
    { key: 'SpoVer', minPol: 15, maxTemp: 6, minTemp: 3, minFp: 8 },
    { key: 'SpoVerCon', minPol: 15, maxTemp: 6, minTemp: 3, maxFp: 7 },
    { key: 'Ver', maxTemp: 6, minTemp: 3, minFp: 8, maxPol: 14, minFid: 11, med: [1] },
    { key: 'VerCon', maxTemp: 6, minTemp: 3, maxFp: 7, maxPol: 14, minFid: 11, minPro: 13, med: [1] }
];

export interface PlayerProjects {
    shortTermPlaytime: boolean;
    longTermPlaytime: boolean;
    trophy: boolean;
    captain: boolean;
}

export interface CalculationResult {
    minPro: number; midPro: number | null; maxPro: number;
    minPre: number; midPre: number | null; maxPre: number;
    minTemp: number; midTemp: number | null; maxTemp: number;
    minAmb: number; midAmb: number | null; maxAmb: number;
    minFid: number; midFid: number | null; maxFid: number;
    minFp: number; midFp: number | null; maxFp: number;
    minPol: number; midPol: number | null; maxPol: number;
    detMin: number;
    detMax: number;
}

export interface VisibleProjects {
    shortTermPlaytime: boolean;
    longTermPlaytime: boolean;
    trophy: boolean;
    captain: boolean;
    anyVisible: boolean;
}

// Obtenir les médias compatibles pour une personnalité
export function getCompatibleMedia(personalityKey: string | null): string[] {
    if (!personalityKey || !PERSONALITY_MEDIA_MAP[personalityKey]) {
        return MEDIA_HANDLINGS.map(m => m.key);
    }
    return PERSONALITY_MEDIA_MAP[personalityKey];
}

// Fonction de calcul principale
export function calculateHiddenAttributes(
    personalityKey: string | null,
    mediaKey: string | null,
    determination: number
): CalculationResult {
    // Initialiser les valeurs par défaut
    const result: CalculationResult = {
        minPro: 1, midPro: null, maxPro: 20,
        minPre: 1, midPre: null, maxPre: 20,
        minTemp: 1, midTemp: null, maxTemp: 20,
        minAmb: 1, midAmb: null, maxAmb: 20,
        minFid: 1, midFid: null, maxFid: 20,
        minFp: 1, midFp: null, maxFp: 20,
        minPol: 1, midPol: null, maxPol: 20,
        detMin: 1,
        detMax: 20
    };

    // Appliquer la personnalité
    if (personalityKey) {
        const personality = PERSONALITIES.find(p => p.key === personalityKey);
        if (personality) {
            applyPersonality(result, personality, determination);
        }
    }

    // Appliquer le média
    if (mediaKey) {
        const media = MEDIA_HANDLINGS.find(m => m.key === mediaKey);
        if (media) {
            applyMedia(result, media);
        }
    }

    // Appliquer les ajustements
    applyAdjustments(result, personalityKey, mediaKey, determination);

    // Unifier les valeurs (si min == max, utiliser mid)
    unifyValues(result);

    return result;
}

function applyPersonality(result: CalculationResult, p: PersonalityConfig, det: number): void {
    if (p.detMin !== undefined) result.detMin = p.detMin;
    if (p.detMax !== undefined) result.detMax = p.detMax;
    if (p.minPro !== undefined) result.minPro = Math.max(result.minPro, p.minPro);
    if (p.midPro !== undefined) result.midPro = p.midPro;
    if (p.maxPro !== undefined) result.maxPro = Math.min(result.maxPro, p.maxPro);
    if (p.minPre !== undefined) result.minPre = Math.max(result.minPre, p.minPre);
    if (p.midPre !== undefined) result.midPre = p.midPre;
    if (p.maxPre !== undefined) result.maxPre = Math.min(result.maxPre, p.maxPre);
    if (p.minTemp !== undefined) result.minTemp = Math.max(result.minTemp, p.minTemp);
    if (p.midTemp !== undefined) result.midTemp = p.midTemp;
    if (p.maxTemp !== undefined) result.maxTemp = Math.min(result.maxTemp, p.maxTemp);
    if (p.minAmb !== undefined) result.minAmb = Math.max(result.minAmb, p.minAmb);
    if (p.midAmb !== undefined) result.midAmb = p.midAmb;
    if (p.maxAmb !== undefined) result.maxAmb = Math.min(result.maxAmb, p.maxAmb);
    if (p.minFid !== undefined) result.minFid = Math.max(result.minFid, p.minFid);
    if (p.midFid !== undefined) result.midFid = p.midFid;
    if (p.maxFid !== undefined) result.maxFid = Math.min(result.maxFid, p.maxFid);
    if (p.minFp !== undefined) result.minFp = Math.max(result.minFp, p.minFp);
    if (p.midFp !== undefined) result.midFp = p.midFp;
    if (p.maxFp !== undefined) result.maxFp = Math.min(result.maxFp, p.maxFp);
    if (p.minPol !== undefined) result.minPol = Math.max(result.minPol, p.minPol);
    if (p.midPol !== undefined) result.midPol = p.midPol;
    if (p.maxPol !== undefined) result.maxPol = Math.min(result.maxPol, p.maxPol);

    // Appliquer les contraintes deter
    if (p.deter) {
        for (const d of p.deter) {
            applyDeter(result, d, det);
        }
    }

    // Appliquer les contraintes cas
    if (p.cas) {
        for (const c of p.cas) {
            applyCas(result, c);
        }
    }
}

function applyMedia(result: CalculationResult, m: MediaConfig): void {
    if (m.minTemp !== undefined && result.minTemp < m.minTemp) result.minTemp = m.minTemp;
    if (m.midTemp !== undefined) result.midTemp = m.midTemp;
    if (m.maxTemp !== undefined && result.maxTemp > m.maxTemp) result.maxTemp = m.maxTemp;
    if (m.minPre !== undefined && result.minPre < m.minPre) result.minPre = m.minPre;
    if (m.maxPre !== undefined && result.maxPre > m.maxPre) result.maxPre = m.maxPre;
    if (m.minPro !== undefined && result.minPro < m.minPro) result.minPro = m.minPro;
    if (m.maxPro !== undefined && result.maxPro > m.maxPro) result.maxPro = m.maxPro;
    if (m.minFp !== undefined && result.minFp < m.minFp) result.minFp = m.minFp;
    if (m.maxFp !== undefined && result.maxFp > m.maxFp) result.maxFp = m.maxFp;
    if (m.minFid !== undefined && result.minFid < m.minFid) result.minFid = m.minFid;
    if (m.maxFid !== undefined && result.maxFid > m.maxFid) result.maxFid = m.maxFid;
    if (m.minPol !== undefined && result.minPol < m.minPol) result.minPol = m.minPol;
    if (m.maxPol !== undefined && result.maxPol > m.maxPol) result.maxPol = m.maxPol;

    if (m.med) {
        for (const md of m.med) {
            applyMed(result, md);
        }
    }
}

function applyDeter(result: CalculationResult, e: number, det: number): void {
    if (e === 1 && det <= 5 && result.minAmb < 10) result.minAmb = 10;
    if (e === 2 && det <= 9 && result.minPro < 5) result.minPro = 5;
    if (e === 3 && det <= 9 && result.minPre < 4) result.minPre = 4;
    if (e === 4 && det <= 9 && result.maxFp > 17) result.maxFp = 17;
    if (e === 5 && det >= 11 && result.minFp < 5) result.minFp = 5;
    if (e === 6 && det >= 15) { result.minPre = 15; result.maxPre = 16; }
}

function applyCas(result: CalculationResult, e: number): void {
    if (e === 0) {
        if (result.maxTemp < 5 && result.minPro < 11) result.minPro = 11;
        if (result.maxPro < 11 && result.minTemp < 5) result.minTemp = 5;
    }
    if (e === 1) {
        if (result.minPro > 17 && result.maxTemp > 9) result.maxTemp = 9;
        if (result.minTemp > 9 && result.maxPro > 17) result.maxPro = 17;
    }
    if (e === 2) {
        if (result.minAmb > 15 && result.minFid < 10) result.minFid = 10;
        if (result.maxFid < 10 && result.maxAmb > 15) result.maxAmb = 15;
    }
    if (e === 3) {
        if (result.maxAmb < 6 && result.maxFid > 10) result.maxFid = 10;
        if (result.minFid > 10 && result.minAmb < 6) result.minAmb = 6;
    }
    if (e === 4) {
        if (result.maxAmb < 8 && result.maxFid > 17) result.maxFid = 17;
        if (result.minFid > 17 && result.minAmb < 8) result.minAmb = 8;
    }
    if (e === 5) {
        if (result.minTemp > 9 && result.maxPre > 14) result.maxPre = 14;
        if (result.minPre > 14 && result.maxTemp > 9) result.maxTemp = 9;
    }
}

function applyMed(result: CalculationResult, e: number): void {
    if (e === 1) {
        if (result.minPre > 14 && result.maxPro > 14) result.maxPro = 14;
        if (result.minPro > 14 && result.maxPre > 14) result.maxPre = 14;
    }
    if (e === 2) {
        if (result.maxTemp < 8 && result.minFp < 8) result.minFp = 8;
        if (result.maxFp < 8 && result.minTemp < 8) result.minTemp = 8;
    }
    if (e === 3) {
        if (result.minTemp > 14 && result.maxPre > 14) result.maxPre = 14;
        if (result.minPre > 14 && result.maxTemp > 14) result.maxTemp = 14;
    }
    if (e === 4) {
        if (result.minPol > 14 && result.maxPro > 14) result.maxPro = 14;
        if (result.maxPol < 6 && result.maxPro > 14) result.maxPro = 14;
        if (result.minPro > 14 && result.minPol < 6) { result.minPol = 6; if (result.maxPol > 14) result.maxPol = 14; }
    }
    if (e === 5) {
        if (result.minFid > 10) {
            if (result.maxFp > 11) result.maxFp = 11;
            if (result.maxPro > 12) result.maxPro = 12;
        } else if (result.minFp > 11 && result.minPro > 12 && result.maxFid > 10) {
            result.maxFid = 10;
        }
    }
}

function applyAdjustments(result: CalculationResult, pKey: string | null, mKey: string | null, det: number): void {
    // Ajustements spécifiques par personnalité/média (simplifiés pour les cas les plus importants)
    // Note: La version complète inclut toutes les fonctions comme ambition(), mercenaire(), etc.

    if (!pKey || !mKey) return;

    // --- resistant() ---
    if (pKey === 'Res') {
        if (mKey === 'EvaImp') { if (result.maxPro > 17) result.maxPro = 17; }
        else if (mKey === 'EvaIrCon') { if (result.maxAmb > 13) result.maxAmb = 13; }
        else if (mKey === 'EvaCon') { if (result.maxAmb > 13) result.maxAmb = 13; }
        else if (mKey === 'EvaVerCon') { if (result.maxAmb > 13) result.maxAmb = 13; }
        else if (mKey === 'EvaVer') { if (result.maxAmb > 13) result.maxAmb = 13; }
        else if (mKey === 'EvaIr' && result.maxAmb > 13) { result.maxAmb = 13; }
    }

    // --- realist() ---
    if (pKey === 'Rea') {
        if (mKey === 'EvaImp') { if (result.maxPro > 17) result.maxPro = 17; }
        else if (mKey === 'Imp') { if (result.minPro < 13) result.minPro = 13; }
        else if (mKey === 'EvaIrCon' && det >= 14) { if (result.maxAmb > 13) result.maxAmb = 13; }
        else if (mKey === 'EvaCon' && det >= 14) { if (result.maxAmb > 13) result.maxAmb = 13; }
        else if (mKey === 'EvaVerCon' && det >= 14) { if (result.maxAmb > 13) result.maxAmb = 13; }
        else if (mKey === 'Equi' && result.minPro < 13) { result.minPro = 13; }
    }
    if (pKey === 'Del') {
        if (mKey === 'Imp') { if (result.minPro < 13) result.minPro = 13; }
        else if (mKey === 'Ir') { if (result.minPro < 13) result.minPro = 13; }
        else if (mKey === 'Ver') { if (result.minPro < 13) result.minPro = 13; }
        else if (mKey === 'Equi' && result.minPro < 13) { result.minPro = 13; }
    }

    // --- perfection() ---
    if (pKey === 'Per') {
        if (['ApMe', 'ApMeCon', 'ApMeIr', 'ApMeIrCon', 'ApMeRe', 'ApMeVer', 'ApMeVerCon'].includes(mKey)) {
            if (result.maxFid > 10) result.maxFid = 10;
        }
    }

    // --- motive() ---
    if (pKey === 'Mot') {
        if (['EvaCon', 'EvaIr', 'EvaIrCon', 'EvaVer', 'EvaVerCon'].includes(mKey)) {
            if (result.maxAmb > 13) result.maxAmb = 13;
        } else if (mKey === 'EvaImp') {
            if (result.maxPro > 17) result.maxPro = 17;
        }
    }
    if (pKey === 'Ob') {
        if (mKey === 'EvaImp' && result.maxPro > 17) result.maxPro = 17;
    }

    // --- modelepro() ---
    if (pKey === 'Modpro' || pKey === 'Pro') {
        if (mKey === 'ApMe') { if (result.maxFid > 10) result.maxFid = 10; }
        else if (mKey === 'ApMeImp') {
            if (result.maxFid > 10) result.maxFid = 10;
            if (result.minTemp < 16) result.minTemp = 16;
        }
        else if (mKey === 'Imp') { if (result.minTemp < 16) result.minTemp = 16; }
        else if (mKey === 'Equi') {
            if (result.maxPre > 14) result.maxPre = 14;
            if (result.minPol < 6) result.minPol = 6;
        }
    }

    // --- facil() ---
    if (pKey === 'Fac' || pKey === 'FaDe') {
        if (mKey === 'EvaImp' && result.maxPro > 17) result.maxPro = 17;
    }
    if (pKey === 'FP') {
        if (mKey === 'ApMe' || mKey === 'ApMeImp' || mKey === 'ApMeIr' || mKey === 'ApMeVer') {
            if (result.maxFid > 10) result.maxFid = 10;
        } else if (mKey === 'EvaImp' && result.maxPro > 17) result.maxPro = 17;
    }
    if (pKey === 'Ho') {
        if (mKey === 'ApMe' || mKey === 'ApMeImp' || mKey === 'ApMeIr' || mKey === 'ApMeVer') {
            if (result.maxFid > 10) result.maxFid = 10;
        } else if (mKey === 'EvaImp' && result.maxPro > 17) result.maxPro = 17;
    }

    // --- enjoue() ---
    if (pKey === 'Enj') {
        if (mKey === 'ApMe') {
            if (result.maxPro > 14) result.maxPro = 14;
            if (result.maxFid > 10) result.maxFid = 10;
        } else if (mKey === 'ApMeImp' && result.maxFid > 10) { result.maxFid = 10; }
    }

    // --- devoue() ---
    if (pKey === 'Dev' || pKey === 'SAmb') {
        // Liste des médias pour devoue()
        if (['ApMe', 'ApMeCon', 'ApMeImp', 'ApMeIr', 'ApMeIrCon', 'ApMeVer', 'ApMeVerCon'].includes(mKey)) {
            if (result.maxPro > 12) result.maxPro = 12;
            if (result.maxFp > 11) result.maxFp = 11;
        } else if (mKey === 'EvaImp') {
            if (result.maxPro > 17) result.maxPro = 17;
        }
    }

    // --- effronte() ---
    if (pKey === 'Ef') {
        if (['ApMeVer', 'ApMeIr', 'ApMeIrCon', 'ApMeVerCon', 'Con', 'Ir', 'IrCon', 'Ver', 'VerCon', 'ApMeCon'].includes(mKey)) {
            if (result.maxPro > 14) result.maxPro = 14;
        } else if (mKey === 'EvaImp') {
            if (result.maxPro > 17) result.maxPro = 17;
        } else if (mKey === 'Equi') {
            if (result.maxPro > 14) result.maxPro = 14;
            if (result.maxTemp > 14) result.maxTemp = 14;
        } else if (['EvaCon', 'EvaIr', 'EvaVer', 'EvaVerCon', 'EvaIrCon'].includes(mKey)) {
            if (result.maxAmb > 13) result.maxAmb = 13;
        }
    }

    // --- determine() ---
    if (pKey === 'Det') {
        const mediaGroup = ['Con', 'SpoIrCon', 'SpoVerCon', 'SpoCon', 'SpoIr', 'SpoVer', 'IrCon', 'VerCon', 'ApMeVer', 'ApMeIr', 'ApMeVerCon', 'ApMeIrCon', 'ApMeCon', 'Ir', 'Eva', 'EvaRes', 'EvaIr', 'EvaIrCon', 'EvaCon', 'EvaVerCon', 'EvaVer', 'Ver'];
        if (mediaGroup.includes(mKey)) {
            if (det >= 14 && result.maxAmb > 13) result.maxAmb = 13;
        }

        if (['ApMe', 'ApMeVer', 'ApMeIr', 'ApMeVerCon', 'ApMeIrCon', 'ApMeCon'].includes(mKey)) {
            if (result.maxFid > 10) result.maxFid = 10;
        }
    }

    // --- decontracte() ---
    if (pKey === 'Dec') {
        if (mKey === 'Equi' || mKey === 'Ver') {
            if (result.minFp < 12) result.minFp = 12;
        }
    }

    // --- deloyal() (déjà traité partiellement dans realist, complété ici) ---
    if (pKey === 'Del') {
        if (mKey === 'Equi' || mKey === 'ApMeRe' || mKey === 'EvaRes' || mKey === 'Eva' || mKey === 'Spo' || mKey === 'Re') {
            if (result.minTemp < 8) result.minTemp = 8;
        }
        if (['EvaCon', 'EvaIrCon', 'EvaVerCon'].includes(mKey)) {
            if (det >= 14 && result.maxAmb > 13) result.maxAmb = 13;
        }
        if (mKey === 'EvaImp' && result.maxPro > 17) result.maxPro = 17;
    }

    // --- ambition(), mercenaire(), tresambitieux(), versatile() ---
    // Ces 4 fonctions partagent une logique très similaire
    if (['Amb', 'Me', 'TreAmb', 'Vers'].includes(pKey)) {
        if (mKey === 'Eva') {
            if (det >= 14) {
                if (result.minTemp < 10) result.minTemp = 10;
                if (result.maxPro > 17) result.maxPro = 17;
            }
        } else if (mKey === 'ApMeRe' || mKey === 'EvaRes') {
            if (det >= 14) {
                if (result.minTemp < 10) result.minTemp = 10;
                if (result.maxPro > 17) result.maxPro = 17;
            }
        } else if (mKey === 'ApMeIr' || mKey === 'ApMeIrCon' || mKey === 'SpoIr' || mKey === 'SpoIrCon') {
            if (det >= 14) {
                if (result.minPro < 11) result.minPro = 11;
                if (result.maxPro > 13) result.maxPro = 13;
            }
        } else if (['ApMeVerCon', 'ApMeVer', 'ApMeCon', 'SpoVerCon', 'SpoVer', 'SpoCon'].includes(mKey)) {
            if (det >= 14 && result.maxPro > 13) result.maxPro = 13;
        } else if (mKey === 'EvaImp') {
            if (result.maxPro > 17) result.maxPro = 17;
        } else if (['EvaIr', 'EvaIrCon', 'EvaVer', 'EvaVerCon', 'EvaCon'].includes(mKey)) {
            // det.max = 13 restriction logic from user code: det.value > 13 => 13
            // here we cap detMax
            result.detMax = 13;
        }
    }

    // --- AssezAmb() ---
    if (pKey === 'AsAmb') {
        if (['Con', 'IrCon', 'VerCon'].includes(mKey)) {
            if (det >= 14) result.midPro = 13;
        } else if (['ApMeVer', 'ApMeIr', 'Ir', 'Ver', 'SpoIr', 'SpoVer', 'ApMeVerCon', 'ApMeIrCon', 'ApMeCon', 'SpoIrCon', 'SpoVerCon', 'SpoCon'].includes(mKey)) {
            if (det >= 14 && result.maxPro > 13) result.maxPro = 13;
        }
    }

    // --- pasperfection() ---
    if (pKey === 'AsPro') {
        const mediaGroup = ['Con', 'SpoIrCon', 'SpoVerCon', 'SpoCon', 'SpoIr', 'SpoVer', 'IrCon', 'VerCon', 'ApMeVer', 'ApMeIr', 'ApMeVerCon', 'ApMeIrCon', 'ApMeCon', 'Ir', 'Eva', 'EvaRes', 'EvaIr', 'EvaIrCon', 'EvaCon', 'EvaVerCon', 'EvaIrCon', 'EvaVer', 'Ver'];
        if (mediaGroup.includes(mKey)) {
            if (det >= 14 && result.maxAmb > 13) result.maxAmb = 13;
        }
    }

    // --- assezfp() ---
    if (pKey === 'AsFP') {
        if (['ApMe', 'ApMeIr', 'ApMeVer'].includes(mKey)) {
            if (result.maxFid > 10) result.maxFid = 10;
        }
    }

    // --- loyal() ---
    if (pKey === 'AsLo' || pKey === 'Lo' || pKey === 'TreLoy') {
        const mediaGroup = ['ApMe', 'ApMeIr', 'ApMeVer', 'ApMeIrCon', 'ApMeCon', 'ApMeVerCon'];
        if (mediaGroup.includes(mKey)) {
            if (result.maxPro > 12) result.maxPro = 12;
            if (result.maxFp > 11) result.maxFp = 11;
        }
        if (mKey === 'ApMeImp' && pKey !== 'AsLo') {
            // 'ApMeImp' applies to Lo and TreLoy only in the source loop logic?
            // Actually, looking closely at user code:
            // AsLo: ApMe ... ApMeVerCon (excludes ApMeImp)
            // Lo: ApMe ... ApMeVerCon AND ApMeImp AND EvaImp
            // TreLoy: Same as Lo
            if (pKey === 'Lo' || pKey === 'TreLoy') {
                if (result.maxPro > 12) result.maxPro = 12;
                if (result.maxFp > 11) result.maxFp = 11;
            }
        }
        if (mKey === 'EvaImp' && (pKey === 'Lo' || pKey === 'TreLoy')) {
            if (result.maxPro > 17) result.maxPro = 17;
        }
    }

    // --- citoyenmodele() ---
    if (pKey === 'CiMo') {
        if (mKey === 'Imp' || mKey === 'SpoImp') {
            if (result.minTemp < 16) result.minTemp = 16;
        }
    }

    // --- indololent() ---
    if (pKey === 'In' || pKey === 'Dec') {
        if (['Imp', 'Ir', 'Ver', 'Equi'].includes(mKey)) {
            if (result.minFp < 12) result.minFp = 12;
        }
    }

    // --- forteperso() / forteperso1() ---
    if (pKey === 'Fo') {
        result.minPro = 1; // forteperso()
        if (mKey === 'Ir' || mKey === 'Ver') { // forteperso1()
            if (result.minFp < 12) result.minFp = 12;
        }
    }
}

function unifyValues(result: CalculationResult): void {
    if (result.minPro === result.maxPro) { result.midPro = result.minPro; }
    if (result.minPre === result.maxPre) { result.midPre = result.minPre; }
    if (result.minTemp === result.maxTemp) { result.midTemp = result.minTemp; }
    if (result.minAmb === result.maxAmb) { result.midAmb = result.minAmb; }
    if (result.minFid === result.maxFid) { result.midFid = result.minFid; }
    if (result.minFp === result.maxFp) { result.midFp = result.minFp; }
    if (result.minPol === result.maxPol) { result.midPol = result.minPol; }
}

// Visibilité des projets
export function getVisibleProjects(result: CalculationResult, det: number): VisibleProjects {
    const shortTermPlaytime = result.maxAmb >= 14 && result.maxPre >= 14 && result.minAmb < 14;
    const longTermPlaytime = result.maxAmb >= 14 && result.minAmb < 14 && result.minPre < 14;
    const trophy = result.maxAmb >= 14 && det >= 14 && result.minAmb < 14;
    const captain = result.maxAmb >= 14 && result.maxFid >= 14 && result.minAmb < 14 && result.minFid < 14;

    return {
        shortTermPlaytime,
        longTermPlaytime,
        trophy,
        captain,
        anyVisible: shortTermPlaytime || longTermPlaytime || trophy || captain
    };
}

// Appliquer les projets
export function applyProjects(
    result: CalculationResult,
    projects: PlayerProjects
): { result: CalculationResult; minDetermination: number } {
    const newResult = { ...result };
    let minDetermination = result.detMin;

    if (projects.shortTermPlaytime) {
        newResult.minAmb = Math.max(newResult.minAmb, 14);
        newResult.minPre = Math.max(newResult.minPre, 14);
    }
    if (projects.longTermPlaytime) {
        newResult.minAmb = Math.max(newResult.minAmb, 14);
        newResult.maxPre = Math.min(newResult.maxPre, 13);
    }
    if (projects.trophy) {
        newResult.minAmb = Math.max(newResult.minAmb, 14);
        minDetermination = Math.max(minDetermination, 14);
    }
    if (projects.captain) {
        newResult.minAmb = Math.max(newResult.minAmb, 14);
        newResult.minFid = Math.max(newResult.minFid, 14);
    }

    unifyValues(newResult);
    return { result: newResult, minDetermination };
}

// Fonction utilitaire pour obtenir la couleur
export function getRangeColor(min: number, max: number, isControversy: boolean = false): 'success' | 'warning' | 'error' | 'neutral' {
    // Logique basée sur la fonction color() de référence
    // Si Controversy (Polémique):
    // min >= 10 -> Rouge (error)
    // max < 10 -> Vert (success)
    // Sinon:
    // min >= 10 -> Vert (success)
    // max < 10 -> Rouge (error)

    if (isControversy) {
        if (min >= 10) return 'error';
        if (max < 10) return 'success';
        return 'neutral';
    } else {
        if (min >= 10) return 'success';
        if (max < 10) return 'error';
        return 'neutral';
    }
}
