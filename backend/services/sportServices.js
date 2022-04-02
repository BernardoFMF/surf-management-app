'use strict'

import error from '../utils/error.js'
import {getSports, getSportsById, postSport, deleteSport} from '../data/sportDataMem.js'

const getSportsServices = async () => {
	return await getSports()
}

const getSportsByIdServices = async (sid) => {
	if(!sid) throw error(400, 'Parameter not found: sid')
	return await getSportsById(sid)
}

const postSportServices = async (name) => {
	if(!name) throw error(400, 'Parameter not found: name')
	return await postSport(name)
}

const deleteSportServices = async (sid) => {
	if(!sid) throw error(400, 'Parameter not found: sid')
	return await deleteSport(sid)
}

export {getSportsServices, getSportsByIdServices, postSportServices, deleteSportServices}