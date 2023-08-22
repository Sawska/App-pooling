const registerLogin = require("../registerLoginErr")
describe("CheckRegister function", () => {
    it("Passed test", async () => {
        const {isPassed, errText} = await registerLogin.checkRegister("1234", "1234", "Splay1222@gmail.com");
  
        console.log(errText)

        expect(isPassed).toBe(true);
        expect(errText.length).toBe(0);
    });
  
  
  
    it("Not passed",async () => {
      let {isPassed,errText} = await registerLogin.checkRegister("123","1234","Splay1494@gmail.com")
  
      expect(isPassed).toBe(false)
      expect(errText[0]).toBe("Passwords are not the same")
    })
  
    it("email err",async () => {
      let {isPassed,errText} = await registerLogin.checkRegister("1234","1234","Splay1494")
      
      expect(isPassed).toBe(false)
      expect(errText[0]).toBe("Not valid email")
  
    })

    it("email already used",async () => {
      let {isPassed,errText} = await registerLogin.checkRegister("1234","1234","Splay1494@gmail.com")

      console.log(errText)
      expect(isPassed).toBe(false)
      expect(errText[0]).toBe("Email already used")
    })
  
    it("All errs",async () => {
      let {isPassed,errText} = await registerLogin.checkRegister("1234","123","Splay1494")
      
      expect(isPassed).toBe(false)
      expect(errText.join(" ")).toBe("Passwords are not the same Not valid email")
  
    })


  });

describe("checkLogin",() => {
  it("LoginCheck",async () => {
    let {isPassed,errText} = await registerLogin.checkLogin("Splay1494@gmail.com","Splay1494")

    expect(isPassed).toBe(true)
    expect(errText.length).toBe(0)
  })

  it("Email err",async () => {
    let {isPassed,errText} = await registerLogin.checkLogin("Splay2007@gmail.com","Splay1494")
    expect(isPassed).toBe(false)
    expect(errText[0]).toBe("Email or password is wrong")
  })

  it("Password err",async () => {
    let {isPassed,errText} = await registerLogin.checkLogin("Splay1494@gmail.com","Splay1")
    expect(isPassed).toBe(false)
    expect(errText[0]).toBe("Email or password is wrong")
  })

  it("All err",async () => {
    let {isPassed,errText} = await registerLogin.checkLogin("Splay1494@gmail","Splay1")
    expect(isPassed).toBe(false)
    expect(errText[0]).toBe("Email or password is wrong")
  })
})