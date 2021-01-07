function maskMobile(mobile) { 
	if (mobile.length == 11) {
		const ret = mobile.substring(0,3) + '****' + mobile.substring(7)
		return ret
	}
	return mobile.substring(0,3)+'********'
}



module.exports = {
	maskMobile:maskMobile
}
