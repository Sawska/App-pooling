// const poolingOperations = require("../poolingOperations")

// describe("Pooling Operations",() => {
//     it("Create Pool function",async () => {
//         const name = "test"
//         const options = ["option1","option2","option3"]
//         const id = 103
//         const res = await poolingOperations.createPool(name,options,id)

//         expect(res).toBe(true)
//     })
//     it("Delete Pool function",async () => {
//         const userid = 103
//         const id = 1
//         const res = await poolingOperations.deletePool(userid,id)

//         expect(res).toBe(true)
//     })

//     it("UpdateHowMuch",async () => {
//         const id = 1
//         const item_id = 67
//         const res = await poolingOperations.updateHowMuch(id,item_id)

//         expect(res).toBe(true)
//     })

//     it("Delete function",async () => {
//         const option = ["aaa","bbb"]
//         const res =  await poolingOperations.updatePool(135,"hi",option,103)

//         expect(res).toBe(true)
//     })

//     it("createPoolAnonymous function", async () => {
//         const option = ["test1","test2"]
//         const res = await poolingOperations.createPoolAnonymous("title",option)

//         expect(isNaN(res)).toBe(false)
//     })

//     it("saveVote function", async () => {
//         const id = 103
//         const item_id = 142
//         const option_id  = 230
//         const res = await poolingOperations.saveVote(id,item_id,option_id)

//         expect(res).toBe(true)
//     })

//     it("seeIfUserVoted",async () => {
//         const userid = 103
//         const item_id = 142
//         const res = await poolingOperations.seeIfUserVoted(item_id,userid)

//         expect(res).toBe(230)
//     })

//     it("seeIfUserVoted false",async () => {
//         const userid = 234
//         const item_id = 344
//         const res = await poolingOperations.seeIfUserVoted(item_id,userid)

//         expect(res).toBe(false)
//     })


// })