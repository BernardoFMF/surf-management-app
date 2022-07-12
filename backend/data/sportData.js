'use strict'

import error from '../utils/error.js'

const sportData = (db) => {
	const getSports = async () => {
		return await db.getSportsData()
	}
	
	const getSportById = async (id_) => {
		const sport = await db.getSportByIdData(id_)
		if (!sport) throw error(404, 'Sport does not exist', 'MESSAGE_CODE_30')
		return sport
	}
	
	const postSport = async (name_) => {
		return await db.postSportData(name_)
	}
	
	const updateSport = async (id_, is_deleted_, name_) => {
		await getSportById(id_)
		return await db.updateSportData(id_, is_deleted_, name_)
	}

	const deleteSport = async (id_) => {
		await getSportById(id_)
		return await db.deleteSportData(id_)
	}

	const GetUserSportTypes = async () => {
		return await db.getUserSportTypesData()
	}
	
	return {
		getSports, 
		getSportById, 
		postSport,
		updateSport,
		deleteSport,
		GetUserSportTypes
	}
}

export default sportData