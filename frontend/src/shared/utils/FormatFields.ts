
export const formatCnpj = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '').slice(0, 14);
    
    if (!onlyNumbers) return '';
    
    return onlyNumbers
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
        .replace(/\.(\d{3})(\d)/, '.$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
};

export const formatCep = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '').slice(0, 8); 

    if (onlyNumbers.length <= 5) return onlyNumbers;
    
    return onlyNumbers.replace(/^(\d{5})(\d{0,3})$/, '$1-$2');
}

export const formatTelefone = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, '').slice(0,11)

    if(onlyNumbers.length <=2 ){
        return onlyNumbers;
    }

    if(onlyNumbers.length <= 6){
        return `(${onlyNumbers.slice(0,2)}) ${onlyNumbers.slice(2)}`;
    }

    if(onlyNumbers.length <= 10){
        return `(${onlyNumbers.slice(0,2)})  ${onlyNumbers.slice(2, 6)}-${onlyNumbers.slice(6)}`
    }

    return `(${onlyNumbers.slice(0, 2)}) ${onlyNumbers.slice(2, 7)}-${onlyNumbers.slice(7)}`;
}     

import dayjs, { Dayjs } from "dayjs"

export const formatDate = (date: Dayjs | string | Date) => {
   console.log(date);
   const formatedDate =  dayjs(date).format('YYYY-MM-DD');
   return formatedDate;
};