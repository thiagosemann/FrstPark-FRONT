export interface User {
    id: number,
    first_name: string;
    last_name: string;
    cpf: string;
    email: string;
    data_nasc?: Date;
    telefone?: string;
    building_id: number;
    credito?: string;
    password: string;
    token:string;
    building_name: string;
    apt_name:string;
    role:string;
    create_time?:string;
    valorTotal?:number;
    isEditing?: boolean ; // Add the isEditing property here
    editValue?: string;
    [key: string]: any; // Índice para acessar propriedades com base em uma string

  }