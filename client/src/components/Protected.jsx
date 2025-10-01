const secret = import.meta.env.VITE_SECRET_KEY;
console.log(secret)
function Protected({children}){
    const storedKey = sessionStorage.getItem("secret_key");
    return storedKey === secret ? children : <Navigate to="/" />;
}
export default Protected;