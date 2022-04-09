'use strict'

import error from '../utils/error.js'
import sportData from '../data/sportData.js'

const sportServices = (db) => {
	const data = sportData(db)

	const getSportsServices = async () => {
		return await data.getSports()
	}
	
	const getSportByIdServices = async (sid) => {
		if(!sid) throw error(400, 'Parameter not found: sid')
		return await data.getSportById(sid)
	}
	
	const postSportServices = async (name) => {
		if(!name) throw error(400, 'Parameter not found: name')
		return await data.postSport(name)
	}
	
	const deleteSportServices = async (sid) => {
		if(!sid) throw error(400, 'Parameter not found: sid')
		return await data.deleteSport(sid)
	}

	return {
		getSportsServices, 
		getSportByIdServices, 
		postSportServices, 
		deleteSportServices
	}
}

export default sportServices