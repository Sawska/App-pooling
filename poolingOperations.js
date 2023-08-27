const dbOperationsPool = require("./dbOperations/dbOperationsPool")

async function createPool(name, options, id) {
    const currentDate = new Date();
    const [date, time] = currentDate.toISOString().split('T');
    const formattedDate = `${date} ${time.slice(0, 12)}`;
    await dbOperationsPool.addPool(name, id, formattedDate);
    const item_id = await dbOperationsPool.getIdOfPool(name, id, formattedDate);
    for(let i = 0; i < options.length; i++) {
        await dbOperationsPool.addOption(item_id, options[i], 0);
    }
    return item_id
}

async function getAll(userid) {
    return await dbOperationsPool.getAllUserPools(userid)
}


async function deletePool(userid,id) {
         return await dbOperationsPool.deletePool(userid,id)
}

async function updateHowMuch(id,item_id) {
    return await dbOperationsPool.updateHowMuchChoosed(item_id,id)
}

async function getPoolProprties(item_id) {
    const poolObject = await dbOperationsPool.getPool(item_id)
    const options = await dbOperationsPool.getOption(item_id)
    return {poolObject,options}
}

async function getPoolProprtiesProtected(item_id,userid) {
    const poolObject = await dbOperationsPool.getPoolProtected(item_id,userid)
    const options = await dbOperationsPool.getOptionProtected(item_id)
    return {poolObject,options}
}

async function updatePool(item_id,name,options,userid) {
    const previosName = await dbOperationsPool.getPool(item_id)
    await dbOperationsPool.updateTitle(previosName.name,name,userid,item_id)
    await dbOperationsPool.deleteAllOptions(item_id)
    for(let i = 0; i < options.length; i++) {
        await dbOperationsPool.addOption(item_id, options[i], 0);
    }
    const currentDate = new Date();
    const [date, time] = currentDate.toISOString().split('T');
    const formattedDate = `${date} ${time.slice(0, 12)}`;
    await dbOperationsPool.updateDateOfCreation(item_id,userid,formattedDate)
    return true
}


module.exports = {
    createPool,
    deletePool,
    updateHowMuch,
    getAll,
    getPoolProprties,
    getPoolProprtiesProtected,
    updatePool
}