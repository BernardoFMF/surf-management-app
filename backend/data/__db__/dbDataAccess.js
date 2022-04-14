import pool from '../../utils/dbConnection.js'

const getCandidatesData = async () => {

}

const getCandidateByIdData = async () => {
    
}

const postCandidateData = async () => {
    
}

const deleteCandidateData = async () => {
    
}

const approveCandidateData = async () => {
    
}

const getCandidateByUsernameData = async () => {
    
}

const getCompaniesData = async () => {
    
}

const getCompanyByIdData = async () => {
    
}

const postCompanyData = async () => {
    
}

const updateCompanyData = async () => {
    
}

const deleteCompanyData = async () => {
    
}

const getEventsData = async () => {
    
}

const getEventByIdData = async () => {
    
}

const postEventData = async () => {
    
}

const updateEventData = async () => {
    
}

const deleteEventData = async () => {
    
}

const postMemberAttendanceData = async () => {
    
}

const updateMemberAttendanceData = async () => {
    
}

const getEventByIdAttendanceData = async () => {
    
}

const getSportsData = async () => {
    
}

const getSportByIdData = async () => {
    
}

const postSportData = async () => {
    
}

const deleteSportData = async () => {
    
}

const getUsersData = async () => {
	const users = await pool.query('SELECT * FROM user_')
	return users.rows
}

const getUserByIdData = async () => {
    
}

const postUserData = async () => {
    
}

const updateUserData = async () => {
    
}

const deleteUserData = async () => {
    
}

const getUsersSportsData = async () => {
    
}

const getUsersSportData = async () => {
    
}

const getUserSportsByIdData = async () => {
    
}

const postUserSportData = async () => {
    
}

const updateUserSportData = async () => {
    
}

const deleteUserSportData = async () => {
    
}

const getQuotasData = async () => {
    
}

const getCompaniesQuotasData = async () => {
    
}

const getUsersQuotasData = async () => {
    
}

const getMemberQuotasByIdData = async () => {
    
}

const postQuotaData = async () => {
    
}

const updateMemberQuotaData = async () => {
    
}

const getMemberByIdData = async () => {
    
}

const getMemberByUsernameData = async () => {
    
}

const getQuotaByIdData = async () => {
    
}

const getEmails = async () => {
    
}

const updateUserQrCodeData = async () => {
    
}

const db_data = { getCandidatesData, getCandidateByIdData, postCandidateData, deleteCandidateData, approveCandidateData, getCandidateByUsernameData, getCompaniesData, getCompanyByIdData, postCompanyData, updateCompanyData, deleteCompanyData, getEventsData, getEventByIdData, postEventData,updateEventData, deleteEventData, postMemberAttendanceData, updateMemberAttendanceData, getEventByIdAttendanceData, getSportsData, getSportByIdData, postSportData, deleteSportData, getUsersData, getUserByIdData, postUserData, updateUserData, deleteUserData, getUsersSportsData, getUsersSportData, getUserSportsByIdData, postUserSportData, updateUserSportData, deleteUserSportData, getQuotasData, getCompaniesQuotasData, getUsersQuotasData, getMemberQuotasByIdData, postQuotaData, updateMemberQuotaData, getMemberByIdData, getMemberByUsernameData, getQuotaByIdData, getEmails, updateUserQrCodeData }

export default db_data