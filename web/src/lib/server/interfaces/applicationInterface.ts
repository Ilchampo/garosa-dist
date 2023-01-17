export interface ApplicationInterface {
	id?: number;
	language: string;
	maxRadius: number;
	maxPointsPerRoute: number;
	createdOn: Date;
	updatedOn: Date;
	deleted: boolean;
}