import type { RouteInterface } from '$lib/server/interfaces/routeInterface';

import { RouteStatus } from '$lib/enums';

export function routeAnalytics(routes: RouteInterface[]) {
	let indivuals: any = [];
	let active: number, inProgress: number, completed: number, canceled: number, totalTime: number, div: number;
	active = inProgress = completed = canceled = totalTime = div = 0;
	routes.forEach((route) => {
		const routeStats: any = {};
		switch (route.routeStatus) {
			case RouteStatus.ACTIVE:
				active++;
				break;
			case RouteStatus.IN_PROGRESS:
				inProgress++;
				break;
			case RouteStatus.COMPLETED:
				completed++;
				break;
			case RouteStatus.CANCELED:
				canceled++;
				break;
		}
		routeStats['name'] = route.routeTitle;
		routeStats['time'] = route.endTime && route.startTime ? route.endTime - route.startTime : null;
		if (routeStats['time']) {
			totalTime += routeStats['time'];
		}
		indivuals.push(routeStats);
	});
	const routeAnalytics = {
		counts: { active, inProgress, completed, canceled },
		time: { total: totalTime, count: div },
		routes: { indivuals }
	};
	return routeAnalytics;
}
