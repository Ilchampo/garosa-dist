export enum LogStatus {
	FAILED = 0,
	SUCCESSS = 1,
}

export enum RoutePointStatus {
	ASSIGNED = 0,
	IN_PROGRESS = 1,
	FINISHED = 2,
	CANCELED = 3,
}

export enum RouteStatus {
	ACTIVE = 0,
	IN_PROGRESS = 1,
	COMPLETED = 2,
	DELETED = 3,
	CANCELED = 4,
}

export enum Roles {
	INVALID = 0,
	ADMINISTRATOR = 1,
	SUPERVISOR = 2,
	DISTRIBUTOR = 3,
	MASTER = 4,
}
