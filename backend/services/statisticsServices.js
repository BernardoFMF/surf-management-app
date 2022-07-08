'use strict'

import error from '../utils/error.js'
import statisticsData from '../data/statisticsData.js'

const statisticsServices = (db) => {
	const data = statisticsData(db)

	const getStatisticsServices = async () => {
		return await data.getStatistics()
	}
	return {
		getStatisticsServices
	}
}

export default statisticsServices