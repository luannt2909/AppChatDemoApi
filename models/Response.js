function Response(data,status,message) {
    const result={
        data,
        status,
        message
    };
    return result;
};
module.exports = Response;