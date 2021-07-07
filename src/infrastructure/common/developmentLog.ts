export const developmentLog = (msg: string) => {
    if (process.env.REACT_APP_MODE === 'development') {
        console.log(msg);
    }
}
