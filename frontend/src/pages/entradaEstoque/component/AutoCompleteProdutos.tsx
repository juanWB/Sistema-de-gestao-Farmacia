import { Autocomplete, CircularProgress, TextField } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useDebounce } from "../../../shared/hooks/UseDebounce";
import { produtoService } from "../../../shared/service/api/produtos/ProdutoService";
import { useField } from "@unform/core";

type TAutoCompleteOption = {
    id: number;
    label: string;
}

interface IAutoCompleteProdutosProps {
    isExternalLoading: boolean;
}

export const AutoCompleteProdutos: React.FC<IAutoCompleteProdutosProps> = ({ isExternalLoading }) => {
    const { fieldName, registerField, defaultValue, clearError, error } = useField('produto_id');

    const [opcoes, setOpcoes] = useState<TAutoCompleteOption[]>([]);
    const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);
    const [isLoading, setIsLoading] = useState(false);
    const [busca, setBusca] = useState('');

    const { debounce } = useDebounce();

    useEffect(() => {
        registerField({
            name: fieldName,
            getValue: () => selectedId,
            setValue: (_, newSelectedId) => setSelectedId(newSelectedId)
        })
    }, [registerField, fieldName, selectedId])

    useEffect(() => {
        setIsLoading(true)

        debounce(() => {

            produtoService.getAll(1, busca)
                .then((result) => {
                    setIsLoading(false);
                    if (result instanceof Error) {
                        alert("Erro de conexão");
                        return
                    } else {
                        console.log(result);
                        setOpcoes(result.data.map(result => ({ id: result.id, label: result.nome })));
                    }
                });
        });
    }, [busca, debounce]);

    const autoCompleteSelectedOption = useMemo(() => {
        if(!selectedId) return null;

        const selectedOption = opcoes.find(op => op.id === selectedId);
        if(!selectedId) return null;

        return selectedOption;
    }, [selectedId, opcoes])

    return (
        <Autocomplete
            options={opcoes}

            autoComplete

            openText="Abrir"
            closeText="Fechar"
            noOptionsText="Sem opções"
            loadingText="Carregando..."

            disablePortal

            value={autoCompleteSelectedOption}
            loading={isLoading}
            disabled={isExternalLoading}
            popupIcon={(isExternalLoading && isLoading) ? <CircularProgress size={28} /> : undefined}

            onInputChange={(_, newValue) => setBusca(newValue)}
            onChange={(_, newValue) => { setSelectedId(newValue?.id); setBusca(''); clearError(); }}

            renderInput={(params) => (
                <TextField
                    {...params}

                    label={'Produto'}
                    error={!!error}
                    helperText={error}
                />
            )}


        />
    )
}