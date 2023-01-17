export interface LogInterface {
	id?: number;
	userId: number;
	logName: string;
	logDescription: string;
	logSource: string;
	logStatus: number;
	createdOn: Date;
	updatedOn: Date;
	deleted: boolean;
}