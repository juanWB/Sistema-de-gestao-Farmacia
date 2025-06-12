import * as createSaida from './CreateSaidaProvider'
import * as getSaida from './GetSaidaProvider'

export const SaidaProvider = {
    ...createSaida,
    ...getSaida
}