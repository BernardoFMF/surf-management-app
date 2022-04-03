'use strict'

import error from '../utils/error.js'
let sports = []
let autoId = 0

const getSports = async () => {
	return sports
}

const getSportById = async (sid) => {
	const sport = sports.filter(sport => sport.sid == sid)[0]
	if (!sport) throw error(404, 'Could not find any sport.')
	return sport
}

const postSport = async (name) => {
	autoId++
	const newSport = {sid : autoId, name}
	sports.push(newSport)
	return newSport
}

const deleteSport = async (sid) => {
	sports = sports.filter(sport => sport.sid != sid)
	return sports
}

export {getSports, getSportById, postSport, deleteSport} 