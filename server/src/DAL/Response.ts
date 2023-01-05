export class Response {
	public status: number;
	public message: string;
	public payload: any;

	constructor() {
		this.status = 500;
		this.message = '';
		this.payload = null;
	}

	set(status: number, message: string, payload: any) {
		this.status = status;
		this.message = message;
		this.payload = payload;
	}
}
