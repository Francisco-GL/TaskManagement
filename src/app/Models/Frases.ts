
export interface Success {
    total: number;
}

export interface Quote {
    quote: string;
    length: string;
    author: string;
    tags: string[];
    category: string;
    language: string;
    date: string;
    permalink: string;
    id: string;
    background: string;
    title: string;
}

export interface Contents {
    quotes: Quote[];
}

export interface Copyright {
    year: number;
    url: string;
}

export interface FraseDiaI {
    success: Success;
    contents: Contents;
    baseurl: string;
    copyright: Copyright;
}

export interface QuotePeticion {
    Frase: string,
    Autor: string,
    Fecha: string,
    User: string,
    Motivo: string
};
