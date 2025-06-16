import * as createSaida from './CreateSaidaProvider';
import * as getSaida from './GetSaidaProvider';
import * as count from './Count';

export const SaidaProvider = {
    ...createSaida,
    ...getSaida,
    ...count
}