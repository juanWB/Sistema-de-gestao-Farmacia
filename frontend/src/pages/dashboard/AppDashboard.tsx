import { FerramentasDeDetalhes } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts/LayoutBaseDePagina";


export const AppDashboard: React.FC = () => {
    return(
        <LayoutBaseDePagina titulo="Página inicial" barraDeFerramentas={<FerramentasDeDetalhes mostrarBotaoSalvarEFechar={true}/>}>
            Testando
        </LayoutBaseDePagina>
    );
}