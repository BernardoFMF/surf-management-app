'use strict'

import error from '../utils/error.js'

const statisticsData = (db) => {
	const getStatistics = async () => {
		return await db.getStatisticsData()
	}
	
	return {
		getStatistics
	}
}

export default statisticsData