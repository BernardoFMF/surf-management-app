'use strict'

import error from '../utils/error.js'
import {getSports, getSportById, postSport, deleteSport} from '../data/sportData.js'

const getSportsServices = async () => {
	return await getSports()
}

const getSportByIdServices = async (sid) => {
	if(!sid) throw error(400, 'Parameter not found: sid')
	return await getSportById(sid)
}

const postSportServices = async (name) => {
	if(!name) throw error(400, 'Parameter not found: name')
	return await postSport(name)
}

const deleteSportServices = async (sid) => {
	if(!sid) throw error(400, 'Parameter not found: sid')
	return await deleteSport(sid)
}

export {getSportsServices, getSportByIdServices, postSportServices, deleteSportServices}