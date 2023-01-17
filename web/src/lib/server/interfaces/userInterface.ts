export interface UserInterface {
	id?: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	createdOn: Date;
	updatedOn: Date;
	deleted: boolean;
}