const baseUrl = 
process.env.NODE_ENV === 'production'
? "http://shop-tracker.now.sh"
: "http://localhost:3000";

export default baseUrl;