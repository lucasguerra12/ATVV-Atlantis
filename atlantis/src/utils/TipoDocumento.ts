export const TipoDocumento = {
    CPF: 'Cadastro de Pessoas Físicas',
    RG: 'Registro Geral',
    Passaporte: 'Passaporte'
} as const;

export type TipoDocumento = typeof TipoDocumento[keyof typeof TipoDocumento];