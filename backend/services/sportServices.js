'use strict'

import error from '../utils/error.js'

const getSportsServices = async () => {
	return await db.getSports()
}

const getSportsByIdServices = async (sid) => {
	if(!sid) throw error(400, 'Parameter not found: sid')
	return await db.getSportsById(sid)
}

const postSportServices = async (name) => {
	if(!name) throw error(400, 'Parameter not found: name')
	return await db.postSport(name)
}

const deleteSportServices = async (sid) => {
	if(!sid) throw error(400, 'Parameter not found: sid')
	return await db.deleteSport(sid)
}

export {getSportsServices, getSportsByIdServices, postSportServices, deleteSportServices}