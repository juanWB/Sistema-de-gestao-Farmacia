import * as createSaida from './CreateSaidaProvider';
import * as getSaida from './GetSaidaProvider';
import * as getSaidaById from './GetSaidaByIdProvider';
import * as deleteSaida from './DeleteSaidaEstoqueProvider';
import * as updateSaida from './UpdateSaidaProvider';
import * as count from './Count';

export const SaidaProvider = {
    ...updateSaida,
    ...deleteSaida,
    ...getSaidaById,
    ...createSaida,
    ...getSaida,
    ...count
}