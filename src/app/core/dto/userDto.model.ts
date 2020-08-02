export class UserDto {
    public id: number;
    public verified: boolean;
    public enable: boolean;
    public created_by: Date;
    public persons_id: number;
    public name: string;
    public lastname: string;
    public gender: string;
    public email: string;
    public phone: string;
    public avatar_url: string;
    public locked: boolean;
    public visible: boolean;
    public password: string;
    public clients_id: number;
    public roles_id: number;
}