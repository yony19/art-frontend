export interface Rol {
    id: number,
	clients_id: number,
	name: string,
	description: string,
	self_assign: boolean,
	level: number,
	enabled: boolean,
	visibled: boolean,
	locked: boolean,
}

