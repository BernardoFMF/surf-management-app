'use strict'

import error from '../utils/error.js'
import sportData from '../data/sportData.js'

const sportServices = (db) => {
	const data = sportData(db)

	const getSportsServices = async () => {
		return await data.getSports()
	}
	
	const getSportByIdServices = async (sid) => {
		if(!sid) throw error(400, 'Parameter not found: sid', 'MESSAGE_CODE_14')
		return await data.getSportById(sid)
	}
	
	const postSportServices = async (name) => {
		if(!name) throw error(400, 'Parameter not found: name', 'MESSAGE_CODE_14')
		return await data.postSport(name)
	}

	const updateSportServices = async (sid, is_deleted, name) => {
		if(!sid) throw error(400, 'Parameter not found: sid', 'MESSAGE_CODE_14')
		if(is_deleted == undefined) throw error(400, 'Parameter not found: is_deleted', 'MESSAGE_CODE_14')
		if(!name) throw error(400, 'Parameter not found: name', 'MESSAGE_CODE_14')
		return await data.updateSport(sid, is_deleted, name)
	}

	const deleteSportServices = async (sid) => {
		if(!sid) throw error(400, 'Parameter not found: sid', 'MESSAGE_CODE_14')
		return await data.deleteSport(sid)
	}


	const GetUserSportsTypesServices = async () => {
		return await data.GetUserSportTypes()
	}

	return {
		getSportsServices, 
		getSportByIdServices, 
		postSportServices,
		updateSportServices, 
		deleteSportServices,
		GetUserSportsTypesServices
	}
}

export default sportServices