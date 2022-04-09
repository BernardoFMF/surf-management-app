'use strict'

import error from '../utils/error.js'

const sportData = (db) => {
	const getSports = async () => {
		return db.getSportsData()
	}
	
	const getSportById = async (id_) => {
		const sport = db.getSportByIdData(id_)
		if (!sport) throw error(404, 'Sport does not exist')
		return sport
	}
	
	const postSport = async (name_) => {
		return db.postSportData(name_)
	}
	
	const deleteSport = async (id_) => {
		await getSportById(id_)
		return db.deleteSportData(id_)
	}

	return {
		getSports, 
		getSportById, 
		postSport, 
		deleteSport
	}
}

export default sportData