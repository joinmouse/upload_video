let hostname = ''

if(process.env.NODE_ENV === 'development') {
    hostname = 'http://localhost:80'
}else {
    hostname = 'https://49.233.42.28'
}

export default hostname