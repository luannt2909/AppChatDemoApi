function Error(code,message) {
    const result={
        code,
        message
    };
    return result;
};
module.exports = Error;